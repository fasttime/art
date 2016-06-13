/* eslint-env browser */

(function ()
{
    'use strict';
    
    /**
     * Creates or modifies a node.
     *
     * @function art
     *
     * @param target
     * A node, a function returning a node, or a string specifying the type of element to be created
     * using `document.createElement()`.
     *
     * @param {...*} [args]
     * Each additional argument may be a node to be appended to the taget node, a function to be
     * called with the target node as its only argument, an object whose properties shall be
     * assigned to the taget node, or a string of text to be appended to the target node.
     * Note that `null` and `undefined` arguments are simply ignored.
     *
     * @returns {Node} The node specified by the target.
     */
    
    function art(target)
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
    }
    
    function deepAssign(target, source)
    {
        Object.keys(source).forEach(
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
     * Returns a callback that can be used to attach a listener to the target node in a call to
     * {@link art `art()`}.
     * The arguments are the same as in `EventTarget.addEventListener()`.
     *
     * @function art.on
     *
     * @param type
     * @param listener
     * @param useCapture
     *
     * @returns {function}
     */
    
    art.on =
        function (type, listener, useCapture)
        {
            function addEventListener(target)
            {
                target.addEventListener(type, listener, useCapture);
            }
            
            return addEventListener;
        };
    
    window.art = art;
}
)();
