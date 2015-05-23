'use strict';
var _$7866 = require('lodash');
var regexes$7867 = {
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
regexesCompiled$7870 = _$7866.mapValues(regexes$7867, function (a$7874) {
    return new RegExp(a$7874, 'gi');
});
var clean$7873 = function (a$7875) {
    return a$7875.replace(regexesCompiled$7870.msoAttributes, '<$1>').replace(regexesCompiled$7870.nbsp, '').replace(regexesCompiled$7870.conditional, '').replace(regexesCompiled$7870.htmlComments, '').replace(regexesCompiled$7870.emptyTags, '').replace(regexesCompiled$7870.deadTags, '').replace(regexesCompiled$7870.repeatTags, '$1').replace(new RegExp('&quot;', 'gi'), '"');
};
// regex literals break sweetjs here
module.exports = clean$7873;
module.exports.regexes = regexes$7867;
module.exports.regexesCompiled = regexesCompiled$7870;
//# sourceMappingURL=lib.js.map