    /**
     * Returns a callback that can be used to attach a listener to the target node in a call to
     * {@link art `art()`}.
     * The arguments are the same as in `EventTarget.addEventListener()`, except that the argument
     * `type` may be an array specifying multiple event types.
     *
     * @function art.on
     *
     * @requires art.on.js
     *
     * @param {string|string[]} type
     * A string or array of strings specifing the event types to listen for.
     *
     * @param {function|EventListener} listener
     * The event handler function to associate with the events.
     *
     * @param {boolean} useCapture
     * `true` to register the event for the capturing phase, or `false` to register the event for
     * the bubbling pahse.
     *
     * @returns {function}
     */
    
    art.on =
        function (type, listener, useCapture)
        {
            'use strict';
            
            function addEventListener(target)
            {
                function callback(type)
                {
                    target.addEventListener(type, listener, useCapture);
                }
                
                if (Array.isArray(type))
                    type.forEach(callback);
                else
                    callback(type);
            }
            
            return addEventListener;
        };
