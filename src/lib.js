'use strict'

var _ = require('lodash')

var regexes = {
	// Inspired by: http://tim.mackey.ie/2005/11/23/CleanWordHTMLUsingRegularExpressions.aspx
	// msoTags: /<[\/]?(font|span|xml|del|ins|[ovwxp]:\w+)[^>]*?>/.source,

	// https://regex101.com/r/lJ0nQ6
	msoAttributes: /<(\w+)(?:\s+(?:class|lang|style|size|face|xmlns:\w+|[ovwxp\w+]))=(?:'[^']*'|""[^""]*""|[^\s>]+)(?:[^>]*)>/.source,

	nbsp: /(<[^\s>]*>&nbsp;<\/[^\s>]*>)|&nbsp;/.source,

	// https://regex101.com/r/sD4vJ8
	conditional: /<!-*\[\w+ [^\]]*]>|<!\[end[^\]]*\]-*>/.source,

	htmlComments: /<!--.*-->/.source,

	repeatTags: /(?:(<\/?span>){2,})/.source,

	deadTags: /<\/?(span|[ovwxp]:\w+)[^>]*>/.source,

	deadTagsAndContent: /<(xml|head)>[\S\s]*<\/(xml|head)>/.source,

}

// compile the regexes
var regexesCompiled = _.mapValues(regexes, λ[new RegExp(#, 'gi')])

var clean = λ
		// .replace(new RegExp(r.msoTags, 'gi'), '')
		.replace(regexesCompiled.msoAttributes, '<$1>')
		.replace(regexesCompiled.nbsp, '')
		.replace(regexesCompiled.conditional, '')
		.replace(regexesCompiled.htmlComments, '')
		.replace(regexesCompiled.deadTags, '')
		.replace(regexesCompiled.deadTagsAndContent, '')
		.replace(regexesCompiled.repeatTags, '$1')
		.replace(new RegExp('&quot;', 'gi'), '"') // regex literals break sweetjs here

module.exports = clean
module.exports.regexes = regexes
module.exports.regexesCompiled = regexesCompiled
