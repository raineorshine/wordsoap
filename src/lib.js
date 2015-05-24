'use strict'

var _ = require('lodash')

var regexes = {
	// Inspired by: http://tim.mackey.ie/2005/11/23/CleanWordHTMLUsingRegularExpressions.aspx

	deadAttributes: /(?:\s+(?:id|class|lang|style|size|face|link|vlink|align|clear|xmlns(?::\w+|[ovwxp\w+])?))=(?:'[^']*'|""[^""]*""|[^\s>]+)/.source,

	nbsp: /(<[^\s>]*>&nbsp;<\/[^\s>]*>)|&nbsp;/.source,

	// https://regex101.com/r/sD4vJ8
	conditional: /<!-*\[\w+ [^\]]*]>|<!\[end[^\]]*\]-*>/.source,

	htmlComments: /<!--.*-->/.source,

	oleLink: /<a\s+name="OLE_LINK\d+">((?:.|[\n])*?)<\/a>/.source,

	emptyTags: /<(?:p|i|b)[^>]*><\/[^>]+>/.source,

	emptyAttributes: /\s+\w+=["']{2}/.source,

	deadTags: /<\/?(span|div|[ovwxp]:\w+)[^>]*>/.source,

	deadTagsAndContent: /<(xml|head)>[\S\s]*<\/(xml|head)>/.source,

	contentLine: /(.)\n(?!\n)/.source,

	url: /((?:(?:https?:\/\/)|(?:www\.))[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b(?:[-a-zA-Z0-9@:%_\+~#?&/=]*(?:.\w+)?))/.source,

}

// compile the regexes
var regexesCompiled = _.mapValues(regexes, λ[new RegExp(#, 'gi')])

var clean = λ
	.replace(regexesCompiled.deadAttributes, '')
	.replace(regexesCompiled.nbsp, '')
	.replace(regexesCompiled.conditional, '')
	.replace(regexesCompiled.htmlComments, '')
	.replace(regexesCompiled.emptyAttributes, '')
	.replace(regexesCompiled.deadTags, '')
	.replace(regexesCompiled.deadTagsAndContent, '')
	.replace(regexesCompiled.oleLink, '$1')
	.replace(regexesCompiled.emptyTags, '') // after emptyAttributes and deadTags
	.replace(regexesCompiled.contentLine, '$1 ')
	.replace(regexesCompiled.url, '<a href="$1">$1</a>')
	.replace(new RegExp('\n{3,}', 'gi'), '\n\n') // replace 3 or more newlines w/2
	.replace(new RegExp('&quot;', 'gi'), '"') // regex literals break sweetjs here

module.exports = clean
module.exports.regexes = regexes
module.exports.regexesCompiled = regexesCompiled
