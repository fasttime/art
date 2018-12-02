#!/usr/bin/env node

/* eslint-env node */

'use strict';

var Handlebars = require('handlebars');
var fs = require('fs');
var path = require('path');

function createEmptyObj()
{
    var emptyObj = Object.create(null);
    return emptyObj;
}

function createOutput(data, context)
{
    var template = Handlebars.compile(String(data));
    context = context || createEmptyObj();
    var output = template(context);
    return output;
}

function getTemplatePath()
{
    var templatePath = path.resolve(__dirname, 'art.hbs');
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
                var output = createOutput(data, context);
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
    var templatePath = getTemplatePath();
    fs.readFile(templatePath, readFileCallback);
}

function makeArtSync(destPath, context)
{
    validateDestPath(destPath);
    var templatePath = getTemplatePath();
    var data = fs.readFileSync(templatePath);
    var output = createOutput(data, context);
    fs.writeFileSync(destPath, output);
}

function parseContext(processArgv)
{
    var context = createEmptyObj();
    for (var index = 3, count = processArgv.length; index < count; ++index)
    {
        var arg = processArgv[index];
        arg.split('.').reduce
        (
            function (target, part)
            {
                target = target[part] = target[part] || createEmptyObj();
                return target;
            },
            context
        );
    }
    return context;
}

function processCommandLine()
{
    var processArgv = process.argv;
    var dest = processArgv[2];
    var context = parseContext(processArgv);
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
        throw new Error('missing path');
}

Handlebars.registerHelper
(
    {
        or:
        function (v1, v2)
        {
            var result = v1 || v2;
            return result;
        },
    }
);

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
