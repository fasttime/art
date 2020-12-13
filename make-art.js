#!/usr/bin/env node

'use strict';

const fs            = require('fs');
const Handlebars    = require('handlebars');
const path          = require('path');

function createOutput(template, context)
{
    const templateDelegate = Handlebars.compile(template, { noEscape: true });
    const output = templateDelegate(context);
    return output;
}

function getTemplateDir()
{
    const templatePath = path.join(__dirname, 'templates');
    return templatePath;
}

function getTemplatePath(templateDir, outFilename)
{
    const templateFilename = `${outFilename}.hbs`;
    const templatePath = path.join(templateDir, templateFilename);
    return templatePath;
}

function makeArt(outDir, options)
{
    makeArtSync(outDir, options);
}

function makeArtCallback(outDir, options, callback)
{
    const { callbackify } = require('util');

    validateOutDir(outDir);
    if (arguments.length < 3)
    {
        callback = options;
        options = undefined;
    }
    if (typeof callback !== 'function')
        throw TypeError('Callback function missing or invalid');
    callbackify(makeArtPromiseInternal)(outDir, options, callback);
}

async function makeArtPromise(outDir, options)
{
    validateOutDir(outDir);
    await makeArtPromiseInternal(outDir, options);
}

async function makeArtPromiseInternal(outDir, options)
{
    const templateDir = getTemplateDir();
    const context = makeContext(options);
    await fs.promises.mkdir(outDir, { recursive: true });
    const promiseJs = processTemplatePromise(templateDir, outDir, 'art.js', context);
    const promises = [promiseJs];
    if (context.dts)
    {
        const promiseDTs = processTemplatePromise(templateDir, outDir, 'art.d.ts', context);
        promises.push(promiseDTs);
    }
    await Promise.all(promises);
}

function makeArtSync(outDir, options)
{
    validateOutDir(outDir);
    const templateDir = getTemplateDir();
    const context = makeContext(options);
    fs.mkdirSync(outDir, { recursive: true });
    processTemplateSync(templateDir, outDir, 'art.js', context);
    if (context.dts)
        processTemplateSync(templateDir, outDir, 'art.d.ts', context);
}

function makeContext(options)
{
    const { homepage, version } = require('./package.json');

    const context = { __proto__: null, ...options, homepage, version };
    return context;
}

function parseOptions(processArgv)
{
    const options = { __proto__: null };
    for (let index = 3, count = processArgv.length; index < count; ++index)
    {
        const arg = processArgv[index];
        arg.split('.').reduce
        (
            (target, part) =>
            {
                let obj = target[part];
                if (!obj)
                    target[part] = obj = { __proto__: null };
                return obj;
            },
            options,
        );
    }
    return options;
}

function processCommandLine()
{
    const processArgv = process.argv;
    const [,, outDir] = processArgv;
    const options = parseOptions(processArgv);
    try
    {
        makeArt(outDir, options);
    }
    catch (error)
    {
        console.error(error.message);
    }
}

async function processTemplatePromise(templateDir, outDir, outFilename, context)
{
    const { readFile, writeFile } = fs.promises;
    const templatePath = getTemplatePath(templateDir, outFilename);
    const template = await readFile(templatePath, 'utf-8');
    const output = createOutput(template, context);
    const outPath = path.join(outDir, outFilename);
    await writeFile(outPath, output);
}

function processTemplateSync(templateDir, outDir, outFilename, context)
{
    const { readFileSync, writeFileSync } = fs;
    const templatePath = getTemplatePath(templateDir, outFilename);
    const template = readFileSync(templatePath, 'utf-8');
    const output = createOutput(template, context);
    const outPath = path.join(outDir, outFilename);
    writeFileSync(outPath, output);
}

function validateOutDir(outDir)
{
    if (outDir == null)
        throw Error('missing output folder');
}

Handlebars.registerHelper({ or: (v1, v2) => v1 || v2 });

// istanbul ignore if
if (require.main === module)
    processCommandLine();
else
{
    makeArt.callback            = makeArtCallback;
    makeArt.processCommandLine  = processCommandLine;
    makeArt.promise             = makeArtPromise;
    makeArt.sync                = makeArtSync;
    module.exports = makeArt;
}
