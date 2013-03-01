var simplog = require('./simplog.js');

simplog.setLevel(simplog.level.DEBUG);
var TAG = 'simplog_demo';

simplog.log(simplog.level.DEBUG, TAG, 'Hello world!');
