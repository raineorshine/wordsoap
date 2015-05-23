var com$9931 = require('commander');
var stdin$9932 = require('get-stdin-promise');
var wordsoap$9933 = require('./lib.js');
var pkg$9934 = require('../package.json');
var extendedHelp$9935 = [
    '',
    '',
    pkg$9934.description,
    '',
    'Reads from stdin:',
    '$ cat msword_garbage.html | wordsoap'
].join('\n  ');
com$9931.version(pkg$9934.version).usage(extendedHelp$9935).parse(process.argv);
stdin$9932.then(function () {
    return console.log(wordsoap$9933.apply(this, arguments));
}).catch(console.log);
//# sourceMappingURL=wordsoap.js.map