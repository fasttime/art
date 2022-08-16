# art

## Table of contents

### Interfaces

- [RuleDefinitionObject](interfaces/RuleDefinitionObject.md)
- [art](interfaces/art.md)
- [art\_css](interfaces/art_css.md)

### Functions

- [art](README.md#art)

## Functions

### art

▸ **art**(`target`, ...`attributes`): `Node`

Creates or modifies a node.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `target` | `Node` \| keyof `HTMLElementTagNameMap` \| keyof `HTMLElementDeprecatedTagNameMap` \| (`this`: [`art`](README.md#art)) => `Node` | A node, a function returning a node, or a string specifying the type of element to be created using `document.createElement()`. |
| `...attributes` | (`string` \| `void` \| `Node` \| `Readonly`<`Record`<`string`, `unknown`\>\> \| (`this`: [`art`](README.md#art), `target`: `Node`) => `never`)[] | Each attribute may be a node to be appended to the target node, a function to be called with the target node as its only argument, an object whose properties shall be assigned to the target node, or a string of text to be appended to the target node. `null` and `undefined` arguments are simply ignored. |

#### Returns

`Node`

The node specified by the target parameter.
