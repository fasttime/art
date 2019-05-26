/* eslint-env mocha */

'use strict';

const assert    = require('assert');
const fs        = require('fs');
const sinon     = require('sinon');

let makeArt;

function isMissingPathError(obj)
{
    const result = Object.getPrototypeOf(obj) === Error.prototype && obj.message === 'missing path';
    return result;
}

function prepare()
{
    beforeEach
    (
        () =>
        {
            sinon.stub(fs, 'readFile');
            sinon.stub(fs, 'readFileSync');
            sinon.stub(fs.promises, 'readFile');
            sinon.stub(fs, 'writeFile');
            sinon.stub(fs, 'writeFileSync');
            sinon.stub(fs.promises, 'writeFile');
        },
    );

    afterEach(sinon.restore);
}

before
(
    () =>
    {
        makeArt = require('../make-art');
    },
);

describe
(
    'makeArt',
    () =>
    {
        prepare();

        it
        (
            'creates art.js',
            () =>
            {
                fs.readFileSync.callThrough();
                const expectedPath = 'test';
                makeArt(expectedPath);
                const [[actualPath, actualData]] = fs.writeFileSync.args;
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
                sinon.assert.notCalled(fs.readFileSync);
                sinon.assert.notCalled(fs.writeFileSync);
            },
        );
    },
);

describe
(
    'makeArt.async',
    () =>
    {
        prepare();

        it
        (
            'creates art.js with 2 arguments',
            done =>
            {
                fs.readFile.callThrough();
                fs.writeFile.yieldsRight();
                const expectedPath = 'test';
                makeArt.async
                (
                    expectedPath,
                    actualError =>
                    {
                        const [[actualPath, actualData]] = fs.writeFile.args;
                        assert.strictEqual(actualPath, expectedPath);
                        assert.equal(typeof actualData, 'string');
                        assert.equal(actualError, null);
                        done();
                    },
                );
            },
        );

        it
        (
            'creates art.js with 3 arguments',
            done =>
            {
                fs.readFile.callThrough();
                fs.writeFile.yieldsRight();
                const expectedPath = 'test';
                makeArt.async
                (
                    expectedPath,
                    null,
                    actualError =>
                    {
                        const [[actualPath, actualData]] = fs.writeFile.args;
                        assert.strictEqual(actualPath, expectedPath);
                        assert.equal(typeof actualData, 'string');
                        assert.equal(actualError, null);
                        done();
                    },
                );
            },
        );

        it
        (
            'fails for missing path',
            () =>
            {
                assert.throws(makeArt.async, isMissingPathError);
                sinon.assert.notCalled(fs.readFile);
                sinon.assert.notCalled(fs.writeFile);
            },
        );

        it
        (
            'fails for missing callback',
            () =>
            {
                assert.throws(() => makeArt.async('test'), TypeError);
                sinon.assert.notCalled(fs.readFile);
                sinon.assert.notCalled(fs.writeFile);
            },
        );

        it
        (
            'fails on read error',
            done =>
            {
                const expectedError = Error();
                fs.readFile.yieldsRight(expectedError);
                makeArt.async
                (
                    'test',
                    null,
                    actualError =>
                    {
                        sinon.assert.notCalled(fs.writeFile);
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
                fs.readFile.callThrough();
                fs.writeFile.throws(expectedError);
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
    'makeArt.promise',
    () =>
    {
        prepare();

        it
        (
            'creates art.js',
            async () =>
            {
                fs.promises.readFile.callThrough();
                fs.promises.writeFile.resolves();
                const expectedPath = 'test';
                await makeArt.promise(expectedPath);
                const [[actualPath, actualData]] = fs.promises.writeFile.args;
                assert.strictEqual(actualPath, expectedPath);
                assert.equal(typeof actualData, 'string');
            },
        );

        it
        (
            'fails for missing path',
            async () =>
            {
                await assert.rejects(makeArt.promise, isMissingPathError);
                sinon.assert.notCalled(fs.promises.readFile);
                sinon.assert.notCalled(fs.promises.writeFile);
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
            sinon.stub(process, 'argv').value(newProcessArgv);
            makeArt.processCommandLine();
        }

        prepare();

        beforeEach(() => sinon.stub(console, 'error'));

        it
        (
            'creates art.js',
            () =>
            {
                fs.readFileSync.callThrough();
                const expectedPath = 'test';
                callProcessCommandLine([, , expectedPath, 'foo', 'bar.baz', 'bar']);
                const [[actualPath, data]] = fs.writeFileSync.args;
                assert.strictEqual(actualPath, expectedPath);
                assert.equal(typeof data, 'string');
                sinon.assert.notCalled(console.error);
            },
        );

        it
        (
            'fails for missing path',
            () =>
            {
                callProcessCommandLine([]);
                sinon.assert.notCalled(fs.readFileSync);
                sinon.assert.notCalled(fs.writeFileSync);
                sinon.assert.calledWith(console.error, 'missing path');
            },
        );
    },
);
