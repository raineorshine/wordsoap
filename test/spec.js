'use strict'
var assert = require('chai').assert
var wordsoap = require('../build/lib.js')

it('should remove class, lang, style, face, and o:x attributes', function () {
	var dirtyHtml = "<p class=MsoNormal style='mso-outline-level:1'><b style='mso-bidi-font-weight:normal'><i style='font-size:12.0pt;line-height:107%;font-family:\"Times New Roman\"'>Hello</i></b></p>";
	// assert.equal(wordsoap(dirtyHtml), '<p><b><i>Hello</i></b></p>');
	assert.equal(wordsoap('<p><i\nclass=MsoEndnoteReference>TEST</i></p>'), '<p><i>TEST</i></p>')
	assert.equal(wordsoap('<a style="mso-endnote-id:edn1" href="#_edn1" name="_ednref1">'), '<a href="#_edn1" name="_ednref1">', 'should not remove other attributes')
})

it('should remove &nbsp; with enclosing tags', function () {
	assert.equal(wordsoap('<p>&nbsp;Hello</p>'), '<p>Hello</p>')
	assert.equal(wordsoap('<p><b>&nbsp;</b>Hello</p>'), '<p>Hello</p>')
})

it('should remove conditional comments', function () {
	assert.equal(wordsoap('<p><!--[if gte mso 9]>Hello<![endif]--></p>'), '<p>Hello</p>')
	assert.equal(wordsoap('<p><![if !supportFootnotes]>Hello<![endif]></p>'), '<p>Hello</p>')
})

it('should remove HTML comments', function () {
	assert.equal(wordsoap('<p><!-- TEST -->Hello</p>'), '<p>Hello</p>')
})

it('should remove empty spans and o:x', function () {
	assert.equal(wordsoap('<p><span></span>Hello</p>'), '<p>Hello</p>')
	assert.equal(wordsoap('<p><o:p></o:p>Hello</p>'), '<p>Hello</p>')
})

it('should remove all spans', function () {
	assert.equal(wordsoap('<p><span><span>Hello</span></span></p>'), '<p>Hello</p>');
})

it('should remove xml and head elements and their content completely', function () {
	assert.equal(wordsoap('<p><xml>TEST</xml>Hello</p>'), '<p>Hello</p>')
	assert.equal(wordsoap('<p><head>TEST</head>Hello</p>'), '<p>Hello</p>')
})

it('should replace &quot; with a " character', function () {
	assert.equal(wordsoap('&quot;Hello&quot;'), '"Hello"')
})

