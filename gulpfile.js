/* eslint-env node */

'use strict';

const { parallel, series, src, task } = require('gulp');

task
(
    'clean',
    () =>
    {
        const del = require('del');

        const stream = del(['art.js', 'art.md', 'coverage']);
        return stream;
    }
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
                src: ['*.js', '!art.js', 'test/**/*.spec.js'],
                parserOptions: { ecmaVersion: 6 },
            },
            {
                src: ['test/**/*.js', '!test/**/*.spec.js'],
            }
        );
        return stream;
    }
);

task
(
    'make-art',
    callback =>
    {
        const makeArt = require('./make-art');

        makeArt.async('art.js', { css: { keyframes: true }, off: true, on: true }, callback);
    }
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
                envs: ['browser'],
                globals: ['art'],
                rules: { 'strict': ['error', 'function'] },
            }
        );
        return stream;
    }
);

task
(
    'test',
    () =>
    {
        const mocha = require('gulp-spawn-mocha');

        const stream = src('test/**/*.spec.js').pipe(mocha({ istanbul: true }));
        return stream;
    }
);

task
(
    'jsdoc2md',
    () =>
    {
        const fsThen = require('fs-then-native');
        const jsdoc2md = require('jsdoc-to-markdown');

        const stream =
        jsdoc2md.render({ files: 'art.js' }).then(output => fsThen.writeFile('art.md', output));
        return stream;
    }
);

task
(
    'default',
    series(parallel('clean', 'lint:other'), 'make-art', 'test', parallel('jsdoc2md', 'lint:art'))
);
