# deep-object-assign-with-reduce
[![Build Status](https://travis-ci.org/davidcalhoun/deep-object-assign-with-reduce.svg?branch=master)](https://travis-ci.org/davidcalhoun/deep-object-assign-with-reduce)
[![Downloads][downloads-image]][npm-url]

## Introduction
Deep `Object.assign()` written with modern, functional JavaScript.  Inspired by `deep-assign` and the need for a deeper `Object.assign`.

No dependencies and very tiny - only ~450 bytes gzipped.

## Installation
In your project directory, type:

`npm install deep-object-assign-with-reduce`

or

`yarn add deep-object-assign-with-reduce`

## Changelog
* `2.0.0` - dropped IE 11 support in order to dramatically reduce filesize.
* `1.2.0` - added `deepAssignOptions` to give more control over array and object merging
* `1.1.0` - fixed RegExp as values, Symbols as keys.  Moved to Rollup, Jest.  Updated Babel.

## Examples

### Merge complex objects
```js
import { deepAssign } from 'deep-object-assign-with-reduce';

deepAssign({}, { dimensions: { width: 100, height: 100 } }, { dimensions: { width: 200 } });
// -> { dimensions: { width: 200, height: 100 } }
```

### Merge arrays
```js
import { deepAssign } from 'deep-object-assign-with-reduce';

deepAssign({}, { numbers: [1, 2, 3] }, { numbers: [4, 5, 6] });
// -> { numbers: [1, 2, 3, 4, 5, 6] }
```

### Custom overwriting behavior
`deepAssign` merges objects and arrays by default.  If you want to disable this behavior and instead overwrite objects and/or arrays, you can use `deepAssignOptions` instead, which accepts an `options` object as the first parameter:

```js
import { deepAssignOptions } from 'deep-object-assign-with-reduce';

deepAssignOptions({overwriteArrays: true}, {}, { numbers: [1, 2] }, { numbers: [3, 4] });
// -> { numbers: [3, 4] }

deepAssignOptions({overwriteObjects: true}, {}, { a: { b: 1 } }, { a: { c: 2 } });
// -> { a: { c: 2 } }
```

## Why not just use `Object.assign()` or Object spread?

### Where `Object.assign()` works fine
Here's the motivation: the native `Object.assign()` works great on its own as long as you use simple objects that are one level deep.

There's a common use case where we have some "defaults" configuration object, in which properties
can be selectively overridden while retaining the remaining default properties.

Say we have some component which has default dimensions, which we want to be able to selectively
override:

```js
// Default properties to "fallback" to.
const componentDefaults = { width: 100, height: 100 };

// Selectively overrides one property.
const componentOptions = { width: 200 };

// Constructs the final options object by merging the objects.
const options = Object.assign({}, componentDefaults, componentOptions);
// -> { width: 200, height: 100 }
```

This works because `Object.assign` will merge the simple objects together - and if the same property
(such as `width`) appears in a later object, it will override the previous value.  In this case the
`width` in `componentOptions` overrides the previously set default in `componentDefaults`.


### Where `Object.assign()` DOESN'T work fine
If your configuration object is more complicated and contains nested objects, `Object.assign()`
turns out not to work so well:

```js
const componentDefaults = { dimensions: { width: 100, height: 100 } };
const componentOptions = { dimensions: { width: 200 } };

const options = Object.assign({}, componentDefaults, componentOptions);
// -> { dimensions: { width: 200 } }
```

What happened to the `height` property?!  It turns out that the previously set `dimensions`
property was completely overwritten, not merged with the new `dimensions` object.

Maybe we can use Object spread?  But that turns out to have the same limitation with complex
objects:

```js
const objSpreadTest = { ...componentDefaults, ...componentOptions };
// -> { dimensions: { width: 200 } }
```


## Testing
To run the test suite, simply type:

`npm test`

Note that I've used some of the same tests as `deep-assign` in addition to my own.  More
contributions are welcome!

## License
MIT

[downloads-image]: https://img.shields.io/npm/dm/deep-object-assign-with-reduce.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/deep-object-assign-with-reduce
