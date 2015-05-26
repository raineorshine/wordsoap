var com$45902 = require('commander');
var stdin$45903 = require('get-stdin-promise');
var wordsoap$45904 = require('./lib.js');
var pkg$45905 = require('../package.json');
var extendedHelp$45906 = [
    '',
    '',
    pkg$45905.description,
    '',
    'Reads from stdin:',
    '$ cat msword_garbage.html | wordsoap'
].join('\n  ');
com$45902.version(pkg$45905.version).usage(extendedHelp$45906).parse(process.argv);
stdin$45903.then(function () {
    return console.log(wordsoap$45904.apply(this, arguments));
}).catch(console.log);
//# sourceMappingURL=wordsoap.js.map