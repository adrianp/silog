/**
The MIT License (MIT) http://opensource.org/licenses/MIT

Copyright (c) 2013 Adrian Tudor Panescu <adrian [at] panescu [dot] com>

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

var LEVEL = { CRITICAL: [0, 'CRITICAL'],
              ERROR: [1, 'ERROR'],
              WARNING: [2, 'WARNING'],
              INFO: [3, 'INFO'],
              DEBUG: [4, 'DEBUG'] };


var DT_FORMAT = { DATE_TIME: 0,
                  DATE: 1,
                  TIME: 2 };


var CURRENT_LEVEL = LEVEL.DEBUG;


var LEVEL_SET = false;


var LOCAL_TAG = 'silog';


var DATE_TIME_FORMAT = DT_FORMAT.DATE_TIME;


function setLevel(customLevel) {
    if (!LEVEL_SET) {
        if (!customLevel instanceof Array ||
            typeof customLevel[0] !== 'number') {
                // TODO: this check is kinda shabby
                w(LOCAL_TAG, 'Invalid message level: ' + customLevel);
        } else {
            CURRENT_LEVEL = customLevel;
            LEVEL_SET = true;
        }
    } else {
        w(LOCAL_TAG, 'Logging level already set, cannot change!');
    }
    return CURRENT_LEVEL;
}


function getLevel() {
    return CURRENT_LEVEL;
}


function write(where, what) {
    // TODO: we'll want to use a switch here once we have multiple destinations
    // TODO: we should get a better return behaviour here
    if (where === 'console') {
        console.log(what);
    } else {
        w(LOCAL_TAG, 'Invalid message destination: ' + where);
        return false;
    }
    return true;
}


function log(messageLevel, tag, message) {
    if (!messageLevel instanceof Array ||
        typeof messageLevel[0] !== 'number') {
            // TODO: this check is kinda shabby
            return w(LOCAL_TAG, 'Invalid message level for: ' +
                                tag +
                                ' - ' +
                                message +
                                ' = ' +
                                messageLevel);
    }
    if (messageLevel[0] <= CURRENT_LEVEL[0] || tag === LOCAL_TAG) {
        var what = '[' + getFormattedTimestamp() + '] ';
        what += messageLevel[1] + ' - ';
        what += tag + ' - ';
        what += message;
        write('console', what);
        return what;
    } else {
        return null;
    }
}


function setTimestampFormat(format) {
    // TODO: check if format is valid
    DATE_TIME_FORMAT = format;
    return DATE_TIME_FORMAT;
}


function getTimestampFormat() {
    return DATE_TIME_FORMAT;
}

function leadingZero(n) {
    if (n < 10) {
        n = '0' + n;
    }
    return n;
}

function getFormattedTimestamp() {
    var date = new Date();
    switch (DATE_TIME_FORMAT) {
        case DT_FORMAT.DATE_TIME:
            return date.getFullYear() + '/' +
                   leadingZero(date.getMonth()) + '/' +
                   leadingZero(date.getDate()) + ' ' +
                   leadingZero(date.getHours()) + ':' +
                   leadingZero(date.getMinutes()) + ':' +
                   leadingZero(date.getSeconds());
        case DT_FORMAT.DATE:
            return date.getFullYear() + '/' +
                   leadingZero(date.getMonth()) + '/' +
                   leadingZero(date.getDate());
        case DT_FORMAT.TIME:
            return leadingZero(date.getHours()) + ':' +
                   leadingZero(date.getMinutes()) + ':' +
                   leadingZero(date.getSeconds());
        default:
            DATE_TIME_FORMAT = DT_FORMAT.DATE_TIME;
            w(LOCAL_TAG, 'Invalid date/ time format, fail-safe to default!');
            return date.getFullYear() + '/' +
                   leadingZero(date.getMonth()) + '/' +
                   leadingZero(date.getDate()) + ' ' +
                   leadingZero(date.getHours()) + ':' +
                   leadingZero(date.getMinutes()) + ':' +
                   leadingZero(date.getSeconds());
    }
}


function c(tag, message) {
    return log(LEVEL.CRITICAL, tag, message);
}


function e(tag, message) {
    return log(LEVEL.ERROR, tag, message);
}


function w(tag, message) {
    return log(LEVEL.WARNING, tag, message);
}


function i(tag, message) {
    return log(LEVEL.INFO, tag, message);
}


function d(tag, message) {
    return log(LEVEL.DEBUG, tag, message);
}


exports.level = LEVEL;
exports.setLevel = setLevel;
exports.getLevel = getLevel;
exports.tsFormat = DT_FORMAT;
exports.setTsFormat = setTimestampFormat;
exports.getTsFormat = getTimestampFormat;
exports.log = log;
exports.c = c;
exports.e = e;
exports.w = w;
exports.i = i;
exports.d = d;
