/* eslint-env node */

'use strict';

module.exports =
    function (grunt)
    {
        // Project configuration.
        grunt.initConfig(
            {
                clean: { default: ['coverage', 'art.md'] },
                fasttime_lint:
                {
                    lib: { options: { envs: ['browser'], globals: ['art'] }, src: 'lib/**/*.js' },
                    other: ['*.js', 'test/**/*.js']
                },
                jsdoc2md:
                { default: { dest: 'art.md', src: 'lib/art*.js' } },
                mocha_istanbul: { default: 'test/**/*.spec.js' }
            }
        );
        
        // These plugins provide necessary tasks.
        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.loadNpmTasks('grunt-fasttime-lint');
        grunt.loadNpmTasks('grunt-jsdoc-to-markdown');
        grunt.loadNpmTasks('grunt-mocha-istanbul');
        
        // Default task.
        grunt.registerTask('default', ['fasttime_lint', 'clean', 'jsdoc2md', 'mocha_istanbul']);
    };
