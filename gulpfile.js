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
    callback =>
    {
        const lint = require('gulp-fasttime-lint');

        gulp.src(['test/**/*.js', '!test/**/*.spec.js']).pipe(lint()).on('end', callback);
    }
);

gulp.task
(
    'lint:es6',
    callback =>
    {
        const lint = require('gulp-fasttime-lint');

        gulp
        .src(['*.js', '!art.js', 'test/**/*.spec.js'])
        .pipe(lint({ parserOptions: { ecmaVersion: 6 } }))
        .on('end', callback);
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
    callback =>
    {
        const lint = require('gulp-fasttime-lint');

        const lintOpts =
        { envs: ['browser'], globals: ['art'], rules: { 'strict': ['error', 'function'] } };
        gulp.src('art.js').pipe(lint(lintOpts)).on('end', callback);
    }
);

gulp.task
(
    'test',
    callback =>
    {
        const mocha = require('gulp-spawn-mocha');

        gulp.src('test/**/*.spec.js').pipe(mocha({ istanbul: true })).on('end', callback);
    }
);

gulp.task
(
    'jsdoc2md',
    callback =>
    {
        const fsThen = require('fs-then-native');
        const jsdoc2md = require('jsdoc-to-markdown');

        jsdoc2md
        .render({ files: 'art.js' })
        .then(output => fsThen.writeFile('art.md', output))
        .then(callback, callback);
    }
);

gulp.task
(
    'default',
    gulp.series
    (
        gulp.parallel('clean', 'lint:es5', 'lint:es6'),
        'make-art',
        'test',
        gulp.parallel('jsdoc2md', 'lint:art')
    )
);
