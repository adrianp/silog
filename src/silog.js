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


/**
 * Revealing module for silog; exposes the required public members.
 *
 * @module silog
 * @main silog
 */
(function(exports) {

    /**
     * The logging levels used by silog; an order relation is established
     * between them, with ASSERT (7) being the highest and VERBOSE (2) the
     * lowest. If silog's level is set to X, any message with the level Y < X
     * will not be logged.
     */
    var LEVEL = {ASSERT: [7, 'ASSERT'],
                 ERROR: [6, 'ERROR'],
                 WARN: [5, 'WARN'],
                 INFO: [4, 'INFO'],
                 DEBUG: [3, 'DEBUG'],
                 VERBOSE: [2, 'VERBOSE'] };

    /**
     * The date/ time format used in the logged messages.
     */
    var DT_FORMAT = {DATE_TIME: 0,
                     DATE: 1,
                     TIME: 2 };


    /**
     * Checks if the given parameter is a valid silog logging level i.e. is an
     * array of size 2, with the first element a number and the second one a
     * string. Moreover, if the second parameter evaluates to true, the
     * existence of the array in silog.LEVEL will be checked.
     */
    function checkLevel(level, exists) {
        if (!Array.isArray(level) ||
            level.length !== 2 ||
            typeof level[0] !== 'number' ||
            typeof level[1] !== 'string') {
            return false;
        }
        if (exists) {
            for (var key in LEVEL) {
                if (LEVEL.hasOwnProperty(key)) {
                    if (LEVEL[key][0] === level[0] &&
                       LEVEL[key][1] === level[1]) {
                        return true;
                    }
                }
            }
            return false; // level not in silog.LEVEL
        }
        return true; // level valid, existence in silog.LEVEL not checked
    }

    /**
     * Adds a leading zero to numbers lower than 10 (e.g., 6 becomes 06, 11
     * remains as is).
     */
    function leadingZero(n) {
        return (n < 10 ? '0' : '') + n;
    }

    /**
     * Returns the current time along with a formatted string in the specified
     * form (see silog.DT_FORMAT)
     */
    function getFormattedTimestamp(format) {
        var date = new Date();
        switch (format) {
        case DT_FORMAT.DATE:
            return [[date.getFullYear(), '/',
                     leadingZero(date.getMonth() + 1), '/',
                     leadingZero(date.getDate())].join(''), date.getTime()];
        case DT_FORMAT.TIME:
            return [[leadingZero(date.getHours()), ':',
                     leadingZero(date.getMinutes()), ':',
                     leadingZero(date.getSeconds())].join(''), date.getTime()];
        default:  // DT_FORMAT.DATE_TIME
            return [[date.getFullYear(), '/',
                    leadingZero(date.getMonth() + 1), '/',
                    leadingZero(date.getDate()), ' ',
                    leadingZero(date.getHours()), ':',
                    leadingZero(date.getMinutes()), ':',
                    leadingZero(date.getSeconds())].join(''), date.getTime()];
        }
    }

    /**
     * Simple logger that outputs the messages to the standard output.
     */
    function consoleLogger(what, extra) {
        if (extra.hasOwnProperty('object')) {
            what += ' - ' + JSON.stringify(extra.object);
        }
        if (extra.hasOwnProperty('level')) {
            switch (extra.level[0]) {
            case 7:
            case 6:
                console.error(what);
                break;
            case 5:
                console.warn(what);
                break;
            case 4:
                console.info(what);
                break;
            case 3:
                console.log(what);
                break;
            case 2:
                console.trace(what);
                break;
            default:
                console.log(what);
                break;
            }
            return true;
        }
        return false;
    }

    /**
     * Class that formats and routes logging messages.
     *
     * @class Logger
     * @constructor
     * @param [p] {Object} Configuration parameters:
     *  @param [p.level] {Array} The minimum level messages should have in order
     *                           to be logged. One of the elements of
     *                           silog.level, defaults to INFO.
     *  @param [p.tsFormat] {Number} The date/ time format used for logging
     *                               messages. One of the elements of
     *                               silog.tsFormat, defaults to DATE_TIME.
     *  @param [p.loggers] {Array} Functions that will receive the logged
     *                             messages; defaults to [silog.consoleLogger].
     */
    function Logger(p) {

        // default settings
        this.level = LEVEL.INFO;
        this.tsFormat = DT_FORMAT.DATE_TIME;
        this.loggers = [consoleLogger];

        if (p.hasOwnProperty('level')) {
            if (!checkLevel(p.level, true)) {
                throw new Error('Invalid message level: ' + p.level);
            } else {
                this.level = p.level;
            }
        }

        var tsf;
        if (p.hasOwnProperty('tsFormat')) {
            for (var key in DT_FORMAT) {
                if (DT_FORMAT.hasOwnProperty(key)) {
                    if (p.tsFormat === DT_FORMAT[key]) {
                        tsf = p.tsFormat;
                        break;
                    }
                }
            }

            if (typeof tsf === 'undefined') {
                throw new Error('Invalid date/ time format: ' + p.tsFormat);
            }
            this.tsFormat = tsf;
        }

        if (p.hasOwnProperty('loggers')) {
            if (Array.isArray(p.loggers) && p.loggers.length > 0) {
                for (var i = 0, len = p.loggers.length; i < len; i += 1) {
                    if (typeof p.loggers[i] !== 'function') {
                        throw new Error(
                            'Invalid loggers: should be an array of functions');
                    }
                }
                this.loggers = p.loggers;
            } else {
                throw new Error('Invalid loggers: should be an array');
            }
        }

    }


    /**
     * Send a given messages to the various loggers.
     *
     * @method log
     *
     * @param {Array}  messageLevel the message logging level.
     * @param {String} tag          the tag of the message.
     * @param {String} message      the message to log.
     * @param {any}    object       an extra message to log.
     */
    Logger.prototype.log = function(messageLevel, tag, message, object) {
        if (!checkLevel(messageLevel, false)) {
            // we do not check if the level actually exists in silog.LEVEL as
            // this can become too costly
            throw new Error(['Invalid message level for: ',
                              tag,
                              ' - ',
                              message,
                              ' = ',
                              messageLevel].join(''));
        }

        if (messageLevel[0] >= this.level[0]) {
            var time = getFormattedTimestamp(this.tsFormat);
            var what = ['[',
                        messageLevel[1],
                        '] - ',
                        time[0],
                        ' - ',
                        tag,
                        ' - ',
                        message].join('');

            // the extra information we send to the loggers
            var extra = {'tag': tag,
                         'message': message,
                         'level': messageLevel,
                         'ts': time[1] };

            if (object) {
                extra.object = object;
            }

            for (var i = 0, len = this.loggers.length; i < len; i += 1) {
                this.loggers[i](what, extra);
            }
        } // end if (messageLevel[0] >= this.level[0])
    };


    /**
     * Logs a message with the silog.LEVEL.ASSERT level.
     * @param {string} tag     the tag of the message.
     * @param {string} message the message to log.
     * @param {*} object       an extra message to log.
     * @this {Object} the Logger instance.
     * @public
     * @memberOf silog-Logger
     */
    Logger.prototype.wtf = function(tag, message, object) {
        this.log(LEVEL.ASSERT, tag, message, object);
    };

    /**
     * Logs a message with the silog.LEVEL.ERROR level.
     * @param {string} tag     the tag of the message.
     * @param {string} message the message to log.
     * @param {*} object       an extra message to log.
     * @this {Object} the Logger instance.
     * @public
     * @memberOf silog-Logger
     */
    Logger.prototype.e = function(tag, message, object) {
        this.log(LEVEL.ERROR, tag, message, object);
    };

    /**
     * Logs a message with the silog.LEVEL.WARN level.
     * @param {string} tag     the tag of the message.
     * @param {string} message the message to log.
     * @param {*} object       an extra message to log.
     * @this {Object} the Logger instance.
     * @public
     * @memberOf silog-Logger
     */
    Logger.prototype.w = function(tag, message, object) {
        this.log(LEVEL.WARN, tag, message, object);
    };

    /**
     * Logs a message with the silog.LEVEL.INFO level.
     * @param {string} tag     the tag of the message.
     * @param {string} message the message to log.
     * @param {*} object       an extra message to log.
     * @this {Object} the Logger instance.
     * @public
     * @memberOf silog-Logger
     */
    Logger.prototype.i = function(tag, message, object) {
        this.log(LEVEL.INFO, tag, message, object);
    };

    /**
     * Logs a message with the silog.LEVEL.DEBUG level.
     * @param {string} tag     the tag of the message.
     * @param {string} message the message to log.
     * @param {*} object       an extra message to log.
     * @this {Object} the Logger instance.
     * @public
     * @memberOf silog-Logger
     */
    Logger.prototype.d = function(tag, message, object) {
        this.log(LEVEL.DEBUG, tag, message, object);
    };

    /**
     * Logs a message with the silog.LEVEL.VERBOSE level.
     * @param {string} tag     the tag of the message.
     * @param {string} message the message to log.
     * @param {*} object       an extra message to log.
     * @this {Object} the Logger instance.
     * @public
     * @memberOf silog-Logger
     */
    Logger.prototype.v = function(tag, message, object) {
        this.log(LEVEL.VERBOSE, tag, message, object);
    };


    // export public members
    exports.level = LEVEL;
    exports.tsFormat = DT_FORMAT;
    exports.Logger = Logger;
    exports.consoleLogger = consoleLogger;

})(typeof exports === 'undefined' ? this['silog'] = {} : exports);