var com$10515 = require('commander');
var stdin$10516 = require('get-stdin-promise');
var wordsoap$10517 = require('./lib.js');
var pkg$10518 = require('../package.json');
var extendedHelp$10519 = [
    '',
    '',
    pkg$10518.description,
    '',
    'Reads from stdin:',
    '$ cat msword_garbage.html | wordsoap'
].join('\n  ');
com$10515.version(pkg$10518.version).usage(extendedHelp$10519).parse(process.argv);
stdin$10516.then(function () {
    return console.log(wordsoap$10517.apply(this, arguments));
}).catch(console.log);
//# sourceMappingURL=wordsoap.js.map