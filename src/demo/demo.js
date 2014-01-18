/**
The MIT License (MIT) http://opensource.org/licenses/MIT

Copyright (c) 2014 Adrian-Tudor Panescu <adrian [at] panescu [dot] com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/ or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
**/

'use strict';

if (typeof require !== 'undefined') {
    // used in Node.js, in browser silog is a global from silog.js
    var silog = require('../silog.js').silog;
}

// tag that can be used to identify the origin of the messages
var T = 'silog_demo';


// the minimum level printed messages should have is now INFO
//  silog.tsFormat.TIME
var l = new silog.Logger({level: silog.level.INFO,
                          tsformat: silog.tsFormat.TIME});

l.wtf(T, 'A terrible failure!');
l.e(T, 'An error occured!', {'this' : 'is an extra test object'});
l.w(T + '/19', 'Warning at line 19!');
l.i(T, 'Hello World!');
l.d(T, 'A debug message, will not be printed.');
l.v(T, 'Way too talkative, shut up!');
