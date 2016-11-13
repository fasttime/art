/* eslint-env node */

'use strict';

var gulp = require('gulp');

gulp.task(
    'clean',
    function ()
    {
        var del = require('del');
        
        var PATTERNS = ['art.js', 'art.md', 'coverage'];
        var stream = del(PATTERNS);
        return stream;
    }
);

gulp.task(
    'lint:other',
    function ()
    {
        var lint = require('gulp-fasttime-lint');
        
        var SRC = ['*.js', '!art.js', 'test/**/*.js'];
        var stream = gulp.src(SRC).pipe(lint());
        return stream;
    }
);

gulp.task(
    'make-art',
    function (callback)
    {
        var makeArt = require('./make-art');
        makeArt.async('art.js', { css: { keyframes: true }, off: true, on: true }, callback);
    }
);

gulp.task(
    'lint:art',
    function ()
    {
        var lint = require('gulp-fasttime-lint');
        
        var stream = gulp.src('art.js').pipe(lint({ envs: ['browser'], globals: ['art'] }));
        return stream;
    }
);

gulp.task(
    'test',
    function ()
    {
        var mocha = require('gulp-spawn-mocha');
        
        var stream = gulp.src('test/**/*.spec.js').pipe(mocha({ istanbul: true }));
        return stream;
    }
);

gulp.task(
    'jsdoc2md',
    function ()
    {
        var fsThen = require('fs-then-native');
        var jsdoc2md = require('jsdoc-to-markdown');
        
        var stream =
            jsdoc2md
            .render({ files: 'art.js' })
            .then(
                function (output)
                {
                    var promise = fsThen.writeFile('art.md', output);
                    return promise;
                }
            );
        return stream;
    }
);

gulp.task(
    'default',
    function (callback)
    {
        var runSequence = require('run-sequence');
        
        runSequence(
            ['clean', 'lint:other'],
            'make-art',
            'test',
            ['jsdoc2md', 'lint:art'],
            callback
        );
    }
);
