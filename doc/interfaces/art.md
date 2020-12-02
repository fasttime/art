**[art](../README.md)**

# Interface: art

## Hierarchy

* **art**

## Callable

▸ (`target`: Node \| (this: [art](art.md)) => Node \| keyof HTMLElementTagNameMap & HTMLElementDeprecatedTagNameMap, ...`args`: (Node \| (this: [art](art.md), target: Node) => never \| { [key:string]: unknown;  } \| string \| void)[]): Node

Creates or modifies a node.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`target` | Node \| (this: [art](art.md)) => Node \| keyof HTMLElementTagNameMap & HTMLElementDeprecatedTagNameMap |   A node, a function returning a node, or a string specifying the type of element to be created using <code>document.createElement()</code>.  |
`...args` | (Node \| (this: [art](art.md), target: Node) => never \| { [key:string]: unknown;  } \| string \| void)[] |   Each additional argument may be a node to be appended to the taget node, a function to be called with the target node as its only argument, an object whose properties shall be assigned to the taget node, or a string of text to be appended to the target node. Note that <code>null</code> and <code>undefined</code> arguments are simply ignored.  |

**Returns:** Node

The node specified by the target parameter.

## Index

### Properties

* [css](art.md#css)

### Methods

* [off](art.md#off)
* [on](art.md#on)

## Properties

### css

•  **css**: [art\_css](art_css.md)

## Methods

### off

▸ **off**(`type`: string \| readonly string[], `listener`: EventListenerOrEventListenerObject \| null, `useCapture?`: undefined \| false \| true): function

Returns a callback that can be used to detach a listener from the target node in a call to
`art`.
The arguments are the same as in `EventTarget.removeEventListener()`, except that the
argument `type` may be an array specifying multiple event types.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`type` | string \| readonly string[] |   A string or array of strings specifing the event types listened for.  |
`listener` | EventListenerOrEventListenerObject \| null |   The event handler to dissociate from the events.  |
`useCapture?` | undefined \| false \| true |   <code>true</code> to unregister the events for the capturing phase, or <code>false</code> to unregister the events for the bubbling phase. The default is <code>false</code>.  |

**Returns:** function

___

### on

▸ **on**(`type`: string \| readonly string[], `listener`: EventListenerOrEventListenerObject \| null, `useCapture?`: undefined \| false \| true): function

Returns a callback that can be used to attach a listener to the target node in a call to
`art`.
The arguments are the same as in `EventTarget.addEventListener()`, except that the argument
`type` may be an array specifying multiple event types.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`type` | string \| readonly string[] |   A string or array of strings specifing the event types to listen for.  |
`listener` | EventListenerOrEventListenerObject \| null |   The event handler to associate with the events.  |
`useCapture?` | undefined \| false \| true |   <code>true</code> to register the events for the capturing phase, or <code>false</code> to register the events for the bubbling phase. The default is <code>false</code>.  |

**Returns:** function
