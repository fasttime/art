# Interface: art

## Callable

### art

▸ **art**(`target`, `...attributes`): `Node`

Creates or modifies a node.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `Node` \| keyof HTMLElementTagNameMap \| keyof HTMLElementDeprecatedTagNameMap \| (`this`: [`art`](art.md)) => `Node` | A node, a function returning a node, or a string specifying the type of element to be created using `document.createElement()`. |
| `...attributes` | (`string` \| `void` \| `Node` \| `Readonly`\<`Record`\<`string`, `unknown`\>\> \| (`this`: [`art`](art.md), `target`: `Node`) => `never`)[] | Each attribute may be a node to be appended to the target node, a function to be called with the target node as its only argument, an object whose properties shall be assigned to the target node, or a string of text to be appended to the target node. `null` and `undefined` arguments are simply ignored. |

#### Returns

`Node`

The node specified by the target parameter.

## Table of contents

### Properties

- [css](art.md#css)

### Methods

- [off](art.md#off)
- [on](art.md#on)

## Properties

### css

• **css**: [`art_css`](art_css.md)

## Methods

### off

▸ **off**(`type`, `listener`, `useCapture?`): (`target`: `Node`) => `never`

Returns a callback that can be used to detach a listener from the target node in a call to
`art`.
The arguments are the same as in `EventTarget.removeEventListener()`, except that the
argument `type` may be an array specifying multiple event types.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` \| readonly `string`[] | A string or array of strings specifing the event types listened for. |
| `listener` | ``null`` \| `EventListenerOrEventListenerObject` | The event handler to dissociate from the events. |
| `useCapture?` | `boolean` | `true` to unregister the events for the capturing phase, or `false` to unregister the events for the bubbling phase. The default is `false`. |

#### Returns

`fn`

▸ (`target`): `never`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `Node` |

##### Returns

`never`

___

### on

▸ **on**(`type`, `listener`, `useCapture?`): (`target`: `Node`) => `never`

Returns a callback that can be used to attach a listener to the target node in a call to
`art`.
The arguments are the same as in `EventTarget.addEventListener()`, except that the argument
`type` may be an array specifying multiple event types.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | `string` \| readonly `string`[] | A string or array of strings specifing the event types to listen for. |
| `listener` | ``null`` \| `EventListenerOrEventListenerObject` | The event handler to associate with the events. |
| `useCapture?` | `boolean` | `true` to register the events for the capturing phase, or `false` to register the events for the bubbling phase. The default is `false`. |

#### Returns

`fn`

▸ (`target`): `never`

##### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `Node` |

##### Returns

`never`
