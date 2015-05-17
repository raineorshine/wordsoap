'use strict';
var assert = require('chai').assert;
var wordsoap = require('../build/lib.js');

it('should remove class, lang, style, face, and o:x attributes', function () {
	var dirtyHtml = "<p class=MsoNormal style='mso-outline-level:1'><b style='mso-bidi-font-weight:normal'><span style='font-size:12.0pt;line-height:107%;font-family:\"Times New Roman\"'>Hello</span></b></p>";
	// assert.equal(wordsoap(dirtyHtml), '<p><b><span>Hello</span></b></p>');
	assert.equal(wordsoap('<p><span\nclass=MsoEndnoteReference>TEST</span></p>'), '<p><span>TEST</span></p>');
});

it('should remove &nbsp; with enclosing tags', function () {
	assert.equal(wordsoap('<p>&nbsp;Hello</p>'), '<p>Hello</p>');
	assert.equal(wordsoap('<p><b>&nbsp;</b>Hello</p>'), '<p>Hello</p>');
});

it('should remove conditional comments', function () {
	assert.equal(wordsoap('<p><!--[if gte mso 9]>Hello<![endif]--></p>'), '<p>Hello</p>');
	assert.equal(wordsoap('<p><![if !supportFootnotes]>Hello<![endif]></p>'), '<p>Hello</p>');
});

it('should remove HTML comments', function () {
	assert.equal(wordsoap('<p><!-- TEST -->Hello</p>'), '<p>Hello</p>');
});

it('should remove empty spans and o:x', function () {
	assert.equal(wordsoap('<p><span></span>Hello</p>'), '<p>Hello</p>');
	assert.equal(wordsoap('<p><o:p></o:p>Hello</p>'), '<p>Hello</p>');
});

it('should remove extra, repeate spans', function () {
	assert.equal(wordsoap('<p><span><span><span>Hello</span></span></p>'), '<p><span>Hello</span></p>');
});

it('should remove xml and head elements completely', function () {
	assert.equal(wordsoap('<p><xml>TEST</xml>Hello</p>'), '<p>Hello</p>');
	assert.equal(wordsoap('<p><head>TEST</head>Hello</p>'), '<p>Hello</p>');
});
