var com$883 = require('commander');
var stdin$884 = require('get-stdin-promise');
var wordsoap$885 = require('./lib.js');
var pkg$886 = require('../package.json');
var extendedHelp$887 = [
    '',
    '',
    pkg$886.description,
    '',
    'Reads from stdin:',
    '$ cat msword_garbage.html | wordsoap'
].join('\n  ');
com$883.version(pkg$886.version).usage(extendedHelp$887).parse(process.argv);
stdin$884.then(function () {
    return console.log(wordsoap$885.apply(this, arguments));
}).then(null, console.log);
//# sourceMappingURL=wordsoap.js.map