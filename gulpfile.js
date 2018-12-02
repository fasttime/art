/* eslint-env node */

'use strict';

const gulp = require('gulp');

gulp.task
(
    'clean',
    () =>
    {
        const del = require('del');

        const stream = del(['art.js', 'art.md', 'coverage']);
        return stream;
    }
);

gulp.task
(
    'lint:es5',
    () =>
    {
        const lint = require('gulp-fasttime-lint');

        const stream = gulp.src(['test/**/*.js', '!test/**/*.spec.js']).pipe(lint());
        return stream;
    }
);

gulp.task
(
    'lint:es6',
    () =>
    {
        const lint = require('gulp-fasttime-lint');

        const stream =
        gulp
        .src(['*.js', '!art.js', 'test/**/*.spec.js'])
        .pipe(lint({ parserOptions: { ecmaVersion: 6 } }));
        return stream;
    }
);

gulp.task
(
    'make-art',
    callback =>
    {
        const makeArt = require('./make-art');

        makeArt.async('art.js', { css: { keyframes: true }, off: true, on: true }, callback);
    }
);

gulp.task
(
    'lint:art',
    () =>
    {
        const lint = require('gulp-fasttime-lint');

        const lintOpts =
        { envs: ['browser'], globals: ['art'], rules: { 'strict': ['error', 'function'] } };
        const stream = gulp.src('art.js').pipe(lint(lintOpts));
        return stream;
    }
);

gulp.task
(
    'test',
    () =>
    {
        const mocha = require('gulp-spawn-mocha');

        const stream = gulp.src('test/**/*.spec.js').pipe(mocha({ istanbul: true }));
        return stream;
    }
);

gulp.task
(
    'jsdoc2md',
    () =>
    {
        const fsThen = require('fs-then-native');
        const jsdoc2md = require('jsdoc-to-markdown');

        const stream =
        jsdoc2md
        .render({ files: 'art.js' })
        .then(output => fsThen.writeFile('art.md', output));
        return stream;
    }
);

gulp.task
(
    'default',
    callback =>
    {
        const runSequence = require('run-sequence');

        runSequence
        (['clean', 'lint:es5', 'lint:es6'], 'make-art', 'test', ['jsdoc2md', 'lint:art'], callback);
    }
);
