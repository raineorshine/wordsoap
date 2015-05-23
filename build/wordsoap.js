var com$7887 = require('commander');
var stdin$7888 = require('get-stdin-promise');
var wordsoap$7889 = require('./lib.js');
var pkg$7890 = require('../package.json');
var extendedHelp$7891 = [
    '',
    '',
    pkg$7890.description,
    '',
    'Reads from stdin:',
    '$ cat msword_garbage.html | wordsoap'
].join('\n  ');
com$7887.version(pkg$7890.version).usage(extendedHelp$7891).parse(process.argv);
stdin$7888.then(function () {
    return console.log(wordsoap$7889.apply(this, arguments));
}).then(null, console.log);
//# sourceMappingURL=wordsoap.js.map