**[art](../README.md)**

> [Globals](../README.md) / art\_css

# Interface: art\_css

## Hierarchy

* **art_css**

## Callable

▸ (`selectors`: string, `ruleObj`: [RuleDefinitionObject](ruledefinitionobject.md)): undefined

*Defined in [art.d.ts:103](https://github.com/fasttime/art/blob/0.9.2/art.d.ts#L103)*

Creates a new CSS rule and adds it to the document.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`selectors` | string |   The selector of the new rule.  |
`ruleObj` | [RuleDefinitionObject](ruledefinitionobject.md) |   A rule definition object mapping style names to their respective values.  |

**Returns:** undefined

## Index

### Methods

* [keyframes](art_css.md#keyframes)

## Methods

### keyframes

▸ **keyframes**(`identifier`: string, `ruleObjMap`: { [selectors:string]: [RuleDefinitionObject](ruledefinitionobject.md);  }): boolean

*Defined in [art.d.ts:133](https://github.com/fasttime/art/blob/0.9.2/art.d.ts#L133)*

Creates a new CSS keyframes rule and adds it to the document.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`identifier` | string |   The new keyframes rule identifier.  |
`ruleObjMap` | { [selectors:string]: [RuleDefinitionObject](ruledefinitionobject.md);  } |   An object mapping selectors to rule definition objects. Rule definition objects map style names to their respective values.  |

**Returns:** boolean

`true` on success; otherwise, `false`.
