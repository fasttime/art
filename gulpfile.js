'use strict';

const { parallel, series, src, task }   = require('gulp');
const syncReadable                      = require('sync-readable');

task
(
    'clean',
    async () =>
    {
        const { rm } = require('node:fs/promises');

        const paths = ['coverage', 'dist', 'doc'];
        const options = { force: true, recursive: true };
        await Promise.all(paths.map(path => rm(path, options)));
    },
);

task
(
    'lint:art',
    syncReadable
    (
        async () =>
        {
            const { createConfig, noParserConfig }  = require('@origin-1/eslint-config');
            const globals                           = require('globals');
            const gulpESLintNew                     = require('gulp-eslint-new');

            const overrideConfig =
            await createConfig
            (
                noParserConfig,
                {
                    files:              ['dist/art.js'],
                    jsVersion:          5,
                    languageOptions:    { globals: globals.browser, sourceType: 'script' },
                    rules:
                    {
                        '@origin-1/indent':         ['error', -1],
                        'no-unused-vars':
                        [
                            'error',
                            { argsIgnorePattern: '^(identifier|ruleObjMap)$', vars: 'local' },
                        ],
                        '@stylistic/padded-blocks': 'off',
                        'strict':                   ['error', 'function'],
                    },
                },
                {
                    files:              ['dist/art.d.ts'],
                    tsVersion:          '2.0.0',
                    languageOptions:    { parserOptions: { project: 'tsconfig.json' } },
                },
            );
            const stream =
            src(['dist/art.js', 'dist/art.d.ts'])
            .pipe
            (
                gulpESLintNew
                (
                    {
                        configType:         'flat',
                        overrideConfig,
                        overrideConfigFile: true,
                        warnIgnored:        true,
                    },
                ),
            )
            .pipe(gulpESLintNew.format())
            .pipe(gulpESLintNew.failAfterError());
            return stream;
        },
    ),
);

task
(
    'lint:other',
    syncReadable
    (
        async () =>
        {
            const { createConfig, noParserConfig }  = require('@origin-1/eslint-config');
            const globals                           = require('globals');
            const gulpESLintNew                     = require('gulp-eslint-new');

            const overrideConfig =
            await createConfig
            (
                noParserConfig,
                {
                    files:              ['gulpfile.js', 'make-art.js', 'test/**/*.spec.js'],
                    jsVersion:          2022,
                    languageOptions:    { globals: globals.node, sourceType: 'commonjs' },
                },
                {
                    files:              ['test/**/*.js'],
                    ignores:            ['test/**/*.spec.js'],
                    jsVersion:          5,
                    languageOptions:    { sourceType: 'script' },
                },
                {
                    files:              ['make-art.d.ts'],
                    tsVersion:          '2.0.0',
                },
            );
            const stream =
            src(['*.{js,ts}', 'test/**/*.js'])
            .pipe
            (
                gulpESLintNew
                (
                    {
                        configType:         'flat',
                        overrideConfig,
                        overrideConfigFile: true,
                        warnIgnored:        true,
                    },
                ),
            )
            .pipe(gulpESLintNew.format())
            .pipe(gulpESLintNew.failAfterError());
            return stream;
        },
    ),
);

task
(
    'make-api-doc',
    async () =>
    {
        const { Application, TSConfigReader } = require('typedoc');

        const options =
        {
            disableSources:     true,
            entryPoints:        'dist/art.d.ts',
            githubPages:        false,
            hideBreadcrumbs:    true,
            name:               'art',
            plugin:             'typedoc-plugin-markdown',
            readme:             'none',
            tsconfig:           'tsconfig.json',
        };
        const tsConfigReader = new TSConfigReader();
        const app = await Application.bootstrapWithPlugins(options, [tsConfigReader]);
        const project = await app.convert();
        app.validate(project);
        const { logger } = app;
        if (logger.hasErrors() || logger.hasWarnings())
            throw Error('Problems occurred while generating the documentation');
        await app.renderer.render(project, 'doc');
    },
);

task
(
    'make-art',
    async () =>
    {
        const { promise } = require('.');

        await
        promise('dist', { art: { css: { keyframes: true }, off: true, on: true }, dts: true });
    },
);

task
(
    'test',
    callback =>
    {
        const { fork } = require('node:child_process');

        const { resolve } = require;
        const c8Path = resolve('c8/bin/c8');
        const mochaPath = resolve('mocha/bin/mocha');
        const forkArgs =
        [
            '--reporter=html',
            '--reporter=text-summary',
            mochaPath,
            '--check-leaks',
            'test/**/*.spec.js',
        ];
        const childProcess = fork(c8Path, forkArgs);
        childProcess.on('exit', code => callback(code && 'Test failed'));
    },
);

task
(
    'default',
    series('clean', 'lint:other', 'make-art', 'test', parallel('make-api-doc', 'lint:art')),
);
