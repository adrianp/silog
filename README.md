# silog


## Integration status [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)

[![Dependency Status](https://gemnasium.com/adrianp/silog.png)](https://gemnasium.com/adrianp/silog)
[![Build Status](https://travis-ci.org/adrianp/silog.png?branch=master)](https://travis-ci.org/adrianp/silog)
[![Coverage Status](https://coveralls.io/repos/adrianp/silog/badge.png)](https://coveralls.io/r/adrianp/silog)
[![GitHub Version](https://badge.fury.io/gh/adrianp%2Fsilog.png)](http://badge.fury.io/gh/adrianp%2Fsilog)
[![NPM Version](https://badge.fury.io/js/silog.png)](http://badge.fury.io/js/silog)
[![Bower Version](https://badge.fury.io/bo/silog.png)](http://badge.fury.io/bo/silog)


## What?

silog (simple logger) is an easy to use JavaScript logging utility, especially
useful during development. It aims for minimal boilerplate, modular design, and
it takes inspiration from how
[logging is done on the Android platform](http://developer.android.com/reference/android/util/Log.html).


## How?

### Installation:

    npm install silog

or:

    bower install silog

Note that a minified version of silog is included in the `min/` directory.


### Usage

The [demo file](https://github.com/adrianp/silog/blob/master/src/demo/demo.js)
shows how silog can be used; there is also a
[web demo](https://github.com/adrianp/silog/blob/master/src/demo/www/index.html).


### API

* `silog.level`: object containing the following logging levels, from highest to lowest:
    * `ASSERT`
    * `ERROR`
    * `WARN`
    * `INFO`
    * `DEBUG`
    * `VERBOSE`
* `silog.tsFormat`: date/ time output formats:
    * `DATE_TIME`: will output `31/12/2014 09:54`
    * `DATE`: will output `09:54`
    * `TIME`: will output `31/12/2014`
* `silog.consoleLogger(what, extra)`: function that prints the logged messages
                                      to standard output; parameters:
    * `what`: string to send to output;
    * `extra`: object containing miscellaneous information about the logged
               message:
        * `object`: JSON to output; the way in which it will be displayed
                    depends on the platform capabilities (e.g., web browser
                    JavaScript consoles usually show a nice explorable tree
                    structure);
        * `tag`: the tag of the message;
        * `message`: the actual message;
        * `level`: the level of the logged message;
        * `ts`: UNIX timestamp of the message
* `silog.Logger`: logging class:
    * `Logger(p)`: constructor; `p` is an object using which various logging
                   parameters can be specified:
        * `level`: the minimum level messages should have in order to be sent
                   for output, defaults to `silog.level.INFO`;
        * `tsFormat`: date/ time format of logged messages, defaults to
                     `silog.tsFormat.DATE_TIME`;
        * `loggers`: array of functions that will output the logged messages,
                     defaults to `[silog.consoleLogger]`;
    * `log(messageLevel, tag, message, object)`: main logging function with the
                                                 following parameters:
        * `messageLevel`: the level of the message; `log()` will not send to
                          output messages for which
                          `messageLevel < Logger.level`;
        * `tag`: tag of the message (e.g., filename, function name, code line
                 number);
        * `message`: the actual message (string);
        * `object`: optional JSON to output, might be ignored by the output
                    functions;
    * `wtf(tag, message, object)`: shorthand for `log(silog.level.ASSERT, tag, message, object)`;
    * `e(tag, message, object)`: shorthand for `log(silog.level.ERROR, tag, message, object)`;
    * `w(tag, message, object)`: shorthand for `log(silog.level.WARN, tag, message, object)`;
    * `i(tag, message, object)`: shorthand for `log(silog.level.INFO, tag, message, object)`;
    * `d(tag, message, object)`: shorthand for `log(silog.level.DEBUG, tag, message, object)`;
    * `v(tag, message, object)`: shorthand for `log(silog.level.VERBOSE, tag, message, object)`;


#### Custom output functions:
You are free to implement your own output functions, used by `silog.Logger.log`,
using `silog.consoleLogger` as a model; you can, for example, write messages to
a file, web service, or Redis. The minimum expectation for these functions is
the output of the `what` argument (a plain string).

## Who?

silog is developed by Adrian-Tudor Panescu. Please feel free to
[report bugs](https://github.com/adrianp/silog/issues) and submit
[pull request](https://github.com/adrianp/silog/pulls).


## License

[The MIT License (MIT)](http://opensource.org/licenses/MIT)

Copyright (c) 2014 Adrian-Tudor Panescu \<adrian [at] panescu [dot] com\>

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



[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/adrianp/silog/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
