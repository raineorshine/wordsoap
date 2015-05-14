'use strict'

var cint = require('cint')

var regexes = {
	// Inspired by: http://tim.mackey.ie/2005/11/23/CleanWordHTMLUsingRegularExpressions.aspx
	msoTags: /<[\/]?(font|span|xml|del|ins|[ovwxp]:\w+)[^>]*?>/.source,

	// Regex Tester: https://regex101.com/r/lJ0nQ6
	msoAttributes: /<(\w+)(?:\s+(?:class|lang|style|size|face|xmlns:\w+|[ovwxp\w+]))=(?:'[^']*'|""[^""]*""|[^\s>]+)(?:[^>]*)>/.source,

	nbsp: /(<[^\s>]*>&nbsp;<\/[^\s>]*>)|&nbsp;/.source,

	// https://regex101.com/r/sD4vJ8
	conditional: /<!-*\[\w+ [^\]]*]>|<!\[end[^\]]*\]-*>/.source,

	htmlComments: /<!--.*-->/.source,

	emptyTags: /<(span|a|[ovwxp]:\w+)[^>]*><\/[^>]+>/.source,

	deadTags: /<(xml|head)>[\S\s]*<\/(xml|head)>/.source,

}

// compile the regexes
var regexesCompiled = cint.mapObject(regexes, function(name, s) {
	return cint.keyValue(name, new RegExp(s, 'gi'))
})

// var getWordsoapRegexp = cint.getValue.bind(null, wordsoapRegexes)
// var replace = cint.inContext(String.prototype.replace)
// var strip = cint.partialAt(replace, 1, '')
// var makeGlobal = cint.partialAt(regexpClone, 1, 'g')

function clean(text) {
	return text
		// .replace(new RegExp(r.msoTags, 'gi'), '')
		.replace(regexesCompiled.msoAttributes, '<$1>')
		.replace(regexesCompiled.nbsp, '')
		.replace(regexesCompiled.conditional, '')
		.replace(regexesCompiled.htmlComments, '')
		.replace(regexesCompiled.emptyTags, '')
		.replace(regexesCompiled.deadTags, '')
}

module.exports = clean
module.exports.regexes = regexes
