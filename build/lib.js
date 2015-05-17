'use strict';
var _$862 = require('lodash');
var regexes$863 = {
    // Inspired by: http://tim.mackey.ie/2005/11/23/CleanWordHTMLUsingRegularExpressions.aspx
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
regexesCompiled$866 = _$862.mapValues(regexes$863, function (a$870) {
    return new RegExp(a$870, 'gi');
});
var clean$869 = function (a$871) {
    return a$871.replace(regexesCompiled$866.msoAttributes, '<$1>').replace(regexesCompiled$866.nbsp, '').replace(regexesCompiled$866.conditional, '').replace(regexesCompiled$866.htmlComments, '').replace(regexesCompiled$866.emptyTags, '').replace(regexesCompiled$866.deadTags, '').replace(regexesCompiled$866.repeatTags, '$1');
};
module.exports = clean$869;
module.exports.regexes = regexes$863;
module.exports.regexesCompiled = regexesCompiled$866;
//# sourceMappingURL=lib.js.map