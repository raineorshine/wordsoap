'use strict';
var _$47135 = require('lodash');
var cheerio$47136 = require('cheerio');
var regexes$47137 = {
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
    url: /((?:(?:https?:\/\/)|(?:www\.))[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b(?:[-a-zA-Z0-9@:%_\+~#?&/=]*(?:.\w+)?))/.source
};
var // compile the regexes
regexesCompiled$47140 = _$47135.mapValues(regexes$47137, function (a$47151) {
    return new RegExp(a$47151, 'gi');
});
var // first parse (before cheerio)
clean1$47143 = function (a$47152) {
    return a$47152.replace(regexesCompiled$47140.deadAttributes, '').replace(regexesCompiled$47140.nbsp, '').replace(regexesCompiled$47140.conditional, '').replace(regexesCompiled$47140.htmlComments, '').replace(regexesCompiled$47140.emptyAttributes, '').replace(regexesCompiled$47140.deadTagsAndContent, '').replace(regexesCompiled$47140.oleLink, '$1').replace(regexesCompiled$47140.contentLine, '$1 ');
};
var // second pass (after cheerio)
clean2$47146 = function (a$47153) {
    return a$47153.replace(regexesCompiled$47140.deadTags, '').replace(regexesCompiled$47140.classAttributes, '').replace(regexesCompiled$47140.emptyTags, '').replace(// after emptyAttributes and deadTags
    regexesCompiled$47140.url, '<a href="$1">$1</a>').replace(new RegExp('&quot;', 'gi'), '"').replace(new RegExp('\n{3,}', 'gi'), '\n\n');
};
var // replace 3 or more newlines w/2
// cleaning operations that
domClean$47147 = function (html$47154) {
    var $$47155 = cheerio$47136.load(html$47154);
    // only works on elements with static text content (in order to handle nested elements)
    $$47155.prototype.replaceTag = function (newTag$47156) {
        this.each(function () {
            var newEl$47157 = $$47155('<' + newTag$47156 + '>').html($$47155(this).text());
            $$47155(this).after(newEl$47157);
        });
        this.remove();
    };
    $$47155('.MsoEndnoteReference').replaceTag('sup');
    return $$47155.html();
};
var clean$47150 = function () {
    return function () {
        return clean2$47146(domClean$47147.apply(this, arguments));
    }(clean1$47143.apply(this, arguments));
};
module.exports = clean$47150;
module.exports.regexes = regexes$47137;
module.exports.regexesCompiled = regexesCompiled$47140;
//# sourceMappingURL=lib.js.map