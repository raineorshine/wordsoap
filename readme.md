# wordsoap
[![Build Status](https://travis-ci.org/metaraine/wordsoap.svg?branch=master)](https://travis-ci.org/metaraine/wordsoap)
[![NPM version](https://badge.fury.io/js/wordsoap.svg)](http://badge.fury.io/js/wordsoap)

> Clean up dirty HTML output from Microsoft Word

Based on:
- [wordsoap-regexp](https://github.com/metaraine/wordsoap-regexp)

Used by
- [wordsoap-cli](https://github.com/metaraine/wordsoap-cli)

## Install

```sh
$ npm install --save wordsoap
```


## Usage

```js
var wordsoap = require('wordsoap')

var dirty = "<p class=MsoNormal style='font-size:12pt'>Text</p>")
var clean = wordsoap(dirty) // <p>Text</p>
```


## License

ISC © [Raine Lourie](https://github.com/metaraine)
