# node-sass-functions-json

[![Greenkeeper badge](https://badges.greenkeeper.io/itgalaxy/node-sass-functions-json.svg)](https://greenkeeper.io/)

[![NPM version](https://img.shields.io/npm/v/node-sass-functions-json.svg)](https://www.npmjs.org/package/node-sass-functions-json) 
[![Travis Build Status](https://img.shields.io/travis/itgalaxy/node-sass-functions-json/master.svg?label=build)](https://travis-ci.org/itgalaxy/node-sass-functions-json) 
[![dependencies Status](https://david-dm.org/itgalaxy/node-sass-functions-json/status.svg)](https://david-dm.org/itgalaxy/node-sass-functions-json) 
[![devDependencies Status](https://david-dm.org/itgalaxy/node-sass-functions-json/dev-status.svg)](https://david-dm.org/itgalaxy/node-sass-functions-json?type=dev)

JSON encode and decode functions for [node-sass](https://github.com/sass/node-sass).

## Install

```shell
npm install node-sass-functions-json --save
```

## Usage

```js
const sass = require('node-sass');
const jsonFunctions = require('node-sass-functions-json');

sass.render({
    file: './index.scss',
    functions: Object.assign({}, jsonFunctions)
}, function (error, result) {
    // ...
});
```

Module exports object with prepared functions `json-encode` and `json-decode`. 
If you need functions as separate entities, they are available as static properties `encode` and `decode`.

### Encode

Input:

```scss
$list: 1, 2, "3", (4,5,6), (foo: "bar baz");
$map: (
    foo: 1,
    bar: (2, 3),
    baz: "3 3 3",
    bad: (
        foo: 11,
        bar: 22,
        baz: (
            5, 4, 6, null, 1, 1.23456789px
        ),
        bag: "foo bar"
    ),
    qux: rgba(255,255,255,0.5),
    corgle: red
);

body {
    content: json-encode($list);
    content: json-encode($map);
    content: json-encode($list, $quotes: false);
    content: json-encode($map, $quotes: false);
}
```

Output:

```css
body {
    content: '[1,2,"3",[4,5,6],{"foo":"bar baz"}]';
    content: '{"foo":1,"bar":[2,3],"baz":"3 3 3","bad":{"foo":11,"bar":22,"baz":[5,4,6,null,1,"1.23457px"],"bag":"foo bar"},"qux":"rgba(255,255,255,0.5)","corgle":"#f00"}';
    content: [1,2,"3",[4,5,6],{"foo":"bar baz"}];
    content: {"foo":1,"bar":[2,3],"baz":"3 3 3","bad":{"foo":11,"bar":22,"baz":[5,4,6,null,1,"1.23457px"],"bag":"foo bar"},"qux":"rgba(255,255,255,0.5)","corgle":"#f00"};
}
```

### Decode

Input:

```scss
$array: '[1,2,"3",[4,5,6],{"foo":"bar baz"}]';
$object: '{"foo":1,"bar":[2,3],"baz":"3 3 3","bad":{"foo":11,"bar":22,"baz":[5,4,6,null,1,"1.23456789px"],"bag":"foo bar"},"qux":"rgba(255,255,255,0.5)","corgle":"#f00"}';

@debug json-decode($array);
@debug json-decode($object);
```

Output:

```shell
DEBUG: 1, 2, 3, 4, 5, 6, (foo: bar baz)
DEBUG: (foo: 1, bar: 2, 3, baz: 3 3 3, bad: (foo: 11, bar: 22, baz: 5, 4, 6, null, 1, 1.23456789px, bag: foo bar), 
        qux: rgba(255, 255, 255, 0.5), corgle: red)
```

## API

### json-encode(data, quotes)

Returns: `sass.types.String`

Encodes (`JSON.stringify`) data 
and returns [Sass string](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings). 
By default, string is quoted with single quotes so that it can be easily used in standard CSS values.

-   [Sass lists](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#lists) are transformed to arrays.

-   [Sass maps](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) are transformed to objects.

-   [Sass colors](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#colors) are transformed 
    to `rgba()` syntax if they have alpha value, otherwise they are transformed 
    to hex value (and it’s shorther version if possible).

-   [Sass strings](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings) 
    are transformed to strings

-   Sass numbers are transformed to numbers.

-   Sass null values and anything unresolved is transformed to null values.

#### data

Type: `sass.types.*`

Data to encode (stringify).

#### quotes

Type: `Boolean|sass.types.Boolean`  
Default: `true`

Should output string be quoted with single quotes.

### json-decode(data)

Returns: `sass.types.*`

Decodes (`JSON.parse`) string 
and returns one of [available Sass types](https://github.com/sass/node-sass#functions--v300---experimental).

-   Arrays are transformed to [Sass lists](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#lists).

-   Objects are transformed to [Sass maps](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#maps).

-   Anything properly parsed with [parse-color](https://github.com/substack/parse-color) 
    is transformed to [Sass color](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#colors).

-   Strings are transformed to Sass numbers with units if they can be properly parsed 
    with [parse-css-dimension](https://github.com/jedmao/parse-css-dimension), otherwise they are transformed 
    to [Sass strings](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#sass-script-strings).

-   Numbers are transformed to Sass numbers.

-   Null values and anything unresolved is transformed to Sass null values.

#### data

Type: `sass.types.String|sass.types.Number|sass.types.Boolean|sass.types.Null`

String to decode (parse).

## Related

-   [node-sass-json-functions](https://github.com/niksy/node-sass-json-functions) - Thanks for inspiration.

## Contribution

Feel free to push your code if you agree with publishing under the MIT license.

## [Changelog](CHANGELOG.md)

## [License](LICENSE)
