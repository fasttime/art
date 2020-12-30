# Interface: art

## Hierarchy

* **art**

## Callable

▸ **art**(`target`: *object* \| Node \| () => Node \| *a* \| *abbr* \| *address* \| *applet* \| *area* \| *article* \| *aside* \| *audio* \| *b* \| *base* \| *basefont* \| *bdi* \| *bdo* \| *blockquote* \| *body* \| *br* \| *button* \| *canvas* \| *caption* \| *cite* \| *code* \| *col* \| *colgroup* \| *data* \| *datalist* \| *dd* \| *del* \| *details* \| *dfn* \| *dialog* \| *dir* \| *div* \| *dl* \| *dt* \| *em* \| *embed* \| *fieldset* \| *figcaption* \| *figure* \| *font* \| *footer* \| *form* \| *frame* \| *frameset* \| *h1* \| *h2* \| *h3* \| *h4* \| *h5* \| *h6* \| *head* \| *header* \| *hgroup* \| *hr* \| *html* \| *i* \| *iframe* \| *img* \| *input* \| *ins* \| *kbd* \| *label* \| *legend* \| *li* \| *link* \| *main* \| *map* \| *mark* \| *marquee* \| *menu* \| *meta* \| *meter* \| *nav* \| *noscript* \| *ol* \| *optgroup* \| *option* \| *output* \| *p* \| *param* \| *picture* \| *pre* \| *progress* \| *q* \| *rp* \| *rt* \| *ruby* \| *s* \| *samp* \| *script* \| *section* \| *select* \| *slot* \| *small* \| *source* \| *span* \| *strong* \| *style* \| *sub* \| *summary* \| *sup* \| *table* \| *tbody* \| *td* \| *template* \| *textarea* \| *tfoot* \| *th* \| *thead* \| *time* \| *title* \| *tr* \| *track* \| *u* \| *ul* \| *var* \| *video* \| *wbr* \| *listing* \| *xmp*, ...`attributes`: (*string* \| *void* \| Node \| (`target`: Node) => *never* \| { [key: string]: *unknown*;  })[]): Node

Creates or modifies a node.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`target` | *object* \| Node \| () => Node \| *a* \| *abbr* \| *address* \| *applet* \| *area* \| *article* \| *aside* \| *audio* \| *b* \| *base* \| *basefont* \| *bdi* \| *bdo* \| *blockquote* \| *body* \| *br* \| *button* \| *canvas* \| *caption* \| *cite* \| *code* \| *col* \| *colgroup* \| *data* \| *datalist* \| *dd* \| *del* \| *details* \| *dfn* \| *dialog* \| *dir* \| *div* \| *dl* \| *dt* \| *em* \| *embed* \| *fieldset* \| *figcaption* \| *figure* \| *font* \| *footer* \| *form* \| *frame* \| *frameset* \| *h1* \| *h2* \| *h3* \| *h4* \| *h5* \| *h6* \| *head* \| *header* \| *hgroup* \| *hr* \| *html* \| *i* \| *iframe* \| *img* \| *input* \| *ins* \| *kbd* \| *label* \| *legend* \| *li* \| *link* \| *main* \| *map* \| *mark* \| *marquee* \| *menu* \| *meta* \| *meter* \| *nav* \| *noscript* \| *ol* \| *optgroup* \| *option* \| *output* \| *p* \| *param* \| *picture* \| *pre* \| *progress* \| *q* \| *rp* \| *rt* \| *ruby* \| *s* \| *samp* \| *script* \| *section* \| *select* \| *slot* \| *small* \| *source* \| *span* \| *strong* \| *style* \| *sub* \| *summary* \| *sup* \| *table* \| *tbody* \| *td* \| *template* \| *textarea* \| *tfoot* \| *th* \| *thead* \| *time* \| *title* \| *tr* \| *track* \| *u* \| *ul* \| *var* \| *video* \| *wbr* \| *listing* \| *xmp* |   A node, a function returning a node, or a string specifying the type of element to be created using `document.createElement()`.    |
`...attributes` | (*string* \| *void* \| Node \| (`target`: Node) => *never* \| { [key: string]: *unknown*;  })[] |   Each attribute may be a node to be appended to the target node, a function to be called with the target node as its only argument, an object whose properties shall be assigned to the target node, or a string of text to be appended to the target node. `null` and `undefined` arguments are simply ignored.    |

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

• **css**: [*art\_css*](art_css.md)

## Methods

### off

▸ **off**(`type`: *string* \| readonly *string*[], `listener`: *null* \| EventListener \| EventListenerObject, `useCapture?`: *boolean*): function

Returns a callback that can be used to detach a listener from the target node in a call to
`art`.
The arguments are the same as in `EventTarget.removeEventListener()`, except that the
argument `type` may be an array specifying multiple event types.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`type` | *string* \| readonly *string*[] |   A string or array of strings specifing the event types listened for.    |
`listener` | *null* \| EventListener \| EventListenerObject |   The event handler to dissociate from the events.    |
`useCapture?` | *boolean* |   `true` to unregister the events for the capturing phase, or `false` to unregister the events for the bubbling phase. The default is `false`.    |

**Returns:** function

___

### on

▸ **on**(`type`: *string* \| readonly *string*[], `listener`: *null* \| EventListener \| EventListenerObject, `useCapture?`: *boolean*): function

Returns a callback that can be used to attach a listener to the target node in a call to
`art`.
The arguments are the same as in `EventTarget.addEventListener()`, except that the argument
`type` may be an array specifying multiple event types.

#### Parameters:

Name | Type | Description |
------ | ------ | ------ |
`type` | *string* \| readonly *string*[] |   A string or array of strings specifing the event types to listen for.    |
`listener` | *null* \| EventListener \| EventListenerObject |   The event handler to associate with the events.    |
`useCapture?` | *boolean* |   `true` to register the events for the capturing phase, or `false` to register the events for the bubbling phase. The default is `false`.    |

**Returns:** function
