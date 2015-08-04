/* jshint node: true */

'use strict';

module.exports =
    function (grunt)
    {
        // Project configuration.
        grunt.initConfig(
            {
                clean: { default: ['coverage', 'lib/**/*.min.js', 'art.md'] },
                jscs:
                {
                    default: ['*.js', 'lib/**/*.js'],
                    options:
                    {
                        // Encourage use of abbreviations: "char", "obj", "str".
                        disallowIdentifierNames: ['character', 'object', 'string'],
                        disallowMixedSpacesAndTabs: true,
                        disallowSpaceAfterObjectKeys: true,
                        disallowSpaceAfterPrefixUnaryOperators: true,
                        disallowSpaceBeforePostfixUnaryOperators: true,
                        disallowSpacesInCallExpression: true,
                        disallowSpacesInFunctionDeclaration: { beforeOpeningRoundBrace: true },
                        disallowSpacesInNamedFunctionExpression: { beforeOpeningRoundBrace: true },
                        disallowSpacesInsideBrackets: true,
                        disallowSpacesInsideParentheses: true,
                        disallowTrailingWhitespace: 'ignoreEmptyLines',
                        disallowYodaConditions: true,
                        requireBlocksOnNewline: true,
                        requireKeywordsOnNewLine:
                        [
                            'break',
                            'case',
                            'catch',
                            'continue',
                            'default',
                            'do',
                            'else',
                            'finally',
                            'for',
                            'return',
                            'switch',
                            'throw',
                            'try',
                            'while'
                        ],
                        requireLineBreakAfterVariableAssignment: true,
                        requireLineFeedAtFileEnd: true,
                        requireNewlineBeforeBlockStatements: true,
                        requirePaddingNewLinesAfterUseStrict: true,
                        requireSpaceAfterBinaryOperators: true,
                        requireSpaceAfterKeywords: true,
                        requireSpaceAfterLineComment: true,
                        requireSpaceBeforeBinaryOperators: true,
                        requireSpaceBeforeBlockStatements: true,
                        requireSpaceBeforeKeywords: ['delete', 'if', 'in', 'instanceof'],
                        requireSpaceBeforeObjectValues: true,
                        requireSpaceBetweenArguments: true,
                        requireSpacesInAnonymousFunctionExpression:
                        {
                            beforeOpeningRoundBrace: true
                        },
                        requireSpacesInConditionalExpression: true,
                        requireSpacesInForStatement: true,
                        requireSpacesInFunctionDeclaration: { beforeOpeningCurlyBrace: true },
                        requireSpacesInFunctionExpression: { beforeOpeningCurlyBrace: true },
                        requireSpacesInsideObjectBrackets: 'all',
                        validateAlignedFunctionParameters: true,
                        validateIndentation: { includeEmptyLines: true, value: 4 },
                        validateParameterSeparator: ', '
                    }
                },
                jsdoc2md: { default: { dest: 'art.md', src: 'lib/art.js' } },
                jshint:
                {
                    default: ['*.js', 'lib/**/*.js'],
                    options:
                    {
                        curly: true,
                        eqeqeq: true,
                        immed: true,
                        latedef: 'nofunc',
                        maxlen: 100,
                        newcap: false,
                        noarg: true,
                        noempty: true,
                        quotmark: true,
                        singleGroups: true,
                        strict: true,
                        trailing: true,
                        undef: true,
                        unused: true,
                        
                        boss: true,
                        elision: true,
                        eqnull: true,
                        evil: true,
                        validthis: true,
                        '-W018': true,
                    }
                },
                uglify:
                {
                    default: { files: { 'lib/art.min.js': 'lib/art.js' } },
                    options: { compress: { global_defs: { DEBUG: false }, hoist_vars: true } }
                }
            }
        );
        
        // These plugins provide necessary tasks.
        grunt.loadNpmTasks('grunt-contrib-clean');
        grunt.loadNpmTasks('grunt-contrib-jshint');
        grunt.loadNpmTasks('grunt-contrib-uglify');
        grunt.loadNpmTasks('grunt-jscs');
        
        // Default task.
        grunt.registerTask('default', ['clean', 'jshint', 'jscs', 'uglify']);
    };
