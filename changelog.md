<a name="0.9.1"></a>
## [0.9.1](https://github.com/fasttime/art/releases/tag/0.9.1) (2019-09-13)

* Made `css.keyframes` minification safe.

<a name="0.9.0"></a>
## [0.9.0](https://github.com/fasttime/art/releases/tag/0.9.0) (2019-05-26)

* Dropped support for Node.js < 10.
* Added function `makeArt.promise`.
* Usability changes to `makeArt.async`:
 * Renamed function to `makeArt.callback`.
 * Implemented fail-fast behavior for invalid `callback` argument.
* Fixed changelog markdown.

<a name="0.8.0"></a>
## [0.8.0](https://github.com/fasttime/art/releases/tag/0.8.0) (2019-05-14)

* Added TypeScript support.
* Generating reference documentation with TSDoc.
* The `context` parameter of `makeArt.async` is now optional.
* Removed generic maintenance entries from changelog.

<a name="0.7.3"></a>
## [0.7.3](https://github.com/fasttime/art/releases/tag/0.7.3) (2019-01-21)

* Added npm badge to readme file.

<a name="0.7.2"></a>
## [0.7.2](https://github.com/fasttime/art/releases/tag/0.7.2) (2018-12-30)

* Improved Closure Compiler compatibility.

<a name="0.7.1"></a>
## [0.7.1](https://github.com/fasttime/art/releases/tag/0.7.1) (2018-12-07)

* Fixed changelog.

<a name="0.7.0"></a>
## [0.7.0](https://github.com/fasttime/art/releases/tag/0.7.0) (2018-12-07)

* Dropped support of Node.js < 6.
* `art.css.keyframes` now works in old Safari versions.
* Improved documentation.

<a name="0.6.1"></a>
## [0.6.1](https://github.com/fasttime/art/releases/tag/0.6.1) (2017-01-06)

* Updated reference documentation.

<a name="0.6.0"></a>
## [0.6.0](https://github.com/fasttime/art/releases/tag/0.6.0) (2016-11-13)

* The custom build can now run both synchronously and asynchronously.

<a name="0.5.0"></a>
## [0.5.0](https://github.com/fasttime/art/releases/tag/0.5.0) (2016-10-22)

* Introduced customizable build.
* Added function `art.off()`.

<a name="0.4.1"></a>
## [0.4.1](https://github.com/fasttime/art/releases/tag/0.4.1) (2016-08-07)

* Fixed documentation of `art.on()`.

<a name="0.4.0"></a>
## [0.4.0](https://github.com/fasttime/art/releases/tag/0.4.0) (2016-08-07)

* Split library into function modules.
* Removed minified version.
* Documented all parameters of `art.on()`.

<a name="0.3.0"></a>
## [0.3.0](https://github.com/fasttime/art/releases/tag/0.3.0) (2016-08-04)

* Added functions `art.css()` and `art.css.keyframes()`.
* `art.on()` extended to support an array of event types as a first parameter.
* Uncapitalized names of files in the root folder.

<a name="0.2.4"></a>
## [0.2.4](https://github.com/fasttime/art/releases/tag/0.2.4) (2016-06-14)

* Improved code style using ESLint.

<a name="0.2.3"></a>
## [0.2.3](https://github.com/fasttime/art/releases/tag/0.2.3) (2016-01-08)

* Updated documentation.
* Fixed test reporter icons.

<a name="0.2.2"></a>
## [0.2.2](https://github.com/fasttime/art/releases/tag/0.2.2) (2015-09-12)

* Build now requires Node.js 4.
* Switched to Mocha matrix test reporter.

<a name="0.2.1"></a>
## [0.2.1](https://github.com/fasttime/art/releases/tag/0.2.1) (2015-08-17)

* Changelog file updated and moved to the root folder.

<a name="0.2.0"></a>
## [0.2.0](https://github.com/fasttime/art/releases/tag/0.2.0) (2015-08-17)

* Modified `art()` property import behavior:
 * No branching into get/set type property values.
 * Only own properties are imported.
* Added library reference and changelog.

<a name="0.1.0"></a>
## [0.1.0](https://github.com/fasttime/art/releases/tag/0.1.0) (2015-07-14)

First release exposing only `art()` and `art.on()`.
