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
                parserOptions: { ecmaVersion: 8 },
            },
            {
                src: 'make-art.js',
                envs: 'node',
                parserOptions: { ecmaVersion: 8 },
            },
            {
                src: ['test/**/*.js', '!test/**/*.spec.js'],
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
    callback =>
    {
        const makeArt = require('./make-art');

        makeArt.async('art.js', { css: { keyframes: true }, off: true, on: true }, callback);
    },
);

task
(
    'lint:art',
    () =>
    {
        const lint = require('gulp-fasttime-lint');

        const stream =
        lint
        (
            {
                src: 'art.js',
                envs: 'browser',
                rules: { 'strict': ['error', 'function'] },
            },
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
        const cmd =
        fork
        (
            nycPath,
            ['--reporter=html', '--reporter=text-summary', '--', mochaPath, 'test/**/*.spec.js'],
        );
        cmd.on('exit', code => callback(code && 'Test failed'));
    },
);

task
(
    'typedoc',
    () =>
    {
        const pkg = require('./package.json');
        const typedoc = require('gulp-typedoc');

        const opts =
        {
            excludeExternals:       true,
            gitRevision:            pkg.version,
            includeDeclarations:    true,
            mode:                   'file',
            name:                   'art',
            out:                    'doc',
            readme:                 'none',
            theme:                  'markdown',
        };
        const stream = src('art.d.ts', { read: false }).pipe(typedoc(opts));
        return stream;
    },
);

task
(
    'default',
    series(parallel('clean', 'lint:other'), 'make-art', 'test', parallel('typedoc', 'lint:art')),
);
