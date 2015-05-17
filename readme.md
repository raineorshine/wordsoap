# wordsoap
[![Build Status](https://travis-ci.org/metaraine/wordsoap.svg?branch=master)](https://travis-ci.org/metaraine/wordsoap)
[![NPM version](https://badge.fury.io/js/wordsoap.svg)](http://badge.fury.io/js/wordsoap)

> Clean up dirty HTML output from Microsoft Word


## Usage

### command line

```sh
$ npm install -g wordsoap
$ cat msword_garbage.html | wordsoap
```

### module

```sh
$ npm install --save wordsoap
```

```js
var wordsoap = require('wordsoap')

var dirty = "<p class=MsoNormal style='font-size:12pt'>Text</p>")
var clean = wordsoap(dirty) // <p>Text</p>

// access individual regex strings
wordsoap.regexes.msoAttributes // <(\w+)(?: (?:class|lang|style|size|face|[ovwxp]))=(?:'[^']*'|""[^""]*""|[^\s>]+)(?:[^>]*)>

// access individual regexes compiled with 'gi' flags
wordsoap.regexesCompiled.msoAttributes // <(\w+)(?: (?:class|lang|style|size|face|[ovwxp]))=(?:'[^']*'|""[^""]*""|[^\s>]+)(?:[^>]*)>
```


## License

ISC © [Raine Lourie](https://github.com/metaraine)
