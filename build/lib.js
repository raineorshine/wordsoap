'use strict';
var _$9910 = require('lodash');
var regexes$9911 = {
    // Inspired by: http://tim.mackey.ie/2005/11/23/CleanenHTMLUsingRegularExpressions.aspx
    // msoTags: /<[\/]?(font|span|xml|del|ins|[ovwxp]:\w+)[^>]*?>/.source,
    // https://regex101.com/r/lJ0nQ6
    msoAttributes: /<(\w+)(?:\s+(?:class|lang|style|size|face|xmlns:\w+|[ovwxp\w+]))=(?:'[^']*'|""[^""]*""|[^\s>]+)(?:[^>]*)>/.source,
    nbsp: /(<[^\s>]*>&nbsp;<\/[^\s>]*>)|&nbsp;/.source,
    // https://regex101.com/r/sD4vJ8
    conditional: /<!-*\[\w+ [^\]]*]>|<!\[end[^\]]*\]-*>/.source,
    htmlComments: /<!--.*-->/.source,
    emptyTags: /<(span|a|[ovwxp]:\w+)[^>]*><\/[^>]+>/.source,
    repeatTags: /(?:(<\/?span>){2,})/.source,
    deadTags: /<(xml|head)>[\S\s]*<\/(xml|head)>/.source
};
var // compile the regexes
regexesCompiled$9914 = _$9910.mapValues(regexes$9911, function (a$9918) {
    return new RegExp(a$9918, 'gi');
});
var clean$9917 = function (a$9919) {
    return a$9919.replace(regexesCompiled$9914.msoAttributes, '<$1>').replace(regexesCompiled$9914.nbsp, '').replace(regexesCompiled$9914.conditional, '').replace(regexesCompiled$9914.htmlComments, '').replace(regexesCompiled$9914.emptyTags, '').replace(regexesCompiled$9914.deadTags, '').replace(regexesCompiled$9914.repeatTags, '$1').replace(new RegExp('&quot;', 'gi'), '"');
};
// regex literals break sweetjs here
module.exports = clean$9917;
module.exports.regexes = regexes$9911;
module.exports.regexesCompiled = regexesCompiled$9914;
//# sourceMappingURL=lib.js.map