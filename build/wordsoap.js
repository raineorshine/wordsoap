var com$47170 = require('commander');
var stdin$47171 = require('get-stdin-promise');
var wordsoap$47172 = require('./lib.js');
var pkg$47173 = require('../package.json');
var extendedHelp$47174 = [
    '',
    '',
    pkg$47173.description,
    '',
    'Reads from stdin:',
    '$ cat msword_garbage.html | wordsoap'
].join('\n  ');
com$47170.version(pkg$47173.version).usage(extendedHelp$47174).parse(process.argv);
stdin$47171.then(function () {
    return console.log(wordsoap$47172.apply(this, arguments));
}).catch(console.log);
//# sourceMappingURL=wordsoap.js.map