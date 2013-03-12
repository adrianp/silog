silog
=======

A very simple Node.js logging utility

To install simply run:

    npm install silog
    
Alternatively, you can clone this repository and import **silog** as in the 
[demo file](https://github.com/adrianp/silog/blob/master/demo.js). This file also shows how this module can be used.


I know that there are many other logging utilities for Node.js, but I simply wanted one with minimal boilerplate and
an option to add _tags_ to messages (so I can easily differentiate messages coming from different scripts/functions).
The module is mainly intended for usage during development. The tagging feature is inspired by how 
[logging is done on Android](http://developer.android.com/reference/android/util/Log.html).


Please report any issues, request new features, or pulls on the 
[GitHub page of the project](https://github.com/adrianp/silog/).

License: MIT


*This project used to be named __simplog__ until I realised that there was a similarly named project on the npm 
registry.*
