'use strict';
var _$10494 = require('lodash');
var regexes$10495 = {
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
    deadTagsAndContent: /<(xml|head)>[\S\s]*<\/(xml|head)>/.source
};
var // compile the regexes
regexesCompiled$10498 = _$10494.mapValues(regexes$10495, function (a$10502) {
    return new RegExp(a$10502, 'gi');
});
var clean$10501 = function (a$10503) {
    return a$10503.replace(regexesCompiled$10498.msoAttributes, '<$1>').replace(regexesCompiled$10498.nbsp, '').replace(regexesCompiled$10498.conditional, '').replace(regexesCompiled$10498.htmlComments, '').replace(regexesCompiled$10498.deadTags, '').replace(regexesCompiled$10498.deadTagsAndContent, '').replace(regexesCompiled$10498.repeatTags, '$1').replace(new RegExp('&quot;', 'gi'), '"');
};
// regex literals break sweetjs here
module.exports = clean$10501;
module.exports.regexes = regexes$10495;
module.exports.regexesCompiled = regexesCompiled$10498;
//# sourceMappingURL=lib.js.map