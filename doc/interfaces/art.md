[art](../README.md) > [art](../interfaces/art.md)

# Interface: art

## Hierarchy

**art**

## Callable
▸ **__call**(target: *`Node` \| `function` \| `keyof HTMLElementTagNameMap & HTMLElementDeprecatedTagNameMap`*, ...args: *(`string` \| `void` \| `Node` \| `function` \| `object`)[]*): `Node`

*Defined in [art.d.ts:5](https://github.com/fasttime/art/blob/0.9.0/art.d.ts#L5)*

Creates or modifies a node.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| target | `Node` \| `function` \| `keyof HTMLElementTagNameMap & HTMLElementDeprecatedTagNameMap` |  <br><br>A node, a function returning a node, or a string specifying the type of element to be created using <code>document.createElement()</code>. |
| `Rest` args | (`string` \| `void` \| `Node` \| `function` \| `object`)[] |  <br><br>Each additional argument may be a node to be appended to the taget node, a function to be called with the target node as its only argument, an object whose properties shall be assigned to the taget node, or a string of text to be appended to the target node. Note that <code>null</code> and <code>undefined</code> arguments are simply ignored. |

**Returns:** `Node`
The node specified by the target parameter.

## Index

### Properties

* [css](art.md#css)

### Methods

* [off](art.md#off)
* [on](art.md#on)

---

## Properties

<a id="css"></a>

###  css

**● css**: *[art_css](art_css.md)*

*Defined in [art.d.ts:5](https://github.com/fasttime/art/blob/0.9.0/art.d.ts#L5)*

___

## Methods

<a id="off"></a>

###  off

▸ **off**(type: *`string` \| `ReadonlyArray`<`string`>*, listener: *`EventListenerOrEventListenerObject` \| `null`*, useCapture?: *`boolean`*): `function`

*Defined in [art.d.ts:62](https://github.com/fasttime/art/blob/0.9.0/art.d.ts#L62)*

Returns a callback that can be used to detach a listener from the target node in a call to `art`. The arguments are the same as in `EventTarget.removeEventListener()`, except that the argument `type` may be an array specifying multiple event types.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| type | `string` \| `ReadonlyArray`<`string`> |  <br><br>A string or array of strings specifing the event types listened for. |
| listener | `EventListenerOrEventListenerObject` \| `null` |  <br><br>The event handler to dissociate from the events. |
| `Optional` useCapture | `boolean` |  <br><br><code>true</code> to unregister the events for the capturing phase, or <code>false</code> to unregister the events for the bubbling phase. The default is <code>false</code>. |

**Returns:** `function`

___
<a id="on"></a>

###  on

▸ **on**(type: *`string` \| `ReadonlyArray`<`string`>*, listener: *`EventListenerOrEventListenerObject` \| `null`*, useCapture?: *`boolean`*): `function`

*Defined in [art.d.ts:90](https://github.com/fasttime/art/blob/0.9.0/art.d.ts#L90)*

Returns a callback that can be used to attach a listener to the target node in a call to `art`. The arguments are the same as in `EventTarget.addEventListener()`, except that the argument `type` may be an array specifying multiple event types.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| type | `string` \| `ReadonlyArray`<`string`> |  <br><br>A string or array of strings specifing the event types to listen for. |
| listener | `EventListenerOrEventListenerObject` \| `null` |  <br><br>The event handler to associate with the events. |
| `Optional` useCapture | `boolean` |  <br><br><code>true</code> to register the events for the capturing phase, or <code>false</code> to register the events for the bubbling phase. The default is <code>false</code>. |

**Returns:** `function`

___

