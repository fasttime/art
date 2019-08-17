interface RuleDefinitionObject { readonly [style: string]: string; }

interface art
{
    css: art_css;

    /**
     * Creates or modifies a node.
     *
     * @param target
     *
     * A node, a function returning a node, or a string specifying the type of element to be created
     * using <code>document.createElement()</code>.
     *
     * @param args
     *
     * Each additional argument may be a node to be appended to the taget node, a function to be
     * called with the target node as its only argument, an object whose properties shall be
     * assigned to the taget node, or a string of text to be appended to the target node.
     * Note that <code>null</code> and <code>undefined</code> arguments are simply ignored.
     *
     * @returns
     *
     * The node specified by the target parameter.
     */
    (
        target:
        | Node
        | ((this: art) => Node)
        | keyof (HTMLElementTagNameMap & HTMLElementDeprecatedTagNameMap),
        ...args:
        (
            | Node
            | ((this: art, target: Node) => never)
            | { readonly [key: string]: unknown; }
            | string
            | void
        )[],
    ):
    Node;

    /**
     * Returns a callback that can be used to detach a listener from the target node in a call to
     * `art`.
     * The arguments are the same as in `EventTarget.removeEventListener()`, except that the
     * argument `type` may be an array specifying multiple event types.
     *
     * @param type
     *
     * A string or array of strings specifing the event types listened for.
     *
     * @param listener
     *
     * The event handler to dissociate from the events.
     *
     * @param useCapture
     *
     * <code>true</code> to unregister the events for the capturing phase, or <code>false</code> to
     * unregister the events for the bubbling phase.
     * The default is <code>false</code>.
     */
    off
    (
        type: string | readonly string[],
        listener: EventListenerOrEventListenerObject | null,
        useCapture?: boolean,
    ):
    (target: Node) => never;

    /**
     * Returns a callback that can be used to attach a listener to the target node in a call to
     * `art`.
     * The arguments are the same as in `EventTarget.addEventListener()`, except that the argument
     * `type` may be an array specifying multiple event types.
     *
     * @param type
     *
     * A string or array of strings specifing the event types to listen for.
     *
     * @param listener
     *
     * The event handler to associate with the events.
     *
     * @param useCapture
     *
     * <code>true</code> to register the events for the capturing phase, or <code>false</code> to
     * register the events for the bubbling phase.
     * The default is <code>false</code>.
     */
    on
    (
        type: string | readonly string[],
        listener: EventListenerOrEventListenerObject | null,
        useCapture?: boolean,
    ):
    (target: Node) => never;
}

interface art_css
{
    /**
     * Creates a new CSS rule and adds it to the document.
     *
     * @param selectors
     *
     * The selector of the new rule.
     *
     * @param ruleObj
     *
     * A rule definition object mapping style names to their respective values.
     */
    (selectors: string, ruleObj: RuleDefinitionObject): undefined;

    /**
     * Creates a new CSS keyframes rule and adds it to the document.
     *
     * @param identifier
     *
     * The new keyframes rule identifier.
     *
     * @param ruleObjMap
     *
     * An object mapping selectors to rule definition objects.
     * Rule definition objects map style names to their respective values.
     *
     * @returns
     *
     * `true` on success; otherwise, `false`.
     */
    keyframes
    (identifier: string, ruleObjMap: { readonly [selectors: string]: RuleDefinitionObject; }):
    boolean;
}

declare let art: art;
