/* eslint-env mocha */
/* global HTMLElement, art, assert, document, module, self */

(function ()
{
    'use strict';
    
    function init()
    {
        describe(
            'art',
            function ()
            {
                it(
                    'creates an HTML element',
                    function ()
                    {
                        var input = art('INPUT');
                        assert(input instanceof HTMLElement);
                    }
                );
                it(
                    'returns the target',
                    function ()
                    {
                        var node = art(document);
                        assert.equal(node, document);
                    }
                );
                it(
                    'returns the result of the target function',
                    function ()
                    {
                        var expected = document;
                        var target =
                            function ()
                            {
                                assert.strictEqual(this, art);
                                assert.strictEqual(arguments.length, 0);
                                return expected;
                            };
                        var actual = art(target);
                        assert.strictEqual(actual, expected);
                    }
                );
                it(
                    'appends text arguments in a specific order',
                    function ()
                    {
                        var text1 = 'Hello,';
                        var text2 = ' art!';
                        var p = document.createElement('P');
                        art(p, text1, text2);
                        assert.strictEqual(p.textContent, text1 + text2);
                    }
                );
                it(
                    'appends node arguments in a specific order',
                    function ()
                    {
                        var node1 = document.createElement('A');
                        var node2 = document.createElement('B');
                        var p = document.createElement('P');
                        art(p, node1, node2);
                        assert.deepEqual(Array.prototype.slice.call(p.children), [node1, node2]);
                    }
                );
                it(
                    'calls function arguments in a specific order',
                    function ()
                    {
                        function fn1(arg)
                        {
                            assert.strictEqual(this, art);
                            assert.strictEqual(arg, document);
                            assert.strictEqual(arguments.length, 1);
                            calls.push(fn1);
                        }
                        
                        function fn2(arg)
                        {
                            assert.strictEqual(this, art);
                            assert.strictEqual(arg, document);
                            assert.strictEqual(arguments.length, 1);
                            calls.push(fn2);
                        }
                        
                        var calls = [];
                        art(document, fn1, fn2);
                        assert.deepEqual(calls, [fn1, fn2]);
                    }
                );
                describe(
                    'imports properties from object arguments',
                    function ()
                    {
                        it(
                            'in a specific order',
                            function ()
                            {
                                var input = art('INPUT', { value: 'foo' }, { value: 'bar' });
                                assert.strictEqual(input.value, 'bar');
                            }
                        );
                        it(
                            'even if missing in the target',
                            function ()
                            {
                                var div = art('DIV', { 'data-id': 12345 });
                                assert.strictEqual(div['data-id'], 12345);
                            }
                        );
                        it(
                            'but not inherited source properties',
                            function ()
                            {
                                var source = Object.create({ a: 1 });
                                var div = art('DIV', source);
                                assert(!('a' in div));
                            }
                        );
                        it(
                            'branching into source object value type properties',
                            function ()
                            {
                                var div =  art('DIV', { style: { color: 'red' } });
                                assert.strictEqual(div.style.color, 'red');
                            }
                        );
                        it(
                            'not branching into source object get/set type properties',
                            function ()
                            {
                                var getter = Function();
                                var source =
                                    Object.create(
                                        null,
                                        { prop: { enumerable: true, get: getter } }
                                    );
                                var div = art('DIV', source);
                                var descriptor = Object.getOwnPropertyDescriptor(div, 'prop');
                                assert.strictEqual(descriptor.get, getter);
                            }
                        );
                    }
                );
                it(
                    'ignores null or undefined arguments',
                    function ()
                    {
                        art('SCRIPT', void 0, null);
                    }
                );
            }
        );
        describe(
            'art.on',
            function ()
            {
                it(
                    'registers a listener',
                    function ()
                    {
                        var dispatched = false;
                        var input = document.createElement('INPUT');
                        art(
                            input,
                            art.on(
                                'input',
                                function ()
                                {
                                    dispatched = true;
                                }
                            )
                        );
                        var evt = document.createEvent('UIEvent');
                        evt.initEvent('input', true, false);
                        input.dispatchEvent(evt);
                        assert(dispatched);
                    }
                );
            }
        );
    }
    
    var TestSuite = { init: init };
    
    if (typeof self !== 'undefined')
        self.TestSuite = TestSuite;
    if (typeof module !== 'undefined')
        module.exports = TestSuite;
}
)();
