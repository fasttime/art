/* eslint-env mocha */
/* global CSSRule, HTMLElement, art, assert, document, module, require, self, window */

'use strict';

(function ()
{
    function assertMatch(actual, expected)
    {
        var matches = actual.match(expected);
        assert(matches, actual + ' not matched by ' + expected);
        return matches;
    }

    function createCaptor(result)
    {
        function captor()
        {
            calls.push({ args: arguments, this: this });
            return result;
        }

        var calls = captor.calls = [];
        return captor;
    }

    function init()
    {
        describe
        (
            'art',
            function ()
            {
                it
                (
                    'creates an HTML element',
                    function ()
                    {
                        var input = art('INPUT');
                        assert(input instanceof HTMLElement);
                    }
                );
                it
                (
                    'returns the target',
                    function ()
                    {
                        var node = art(document);
                        assert.equal(node, document);
                    }
                );
                it
                (
                    'returns the result of the target function',
                    function ()
                    {
                        var expected = document;
                        var target = createCaptor(expected);
                        var actual = art(target);
                        assert.strictEqual(actual, expected);
                        assert.strictEqual(target.calls[0].this, art);
                        assert.equal(target.calls[0].args.length, 0);
                    }
                );
                it
                (
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
                it
                (
                    'appends node arguments in a specific order',
                    function ()
                    {
                        var node1 = document.createElement('A');
                        var node2 = document.createElement('B');
                        var p = document.createElement('P');
                        art(p, node1, node2);
                        assert.deepStrictEqual
                        (Array.prototype.slice.call(p.children), [node1, node2]);
                    }
                );
                it
                (
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
                        assert.deepStrictEqual(calls, [fn1, fn2]);
                    }
                );

                describe
                (
                    'imports properties from object arguments',
                    function ()
                    {
                        it
                        (
                            'in a specific order',
                            function ()
                            {
                                var input = art('INPUT', { value: 'foo' }, { value: 'bar' });
                                assert.strictEqual(input.value, 'bar');
                            }
                        );
                        it
                        (
                            'even if missing in the target',
                            function ()
                            {
                                var div = art('DIV', { 'data-id': 12345 });
                                assert.strictEqual(div['data-id'], 12345);
                            }
                        );
                        it
                        (
                            'but not inherited source properties',
                            function ()
                            {
                                var source = Object.create({ a: 1 });
                                var div = art('DIV', source);
                                assert(!('a' in div));
                            }
                        );
                        it
                        (
                            'branching into source object value type properties',
                            function ()
                            {
                                var div =  art('DIV', { style: { color: 'red' } });
                                assert.strictEqual(div.style.color, 'red');
                            }
                        );
                        it
                        (
                            'not branching into source object get/set type properties',
                            function ()
                            {
                                var getter = Function();
                                var source =
                                Object.create(null, { prop: { enumerable: true, get: getter } });
                                var div = art('DIV', source);
                                var descriptor = Object.getOwnPropertyDescriptor(div, 'prop');
                                assert.strictEqual(descriptor.get, getter);
                            }
                        );
                    }
                );
                it
                (
                    'ignores null or undefined arguments',
                    function ()
                    {
                        art('SCRIPT', undefined, null);
                    }
                );
                (document.all !== undefined ? it : it.skip)
                (
                    'ignores document.all arguments',
                    function ()
                    {
                        var span = art('SPAN', document.all);
                        assert.strictEqual(span[0], undefined);
                    }
                );
            }
        );

        describe
        (
            'art.on',
            function ()
            {
                it
                (
                    'registers a listener function',
                    function ()
                    {
                        var input = document.createElement('INPUT');
                        var listener = createCaptor();
                        art(input, art.on('input', listener));
                        var evt = document.createEvent('UIEvent');
                        evt.initEvent('input', true, false);
                        input.dispatchEvent(evt);
                        assert.strictEqual(listener.calls[0].args[0], evt);
                    }
                );
                it
                (
                    'registers a listener object',
                    function ()
                    {
                        var input = document.createElement('INPUT');
                        var handleEvent = createCaptor();
                        art(input, art.on('input', { handleEvent: handleEvent }));
                        var evt = document.createEvent('UIEvent');
                        evt.initEvent('input', true, false);
                        input.dispatchEvent(evt);
                        assert.strictEqual(handleEvent.calls[0].args[0], evt);
                    }
                );
                it
                (
                    'registers several listeners',
                    function ()
                    {
                        function fireEvent(evtInterface, evtType)
                        {
                            var evt = document.createEvent(evtInterface);
                            evt.initEvent(evtType, true, true);
                            div.dispatchEvent(evt);
                            return evt;
                        }

                        var div = document.createElement('DIV');
                        var listener = createCaptor();
                        art(div, art.on(['mousedown', 'touchstart'], listener));
                        var evt0 = fireEvent('MouseEvent', 'mousedown');
                        var evt1 = fireEvent('Event', 'touchstart');
                        assert.strictEqual(listener.calls[0].args[0], evt0);
                        assert.strictEqual(listener.calls[1].args[0], evt1);
                    }
                );
            }
        );

        describe
        (
            'art.off',
            function ()
            {
                it
                (
                    'unregisters a listener function',
                    function ()
                    {
                        var input = document.createElement('INPUT');
                        var listener = createCaptor();
                        art(input, art.on('input', listener), art.off('input', listener));
                        var evt = document.createEvent('UIEvent');
                        evt.initEvent('input', true, false);
                        input.dispatchEvent(evt);
                        assert.equal(listener.calls.length, 0);
                    }
                );
                it
                (
                    'unregisters a listener object',
                    function ()
                    {
                        var input = document.createElement('INPUT');
                        var handleEvent = createCaptor();
                        var listener = { handleEvent: handleEvent };
                        art(input, art.on('input', listener), art.off('input', listener));
                        var evt = document.createEvent('UIEvent');
                        evt.initEvent('input', true, false);
                        input.dispatchEvent(evt);
                        assert.equal(handleEvent.calls.length, 0);
                    }
                );
                it
                (
                    'unregisters several listeners',
                    function ()
                    {
                        function fireEvent(evtInterface, evtType)
                        {
                            var evt = document.createEvent(evtInterface);
                            evt.initEvent(evtType, true, true);
                            div.dispatchEvent(evt);
                        }

                        var div = document.createElement('DIV');
                        var handleEvent = createCaptor();
                        var listener = { handleEvent: handleEvent };
                        art
                        (
                            div,
                            art.on(['mousedown', 'touchstart'], listener),
                            art.off(['mousedown', 'touchstart'], listener)
                        );
                        fireEvent('MouseEvent', 'mousedown');
                        fireEvent('Event', 'touchstart');
                        assert.equal(handleEvent.calls.length, 0);
                    }
                );
            }
        );

        describe
        (
            'art.css',
            function ()
            {
                it
                (
                    'adds a style CSS rule',
                    function ()
                    {
                        art.css('.art-test', { color: 'red', width: '0' });
                        var styleSheets = document.styleSheets;
                        var styleSheet = styleSheets[styleSheets.length - 1];
                        var cssRules = styleSheet.cssRules;
                        var cssRule = cssRules[cssRules.length - 1];
                        var matches =
                        assertMatch(cssRule.cssText, /^\.art-test \{ ?([\s\S]*?) ?\}$/);
                        var styles =
                        matches[1].split(/; ?/).filter
                        (
                            function (str)
                            {
                                return str;
                            }
                        )
                        .sort();
                        assertMatch(styles[0], /^color: red$/);
                        assertMatch(styles[1], /^width: 0(?:px)?$/);
                        assert.equal(cssRule.type, CSSRule.STYLE_RULE);
                    }
                );
            }
        );

        describe
        (
            'art.css.keyframes',
            function ()
            {
                (CSSRule.KEYFRAME_RULE || CSSRule.WEBKIT_KEYFRAME_RULE ? it : it.skip)
                (
                    'adds a keyframes CSS rules',
                    function ()
                    {
                        var actual =
                        art.css.keyframes
                        ('art-test', { from: { color: 'red' }, to: { color: 'blue' } });
                        assert.strictEqual(actual, true);
                        var styleSheets = document.styleSheets;
                        var styleSheet = styleSheets[styleSheets.length - 1];
                        var cssRules = styleSheet.cssRules;
                        var cssRule = cssRules[cssRules.length - 1];
                        var matches =
                        assertMatch
                        (
                            cssRule.cssText,
                            /^@(?:-webkit-)?keyframes art-test \{\s*([\s\S]*?)\s*\}$/
                        );
                        var pattern =
                        '^(?:0%|from) \\{ ?color: red; ?\\}\\s*(?:100%|to) \\{ ?color: blue; ?\\}$';
                        assertMatch(matches[1], RegExp(pattern));
                        var cssRuleType = cssRule.type;
                        assert
                        (
                            cssRuleType === CSSRule.KEYFRAME_RULE ||
                            cssRuleType ===
                            (CSSRule.KEYFRAMES_RULE || CSSRule.WEBKIT_KEYFRAMES_RULE)
                        );
                    }
                );
                testKeyframeRule
                (
                    'does not add a keyframe css rule',
                    { },
                    function ()
                    {
                        var actual =
                        art.css.keyframes
                        ('art-test', { from: { color: 'red' }, to: { color: 'blue' } });
                        assert.strictEqual(actual, false);
                    }
                );
                testKeyframeRule
                (
                    'initializes correctly when only KEYFRAME_RULE exists',
                    { KEYFRAME_RULE: 8 },
                    Function()
                );
                testKeyframeRule
                (
                    'initializes correctly when only WEBKIT_KEYFRAME_RULE exists',
                    { WEBKIT_KEYFRAME_RULE: 8 },
                    Function()
                );
            }
        );
    }

    function testKeyframeRule(description, cssRule, fn)
    {
        it
        (
            description,
            function (done)
            {
                var descriptor = Object.getOwnPropertyDescriptor(window, 'CSSRule');
                window.CSSRule = cssRule;
                loadArt
                (
                    function (error)
                    {
                        try
                        {
                            if (!error)
                                fn();
                        }
                        catch (errorCaught)
                        {
                            error = errorCaught;
                        }
                        finally
                        {
                            delete window.CSSRule;
                            if (typeof CSSRule === 'undefined')
                                Object.defineProperty(window, 'CSSRule', descriptor);
                            loadArt(done.bind(null, error));
                        }
                    }
                );
            }
        );
    }

    var loadArt;
    var ART_PATH = '../art.js';
    if (typeof module !== 'undefined')
    {
        loadArt =
        function (done)
        {
            try
            {
                var path = require.resolve(ART_PATH);
                delete require.cache[path];
                require(path);
            }
            catch (error)
            {
                if (done)
                    done(error);
                return;
            }
            if (done)
                done();
        };
    }
    else
    {
        loadArt =
        function (done)
        {
            var script = document.querySelector('script[src="' + ART_PATH + '"]');
            if (script)
                script.parentNode.removeChild(script);
            script = document.createElement('script');
            if (done)
            {
                script.onload =
                function ()
                {
                    done();
                };
                script.onerror =
                function (evt)
                {
                    done(evt);
                };
            }
            script.src = ART_PATH;
            document.head.appendChild(script);
        };
    }

    var TestSuite = { init: init };

    if (typeof self !== 'undefined')
        self.TestSuite = TestSuite;
    if (typeof module !== 'undefined')
        module.exports = TestSuite;
}
)();
