[art](../README.md) > [art_css](../interfaces/art_css.md)

# Interface: art_css

## Hierarchy

**art_css**

## Callable
▸ **__call**(selectors: *`string`*, ruleObj: *[RuleDefinitionObject](ruledefinitionobject.md)*): `undefined`

*Defined in [art.d.ts:100](https://github.com/fasttime/art/blob/0.8.0/art.d.ts#L100)*

Creates a new CSS rule and adds it to the document.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| selectors | `string` |  <br><br>The selector of the new rule. |
| ruleObj | [RuleDefinitionObject](ruledefinitionobject.md) |  <br><br>A rule definition object mapping style names to their respective values. |

**Returns:** `undefined`

## Index

### Methods

* [keyframes](art_css.md#keyframes)

---

## Methods

<a id="keyframes"></a>

###  keyframes

▸ **keyframes**(identifier: *`string`*, ruleObjMap: *`object`*): `boolean`

*Defined in [art.d.ts:130](https://github.com/fasttime/art/blob/0.8.0/art.d.ts#L130)*

Creates a new CSS keyframes rule and adds it to the document.

**Parameters:**

| Name | Type | Description |
| ------ | ------ | ------ |
| identifier | `string` |  <br><br>The new keyframes rule identifier. |
| ruleObjMap | `object` |  <br><br>An object mapping selectors to rule definition objects. Rule definition objects map style names to their respective values. |

**Returns:** `boolean`

`true` on success; otherwise, `false`.

___

