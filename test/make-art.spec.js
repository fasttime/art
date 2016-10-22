/* eslint-env mocha, node */

'use strict';

var assert = require('assert');
var proxyquire = require('proxyquire');

var writeFileSyncArgs;
var makeArt =
    proxyquire(
        '../make-art',
        {
            fs:
            {
                writeFileSync: function ()
                {
                    writeFileSyncArgs = arguments;
                }
            }
        }
    );

afterEach(
    function ()
    {
        writeFileSyncArgs = void 0;
    }
);

describe(
    'makeArt',
    function ()
    {
        it(
            'creates art.js',
            function ()
            {
                var expectedPath = 'test';
                makeArt(expectedPath);
                var actualPath = writeFileSyncArgs[0];
                var actualData = writeFileSyncArgs[1];
                assert.strictEqual(actualPath, expectedPath);
                assert.equal(typeof actualData, 'string');
            }
        );
        it(
            'fails for missing path',
            function ()
            {
                assert.throws(makeArt, 'missing path');
                assert(!writeFileSyncArgs);
            }
        );
    }
);

describe(
    'processCommandLine',
    function ()
    {
        function callProcessCommandLine(newProcessArgv)
        {
            process.argv = newProcessArgv;
            makeArt.processCommandLine();
        }
        
        var consoleErrorArgs;
        var consoleError;
        var processArgv;
        
        beforeEach(
            function ()
            {
                consoleError = console.error;
                console.error =
                    function ()
                    {
                        consoleErrorArgs = arguments;
                    };
                processArgv = process.argv;
            }
        );
        
        afterEach(
            function ()
            {
                process.argv = processArgv;
                console.error = consoleError;
                consoleErrorArgs = void 0;
            }
        );
        
        it(
            'creates art.js',
            function ()
            {
                var expectedPath = 'test';
                callProcessCommandLine([, , expectedPath, 'foo', 'bar.baz']);
                var actualPath = writeFileSyncArgs[0];
                var data = writeFileSyncArgs[1];
                assert.strictEqual(actualPath, expectedPath);
                assert.equal(typeof data, 'string');
                assert.deepStrictEqual(consoleErrorArgs, void 0);
            }
        );
        it(
            'fails for missing path',
            function ()
            {
                callProcessCommandLine([]);
                assert.strictEqual(writeFileSyncArgs, void 0);
                assert.deepStrictEqual(Array.from(consoleErrorArgs), ['missing path']);
            }
        );
    }
);
