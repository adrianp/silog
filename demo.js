"use strict";


var silog = require('./silog.js');


silog.setLevel(silog.level.DEBUG); // levels >= DEBUG level will be printed


var TAG = 'silog_demo';


// setting the timestamp format to HOUR:MINUTE
silog.setTimestampFormat(silog.dtFormat.TIME);


// logging a debug message
silog.log(silog.level.DEBUG, TAG, 'Hello world!');


// setting the timestamp format to YEAR/MONTH/DAY HOUR:MINUTE
silog.setTimestampFormat(silog.dtFormat.DATE_TIME);


silog.log(silog.level.DEBUG, TAG, "Bye world!");