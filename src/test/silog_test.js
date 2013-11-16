'use strict';

/* global describe: false */
/* global it: false */

var assert = require('assert');
var silog = require('../silog.js').silog;

describe('Array', function(){
    describe('log_level_check', function(){
        it('should be ASSERT when level is 7', function(){
            assert.equal(7, silog.level.ASSERT[0]);
        });
    });
});
