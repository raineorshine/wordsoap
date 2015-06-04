var com$15872 = require('commander');
var stdin$15873 = require('get-stdin-promise');
var wordsoap$15874 = require('./lib.js');
var pkg$15875 = require('../package.json');
var extendedHelp$15876 = [
    '',
    '',
    pkg$15875.description,
    '',
    'Reads from stdin:',
    '$ cat msword_garbage.html | wordsoap'
].join('\n  ');
com$15872.version(pkg$15875.version).usage(extendedHelp$15876).parse(process.argv);
stdin$15873.then(function () {
    return console.log(wordsoap$15874.apply(this, arguments));
}).catch(console.log);
//# sourceMappingURL=wordsoap.js.map