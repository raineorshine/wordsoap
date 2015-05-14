'use strict'

var regexpClone = require('regexp-clone')
// var cint = require('cint')

var r = {
	// Inspired by: http://tim.mackey.ie/2005/11/23/CleanWordHTMLUsingRegularExpressions.aspx
	// Regex Tester: https://regex101.com/r/lJ0nQ6/2
	msoTags: /<[\/]?(font|span|xml|del|ins|[ovwxp]:\w+)[^>]*?>/.source,
	msoAttributes: /<(\w+)(?: (?:class|lang|style|size|face|[ovwxp]))=(?:'[^']*'|""[^""]*""|[^\s>]+)(?:[^>]*)>/.source,
	nbsp: /(<[^\s>]*>&nbsp;<\/[^\s>]*>)|&nbsp;/.source
	// emptySpans: /<span>/i
}

// var getWordsoapRegexp = cint.getValue.bind(null, wordsoapRegexes)
// var replace = cint.inContext(String.prototype.replace)
// var strip = cint.partialAt(replace, 1, '')
// var makeGlobal = cint.partialAt(regexpClone, 1, 'g')

function clean(text) {
	return text
		// .replace(new RegExp(r.msoTags, 'gi'), '')
		.replace(new RegExp(r.msoAttributes, 'gi'), '<$1>')
		.replace(new RegExp(r.nbsp, 'gi'), '')
}

module.exports = clean
module.exports.regexes = r
