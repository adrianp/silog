"use strict";

var log = require('./silog.js');


// tag that can be used to identify the origin of the messages
var TAG = 'silog_demo';


// the minimum level printed messages should have is now INFO
log.setLevel(log.level.INFO);


// only the current time will be included in the printed messages
log.setTsFormat(log.tsFormat.TIME);


// now let's print some messages
log.d(TAG, "This debug message will not be printed.");
log.i(TAG, "An information message, everything works OK.");
log.w(TAG, "A warning!");
log.e(TAG, "Error, something went wrong!!");
log.c(TAG, "Critical condition!!!");
