'use strict';
var _$22174 = require('lodash');
var regexes$22175 = {
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
    url: /((?:(?:https?:\/\/)|(?:www\.))[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b(?:[-a-zA-Z0-9@:%_\+~#?&/=]*(?:.\w+)?))/.source
};
var // compile the regexes
regexesCompiled$22178 = _$22174.mapValues(regexes$22175, function (a$22182) {
    return new RegExp(a$22182, 'gi');
});
var clean$22181 = function (a$22183) {
    return a$22183.replace(regexesCompiled$22178.deadAttributes, '').replace(regexesCompiled$22178.nbsp, '').replace(regexesCompiled$22178.conditional, '').replace(regexesCompiled$22178.htmlComments, '').replace(regexesCompiled$22178.emptyAttributes, '').replace(regexesCompiled$22178.deadTags, '').replace(regexesCompiled$22178.deadTagsAndContent, '').replace(regexesCompiled$22178.oleLink, '$1').replace(regexesCompiled$22178.emptyTags, '').replace(// after emptyAttributes and deadTags
    regexesCompiled$22178.contentLine, '$1 ').replace(regexesCompiled$22178.url, '<a href="$1">$1</a>').replace(new RegExp('\n{3,}', 'gi'), '\n\n').replace(// replace 3 or more newlines w/2
    new RegExp('&quot;', 'gi'), '"');
};
// regex literals break sweetjs here
module.exports = clean$22181;
module.exports.regexes = regexes$22175;
module.exports.regexesCompiled = regexesCompiled$22178;
//# sourceMappingURL=lib.js.map