'use strict';

var assert = require('assert');
var silog = require('../src/silog.js').silog;

describe('Array', function(){
    describe('#indexOf()', function(){
        it('should return -1 when the value is not present', function(){
            assert.equal(7, silog.level.ASSERT[0]);
        });
    });
});
