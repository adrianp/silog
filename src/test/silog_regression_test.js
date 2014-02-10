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

/* global describe: false */
/* global it: false */

/*jshint nonew: false */

var assert = require('assert');
var silog = require('../silog.js');

describe('Issue17', function(){
    it('should not complain when logging a circular JSON', function() {
        var o = {};
        o.a = o;
        var l = new silog.Logger({loggers: [silog.consoleLogger]});
        assert.doesNotThrow(function() {
            l.i('mocha-tag', 'Hello World!', o);
        });
    });
});

describe('Issue21', function(){
    it('should not complain when calling the constr with non-object params',
       function() {
        assert.doesNotThrow(function() {
            new silog.Logger();
            new silog.Logger(undefined);
        });
    });

    it('should complain when calling the constr with invalid parameters',
       function() {
        assert.throws(function() {
            new silog.Logger(null);
            new silog.Logger(false);
            new silog.Logger([]);
            new silog.Logger(1);
            new silog.Logger('hello');
        }, Error);
    });
});