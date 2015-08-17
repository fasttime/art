art
=======

A really small DOM manipulation library

The **art** library makes it easy to dynamically create and manipulate DOM elements.

Create an empty `DIV`:

```js
var myDiv = art("div");
```

Append the text "Hello, World!" to the document body:

```js
art(document.body, "Hello World!");
```

Create a button with a caption and a click handler:

```js
var button =
    art(
        "input",
        { type: "button", value: "Click me" },
        art.on("click", function () { alert("Bravo!"); })
    );
```

Create a 2x2 table with centered text and append it to an existing element:

```js
art(
    document.getElementById("myParent"),
    art(
        "table",
        { style: { textAlign: "center" } },
        art(
            "tr",
            art("td", "top left"),
            art("td", "top right")
        ),
        art(
            "tr",
            art("td", "bottom left"),
            art("td", "bottom right")
        )
    )
);
```

See the [**art Library Reference**](art.md) for further informations.

*This is a preliminary documentation and may be subject to change at any time.*
