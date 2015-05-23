'use strict';
var _$20422 = require('lodash');
var regexes$20423 = {
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
    contentLine: /(.)\n(?!\n)/.source
};
var // compile the regexes
regexesCompiled$20426 = _$20422.mapValues(regexes$20423, function (a$20430) {
    return new RegExp(a$20430, 'gi');
});
var clean$20429 = function (a$20431) {
    return a$20431.replace(regexesCompiled$20426.deadAttributes, '').replace(regexesCompiled$20426.nbsp, '').replace(regexesCompiled$20426.conditional, '').replace(regexesCompiled$20426.htmlComments, '').replace(regexesCompiled$20426.emptyAttributes, '').replace(regexesCompiled$20426.deadTags, '').replace(regexesCompiled$20426.deadTagsAndContent, '').replace(regexesCompiled$20426.oleLink, '$1').replace(regexesCompiled$20426.emptyTags, '').replace(// after emptyAttributes and deadTags
    regexesCompiled$20426.contentLine, '$1 ').replace(new RegExp('\n{3,}', 'gi'), '\n\n').replace(// replace 3 or more newlines w/2
    new RegExp('&quot;', 'gi'), '"');
};
// regex literals break sweetjs here
module.exports = clean$20429;
module.exports.regexes = regexes$20423;
module.exports.regexesCompiled = regexesCompiled$20426;
//# sourceMappingURL=lib.js.map