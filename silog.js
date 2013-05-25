"use strict";

var LEVEL = { CRITICAL   : [0, "CRITICAL"],
              ERROR      : [1, "ERROR"],
              WARNING    : [2, "WARNING"],
              INFO       : [3, "INFO"],
              DEBUG      : [4, "DEBUG"] };


var DT_FORMAT = { DATE_TIME : 0,
                  DATE      : 1,
                  TIME      : 2 };


var CURRENT_LEVEL = LEVEL.INFO;


var LEVEL_SET = false;


var LOCAL_TAG = "silog";


var DATE_TIME_FORMAT = DT_FORMAT.DATE_TIME;


function setLevel(customLevel) {
    if(!LEVEL_SET) {
        if(!(customLevel instanceof Array && typeof customLevel[0] === "number")) {
            // TODO: this check is kinda shabby
            log(LEVEL.WARNING, LOCAL_TAG, "Invalid message level: " + customLevel);
            return false;
        } else {
            CURRENT_LEVEL = customLevel;
            LEVEL_SET = true;
        }
    } else {
        log(LEVEL.WARNING, LOCAL_TAG, "Logging level already set, cannot change!");
    }
    return CURRENT_LEVEL;
}


function getLevel() {
    return CURRENT_LEVEL;
}


function write(where, what) {
    if(where === "console") {
        console.log(what);
    }
}


function log(messageLevel, tag, message) {
    if(!(messageLevel instanceof Array && typeof messageLevel[0] === "number")) {
        // TODO: this check is kinda shabby
        return log(LEVEL.WARNING, LOCAL_TAG, "Invalid message level for: " +
                                             tag +
                                             " - " +
                                             message +
                                             " = " +
                                             messageLevel);
    }
    if(messageLevel[0] <= CURRENT_LEVEL[0] || tag === LOCAL_TAG) {
        var what = "[" + getFormattedTimestamp() + "] ";
        what += messageLevel[1] + ' - ';
        what += tag + ' - ';
        what += message;
        write("console", what);
        return what;
    } else {
        return null;
    }
}


function setTimestampFormat(format) {
    DATE_TIME_FORMAT = format;
}


function getTimestampFormat() {
    return DATE_TIME_FORMAT;
}


function getFormattedTimestamp() {
    var date = new Date();
    switch(DATE_TIME_FORMAT) {
        case DT_FORMAT.DATE_TIME:
            return date.getFullYear() + '/' +
                   date.getMonth() + '/' +
                   date.getDate() + ' ' +
                   date.getHours() + ':' +
                   date.getMinutes();
        case DT_FORMAT.DATE:
            return date.getFullYear() + '/' +
                   date.getMonth() + '/' +
                   date.getDate();
        case DT_FORMAT.TIME:
            return date.getHours() + ':' +
                   date.getMinutes();
        default:
            DATE_TIME_FORMAT = DT_FORMAT.DATE_TIME;
            log(LEVEL.WARNING, LOCAL_TAG, "Invalid date/ time format, fail-safe to default!");
            return date.getFullYear() + '/' +
                   date.getMonth() + '/' +
                   date.getDate() + ' ' +
                   date.getHours() + ':' +
                   date.getMinutes();
    }
}


function c(tag, message) {
    log(LEVEL.CRITICAL, tag, message);
}


function e(tag, message) {
    log(LEVEL.ERROR, tag, message);
}


function w(tag, message) {
    log(LEVEL.WARNING, tag, message);
}


function i(tag, message) {
    log(LEVEL.INFO, tag, message);
}


function d(tag, message) {
    log(LEVEL.DEBUG, tag, message);
}


exports.level = LEVEL;
exports.setLevel = setLevel;
exports.getLevel = getLevel;
exports.dtFormat = DT_FORMAT;
exports.setTimestampFormat = setTimestampFormat;
exports.getTimestampFormat = getTimestampFormat;
exports.log = log;
exports.c = c;
exports.e = e;
exports.w = w;
exports.i = i;
exports.d = d;
