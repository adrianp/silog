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
