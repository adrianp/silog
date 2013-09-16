/**
The MIT License (MIT) http://opensource.org/licenses/MIT

Copyright (c) 2013 Adrian-Tudor Panescu <adrian [at] panescu [dot] com>

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
 * @namespace
 */
var silog = function() {

    /**
     * The logging levels used by silog; an order relation is established
     * between them, with ASSERT (7) being the highest and VERBOSE (2) the
     * lowest. If silog's level is set to X, any message with the level Y < X
     * will not be logged.
     * @enum {Array.<number, string>}
     * @const
     * @memberOf silog
     * @public
     */
    var LEVEL = {ASSERT: [7, 'ASSERT'],
                 ERROR: [6, 'ERROR'],
                 WARN: [5, 'WARN'],
                 INFO: [4, 'INFO'],
                 DEBUG: [3, 'DEBUG'],
                 VERBOSE: [2, 'VERBOSE'] };

    /**
     * The date/ time format used in the logged messages.
     * @enum {number}
     * @const
     * @memberOf silog
     * @public
     */
    var DT_FORMAT = {DATE_TIME: 0,
                     DATE: 1,
                     TIME: 2 };

    /**
     * The tag used for logging internal messages.
     * @type {String}
     * @private
     * @const
     */
    var LOCAL_TAG = 'silog';

    /**
     * Checks if the given parameter is a valid silog logging level i.e. is an
     * array of size 2, with the first element a number and the second one a
     * string. Moreover, if the second parameter evaluates to true, the
     * existence of the array in silog.LEVEL will be checked.
     * @param  {*}       level  the object to check.
     * @param  {boolean} exists if true, the existence of the object in
     *                          silog.LEVEL will be checked.
     * @return {boolean}        true if the object is a valid logging level,
     *                          false otherwise.
     * @private
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
        return true; // level valid, existence in silog.LEVEL unknown
    }

    /**
     * Adds a leading zero to numbers lower than 10 (e.g., 6 becomes 06, 11
     * remains as is).
     * @param  {number} n the number to process.
     * @return {string}   the number with the leading zero added (if necessary).
     * @private
     */
    function leadingZero(n) {
        return (n < 10 ? '0' : '') + n;
    }

    /**
     * Returns the current time along with a formatted string in the specified
     * form (see silog.DT_FORMAT)
     * @param  {Object.<string, number>} format the format in which the current
     *                                   date/ time should be returned.
     * @return {Array.<string, number>}  the formatted date/ time along with the
     *                                   original timestamp.
     * @private
     */
    function getFormattedTimestamp(format) {
        var date = new Date();
        switch (format) {
        case DT_FORMAT.DATE_TIME:
            return [[date.getFullYear(), '/',
                    leadingZero(date.getMonth()), '/',
                    leadingZero(date.getDate()), ' ',
                    leadingZero(date.getHours()), ':',
                    leadingZero(date.getMinutes()), ':',
                    leadingZero(date.getSeconds())].join(''), date];
        case DT_FORMAT.DATE:
            return [[date.getFullYear(), '/',
                     leadingZero(date.getMonth()), '/',
                     leadingZero(date.getDate())].join(''), date];
        case DT_FORMAT.TIME:
            return [[leadingZero(date.getHours()), ':',
                     leadingZero(date.getMinutes()), ':',
                     leadingZero(date.getSeconds())].join(''), date];
        default:
            // if the format is not in DT_FORMAT we use the datetime
            return [[date.getFullYear(), '/',
                    leadingZero(date.getMonth()), '/',
                    leadingZero(date.getDate()), ' ',
                    leadingZero(date.getHours()), ':',
                    leadingZero(date.getMinutes()), ':',
                    leadingZero(date.getSeconds())].join(''), date];
        }
    }

    /**
     * Simple logger that outputs the messages to stdout.
     * @param  {string}             what  the message to log.
     * @param  {Object.<string, *>} extra extra data sent by silog.log().
     */
    function consoleLogger(what, extra) {
        if (extra.hasOwnProperty('object')) {
            what += ' - ' + JSON.stringify(extra['object']);
        }
        console.log(what);
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
     * @return {?Object} an instance of the Logger if the instantiation was
     *                   successful, null otherwise.
     * @this {Object} the Logger instance.
     * @constructor
     */
    function Logger(p) {

        // default settings
        this.level = LEVEL.INFO;
        this.tsFormat = DT_FORMAT.DATE_TIME;
        this.loggers = [consoleLogger];

        if (p.hasOwnProperty('level')) {
            if (!checkLevel(p.level, true)) {
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
     * Send a given messages to the various loggers.
     * @param {Array.<number, string>} messageLevel the message logging level.
     * @param {string} tag             the tag of the message.
     * @param {string} message         the message to log.
     * @param {*} object               an extra message to log.
     * @this {Object} the Logger instance.
     * @public
     * @memberOf silog-Logger
     */
    Logger.prototype.log = function(messageLevel, tag, message, object) {
        if (!checkLevel(messageLevel, false)) {
            // we do not check if the level exists in silog.LEVEL as this can
            // become too costly
            this.w(LOCAL_TAG, ['Invalid message level for: ',
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
                extra['object'] = object;
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
    return {
        level: LEVEL,
        tsFormat: DT_FORMAT,
        Logger: Logger,
        consoleLogger: consoleLogger
    };
};


if (typeof exports !== 'undefined') {
    // nodejs
    exports.silog = silog();
} else {
    // browser
    silog = silog();
}
