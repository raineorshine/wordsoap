var com$14895 = require('commander');
var stdin$14896 = require('get-stdin-promise');
var wordsoap$14897 = require('./lib.js');
var pkg$14898 = require('../package.json');
var extendedHelp$14899 = [
    '',
    '',
    pkg$14898.description,
    '',
    'Reads from stdin:',
    '$ cat msword_garbage.html | wordsoap'
].join('\n  ');
com$14895.version(pkg$14898.version).usage(extendedHelp$14899).parse(process.argv);
stdin$14896.then(function () {
    return console.log(wordsoap$14897.apply(this, arguments));
}).catch(console.log);
//# sourceMappingURL=wordsoap.js.map