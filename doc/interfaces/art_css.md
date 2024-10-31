[**art**](../README.md) • **Docs**

***

# Interface: art\_css()

> **art\_css**(`selectors`, `ruleObj`): `undefined`

Creates a new CSS rule and adds it to the document.

## Parameters

• **selectors**: `string`

The selector of the new rule.

• **ruleObj**: `Readonly`\<`Record`\<`string`, `string`\>\>

A rule definition object mapping style names to their respective values.

## Returns

`undefined`

## Methods

### keyframes()

> **keyframes**(`identifier`, `ruleObjMap`): `boolean`

Creates a new CSS keyframes rule and adds it to the document.

#### Parameters

• **identifier**: `string`

The new keyframes rule identifier.

• **ruleObjMap**: `Readonly`\<`Record`\<`string`, `Readonly`\<`Record`\<`string`, `string`\>\>\>\>

An object mapping selectors to rule definition objects.
Rule definition objects map style names to their respective values.

#### Returns

`boolean`

`true` on success; otherwise, `false`.
