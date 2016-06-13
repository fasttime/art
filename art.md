<a name="art"></a>

## art(target, [...args]) ⇒ <code>Node</code>
Creates or modifies a node.

**Kind**: global function  
**Returns**: <code>Node</code> - The node specified by the target.  

| Param | Type | Description |
| --- | --- | --- |
| target |  | A node, a function returning a node, or a string specifying the type of element to be created using `document.createElement()`. |
| [...args] | <code>\*</code> | Each additional argument may be a node to be appended to the taget node, a function to be called with the target node as its only argument, an object whose properties shall be assigned to the taget node, or a string of text to be appended to the target node. Note that `null` and `undefined` arguments are simply ignored. |

<a name="art.on"></a>

### art.on(type, listener, useCapture) ⇒ <code>function</code>
Returns a callback that can be used to attach a listener to the target node in a call to
[`art()`](#art).
The arguments are the same as in `EventTarget.addEventListener()`.

**Kind**: static method of <code>[art](#art)</code>  

| Param |
| --- |
| type | 
| listener | 
| useCapture | 

