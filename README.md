silog (i.e. simple logger)
=====


Integration status [![Built with Grunt](https://cdn.gruntjs.com/builtwith.png)](http://gruntjs.com/)
------------
[![Build Status](https://travis-ci.org/adrianp/silog.png?branch=master)](https://travis-ci.org/adrianp/silog)
[![Dependency Status](https://gemnasium.com/adrianp/silog.png)](https://gemnasium.com/adrianp/silog)
[![NPM version](https://badge.fury.io/js/silog.png)](http://badge.fury.io/js/silog)
[![Coverage Status](https://coveralls.io/repos/adrianp/silog/badge.png)](https://coveralls.io/r/adrianp/silog)


Introduction
------------

A very simple Node.js logging utility. I am aware that there are many other
logging utilities for Node.js/ JavaScript, but I wanted one which requires
minimal boilerplate to use mainly during development. The provided API is
inspired by how [logging is done on Android](http://developer.android.com/reference/android/util/Log.html).


Installation
------------

To install simply run:

    npm install silog

Alternatively, you can clone the
[Git repository](https://github.com/adrianp/silog/) or download the
[ZIP file](https://github.com/adrianp/silog/archive/master.zip) containing the
source code. If you choose one of these options, you can import **silog** as
shown in the [demo file](https://github.com/adrianp/silog/blob/master/demo.js);
this file also demonstrates how **silog** can be used.

Note that while currently **silog** does not have any external dependency,
this might change in the future, and thus, using **NPM** for installing/
upgrading is advised.


API
---

The following functionalities are exposed by the API:

* <code> silog.level </code>: object that includes the available logging levels:
<code>CRITICAL</code>, <code>ERROR</code>, <code>WARNING</code>,
<code>INFO</code> and <code>DEBUG</code>. An order relation exists between these
levels, <code> DEBUG </code> being the lowest and <code> CRITICAL </code> the
highest.

* <code> silog.tsFormat </code>: object that includes the available timestamp
formats: <code> DATE_TIME </code>, <code> DATE </code>, and <code> TIME </code>.

* <code> silog.setLevel(level) </code>: sets the minimum level messages should
have in order to be sent for output. <code> level </code> should exist in
<code> silog.level </code>.

* <code> silog.getLevel() </code>: returns the minimum level messages should
have in order to be sent for output.

* <code> silog.setTsFormat(format) </code>: sets the timestamp format used when
sending messages to output. <code> format </code> should exist in
<code> silog.tsFormat </code>.

* <code> silog.getTsFormat() </code>: returns the timestamp format used when
sending messages to output.

* <code> silog.log(level, tag, message) </code>: sends to output the
<code> message </code> with the specified <code> level </code>. (the
<code> tag </code> can be used to specify the origin of the message). This
function is somewhat obsoleted by the shorthands described below.

* <code> silog.c(tag, message) </code>: sends a critical level
<code> message </code> to output.

* <code> silog.e(tag, message) </code>: sends an error level
<code> message </code> to output.

* <code> silog.w(tag, message) </code>: sends a warning level
<code> message </code> to output.

* <code> silog.i(tag, message) </code>: sends an info level
<code> message </code> to output.

* <code> silog.d(tag, message) </code>: sends a debug level
<code> message </code> to output.

Messages sent to output will have the following general format:

    [TIMESTAMP] LEVEL - TAG - MESSAGE


Bugs, feature requests, contributions
-------------------------------------

Please report any bugs, feature or pull requests on the
[GitHub page of the project](https://github.com/adrianp/silog/). **Thank you!**


License
-------

[The MIT License (MIT)](http://opensource.org/licenses/MIT)

Copyright (c) 2014 Adrian Tudor Panescu \<adrian [at] panescu [dot] com\>

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


Post scriptum
-------------

This project used to be named __simplog__ until I realized that there was a
similarly named project on the NPM registry. By the way, you can visit the
NPM registry of the project [here](https://npmjs.org/package/silog).


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/adrianp/silog/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

