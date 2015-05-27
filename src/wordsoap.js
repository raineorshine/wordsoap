var com = require('commander')
var stdin = require('get-stdin-promise')
var wordsoap = require('./lib.js')
var pkg = require('../package.json')

var extendedHelp = [
	'',
	'',
	pkg.description,
	'',
	'Reads from stdin:',
	'$ cat msword_garbage.html | wordsoap'
].join('\n  ')

com
	.version(pkg.version)
	.usage(extendedHelp)
	.parse(process.argv)

stdin
	.then(console.log +. wordsoap)
	.catch(console.log)

