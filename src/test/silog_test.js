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

var assert = require('assert');
var silog = require('../silog.js').silog;


describe('LEVEL', function(){
    describe('log_level_check', function(){
        // http://developer.android.com/reference/android/util/Log.html#ASSERT
        it('should be ASSERT when level is 7', function(){
            assert.strictEqual(7, silog.level.ASSERT[0]);
        });

        it('should be DEBUG when level is 3', function(){
            assert.strictEqual(3, silog.level.DEBUG[0]);
        });

        it('should be ERROR when level is 6', function(){
            assert.strictEqual(6, silog.level.ERROR[0]);
        });

        it('should be INFO when level is 4', function(){
            assert.strictEqual(4, silog.level.INFO[0]);
        });

        it('should be VERBOSE when level is 2', function(){
            assert.strictEqual(2, silog.level.VERBOSE[0]);
        });

        it('should be WARN when level is 5', function(){
            assert.strictEqual(5, silog.level.WARN[0]);
        });
    });
});


describe('DT_FORMAT', function(){
    describe('datetime_format_check', function() {
        it('should be DATE_TIME when value is 0', function() {
            assert.strictEqual(0, silog.tsFormat.DATE_TIME);
        });

        it('should be DATE when value is 1', function() {
            assert.strictEqual(1, silog.tsFormat.DATE);
        });

        it('should be TIME when value is 2', function() {
            assert.strictEqual(2, silog.tsFormat.TIME);
        });
    });
});


describe('consoleLogger', function() {
    describe('consoleLogger_sanity_check', function() {
        it('should return true when ~valid messages are to be logged',
            function() {
                assert.strictEqual(true,
                    silog.consoleLogger('test', {level: '7'}));
            }
        );

        it('should return false when invalid messages are to be logged',
            function() {
                assert.strictEqual(false,
                    silog.consoleLogger('test', {foo: 'bar'}));
            }
        );
    });
});
