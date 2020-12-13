# art · [![npm version](https://badge.fury.io/js/art-js.svg)](https://www.npmjs.com/package/art-js)

The **art** library makes it easy to dynamically create and manipulate DOM elements.

Create an empty `DIV`:

```js
const myDiv = art("div");
```

Append the text "Hello, World!" to the document body:

```js
art(document.body, "Hello World!");
```

Create a button with a caption and a click handler:

```js
function handleClick(event)
{
    alert("Bravo!");
}

const button =
art
(
    "input",
    { type: "button", value: "Click me" },
    art.on("click", handleClick)
);
```

Detach the click handler:

```js
art(button, art.off("click", handleClick));
```

Reattach the click handler:

```js
art(button, art.on("click", handleClick));
```

Create a 2×2 table with centered text and append it to an existing element:

```js
art
(
    document.getElementById("myParent"),
    art
    (
        "table",
        { style: { textAlign: "center" } },
        art
        (
            "tr",
            art("td", "top left"),
            art("td", "top right")
        ),
        art
        (
            "tr",
            art("td", "bottom left"),
            art("td", "bottom right")
        )
    )
);
```

See the [**art Library Reference**](doc/README.md) for further informations.

## Customizing art

The pregenerated files in the distribution package expose all implemented features.

For  aspecialized usage, it is possible to generate a custom build of the art library with only
desired features included.
Furthermore, it is possible to generate the library code in form of an ECMAScript module that only
exports `art` as a default export.

The art library is generated using `make-art`, which can be used as a command line tool after
installing the `art-js` package.

```console
npm i art-js
npx make-art <output_folder> [dts] [esModule] [art.on] [art.off] [art.css] [art.css.keyframes]
```

<dl>
<dt><code>output_folder</code></dt>
<dd>The folder where the files will be generated.</dd>
<dt><code>dts</code></dt>
<dd>
If specified, a TypeScript declaration file (.d.ts) will also be generated along with the JavaScript
file.
</dd>
<dt><code>esModule</code></dt>
<dd>
If specified, an ECMAScript module will be generated; otherwise, a script will be generated.
</dd>
<dt><code>art.on</code></dt>
<dd>Include code for <a href="doc/interfaces/art.md#on"><code>art.on</code></a>.</dd>
<dt><code>art.off</code></dt>
<dd>Include code for <a href="doc/interfaces/art.md#off"><code>art.off</code></a>.</dd>
<dt><code>art.css</code></dt>
<dd>Include code for <a href="doc/interfaces/art_css.md"><code>art.css</code></a>.</dd>
<dt><code>art.css.keyframes</code></dt>
<dd>
Include code for <a href="doc/interfaces/art_css.md#keyframes"><code>art.css.keyframes</code></a>.
</dd>
</dl>

## Compatibility

The art library is compatible with the browsers listed below.

 ![Chrome](https://api.iconify.design/mdi:google-chrome.svg) Chrome
<br>
 ![Safari](https://api.iconify.design/mdi:apple-safari.svg) Safari 7+
<br>
 ![Edge](https://api.iconify.design/mdi:microsoft-edge.svg) Edge
<br>
 ![Firefox](https://api.iconify.design/mdi:firefox.svg) Firefox
<br>
 ![Opera](https://api.iconify.design/mdi:opera.svg) Opera
<br>
 ![Internet Explorer](https://api.iconify.design/mdi:microsoft-internet-explorer.svg) Internet
Explorer 9+
<br>
 ![Android Browser](https://api.iconify.design/mdi:android.svg) Android Browser 4.x

Some features may not be available in older browsers.
