var silog = require('./silog.js');

silog.setLevel(silog.level.DEBUG);
var TAG = 'silog_demo';

silog.log(silog.level.DEBUG, TAG, 'Hello world!');

function log(message) {
    "use strict";
    silog.log(silog.level.DEBUG, TAG, message);
}

log('Bye world!');