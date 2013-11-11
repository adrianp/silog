'use strict';

/*global module:false*/
module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            src: ['Gruntfile.js', 'src/silog.js', 'demo/demo.js', 'test/test.js'],
            options: {
                'bitwise': true,
                'camelcase': true,
                'curly': true,
                'eqeqeq': true,
                'es3': false,
                'forin': true,
                'immed': true,
                'indent': 4,
                'latedef': false,
                'newcap': true,
                'noarg': true,
                'noempty': true,
                'nonew': true,
                'plusplus': true,
                'quotmark': 'single',
                'undef': true,
                'unused': true,
                'strict': true,
                'trailing': true,
                'maxlen': 80,
                'asi': false,
                'boss': false,
                'eqnull': false,
                'esnext': false,
                'evil': false,
                'expr': false,
                'funcscope': true,
                'globalstrict': true,
                'iterator': false,
                'lastsemic': false,
                'laxbreak': false,
                'laxcomma': false,
                'loopfunc': false,
                'moz': false,
                'multistr': false,
                'proto': false,
                'scripturl': false,
                'smarttabs': false,
                'shadow': false,
                'sub': true,
                'supernew': false,
                'validthis': false,
                'browser': true,
                'couch': false,
                'devel': false,
                'dojo': false,
                'jquery': true,
                'mootools': false,
                'node': true,
                'nonstandard': false,
                'phantom': false,
                'prototypejs': false,
                'rhino': false,
                'worker': false,
                'wsh': false,
                'yui': false,
                'white': false
            }
        },  // end jshint task

        mocha: {
            all: ['test/index.html'],
            run: true
        },  // end mocha task

    });

    // Load JSHint task
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha');

    // Default task.
    grunt.registerTask('default', ['jshint', 'mocha']);
};
