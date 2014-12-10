'use strict';

var wordsoapRegexes = require('wordsoap-regex')
var regexpClone = require('regexp-clone')
var cint = require('cint')

var regexes = [
	'msoTags',
	'msoAttributes'
]

var getWordsoapRegexp = cint.getValue.bind(null, wordsoapRegexes)
var replace = cint.inContext(String.prototype.replace)
var strip = cint.partialAt(replace, 1, '')
// I want a transpiler that will let me do this:
// var strip = replace(*, '')

// make a regular expression global
var makeGlobal = cint.partialAt(regexpClone, 1, 'g')

module.exports = function(text) {
	return regexes
		.map(getWordsoapRegexp)
		.map(makeGlobal)
		.reduce(strip, text)
}
