/* eslint-env mocha */

'use strict';

const assert = require('assert');
const proxyquire = require('proxyquire');
const { promisify } = require('util');

let readFileMock;
let writeFileArgs;
let writeFileMock;
let writeFileSyncArgs;
const makeArt =
proxyquire
(
    '../make-art',
    {
        fs:
        {
            readFile(...args)
            {
                readFileMock.apply(this, args);
            },
            writeFile(...args)
            {
                writeFileArgs = args;
                if (writeFileMock)
                    writeFileMock(...args);
            },
            writeFileSync(...args)
            {
                writeFileSyncArgs = args;
            },
        },
    },
);

afterEach
(
    () =>
    {
        readFileMock = writeFileArgs = writeFileMock = writeFileSyncArgs = undefined;
    },
);

describe
(
    'makeArt',
    () =>
    {
        it
        (
            'creates art.js',
            () =>
            {
                const expectedPath = 'test';
                makeArt(expectedPath);
                const [actualPath, actualData] = writeFileSyncArgs;
                assert.strictEqual(actualPath, expectedPath);
                assert.equal(typeof actualData, 'string');
            },
        );
        it
        (
            'fails for missing path',
            () =>
            {
                assert.throws(makeArt, isMissingPathError);
                assert(!writeFileSyncArgs);
            },
        );
    },
);

describe
(
    'makeArt.async',
    () =>
    {
        it
        (
            'creates art.js with 2 arguments',
            async () =>
            {
                const expectedPath = 'test';
                readFileMock = (file, callback) => callback(null);
                writeFileMock = (file, data, callback) => callback(null);
                await promisify(makeArt.async)(expectedPath);
                const [actualPath, actualData] = writeFileArgs;
                assert.strictEqual(actualPath, expectedPath);
                assert.equal(typeof actualData, 'string');
            },
        );
        it
        (
            'creates art.js with 3 arguments',
            async () =>
            {
                const expectedPath = 'test';
                readFileMock = (file, callback) => callback(null);
                writeFileMock = (file, data, callback) => callback(null);
                await promisify(makeArt.async)(expectedPath, null);
                const [actualPath, actualData] = writeFileArgs;
                assert.strictEqual(actualPath, expectedPath);
                assert.equal(typeof actualData, 'string');
            },
        );
        it
        (
            'fails for missing path',
            () =>
            {
                assert.throws(makeArt.async, isMissingPathError);
                assert(!writeFileArgs);
            },
        );
        it
        (
            'fails on read error',
            done =>
            {
                const expectedError = Error();
                readFileMock = (file, callback) => callback(expectedError);
                makeArt.async
                (
                    'test',
                    null,
                    actualError =>
                    {
                        assert.strictEqual(actualError, expectedError);
                        done();
                    },
                );
            },
        );
        it
        (
            'fails on write error',
            done =>
            {
                const expectedError = Error();
                readFileMock = (file, callback) => callback(null, 'DATA');
                writeFileMock =
                () =>
                {
                    throw expectedError;
                };
                makeArt.async
                (
                    'test',
                    null,
                    actualError =>
                    {
                        assert.strictEqual(actualError, expectedError);
                        done();
                    },
                );
            },
        );
    },
);

describe
(
    'processCommandLine',
    () =>
    {
        function callProcessCommandLine(newProcessArgv)
        {
            process.argv = newProcessArgv;
            makeArt.processCommandLine();
        }

        let consoleErrorArgs;
        let consoleError;
        let processArgv;

        beforeEach
        (
            () =>
            {
                consoleError = console.error;
                console.error =
                (...args) =>
                {
                    consoleErrorArgs = args;
                };
                processArgv = process.argv;
            },
        );

        afterEach
        (
            () =>
            {
                process.argv = processArgv;
                console.error = consoleError;
                consoleErrorArgs = undefined;
            },
        );

        it
        (
            'creates art.js',
            () =>
            {
                const expectedPath = 'test';
                callProcessCommandLine([, , expectedPath, 'foo', 'bar.baz', 'bar']);
                const [actualPath, data] = writeFileSyncArgs;
                assert.strictEqual(actualPath, expectedPath);
                assert.equal(typeof data, 'string');
                assert.deepStrictEqual(consoleErrorArgs, undefined);
            },
        );
        it
        (
            'fails for missing path',
            () =>
            {
                callProcessCommandLine([]);
                assert.strictEqual(writeFileSyncArgs, undefined);
                assert.deepStrictEqual(consoleErrorArgs, ['missing path']);
            },
        );
    },
);

function isMissingPathError(obj)
{
    const result = Object.getPrototypeOf(obj) === Error.prototype && obj.message === 'missing path';
    return result;
}
