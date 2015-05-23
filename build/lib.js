'use strict';
var _$14290 = require('lodash');
var regexes$14291 = {
    // Inspired by: http://tim.mackey.ie/2005/11/23/CleanWordHTMLUsingRegularExpressions.aspx
    deadAttributes: /(?:\s+(?:class|lang|style|size|face|link|vlink|align|xmlns(?::\w+|[ovwxp\w+])?))=(?:'[^']*'|""[^""]*""|[^\s>]+)/.source,
    nbsp: /(<[^\s>]*>&nbsp;<\/[^\s>]*>)|&nbsp;/.source,
    // https://regex101.com/r/sD4vJ8
    conditional: /<!-*\[\w+ [^\]]*]>|<!\[end[^\]]*\]-*>/.source,
    htmlComments: /<!--.*-->/.source,
    deadTags: /<\/?(span|[ovwxp]:\w+)[^>]*>/.source,
    deadTagsAndContent: /<(xml|head)>[\S\s]*<\/(xml|head)>/.source
};
var // compile the regexes
regexesCompiled$14294 = _$14290.mapValues(regexes$14291, function (a$14298) {
    return new RegExp(a$14298, 'gi');
});
var clean$14297 = function (a$14299) {
    return a$14299.replace(regexesCompiled$14294.deadAttributes, '').replace(regexesCompiled$14294.nbsp, '').replace(regexesCompiled$14294.conditional, '').replace(regexesCompiled$14294.htmlComments, '').replace(regexesCompiled$14294.deadTags, '').replace(regexesCompiled$14294.deadTagsAndContent, '').replace(new RegExp('&quot;', 'gi'), '"');
};
// regex literals break sweetjs here
module.exports = clean$14297;
module.exports.regexes = regexes$14291;
module.exports.regexesCompiled = regexesCompiled$14294;
//# sourceMappingURL=lib.js.map