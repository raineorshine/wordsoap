var com$25699 = require('commander');
var stdin$25700 = require('get-stdin-promise');
var wordsoap$25701 = require('./lib.js');
var pkg$25702 = require('../package.json');
var extendedHelp$25703 = [
    '',
    '',
    pkg$25702.description,
    '',
    'Reads from stdin:',
    '$ cat msword_garbage.html | wordsoap'
].join('\n  ');
com$25699.version(pkg$25702.version).usage(extendedHelp$25703).parse(process.argv);
stdin$25700.then(function () {
    return console.log(wordsoap$25701.apply(this, arguments));
}).catch(console.log);
//# sourceMappingURL=wordsoap.js.map