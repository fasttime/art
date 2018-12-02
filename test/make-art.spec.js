/* eslint-env mocha, node */

'use strict';

var assert = require('assert');
var proxyquire = require('proxyquire');

var readFileMock;
var writeFileArgs;
var writeFileMock;
var writeFileSyncArgs;
var makeArt =
proxyquire
(
    '../make-art',
    {
        fs:
        {
            readFile:
            function ()
            {
                readFileMock.apply(this, arguments);
            },
            writeFile:
            function ()
            {
                writeFileArgs = arguments;
                if (writeFileMock)
                    writeFileMock();
            },
            writeFileSync:
            function ()
            {
                writeFileSyncArgs = arguments;
            },
        },
    }
);

afterEach
(
    function ()
    {
        readFileMock = writeFileArgs = writeFileMock = writeFileSyncArgs = undefined;
    }
);

describe
(
    'makeArt',
    function ()
    {
        it
        (
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
        it
        (
            'fails for missing path',
            function ()
            {
                assert.throws(makeArt, Error('missing path'));
                assert(!writeFileSyncArgs);
            }
        );
    }
);

describe
(
    'makeArt.async',
    function ()
    {
        it
        (
            'creates art.js',
            function (done)
            {
                var expectedPath = 'test';
                var expectedCallback = Function();
                readFileMock =
                function (file, callback)
                {
                    callback(null, 'DATA');
                };
                writeFileMock =
                function ()
                {
                    var actualPath = writeFileArgs[0];
                    var actualData = writeFileArgs[1];
                    var actualCallback = writeFileArgs[2];
                    assert.strictEqual(actualPath, expectedPath);
                    assert.equal(typeof actualData, 'string');
                    assert.strictEqual(actualCallback, expectedCallback);
                    done();
                };
                makeArt.async(expectedPath, null, expectedCallback);
            }
        );
        it
        (
            'fails for missing path',
            function ()
            {
                assert.throws(makeArt.async, Error('missing path'));
                assert(!writeFileArgs);
            }
        );
        it
        (
            'fails on read error',
            function (done)
            {
                function makeArtAsyncCallback(actualError)
                {
                    assert.strictEqual(actualError, expectedError);
                    done();
                }

                var expectedError = Error();
                readFileMock =
                function (file, callback)
                {
                    callback(expectedError);
                };
                makeArt.async('test', null, makeArtAsyncCallback);
            }
        );
        it
        (
            'fails on write error',
            function (done)
            {
                function makeArtAsyncCallback(actualError)
                {
                    assert.strictEqual(actualError, expectedError);
                    done();
                }

                readFileMock =
                function (file, callback)
                {
                    callback(null, 'DATA');
                };
                var expectedError = Error();
                writeFileMock =
                function ()
                {
                    throw expectedError;
                };
                makeArt.async('test', null, makeArtAsyncCallback);
            }
        );
    }
);

describe
(
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

        beforeEach
        (
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

        afterEach
        (
            function ()
            {
                process.argv = processArgv;
                console.error = consoleError;
                consoleErrorArgs = undefined;
            }
        );

        it
        (
            'creates art.js',
            function ()
            {
                var expectedPath = 'test';
                callProcessCommandLine([, , expectedPath, 'foo', 'bar.baz']);
                var actualPath = writeFileSyncArgs[0];
                var data = writeFileSyncArgs[1];
                assert.strictEqual(actualPath, expectedPath);
                assert.equal(typeof data, 'string');
                assert.deepStrictEqual(consoleErrorArgs, undefined);
            }
        );
        it
        (
            'fails for missing path',
            function ()
            {
                callProcessCommandLine([]);
                assert.strictEqual(writeFileSyncArgs, undefined);
                assert.deepStrictEqual(Array.from(consoleErrorArgs), ['missing path']);
            }
        );
    }
);
