'use strict';
var _$15836 = require('lodash');
var cheerio$15837 = require('cheerio');
var iconv$15838 = require('iconv-lite');
var regexes$15839 = {
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
    url: /((?:(?:https?:\/\/)|(?:www\.))[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b(?:[-a-zA-Z0-9@:%_\+~#?&\/=]*(?:.\w+)?))/.source
};
var // compile the regexes
regexesCompiled$15842 = _$15836.mapValues(regexes$15839, function (a$15853) {
    return new RegExp(a$15853, 'gi');
});
var // first parse (before cheerio)
clean1$15845 = function (a$15854) {
    return a$15854.replace(regexesCompiled$15842.deadAttributes, '').replace(regexesCompiled$15842.nbsp, '').replace(regexesCompiled$15842.conditional, '').replace(regexesCompiled$15842.htmlComments, '').replace(regexesCompiled$15842.emptyAttributes, '').replace(regexesCompiled$15842.deadTagsAndContent, '').replace(regexesCompiled$15842.oleLink, '$1').replace(regexesCompiled$15842.contentLine, '$1 ');
};
var // second pass (after cheerio)
clean2$15848 = function (a$15855) {
    return a$15855.replace(regexesCompiled$15842.deadTags, '').replace(regexesCompiled$15842.classAttributes, '').replace(regexesCompiled$15842.emptyTags, '').replace(// after emptyAttributes and deadTags
    regexesCompiled$15842.url, '<a href="$1">$1</a>').replace(new RegExp('&quot;', 'gi'), '"').replace(new RegExp('\n{3,}', 'gi'), '\n\n');
};
var // replace 3 or more newlines w/2
// Because regexes cannot match nested expressions (such as the MsoEndNoteReference elements that delineate footnotes), we must parse the HTML. Cheerio gives us the parsing and querying that we need without the heaviness of a full simulated DOM like jsdom.
domClean$15849 = function (html$15856) {
    var $$15857 = cheerio$15837.load(html$15856, { decodeEntities: false });
    // only works on elements with static text content (in order to handle nested elements)
    $$15857.prototype.replaceTag = function (newTag$15858) {
        this.each(function () {
            var newEl$15859 = $$15857('<' + newTag$15858 + '>').html($$15857(this).text());
            $$15857(this).after(newEl$15859);
        });
        this.remove();
    };
    $$15857('.MsoEndnoteReference').replaceTag('sup');
    $$15857('html').prepend('<head><meta charset="utf-8"></head>');
    return $$15857.html();
};
var clean$15852 = function () {
    return function () {
        return clean2$15848(domClean$15849.apply(this, arguments));
    }(clean1$15845.apply(this, arguments));
};
module.exports = clean$15852;
module.exports.regexes = regexes$15839;
module.exports.regexesCompiled = regexesCompiled$15842;
//# sourceMappingURL=lib.js.map