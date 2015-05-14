'use strict'

var regexpClone = require('regexp-clone')
// var cint = require('cint')

var r = {
	// from http://tim.mackey.ie/CleanWordHTMLUsingRegularExpressions.aspx
	msoTags: /<[\/]?(font|span|xml|del|ins|[ovwxp]:\w+)[^>]*?>/i,
	msoAttributes: /<([^>]*)(?:class|lang|style|size|face|[ovwxp]:\w+)=(?:'[^']*'|""[^""]*""|[^\s>]+)([^>]*)>/i,
	// emptySpans: /<span>/i
}

// var getWordsoapRegexp = cint.getValue.bind(null, wordsoapRegexes)
// var replace = cint.inContext(String.prototype.replace)
// var strip = cint.partialAt(replace, 1, '')
// var makeGlobal = cint.partialAt(regexpClone, 1, 'g')

function clean(text) {
	return text
		.replace(regexpClone(r.msoTags, 'g'), '<$1>')
		.replace(regexpClone(r.msoAttributes, 'g'), '')
		// .replace(wordsoapRegexes.emptySpan)
}

module.exports = clean
module.exports.wordsoapRegexes = r
