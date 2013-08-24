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

    /**
     * [LEVEL description]
     * @type {Object}
     */
    var LEVEL = {ASSERT: [7, 'ASSERT'],
                 ERROR: [6, 'ERROR'],
                 WARN: [5, 'WARN'],
                 INFO: [4, 'INFO'],
                 DEBUG: [3, 'DEBUG'],
                 VERBOSE: [2, 'VERBOSE'] };

    /**
     * [DT_FORMAT description]
     * @type {Object}
     */
    var DT_FORMAT = {DATE_TIME: 0,
                     DATE: 1,
                     TIME: 2 };

    /**
     * [LOCAL_TAG description]
     * @type {String}
     */
    var LOCAL_TAG = 'silog';

    /**
     * [checkLevel description]
     * @param  {[type]} level [description].
     * @return {[type]}       [description].
     */
    function checkLevel(level) {
        if (!Array.isArray(level) ||
            typeof level[0] !== 'number' ||
            typeof level[1] !== 'string') {
            // TODO: check if level exists in LEVEL
            return false;
        }
        return true;
    }

    /**
     * [leadingZero description]
     * @param  {[type]} n [description].
     * @return {[type]}   [description].
     */
    function leadingZero(n) {
        return (n < 10 ? '0' : '') + n;
    }

    /**
     * [getFormattedTimestamp description]
     * @param  {[type]} format [description].
     * @return {[type]}        [description].
     */
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
     * Constructor of the main class responsible for the logging logic.
     *
     * @param {Object} p configuration parameters, as follows (if not specified
     *                   by user, defaults will be used):
     *                   level: one of the elements of silog().LEVEL; only
     *                          messages above it will be logged; default =
     *                          LEVEL.INFO
     *                   tsFormat: one of the elements of silog().DT_FORMAT;
     *                             specifies how the date and time should be
     *                             logged; default = DT_FORMAT.DATE_TIME
     *                   loggers: array of functions that should be used for
     *                            writing the logged messages to output; the
     *                            signature of these function should be
     *                            function write(message)
     *                            where message is the message to be written; by
     *                            default, console.log is used.
     * @return {?Object} an instance of the Logger is instantiation was
     *                   successful, null otherwise.
     * @this {Object} the Logger instance.
     * @constructor
     */
    function Logger(p) {

        // default settings
        this.level = LEVEL.INFO;
        this.tsFormat = DT_FORMAT.DATE_TIME;
        this.loggers = [console.log];

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
    // nodejs
    exports.silog = silog;
} else {
    // browser
    silog = silog();
}
