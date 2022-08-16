# Interface: art\_css

## Callable

### art_css

▸ **art_css**(`selectors`, `ruleObj`): `undefined`

Creates a new CSS rule and adds it to the document.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `selectors` | `string` | The selector of the new rule. |
| `ruleObj` | [`RuleDefinitionObject`](RuleDefinitionObject.md) | A rule definition object mapping style names to their respective values. |

#### Returns

`undefined`

## Table of contents

### Methods

- [keyframes](art_css.md#keyframes)

## Methods

### keyframes

▸ **keyframes**(`identifier`, `ruleObjMap`): `boolean`

Creates a new CSS keyframes rule and adds it to the document.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `identifier` | `string` | The new keyframes rule identifier. |
| `ruleObjMap` | `Readonly`<`Record`<`string`, [`RuleDefinitionObject`](RuleDefinitionObject.md)\>\> | An object mapping selectors to rule definition objects. Rule definition objects map style names to their respective values. |

#### Returns

`boolean`

`true` on success; otherwise, `false`.
