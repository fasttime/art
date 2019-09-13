[art](../README.md) › [art](art.md)

# Interface: art


## Hierarchy

* **art**

## Callable

▸ (`target`: Node | function | keyof HTMLElementTagNameMap & HTMLElementDeprecatedTagNameMap, ...`args`: string | void | Node | function | object[]): *Node*

*Defined in [art.d.ts:8](https://github.com/fasttime/art/blob/0.9.1/art.d.ts#L8)*

Creates or modifies a node.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`target` | Node &#124; function &#124; keyof HTMLElementTagNameMap & HTMLElementDeprecatedTagNameMap |   A node, a function returning a node, or a string specifying the type of element to be created using <code>document.createElement()</code>.  |
`...args` | string &#124; void &#124; Node &#124; function &#124; object[] |   Each additional argument may be a node to be appended to the taget node, a function to be called with the target node as its only argument, an object whose properties shall be assigned to the taget node, or a string of text to be appended to the target node. Note that <code>null</code> and <code>undefined</code> arguments are simply ignored.  |

**Returns:** *Node*

The node specified by the target parameter.

## Index

### Properties

* [css](art.md#css)

### Methods

* [off](art.md#off)
* [on](art.md#on)

## Properties

###  css

• **css**: *[art_css](art_css.md)*

*Defined in [art.d.ts:8](https://github.com/fasttime/art/blob/0.9.1/art.d.ts#L8)*

## Methods

###  off

▸ **off**(`type`: string | keyof string[], `listener`: EventListenerOrEventListenerObject | null, `useCapture?`: undefined | false | true): *function*

*Defined in [art.d.ts:65](https://github.com/fasttime/art/blob/0.9.1/art.d.ts#L65)*

Returns a callback that can be used to detach a listener from the target node in a call to
`art`.
The arguments are the same as in `EventTarget.removeEventListener()`, except that the
argument `type` may be an array specifying multiple event types.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`type` | string &#124; keyof string[] |   A string or array of strings specifing the event types listened for.  |
`listener` | EventListenerOrEventListenerObject &#124; null |   The event handler to dissociate from the events.  |
`useCapture?` | undefined &#124; false &#124; true |   <code>true</code> to unregister the events for the capturing phase, or <code>false</code> to unregister the events for the bubbling phase. The default is <code>false</code>.  |

**Returns:** *function*

▸ (`target`: Node): *never*

**Parameters:**

Name | Type |
------ | ------ |
`target` | Node |

___

###  on

▸ **on**(`type`: string | keyof string[], `listener`: EventListenerOrEventListenerObject | null, `useCapture?`: undefined | false | true): *function*

*Defined in [art.d.ts:93](https://github.com/fasttime/art/blob/0.9.1/art.d.ts#L93)*

Returns a callback that can be used to attach a listener to the target node in a call to
`art`.
The arguments are the same as in `EventTarget.addEventListener()`, except that the argument
`type` may be an array specifying multiple event types.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`type` | string &#124; keyof string[] |   A string or array of strings specifing the event types to listen for.  |
`listener` | EventListenerOrEventListenerObject &#124; null |   The event handler to associate with the events.  |
`useCapture?` | undefined &#124; false &#124; true |   <code>true</code> to register the events for the capturing phase, or <code>false</code> to register the events for the bubbling phase. The default is <code>false</code>.  |

**Returns:** *function*

▸ (`target`: Node): *never*

**Parameters:**

Name | Type |
------ | ------ |
`target` | Node |