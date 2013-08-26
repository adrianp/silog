'use strict';

if (typeof require !== 'undefined') {
    var silog = require('./silog.js').silog();
}

// tag that can be used to identify the origin of the messages
var T = 'silog_demo';


// the minimum level printed messages should have is now INFO
//  silog.tsFormat.TIME
var l = new silog.Logger({level: silog.level.INFO,
                          tsformat: silog.tsFormat.TIME});

l.wtf(T, 'A terrible failure!');
l.e(T, 'An error occured!', {'this' : 'is an extra test object'});
l.w(T, 'Warning!');
l.i(T, 'Hello World!');
l.d(T, 'A debug message, will not be printed.');
