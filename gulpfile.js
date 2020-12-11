'use strict';

const { parallel, series, src, task } = require('gulp');

task
(
    'clean',
    async () =>
    {
        const { promises: { rmdir } } = require('fs');

        const paths = ['.nyc_output', 'coverage', 'dist', 'doc'];
        const rmdirOpts = { recursive: true };
        await Promise.all(paths.map(path => rmdir(path, rmdirOpts)));
    },
);

task
(
    'lint:other',
    () =>
    {
        const lint = require('@fasttime/gulp-lint');

        const stream =
        lint
        (
            {
                src: ['gulpfile.js', 'test/**/*.spec.js'],
                envs: 'node',
                parserOptions: { ecmaVersion: 9 },
            },
            {
                src: 'make-art.js',
                envs: 'node',
                parserOptions: { ecmaVersion: 9 },
            },
            {
                src: ['test/**/*.js', '!test/**/*.spec.js'],
            },
            {
                src: 'make-art.d.ts',
                parserOptions: { project: 'tsconfig.json', sourceType: 'module' },
            },
        );
        return stream;
    },
);

task
(
    'make-art',
    async () =>
    {
        const { promise } = require('.');

        await
        promise('dist', { art: { css: { keyframes: true }, off: true, on: true }, dts: true });
    },
);

task
(
    'lint:art',
    () =>
    {
        const lint = require('@fasttime/gulp-lint');

        const rules =
        {
            'brace-style':      'off',
            'indent':
            [
                'error',
                4,
                {
                    CallExpression: { arguments: 'first' },
                    FunctionDeclaration: { parameters: 'first' },
                    FunctionExpression: { parameters: 'first' },
                    MemberExpression: 0,
                    outerIIFEBody: 'off',
                    VariableDeclarator: 0,
                    ignoredNodes:
                    [
                        'ArrowFunctionExpression',
                        'ClassDeclaration[superClass]',
                        'ConditionalExpression',
                        'ImportDeclaration',
                    ],
                },
            ],
            'no-unused-vars':
            ['error', { argsIgnorePattern: '^(identifier|ruleObjMap)$', vars: 'local' }],
            'padded-blocks':    'off',
            'strict':           ['error', 'function'],
        };
        const stream =
        lint
        (
            { src: 'dist/art.js', envs: 'browser', rules },
            { src: 'dist/art.d.ts', parserOptions: { project: 'tsconfig.json' } },
        );
        return stream;
    },
);

task
(
    'test',
    callback =>
    {
        const { fork } = require('child_process');

        const { resolve } = require;
        const nycPath = resolve('nyc/bin/nyc');
        const mochaPath = resolve('mocha/bin/mocha');
        const childProcess =
        fork
        (
            nycPath,
            [
                '--reporter=html',
                '--reporter=text-summary',
                '--',
                mochaPath,
                '--check-leaks',
                'test/**/*.spec.js',
            ],
        );
        childProcess.on('exit', code => callback(code && 'Test failed'));
    },
);
task
(
    'typedoc',
    () =>
    {
        const typedoc = require('gulp-typedoc');

        const typedocOpts =
        {
            excludeExternals:       true,
            hideBreadcrumbs:        true,
            hideSources:            true,
            ignoreCompilerErrors:   true,
            includeDeclarations:    true,
            mode:                   'file',
            name:                   'art',
            out:                    'doc',
            readme:                 'none',
            theme:                  'markdown',
            tsconfig:               'tsconfig.json',
        };
        const stream = src('dist/art.d.ts', { read: false }).pipe(typedoc(typedocOpts));
        return stream;
    },
);

task
(
    'default',
    series(parallel('clean', 'lint:other'), 'make-art', 'test', parallel('typedoc', 'lint:art')),
);
