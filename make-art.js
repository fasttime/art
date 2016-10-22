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

function makeArt(destPath, context)
{
    if (destPath == null)
        throw new Error('missing path');
    var templatePath = path.resolve(__dirname, 'art.hbs');
    var data = fs.readFileSync(templatePath);
    var template = Handlebars.compile(String(data));
    context = context || createEmptyObj();
    var output = template(context);
    fs.writeFileSync(destPath, output);
}

function parseContext(processArgv)
{
    var context = createEmptyObj();
    for (var index = 3, count = processArgv.length; index < count; ++index)
    {
        var arg = processArgv[index];
        arg.split('.').reduce(
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

Handlebars.registerHelper(
    {
        or: function (v1, v2)
        {
            var result = v1 || v2;
            return result;
        }
    }
);

// istanbul ignore if
if (require.main === module)
    processCommandLine();
else
{
    makeArt.processCommandLine = processCommandLine;
    module.exports = makeArt;
}
