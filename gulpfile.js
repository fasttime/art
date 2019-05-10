'use strict';

const { parallel, series, task } = require('gulp');

task
(
    'clean',
    async () =>
    {
        const del = require('del');

        await del(['.nyc_output', 'art.js', 'art.md', 'coverage']);
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
                parserOptions: { ecmaVersion: 7 },
            },
            {
                src: ['test/**/*.js', '!test/**/*.spec.js'],
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
    'jsdoc2md',
    () =>
    {
        const jsdoc2md      = require('jsdoc-to-markdown');
        const { promisify } = require('util');
        const { writeFile } = require('fs');

        const promise =
        jsdoc2md.render({ files: 'art.js' }).then(output => promisify(writeFile)('art.md', output));
        return promise;
    },
);

task
(
    'default',
    series(parallel('clean', 'lint:other'), 'make-art', 'test', parallel('jsdoc2md', 'lint:art')),
);
