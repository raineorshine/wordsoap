'use strict'

var _ = require('lodash')
var cheerio = require("cheerio")

var regexes = {
	// Inspired by: http://tim.mackey.ie/2005/11/23/CleanWordHTMLUsingRegularExpressions.aspx

	// endNote: /<span\s+class=MsoEndnoteReference>([^]*)<\/span>/.source,

	deadAttributes: /(?:\s+(?:id|lang|style|size|face|link|vlink|align|clear|xmlns(?::\w+|[ovwxp\w+])?))=(?:'[^']*'|""[^""]*""|[^\s>]+)/.source,

	classAttributes: /(?:\s+(?:class))=(?:'[^']*'|""[^""]*""|[^\s>]+)/.source,

	nbsp: /(<[^\s>]*>&nbsp;<\/[^\s>]*>)|&nbsp;/.source,

	// https://regex101.com/r/sD4vJ8
	conditional: /<!-*\[\w+ [^\]]*]>|<!\[end[^\]]*\]-*>/.source,

	htmlComments: /<!--.*-->/.source,

	oleLink: /<a\s+name="OLE_LINK\d+">((?:.|[\n])*?)<\/a>/.source,

	emptyTags: /<(?:p|i|b)[^>]*>\s*<\/[^>]+>/.source,

	emptyAttributes: /\s+\w+=["']{2}/.source,

	deadTags: /<\/?(span|div|[ovwxp]:\w+)[^>]*>/.source,
	// deadTags: /<\/?(span|div|[ovwxp]:\w+)[^>]*>/.source,

	deadTagsAndContent: /<(xml|head)>[\S\s]*<\/(xml|head)>/.source,

	contentLine: /(.)\n(?!\n)/.source,

	url: /((?:(?:https?:\/\/)|(?:www\.))[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b(?:[-a-zA-Z0-9@:%_\+~#?&/=]*(?:.\w+)?))/.source,

}

// compile the regexes
var regexesCompiled = _.mapValues(regexes, λ[new RegExp(#, 'gi')])

// first parse (before cheerio)
var clean1 = λ
	// .replace(regexesCompiled.endNote, '<sup>$1</sup>')
	.replace(regexesCompiled.deadAttributes, '')
	.replace(regexesCompiled.nbsp, '')
	.replace(regexesCompiled.conditional, '')
	.replace(regexesCompiled.htmlComments, '')
	.replace(regexesCompiled.emptyAttributes, '')
	.replace(regexesCompiled.deadTagsAndContent, '')
	.replace(regexesCompiled.oleLink, '$1')
	.replace(regexesCompiled.contentLine, '$1 ')

// second pass (after cheerio)
var clean2 = λ
	// regex literals break sweetjs here
	.replace(regexesCompiled.deadTags, '')
	.replace(regexesCompiled.classAttributes, '')
	.replace(regexesCompiled.emptyTags, '') // after emptyAttributes and deadTags
	.replace(regexesCompiled.url, '<a href="$1">$1</a>')
	.replace(new RegExp('&quot;', 'gi'), '"')
	.replace(new RegExp('\n{3,}', 'gi'), '\n\n') // replace 3 or more newlines w/2

// cleaning operations that
var domClean = function(html) {

	var $ = cheerio.load(html)

	// only works on elements with static text content (in order to handle nested elements)
	$.prototype.replaceTag = function(newTag) {
		this.each(function() {
			var newEl = $('<' + newTag + '>').html($(this).text())
			$(this).after(newEl)
		})
		this.remove()
	}

	$('.MsoEndnoteReference').replaceTag('sup')
	return $.html()
}

var clean = clean1 +| domClean +| clean2

module.exports = clean
module.exports.regexes = regexes
module.exports.regexesCompiled = regexesCompiled
