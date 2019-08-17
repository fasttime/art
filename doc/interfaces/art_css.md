> **[art](../README.md)**

[art_css](art_css.md) /

# Interface: art_css

## Hierarchy

* **art_css**

## Callable

▸ (`selectors`: string, `ruleObj`: [RuleDefinitionObject](ruledefinitionobject.md)): *undefined*

*Defined in [art.d.ts:100](https://github.com/fasttime/art/blob/0.9.0/art.d.ts#L100)*

Creates a new CSS rule and adds it to the document.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`selectors` | string |   The selector of the new rule.  |
`ruleObj` | [RuleDefinitionObject](ruledefinitionobject.md) |   A rule definition object mapping style names to their respective values.  |

**Returns:** *undefined*

## Index

### Methods

* [keyframes](art_css.md#keyframes)

## Methods

###  keyframes

▸ **keyframes**(`identifier`: string, `ruleObjMap`: object): *boolean*

*Defined in [art.d.ts:130](https://github.com/fasttime/art/blob/0.9.0/art.d.ts#L130)*

Creates a new CSS keyframes rule and adds it to the document.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`identifier` | string |   The new keyframes rule identifier.  |
`ruleObjMap` | object |   An object mapping selectors to rule definition objects. Rule definition objects map style names to their respective values.  |

**Returns:** *boolean*

`true` on success; otherwise, `false`.