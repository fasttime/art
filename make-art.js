#!/usr/bin/env node

'use strict';

const fs            = require('fs');
const Handlebars    = require('handlebars');
const { join }      = require('path');

function createOutput(template, context = { __proto__: null })
{
    const templateDelegate = Handlebars.compile(template, { noEscape: true });
    const output = templateDelegate(context);
    return output;
}

function getTemplateDir()
{
    const templatePath = join(__dirname, 'templates');
    return templatePath;
}

function makeArt(outDir, context)
{
    makeArtSync(outDir, context);
}

function makeArtCallback(outDir, context, callback)
{
    const { callbackify } = require('util');

    validateOutDir(outDir);
    if (arguments.length < 3)
    {
        callback = context;
        context = undefined;
    }
    if (typeof callback !== 'function')
        throw TypeError('Callback function missing or invalid');
    callbackify(makeArtPromiseInternal)(outDir, context, callback);
}

async function makeArtPromise(outDir, context)
{
    validateOutDir(outDir);
    await makeArtPromiseInternal(outDir, context);
}

async function makeArtPromiseInternal(outDir, context)
{
    const templateDir = getTemplateDir();
    await fs.promises.mkdir(outDir, { recursive: true });
    const promiseJs     = processTemplatePromise(templateDir, outDir, 'art.js', context);
    const promiseDTs    = processTemplatePromise(templateDir, outDir, 'art.d.ts', context);
    await Promise.all([promiseJs, promiseDTs]);
}

function makeArtSync(outDir, context)
{
    validateOutDir(outDir);
    const templateDir = getTemplateDir();
    fs.mkdirSync(outDir, { recursive: true });
    processTemplateSync(templateDir, outDir, 'art.js', context);
    processTemplateSync(templateDir, outDir, 'art.d.ts', context);
}

function parseContext(processArgv)
{
    const context = { __proto__: null };
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
            context,
        );
    }
    return context;
}

function processCommandLine()
{
    const processArgv = process.argv;
    const [,, outDir] = processArgv;
    const context = parseContext(processArgv);
    try
    {
        makeArt(outDir, context);
    }
    catch (error)
    {
        console.error(error.message);
    }
}

async function processTemplatePromise(templateDir, outDir, outFilename, context)
{
    const { readFile, writeFile } = fs.promises;
    const templateFilename = `${outFilename}.hbs`;
    const templatePath = join(templateDir, templateFilename);
    const template = await readFile(templatePath, 'utf-8');
    const output = createOutput(template, context);
    const outPath = join(outDir, outFilename);
    await writeFile(outPath, output);
}

function processTemplateSync(templateDir, outDir, outFilename, context)
{
    const { readFileSync, writeFileSync } = fs;
    const templateFilename = `${outFilename}.hbs`;
    const templatePath = join(templateDir, templateFilename);
    const template = readFileSync(templatePath, 'utf-8');
    const output = createOutput(template, context);
    const outPath = join(outDir, outFilename);
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
