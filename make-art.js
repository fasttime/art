#!/usr/bin/env node

'use strict';

const Handlebars = require('handlebars');
const fs = require('fs');

function createOutput(data, context)
{
    const template = Handlebars.compile(String(data));
    context = context || { __proto__: null };
    const output = template(context);
    return output;
}

function getTemplatePath()
{
    const templatePath = require.resolve('./art.hbs');
    return templatePath;
}

function makeArt(destPath, context)
{
    makeArtSync(destPath, context);
}

function makeArtAsync(destPath, context, callback)
{
    function readFileCallback(error, data)
    {
        if (error == null)
        {
            try
            {
                const output = createOutput(data, context);
                fs.writeFile(destPath, output, callback);
                return;
            }
            catch (newError)
            {
                error = newError;
            }
        }
        callback(error);
    }

    validateDestPath(destPath);
    const templatePath = getTemplatePath();
    fs.readFile(templatePath, readFileCallback);
}

function makeArtSync(destPath, context)
{
    validateDestPath(destPath);
    const templatePath = getTemplatePath();
    const data = fs.readFileSync(templatePath);
    const output = createOutput(data, context);
    fs.writeFileSync(destPath, output);
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
            context
        );
    }
    return context;
}

function processCommandLine()
{
    const processArgv = process.argv;
    const [,, dest] = processArgv;
    const context = parseContext(processArgv);
    try
    {
        makeArt(dest, context);
    }
    catch (error)
    {
        console.error(error.message);
    }
}

function validateDestPath(destPath)
{
    if (destPath == null)
        throw Error('missing path');
}

Handlebars.registerHelper({ or: (v1, v2) => v1 || v2 });

// istanbul ignore if
if (require.main === module)
    processCommandLine();
else
{
    makeArt.async = makeArtAsync;
    makeArt.processCommandLine = processCommandLine;
    makeArt.sync = makeArtSync;
    module.exports = makeArt;
}
