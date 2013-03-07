var simplog = require('./silog.js');

simplog.setLevel(simplog.level.DEBUG);
var TAG = 'silog_demo';

simplog.log(simplog.level.DEBUG, TAG, 'Hello world!');
