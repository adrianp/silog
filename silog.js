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


/**
 * Revealing module for silog; exposes the required public members.
 *
 * @return {Object.<string,(function|Object)>} the exported public members.
 */
var silog = function() {

    var LEVEL = {ASSERT: [7, 'ASSERT'],
                 ERROR: [6, 'ERROR'],
                 WARN: [5, 'WARN'],
                 INFO: [4, 'INFO'],
                 DEBUG: [3, 'DEBUG'],
                 VERBOSE: [2, 'VERBOSE'] };

    var DT_FORMAT = {DATE_TIME: 0,
                     DATE: 1,
                     TIME: 2 };

    var LOCAL_TAG = 'silog';


    function consoleWrite(message) {
        console.log(message);
    }

    function checkLevel(level) {
        if (!Array.isArray(level) ||
            typeof level[0] !== 'number' ||
            typeof level[1] !== 'string') {
            return false;
        }
        return true;
    }

    function leadingZero(n) {
        return (n < 10 ? '0' : '') + n;
    }

    function getFormattedTimestamp(format) {
        var date = new Date();
        switch (format) {
        case DT_FORMAT.DATE_TIME:
            return [date.getFullYear(), '/',
                    leadingZero(date.getMonth()), '/',
                    leadingZero(date.getDate()), ' ',
                    leadingZero(date.getHours()), ':',
                    leadingZero(date.getMinutes()), ':',
                    leadingZero(date.getSeconds())].join('');
        case DT_FORMAT.DATE:
            return [date.getFullYear(), '/',
                    leadingZero(date.getMonth()), '/',
                    leadingZero(date.getDate())].join('');
        case DT_FORMAT.TIME:
            return [leadingZero(date.getHours()), ':',
                    leadingZero(date.getMinutes()), ':',
                    leadingZero(date.getSeconds())].join('');
        }
    }

    /**
     * [Logger description]
     * @param {[type]} p [description].
     * @return {[type]} [description].
     * @this {[type]}.
     */
    function Logger(p) {

        // default settings
        this.level = LEVEL.INFO;
        this.tsFormat = DT_FORMAT.DATE_TIME;
        this.loggers = [consoleWrite];

        if (p.hasOwnProperty('level')) {
            if (!checkLevel(p.level)) {
                this.wtf(LOCAL_TAG, 'Invalid message level: ' + p.level);
                return null;
            } else {
                this.level = p.level;
            }
        }

        if (p.hasOwnProperty('tsformat')) {
            for (var key in DT_FORMAT) {
                if (DT_FORMAT.hasOwnProperty(key)) {
                    if (p.tsformat === DT_FORMAT[key]) {
                        this.tsFormat = p.tsformat;
                        break;
                    }
                }
            }

            if (typeof this.tsFormat === 'undefined') {
                this.wtf(LOCAL_TAG, 'Invalid date/ time format: ' + p.tsformat);
                return null;
            }
        }

        if (p.hasOwnProperty('loggers')) {
            if (Array.isArray(p.loggers)) {
                for (var i = 0, len = p.loggers.length; i < len; i++) {
                    if (typeof p.loggers[i] !== 'function') {
                        this.wtf(LOCAL_TAG,
                           'Invalid loggers: should be an array of functions');
                        return null;
                    }
                }
                this.loggers = p.loggers;
            } else {
                this.wtf(LOCAL_TAG, 'Invalid loggers: should be an array');
                return null;
            }
        }

    }


    /**
     * [ description]
     * @param  {[type]} messageLevel [description].
     * @param  {[type]} tag          [description].
     * @param  {[type]} message      [description].
     * @this {[type]}.
     */
    Logger.prototype.log = function(messageLevel, tag, message) {
        if (!checkLevel(messageLevel)) {
            this.w(LOCAL_TAG, ['Invalid message level for: ',
                                tag,
                                ' - ',
                                message,
                                ' = ',
                                messageLevel].join(''));
        }

        if (messageLevel[0] >= this.level[0]) {
            var what = ['[',
                        messageLevel[1],
                        '] - ',
                        getFormattedTimestamp(this.tsFormat),
                        ' - ',
                        tag,
                        ' - ',
                        message].join('');
            // TODO: use underscore
            for (var i = 0, len = this.loggers.length; i < len; i += 1) {
                this.loggers[i](what);
            }
        }
    };


    /**
     * [ description]
     * @param  {[type]} tag     [description].
     * @param  {[type]} message [description].
     * @this {[type]}.
     */
    Logger.prototype.wtf = function(tag, message) {
        this.log(LEVEL.ASSERT, tag, message);
    };

    /**
     * [ description]
     * @param  {[type]} tag     [description].
     * @param  {[type]} message [description].
     * @this {[type]}.
     */
    Logger.prototype.e = function(tag, message) {
        this.log(LEVEL.ERROR, tag, message);
    };

    /**
     * [ description]
     * @param  {[type]} tag     [description].
     * @param  {[type]} message [description].
     * @this {[type]}.
     */
    Logger.prototype.w = function(tag, message) {
        this.log(LEVEL.WARN, tag, message);
    };

    /**
     * [ description]
     * @param  {[type]} tag     [description].
     * @param  {[type]} message [description].
     * @this {[type]}.
     */
    Logger.prototype.i = function(tag, message) {
        this.log(LEVEL.INFO, tag, message);
    };

    /**
     * [ description]
     * @param  {[type]} tag     [description].
     * @param  {[type]} message [description].
     * @this {[type]}.
     */
    Logger.prototype.d = function(tag, message) {
        this.log(LEVEL.DEBUG, tag, message);
    };

    return {
        level: LEVEL,
        tsFormat: DT_FORMAT,
        Logger: Logger
    };
};

if (typeof exports !== 'undefined') {
    exports.silog = silog;
} else {
    silog = silog();
}
