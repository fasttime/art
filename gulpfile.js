'use strict';

const { parallel, series, task } = require('gulp');

task
(
    'clean',
    async () =>
    {
        const { rm } = require('fs/promises');

        const paths = ['coverage', 'dist', 'doc'];
        const options = { force: true, recursive: true };
        await Promise.all(paths.map(path => rm(path, options)));
    },
);

task
(
    'lint:art',
    async () =>
    {
        const { lint } = require('@fasttime/lint');

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
        await
        lint
        (
            {
                src: 'dist/art.js',
                envs: 'browser',
                rules,
            },
            {
                src: 'dist/art.d.ts',
                tsVersion: 'latest',
                parserOptions: { project: 'tsconfig.json' },
            },
        );
    },
);

task
(
    'lint:other',
    async () =>
    {
        const { lint } = require('@fasttime/lint');

        await
        lint
        (
            {
                src: ['gulpfile.js', 'make-art.js', 'test/**/*.spec.js'],
                jsVersion: 2018,
                envs: 'node',
            },
            {
                src: ['test/**/*.js', '!test/**/*.spec.js'],
            },
            {
                src: 'make-art.d.ts',
                tsVersion: 'latest',
                parserOptions: { project: 'tsconfig.json' },
            },
        );
    },
);

task
(
    'make-api-doc',
    async () =>
    {
        const { Application, TSConfigReader } = require('typedoc');

        const options =
        {
            disableSources:     true,
            entryPoints:        'dist/art.d.ts',
            githubPages:        false,
            hideBreadcrumbs:    true,
            name:               'art',
            plugin:             'typedoc-plugin-markdown',
            readme:             'none',
            tsconfig:           'tsconfig.json',
        };
        const app = new Application();
        app.options.addReader(new TSConfigReader());
        app.bootstrap(options);
        const project = app.convert();
        await app.renderer.render(project, 'doc');
        if (app.logger.hasErrors())
            throw Error('API documentation could not be generated');
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
    'test',
    callback =>
    {
        const { fork } = require('child_process');

        const { resolve } = require;
        const c8Path = resolve('c8/bin/c8');
        const mochaPath = resolve('mocha/bin/mocha');
        const forkArgs =
        [
            '--reporter=html',
            '--reporter=text-summary',
            mochaPath,
            '--check-leaks',
            'test/**/*.spec.js',
        ];
        const childProcess = fork(c8Path, forkArgs);
        childProcess.on('exit', code => callback(code && 'Test failed'));
    },
);

task
(
    'default',
    series
    (parallel('clean', 'lint:other'), 'make-art', 'test', parallel('make-api-doc', 'lint:art')),
);
