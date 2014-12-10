'use strict';

var wordsoapRegexes = require('wordsoap-regex')
var regexpClone = require('regexp-clone')
var cint = require('cint')

var regexes = [
	'msoTags',
	'msoAttributes'
]

// var getWordsoapRegexp = cint.getValue.bind(null, wordsoapRegexes)
// var replace = cint.inContext(String.prototype.replace)
// var strip = cint.partialAt(replace, 1, '')
// var makeGlobal = cint.partialAt(regexpClone, 1, 'g')

module.exports = function(text) {
	return text
		.replace(regexpClone(wordsoapRegexes.msoTags, 'g'), '<$1>')
		.replace(regexpClone(wordsoapRegexes.msoAttributes, 'g'), '')
}
