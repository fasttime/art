/* eslint-env mocha */
/* global CSSRule, HTMLElement, art, document, expect, module, require, self, window */

'use strict';

(function ()
{
    function assertMatch(actual, expected)
    {
        var matches = actual.match(expected);
        expect(matches).toBeTruthy(actual + ' not matched by ' + expected);
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
                    'has an empty name',
                    function ()
                    {
                        expect(art.name).toBeFalsy();
                    }
                );
                it
                (
                    'creates an HTML element',
                    function ()
                    {
                        var input = art('INPUT');
                        expect(input instanceof HTMLElement).toBeTruthy();
                    }
                );
                it
                (
                    'returns the target',
                    function ()
                    {
                        var node = art(document);
                        expect(node).toEqual(document);
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
                        expect(actual).toBe(expected);
                        expect(target.calls[0].this).toBe(art);
                        expect(target.calls[0].args.length).toBe(0);
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
                        expect(p.textContent).toBe(text1 + text2);
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
                        expect(Array.prototype.slice.call(p.children)).toEqual([node1, node2]);
                    }
                );
                it
                (
                    'calls function arguments in a specific order',
                    function ()
                    {
                        function fn1(arg)
                        {
                            expect(this).toBe(art);
                            expect(arg).toBe(document);
                            expect(arguments.length).toBe(1);
                            calls.push(fn1);
                        }

                        function fn2(arg)
                        {
                            expect(this).toBe(art);
                            expect(arg).toBe(document);
                            expect(arguments.length).toBe(1);
                            calls.push(fn2);
                        }

                        var calls = [];
                        art(document, fn1, fn2);
                        expect(calls).toEqual([fn1, fn2]);
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
                                expect(input.value).toBe('bar');
                            }
                        );
                        it
                        (
                            'even if missing in the target',
                            function ()
                            {
                                var div = art('DIV', { 'data-id': 12345 });
                                expect(div['data-id']).toBe(12345);
                            }
                        );
                        it
                        (
                            'but not inherited source properties',
                            function ()
                            {
                                var source = Object.create({ a: 1 });
                                var div = art('DIV', source);
                                expect('a' in div).toBeFalsy();
                            }
                        );
                        it
                        (
                            'branching into source object value type properties',
                            function ()
                            {
                                var div =  art('DIV', { style: { color: 'red' } });
                                expect(div.style.color).toBe('red');
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
                                expect(descriptor.get).toBe(getter);
                            }
                        );
                    }
                );
                it
                (
                    'ignores null or undefined attributes',
                    function ()
                    {
                        art('SCRIPT', undefined, null);
                    }
                );
                it
                (
                    'does not traverse null or undefined property values in source objects',
                    function ()
                    {
                        var script = art('SCRIPT', { prop1: undefined, prop2: null });
                        expect(script.prop1).toBe(undefined);
                        expect(script.prop2).toBe(null);
                    }
                );
                (document.all !== undefined ? it : it.skip)
                (
                    'traverses document.all attributes',
                    function ()
                    {
                        var span = art('SPAN', document.all);
                        expect(span[0]).toBe(document.all[0]);
                    }
                );
                (document.all !== undefined ? it : it.skip)
                (
                    'traverses document.all property values in source objects',
                    function ()
                    {
                        var span = art('SPAN', { prop: document.all });
                        expect(span.prop[0]).toBe(document.all[0]);
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
                    'has an empty name',
                    function ()
                    {
                        expect(art.on.name).toBeFalsy();
                    }
                );
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
                        expect(listener.calls[0].args[0]).toBe(evt);
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
                        expect(handleEvent.calls[0].args[0]).toBe(evt);
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
                        expect(listener.calls[0].args[0]).toBe(evt0);
                        expect(listener.calls[1].args[0]).toBe(evt1);
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
                    'has an empty name',
                    function ()
                    {
                        expect(art.off.name).toBeFalsy();
                    }
                );
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
                        expect(listener.calls.length).toBe(0);
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
                        expect(handleEvent.calls.length).toBe(0);
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
                        expect(handleEvent.calls.length).toBe(0);
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
                    'has an empty name',
                    function ()
                    {
                        expect(art.css.name).toBeFalsy();
                    }
                );
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
                        expect(styles[0]).toMatch(/^color: red$/);
                        expect(styles[1]).toMatch(/^width: 0(?:px)?$/);
                        expect(cssRule.type).toEqual(CSSRule.STYLE_RULE);
                    }
                );
            }
        );

        describe
        (
            'art.css.keyframes',
            function ()
            {
                it
                (
                    'has an empty name',
                    function ()
                    {
                        expect(art.css.keyframes.name).toBeFalsy();
                    }
                );

                (CSSRule.KEYFRAME_RULE || CSSRule.WEBKIT_KEYFRAME_RULE ? it : it.skip)
                (
                    'adds a keyframes CSS rules',
                    function ()
                    {
                        var actual =
                        art.css.keyframes
                        ('art-test', { from: { color: 'red' }, to: { color: 'blue' } });
                        expect(actual).toBe(true);
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
                        expect(matches[1]).toMatch(RegExp(pattern));
                        var cssRuleType = cssRule.type;
                        expect
                        (
                            cssRuleType === CSSRule.KEYFRAME_RULE ||
                            cssRuleType ===
                            (CSSRule.KEYFRAMES_RULE || CSSRule.WEBKIT_KEYFRAMES_RULE)
                        )
                        .toBeTruthy();
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
                        expect(actual).toBe(false);
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
    var ART_PATH = '../dist/art.js';
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
