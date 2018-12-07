art
===

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

See the [**Art Library Reference**](art.md) for further informations.

*This is a preliminary documentation and may be subject to change at any time.*
