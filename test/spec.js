'use strict';
var assert = require('insist');
var wordsoap = require('../index.js');

it('should clean up some dirty html', function () {
	var dirtyHtml = "<p class=MsoNormal style='mso-outline-level:1'><b style='mso-bidi-font-weight:normal'><span style='font-size:12.0pt;line-height:107%;font-family:\"Times New Roman\"'><o:p>&nbsp;</o:p></span></b></p>";
	assert.equal(wordsoap(dirtyHtml), '');
});
