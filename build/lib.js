'use strict';
var _$25678 = require('lodash');
var regexes$25679 = {
    // Inspired by: http://tim.mackey.ie/2005/11/23/CleanWordHTMLUsingRegularExpressions.aspx
    // endNote: /<span\s+class=MsoEndnoteReference>([^]*)<\/span>/.source,
    deadAttributes: /(?:\s+(?:id|lang|style|size|face|link|vlink|align|clear|xmlns(?::\w+|[ovwxp\w+])?))=(?:'[^']*'|""[^""]*""|[^\s>]+)/.source,
    nbsp: /(<[^\s>]*>&nbsp;<\/[^\s>]*>)|&nbsp;/.source,
    // https://regex101.com/r/sD4vJ8
    conditional: /<!-*\[\w+ [^\]]*]>|<!\[end[^\]]*\]-*>/.source,
    htmlComments: /<!--.*-->/.source,
    oleLink: /<a\s+name="OLE_LINK\d+">((?:.|[\n])*?)<\/a>/.source,
    emptyTags: /<(?:p|i|b)[^>]*><\/[^>]+>/.source,
    emptyAttributes: /\s+\w+=["']{2}/.source,
    deadTags: /<\/?(div|[ovwxp]:\w+)[^>]*>/.source,
    // deadTags: /<\/?(span(?!\s+class=MsoEndnoteReference)|div|[ovwxp]:\w+)[^>]*>/.source,
    deadTagsAndContent: /<(xml|head)>[\S\s]*<\/(xml|head)>/.source,
    contentLine: /(.)\n(?!\n)/.source,
    url: /((?:(?:https?:\/\/)|(?:www\.))[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b(?:[-a-zA-Z0-9@:%_\+~#?&/=]*(?:.\w+)?))/.source
};
var // compile the regexes
regexesCompiled$25682 = _$25678.mapValues(regexes$25679, function (a$25686) {
    return new RegExp(a$25686, 'gi');
});
var clean$25685 = function (a$25687) {
    return a$25687.replace(regexesCompiled$25682.deadAttributes, '').replace(regexesCompiled$25682.nbsp, '').replace(regexesCompiled$25682.conditional, '').replace(regexesCompiled$25682.htmlComments, '').replace(regexesCompiled$25682.emptyAttributes, '').replace(regexesCompiled$25682.deadTags, '').replace(regexesCompiled$25682.deadTagsAndContent, '').replace(regexesCompiled$25682.oleLink, '$1').replace(regexesCompiled$25682.emptyTags, '').replace(// after emptyAttributes and deadTags
    regexesCompiled$25682.contentLine, '$1 ').replace(regexesCompiled$25682.url, '<a href="$1">$1</a>').replace(new RegExp('\n{3,}', 'gi'), '\n\n').replace(// replace 3 or more newlines w/2
    new RegExp('&quot;', 'gi'), '"');
};
// regex literals break sweetjs here
module.exports = clean$25685;
module.exports.regexes = regexes$25679;
module.exports.regexesCompiled = regexesCompiled$25682;
//# sourceMappingURL=lib.js.map