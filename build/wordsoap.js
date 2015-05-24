var com$22195 = require('commander');
var stdin$22196 = require('get-stdin-promise');
var wordsoap$22197 = require('./lib.js');
var pkg$22198 = require('../package.json');
var extendedHelp$22199 = [
    '',
    '',
    pkg$22198.description,
    '',
    'Reads from stdin:',
    '$ cat msword_garbage.html | wordsoap'
].join('\n  ');
com$22195.version(pkg$22198.version).usage(extendedHelp$22199).parse(process.argv);
stdin$22196.then(function () {
    return console.log(wordsoap$22197.apply(this, arguments));
}).catch(console.log);
//# sourceMappingURL=wordsoap.js.map