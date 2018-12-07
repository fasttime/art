(function ()
{
    'use strict';

    var ART = 'art';

    /**
     * Creates or modifies a node.
     *
     * @function art
     *
     * @param target
     * A node, a function returning a node, or a string specifying the type of element to be created
     * using `document.createElement()`.
     *
     * @param {...*} [arguments]
     * Each additional argument may be a node to be appended to the taget node, a function to be
     * called with the target node as its only argument, an object whose properties shall be
     * assigned to the taget node, or a string of text to be appended to the target node.
     * Note that `null` and `undefined` arguments are simply ignored.
     *
     * @returns {Node} The node specified by the target.
     */

    window[ART] =
    function (target)
    {
        var node;
        if (target instanceof Node)
            node = target;
        else if (typeof target === 'function')
            node = target.call(art);
        else
            node = document.createElement(target);
        var argCount = arguments.length;
        for (var index = 0; ++index < argCount;)
        {
            var arg = arguments[index];
            if (arg instanceof Node)
                node.appendChild(arg);
            else if (arg != null)
            {
                var type = typeof arg;
                if (type === 'object')
                    deepAssign(node, arg);
                else if (type === 'function')
                    arg.call(art, node);
                else
                    node.appendChild(document.createTextNode(arg));
            }
        }
        return node;
    };

    function deepAssign(target, source)
    {
        Object.keys(source).forEach
        (
            function (name)
            {
                var descriptor = Object.getOwnPropertyDescriptor(source, name);
                if ('value' in descriptor)
                {
                    var value = descriptor.value;
                    if (name in target && typeof value === 'object')
                        deepAssign(target[name], value);
                    else
                        target[name] = value;
                }
                else
                    Object.defineProperty(target, name, descriptor);
            }
        );
    }

    /**
     * Returns a callback that can be used to detach a listener from the target node in a call to
     * {@link art `art()`}.
     * The arguments are the same as in `EventTarget.removeEventListener()`, except that the
     * argument `type` may be an array specifying multiple event types.
     *
     * @function art.off
     *
     * @param {string|Array<string>} type
     * A string or array of strings specifing the event types listened for.
     *
     * @param {Function|EventListener} listener
     * The event handler to dissociate from the events.
     *
     * @param {boolean=} useCapture
     * `true` to unregister the events for the capturing phase, or `false` to unregister the events
     * for the bubbling phase.
     *
     * @returns {Function}
     */

    art.off =
    function (type, listener, useCapture)
    {
        var processEventListener =
        createProcessEventListener(type, listener, useCapture, 'removeEventListener');
        return processEventListener;
    };

    /**
     * Returns a callback that can be used to attach a listener to the target node in a call to
     * {@link art `art()`}.
     * The arguments are the same as in `EventTarget.addEventListener()`, except that the argument
     * `type` may be an array specifying multiple event types.
     *
     * @function art.on
     *
     * @param {string|Array<string>} type
     * A string or array of strings specifing the event types to listen for.
     *
     * @param {Function|EventListener} listener
     * The event handler to associate with the events.
     *
     * @param {boolean=} useCapture
     * `true` to register the events for the capturing phase, or `false` to register the events for
     * the bubbling phase.
     *
     * @returns {Function}
     */

    art.on =
    function (type, listener, useCapture)
    {
        var processEventListener =
        createProcessEventListener(type, listener, useCapture, 'addEventListener');
        return processEventListener;
    };

    function createProcessEventListener(type, listener, useCapture, methodName)
    {
        function processEventListener(target)
        {
            function callback(thisType)
            {
                target[methodName](thisType, listener, useCapture);
            }

            if (Array.isArray(type))
                type.forEach(callback);
            else
                callback(type);
        }

        return processEventListener;
    }

    /**
     * Creates a new CSS rule and adds it to the document.
     *
     * @function art.css
     *
     * @param {string} selector
     * The selector of the new rule.
     *
     * @param {Object} ruleObj
     * A rule definition object mapping style names to their respective values.
     */

    art.css =
    function (selector, ruleObj)
    {
        var ruleStr = formatRule(selector, ruleObj);
        addRule(ruleStr);
    };

    /**
     * Creates a new CSS keyframes rule and adds it to the document.
     *
     * @function art.css.keyframes
     *
     * @param {string} identifier
     * The new keyframes rule identifier.
     *
     * @param {Object} ruleObj
     * An object mapping selectors to rule definition objects.
     * Rule definition objects map style names to their respective values.
     *
     * @returns {boolean} `true` on success; otherwise, `false`.
     */

    art.css.keyframes =
    (function ()
    {
        var ruleStrBase;
        var keyframes;
        if (CSSRule.KEYFRAME_RULE)
            ruleStrBase = '@';
        else if (CSSRule.WEBKIT_KEYFRAME_RULE)
            ruleStrBase = '@-webkit-';
        else
        {
            keyframes =
            function (identifier, ruleObj) // eslint-disable-line no-unused-vars
            {
                return false;
            };
            return keyframes;
        }
        ruleStrBase += 'keyframes ';
        keyframes =
        function (identifier, ruleObj)
        {
            var ruleDefs = createRuleDefs(ruleObj, formatRule);
            var ruleStr = ruleStrBase + identifier + '{' + ruleDefs.join('') + '}';
            addRule(ruleStr);
            return true;
        };
        return keyframes;
    }
    )();

    function addRule(ruleStr)
    {
        if (!styleSheet)
        {
            var style = art('STYLE');
            art(document.head, style);
            styleSheet = style.sheet;
        }
        styleSheet.insertRule(ruleStr, styleSheet.cssRules.length);
    }

    function createRuleDefs(ruleObj, callback)
    {
        var ruleDefs =
        Object.keys(ruleObj).map
        (
            function (ruleName)
            {
                var ruleValue = ruleObj[ruleName];
                var ruleDef = callback(ruleName, ruleValue);
                return ruleDef;
            }
        );
        return ruleDefs;
    }

    function formatRule(selector, ruleObj)
    {
        var ruleDefs =
        createRuleDefs
        (
            ruleObj,
            function (ruleName, ruleValue)
            {
                var ruleDef = ruleName + ':' + ruleValue;
                return ruleDef;
            }
        );
        var ruleStr = selector + '{' + ruleDefs.join(';') + '}';
        return ruleStr;
    }

    var styleSheet;
}
)();
