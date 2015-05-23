var com$14311 = require('commander');
var stdin$14312 = require('get-stdin-promise');
var wordsoap$14313 = require('./lib.js');
var pkg$14314 = require('../package.json');
var extendedHelp$14315 = [
    '',
    '',
    pkg$14314.description,
    '',
    'Reads from stdin:',
    '$ cat msword_garbage.html | wordsoap'
].join('\n  ');
com$14311.version(pkg$14314.version).usage(extendedHelp$14315).parse(process.argv);
stdin$14312.then(function () {
    return console.log(wordsoap$14313.apply(this, arguments));
}).catch(console.log);
//# sourceMappingURL=wordsoap.js.map