<a name="art"></a>

## art(target, [...args]) ⇒ <code>Node</code>
Creates or modifies a node.

**Kind**: global function  
**Returns**: <code>Node</code> - The node specified by the target.  

| Param | Type | Description |
| --- | --- | --- |
| target |  | A node, a function returning a node, or a string specifying the type of element to be created using `document.createElement()`. |
| [...args] | <code>\*</code> | Each additional argument may be a node to be appended to the taget node, a function to be called with the target node as its only argument, an object whose properties shall be assigned to the taget node, or a string of text to be appended to the target node. Note that `null` and `undefined` arguments are simply ignored. |


* [art(target, [...args])](#art) ⇒ <code>Node</code>
    * [.on(type, listener, useCapture)](#art.on) ⇒ <code>function</code>
    * [.css(selector, ruleObj)](#art.css)
        * [.keyframes(identifier, ruleObj)](#art.css.keyframes)

<a name="art.on"></a>

### art.on(type, listener, useCapture) ⇒ <code>function</code>
Returns a callback that can be used to attach a listener to the target node in a call to
[`art()`](#art).
The arguments are the same as in `EventTarget.addEventListener()`, except that the
argument `type` may be an array specifying multiple event types.

**Kind**: static method of <code>[art](#art)</code>  

| Param | Description |
| --- | --- |
| type | A string or array of strings specifing the event types to listen for. |
| listener |  |
| useCapture |  |

<a name="art.css"></a>

### art.css(selector, ruleObj)
Creates a new CSS rule and adds it to the document.

**Kind**: static method of <code>[art](#art)</code>  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>string</code> | The selector of the new rule. |
| ruleObj | <code>object</code> | A rule definition object mapping style names to their respective values. |

<a name="art.css.keyframes"></a>

#### css.keyframes(identifier, ruleObj)
Creates a new CSS keyframes rule and adds it to the document.

**Kind**: static method of <code>[css](#art.css)</code>  

| Param | Type | Description |
| --- | --- | --- |
| identifier | <code>string</code> | The new keyframes rule identifier. |
| ruleObj | <code>object</code> | An object mapping selectors to rule definition objects. Rule definition objects map style names to their respective values. |

