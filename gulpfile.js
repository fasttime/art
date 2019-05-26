'use strict';

const { parallel, series, src, task } = require('gulp');

task
(
    'clean',
    async () =>
    {
        const del = require('del');

        await del(['.nyc_output', 'art.js', 'coverage', 'doc']);
    },
);

task
(
    'lint:other',
    () =>
    {
        const lint = require('gulp-fasttime-lint');

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
            {
                src: 'art.d.ts',
                parserOptions: { project: 'tsconfig.json' },
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

        await promise('art.js', { css: { keyframes: true }, off: true, on: true });
    },
);

task
(
    'lint:art',
    () =>
    {
        const lint = require('gulp-fasttime-lint');

        const stream =
        lint({ src: 'art.js', envs: 'browser', rules: { 'strict': ['error', 'function'] } });
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
            ['--reporter=html', '--reporter=text-summary', '--', mochaPath, 'test/**/*.spec.js'],
        );
        childProcess.on('exit', code => callback(code && 'Test failed'));
    },
);

task
(
    'typedoc',
    () =>
    {
        const { version }   = require('./package.json');
        const typedoc       = require('gulp-typedoc');

        const typedocOpts =
        {
            excludeExternals:       true,
            gitRevision:            version,
            includeDeclarations:    true,
            mode:                   'file',
            name:                   'art',
            out:                    'doc',
            readme:                 'none',
            theme:                  'markdown',
        };
        const stream = src('art.d.ts', { read: false }).pipe(typedoc(typedocOpts));
        return stream;
    },
);

task
(
    'default',
    series(parallel('clean', 'lint:other'), 'make-art', 'test', parallel('typedoc', 'lint:art')),
);
