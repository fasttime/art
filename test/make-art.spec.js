/* eslint-env mocha */

'use strict';

const assert    = require('assert');
const fs        = require('fs');
const path      = require('path');
const sinon     = require('sinon');

let makeArt;

function isMissingPathError(obj)
{
    const result =
    Object.getPrototypeOf(obj) === Error.prototype && obj.message === 'missing output folder';
    return result;
}

function prepare()
{
    beforeEach
    (
        () =>
        {
            sinon.stub(fs, 'mkdirSync');
            sinon.stub(fs.promises, 'mkdir');
            sinon.stub(fs, 'readFileSync');
            sinon.stub(fs.promises, 'readFile');
            sinon.stub(fs, 'writeFileSync');
            sinon.stub(fs.promises, 'writeFile');
        },
    );

    afterEach(sinon.restore);
}

function verifyWriteFile({ args }, outDir)
{
    assert.strictEqual(args.length, 1);
    const [[actualTemplatePath, actualTemplate]] = args;
    const expectedTemplatePath = `${outDir}${path.sep}art.js`;
    assert.strictEqual(actualTemplatePath, expectedTemplatePath);
    assert.strictEqual(typeof actualTemplate, 'string');
}

function verifyWriteFileDTs({ args }, outDir)
{
    assert.strictEqual(args.length, 2);
    const [[actualTemplatePath1], [actualTemplatePath2]] = args;
    const expectedTemplatePathJs = `${outDir}${path.sep}art.js`;
    const expectedTemplatePathDTs = `${outDir}${path.sep}art.d.ts`;
    if
    (
        actualTemplatePath1 === expectedTemplatePathJs &&
        actualTemplatePath2 === expectedTemplatePathDTs ||
        actualTemplatePath1 === expectedTemplatePathDTs &&
        actualTemplatePath2 === expectedTemplatePathJs
    )
    {
        // OK
    }
    else
    {
        const message =
        `Expected writeFile to be called with first arguments '${expectedTemplatePathJs}' and ` +
        `'${expectedTemplatePathDTs}', but got '${actualTemplatePath1}' and ` +
        `'${actualTemplatePath2}'.`;
        assert.fail(message);
    }
    {
        const [[, actualTemplate]] = args;
        assert.strictEqual(typeof actualTemplate, 'string');
    }
    {
        const [, [, actualTemplate]] = args;
        assert.strictEqual(typeof actualTemplate, 'string');
    }
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
                const OUT_DIR = '\0art sync';

                fs.readFileSync.callThrough();
                makeArt(OUT_DIR);
                verifyWriteFile(fs.writeFileSync, OUT_DIR);
            },
        );

        it
        (
            'creates art.js and art.d.ts',
            () =>
            {
                const OUT_DIR = '\0art sync';

                fs.readFileSync.callThrough();
                makeArt(OUT_DIR, { dts: true });
                verifyWriteFileDTs(fs.writeFileSync, OUT_DIR);
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
    'makeArt.callback',
    () =>
    {
        prepare();

        it
        (
            'creates art.js with 2 arguments',
            done =>
            {
                const OUT_DIR = '\0art async';

                fs.promises.readFile.callThrough();
                makeArt.callback
                (
                    OUT_DIR,
                    actualError =>
                    {
                        verifyWriteFile(fs.promises.writeFile, OUT_DIR);
                        assert.strictEqual(actualError, null);
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
                const OUT_DIR = '\0art async';

                fs.promises.readFile.callThrough();
                makeArt.callback
                (
                    OUT_DIR,
                    null,
                    actualError =>
                    {
                        verifyWriteFile(fs.promises.writeFile, OUT_DIR);
                        assert.strictEqual(actualError, null);
                        done();
                    },
                );
            },
        );

        it
        (
            'creates art.js and art.d.ts',
            done =>
            {
                const OUT_DIR = '\0art async';

                fs.promises.readFile.callThrough();
                makeArt.callback
                (
                    OUT_DIR,
                    { dts: true },
                    actualError =>
                    {
                        verifyWriteFileDTs(fs.promises.writeFile, OUT_DIR);
                        assert.strictEqual(actualError, null);
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
                assert.throws(makeArt.callback, isMissingPathError);
                sinon.assert.notCalled(fs.promises.readFile);
                sinon.assert.notCalled(fs.promises.writeFile);
            },
        );

        it
        (
            'fails for missing callback',
            () =>
            {
                assert.throws(() => makeArt.callback('test'), TypeError);
                sinon.assert.notCalled(fs.promises.readFile);
                sinon.assert.notCalled(fs.promises.writeFile);
            },
        );

        it
        (
            'fails on read error',
            done =>
            {
                const expectedError = Error();
                fs.promises.readFile.throws(expectedError);
                makeArt.callback
                (
                    'test',
                    null,
                    actualError =>
                    {
                        sinon.assert.notCalled(fs.promises.writeFile);
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
                fs.promises.readFile.callThrough();
                fs.promises.writeFile.throws(expectedError);
                makeArt.callback
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
                const OUT_DIR = '\0art promise';

                fs.promises.readFile.callThrough();
                await makeArt.promise(OUT_DIR);
                verifyWriteFile(fs.promises.writeFile, OUT_DIR);
            },
        );

        it
        (
            'creates art.js and art.d.ts',
            async () =>
            {
                const OUT_DIR = '\0art promise';

                fs.promises.readFile.callThrough();
                await makeArt.promise(OUT_DIR, { dts: true });
                verifyWriteFileDTs(fs.promises.writeFile, OUT_DIR);
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
                const OUT_DIR = '\0art main';

                fs.readFileSync.callThrough();
                callProcessCommandLine([, , OUT_DIR, 'foo', 'bar.baz', 'bar']);
                verifyWriteFile(fs.writeFileSync, OUT_DIR);
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
                sinon.assert.calledWith(console.error, 'missing output folder');
            },
        );
    },
);
