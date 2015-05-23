'use strict';
var _$14874 = require('lodash');
var regexes$14875 = {
    // Inspired by: http://tim.mackey.ie/2005/11/23/CleanWordHTMLUsingRegularExpressions.aspx
    deadAttributes: /(?:\s+(?:class|lang|style|size|face|link|vlink|align|xmlns(?::\w+|[ovwxp\w+])?))=(?:'[^']*'|""[^""]*""|[^\s>]+)/.source,
    nbsp: /(<[^\s>]*>&nbsp;<\/[^\s>]*>)|&nbsp;/.source,
    // https://regex101.com/r/sD4vJ8
    conditional: /<!-*\[\w+ [^\]]*]>|<!\[end[^\]]*\]-*>/.source,
    htmlComments: /<!--.*-->/.source,
    deadTags: /<\/?(span|br|[ovwxp]:\w+)[^>]*>/.source,
    deadTagsAndContent: /<(xml|head)>[\S\s]*<\/(xml|head)>/.source
};
var // compile the regexes
regexesCompiled$14878 = _$14874.mapValues(regexes$14875, function (a$14882) {
    return new RegExp(a$14882, 'gi');
});
var clean$14881 = function (a$14883) {
    return a$14883.replace(regexesCompiled$14878.deadAttributes, '').replace(regexesCompiled$14878.nbsp, '').replace(regexesCompiled$14878.conditional, '').replace(regexesCompiled$14878.htmlComments, '').replace(regexesCompiled$14878.deadTags, '').replace(regexesCompiled$14878.deadTagsAndContent, '').replace(new RegExp('\n{3,}', 'gi'), '\n\n').replace(// replace 3 or more newlines w/2
    new RegExp('&quot;', 'gi'), '"');
};
// regex literals break sweetjs here
module.exports = clean$14881;
module.exports.regexes = regexes$14875;
module.exports.regexesCompiled = regexesCompiled$14878;
//# sourceMappingURL=lib.js.map