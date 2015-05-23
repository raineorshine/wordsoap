var com$20443 = require('commander');
var stdin$20444 = require('get-stdin-promise');
var wordsoap$20445 = require('./lib.js');
var pkg$20446 = require('../package.json');
var extendedHelp$20447 = [
    '',
    '',
    pkg$20446.description,
    '',
    'Reads from stdin:',
    '$ cat msword_garbage.html | wordsoap'
].join('\n  ');
com$20443.version(pkg$20446.version).usage(extendedHelp$20447).parse(process.argv);
stdin$20444.then(function () {
    return console.log(wordsoap$20445.apply(this, arguments));
}).catch(console.log);
//# sourceMappingURL=wordsoap.js.map