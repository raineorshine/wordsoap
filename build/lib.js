'use strict';
var _$45870 = require('lodash');
var cheerio$45871 = require('cheerio');
var regexes$45872 = {
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
regexesCompiled$45875 = _$45870.mapValues(regexes$45872, function (a$45884) {
    return new RegExp(a$45884, 'gi');
});
var // clean, first parse (before cheerio)
clean1$45878 = function (a$45885) {
    return a$45885.replace(regexesCompiled$45875.deadAttributes, '').replace(regexesCompiled$45875.nbsp, '').replace(regexesCompiled$45875.conditional, '').replace(regexesCompiled$45875.htmlComments, '').replace(regexesCompiled$45875.emptyAttributes, '').replace(regexesCompiled$45875.deadTagsAndContent, '').replace(regexesCompiled$45875.oleLink, '$1').replace(regexesCompiled$45875.contentLine, '$1 ');
};
var // second pass (after cheerio)
clean2$45881 = function (a$45886) {
    return a$45886.replace(regexesCompiled$45875.deadTags, '').replace(regexesCompiled$45875.classAttributes, '').replace(regexesCompiled$45875.emptyTags, '').replace(// after emptyAttributes and deadTags
    regexesCompiled$45875.url, '<a href="$1">$1</a>').replace(new RegExp('&quot;', 'gi'), '"').replace(new RegExp('\n{3,}', 'gi'), '\n\n');
};
var // replace 3 or more newlines w/2
// cleaning operations that
domClean$45882 = function (html$45887) {
    var $$45888 = cheerio$45871.load(html$45887);
    // only works on elements with static text content (in order to handle nested elements)
    $$45888.prototype.replaceTag = function (newTag$45889) {
        this.each(function () {
            var newEl$45890 = $$45888('<' + newTag$45889 + '>').html($$45888(this).text());
            $$45888(this).after(newEl$45890);
        });
        this.remove();
    };
    $$45888('.MsoEndnoteReference').replaceTag('sup');
    return $$45888.html();
};
var clean$45883 = _$45870.flow(clean1$45878, domClean$45882, clean2$45881);
module.exports = clean$45883;
module.exports.regexes = regexes$45872;
module.exports.regexesCompiled = regexesCompiled$45875;
//# sourceMappingURL=lib.js.map