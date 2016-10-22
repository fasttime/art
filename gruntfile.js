/* eslint-env node */

'use strict';

module.exports =
    function (grunt)
    {
        // Project configuration.
        grunt.initConfig(
            {
                clean: { default: ['art.js', 'art.md', 'coverage'] },
                fasttime_lint:
                {
                    art: { options: { envs: ['browser'], globals: ['art'] }, src: 'art.js' },
                    other: ['*.js', '!art.js', 'test/**/*.js']
                },
                jsdoc2md: { default: { dest: 'art.md', src: 'art.js' } },
                mocha_istanbul: { default: 'test/**/*.spec.js' }
            }
        );
        
        grunt.registerTask(
            'make-art',
            'Create art library source.',
            function ()
            {
                var makeArt = require('./make-art');
                makeArt('art.js', { css: { keyframes: true }, off: true, on: true });
                grunt.log.ok('Done.');
            }
        );
        
        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.loadNpmTasks('grunt-fasttime-lint');
        grunt.loadNpmTasks('grunt-jsdoc-to-markdown');
        grunt.loadNpmTasks('grunt-mocha-istanbul');
        
        // Default task.
        grunt.registerTask(
            'default',
            [
                'fasttime_lint:other',
                'clean',
                'make-art',
                'fasttime_lint:art',
                'mocha_istanbul',
                'jsdoc2md'
            ]
        );
    };
