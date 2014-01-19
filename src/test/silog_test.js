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
var silog = require('../silog.js').silog;


describe('LEVEL', function(){
    describe('check', function(){
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
    describe('check', function() {
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
    describe('sanity check', function() {
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

describe('Logger', function() {
    describe('constructor check', function() {
        it('should be fine when no parameters are sent',
            function() {
                assert.doesNotThrow(function() {
                    new silog.Logger({});
                });
            }
        );

        it('should complain when an invalid level is sent',
           function() {
            assert.throws(function() {
                new silog.Logger({level: 'foo'});
            }, Error);
        });

        it('should complain when an invalid level is sent',
           function() {
            assert.throws(function() {
                new silog.Logger({level: []});
            }, Error);
        });

        it('should complain when an invalid level is sent',
           function() {
            assert.throws(function() {
                new silog.Logger({level: [1, 2, 3]});
            }, Error);
        });

        it('should complain when an invalid level is sent',
           function() {
            assert.throws(function() {
                new silog.Logger({level: [2, 'NOT_VERBOSE']});
            }, Error);
        });

        it('should complain when an invalid level is sent',
           function() {
            assert.throws(function() {
                new silog.Logger({level: ['two', 'VERBOSE']});
            }, Error);
        });

        it('should not complain when a valid level is sent',
           function() {
            assert.doesNotThrow(function() {
                new silog.Logger({level: [4, 'INFO']});
            });
        });

        it('should not complain when a valid level is sent',
           function() {
            assert.doesNotThrow(function() {
                new silog.Logger({level: silog.level.WARN});
            });
        });

        it('should complain when an invalid tsFormat is sent',
           function() {
            assert.throws(function() {
                new silog.Logger({tsFormat: 'foo'});
            }, Error);
        });

        it('should complain when an invalid tsFormat is sent',
           function() {
            assert.throws(function() {
                new silog.Logger({tsFormat: 4});
            }, Error);
        });

        it('should not complain when an valid tsFormat is sent',
           function() {
            assert.doesNotThrow(function() {
                new silog.Logger({tsFormat: 1});
            });
        });

        it('should not complain when an valid tsFormat is sent',
           function() {
            assert.doesNotThrow(function() {
                new silog.Logger({tsFormat: silog.tsFormat.DATE_TIME});
            });
        });

        it('should not complain when a valid loggers arrays is sent',
           function() {
            assert.doesNotThrow(function() {
                new silog.Logger({loggers: [function() { return; }]});
            });
        });

        it('should complain when a invalid loggers arrays is sent',
           function() {
            assert.throws(function() {
                new silog.Logger({loggers: []});
            }, Error);
        });

        it('should complain when a invalid loggers arrays is sent',
           function() {
            assert.throws(function() {
                new silog.Logger({loggers: 'foo'});
            }, Error);
        });

        it('should complain when a invalid loggers arrays is sent',
           function() {
            assert.throws(function() {
                new silog.Logger({loggers: [function() { return; }, 1]});
            }, Error);
        });
    });  // describe constructor check

    describe('operation check', function() {
        var l = new silog.Logger({level: silog.level.INFO,
                            tsFormat: silog.tsFormat.TIME,
                            loggers: [silog.consoleLogger]});


        it('should not complain when logging something', function() {
            assert.doesNotThrow(function() {
                l.log([5, 'WARN'], 'mocha-tag', 'hello world!');
            });
        });

        it('should not complain when logging something', function() {
            assert.doesNotThrow(function() {
                l.log(silog.level.INFO, 'mocha-tag', 'hello world!',
                      {foo: 'bar'});
            });
        });

        it('should complain when using an invalid level', function() {
            assert.throws(function() {
                l.log([1, 'a', 3], 'mocha-tag', 'hello world!', {foo: 'bar'});
            }, Error);
        });

        it('should not complain when using an inexistent level', function() {
            assert.doesNotThrow(function() {
                l.log([9, 'HAHAHA'], 'mocha-tag', 'hello world!', {foo: 'bar'});
            });
        });

        it('should not complain when using the shorthands', function() {
            assert.doesNotThrow(function() {
                l.wtf('mocha-tag', 'wow');
                l.e(1, 'such logger', {});
                l.w({}, 'much tests', {foo: 'bar'});
                l.i('mocha-tag', 'so coverage', {foo: 123});
                l.d('mocha-tag', 'hello world!');
                l.v('mocha-tag', 'all the messages!', {foo: 'bar', baz: 'qux'});
            });
        });
    }); // describe operation check
});