'use strict';

/*global module:false*/
module.exports = function(grunt) {

    // Task loading:
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadNpmTasks('grunt-execute');

    // Task description:
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['src/*.js', 'src/**/*.js', 'Gruntfile.js'],
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
                'jquery': false,
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
        },  // end JSHint task

        jsonlint: {
            all: {
                src: [ 'package.json' ]
            }
        },  // end JSONLint task

        simplemocha: {
            all: { src: ['src/test/*_test.js'] },
            options: {
                globals: ['should'],
                timeout: 3000,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'spec'
            }
        },  // end Mocha task

        execute: {
            target: {
                src: ['src/demo/demo.js']
            }
        },  // end script running task
    });

    // Task registration:
    grunt.registerTask('lint', ['jshint',
                                'jsonlint']);

    grunt.registerTask('test', ['simplemocha',
                                'execute']);

    grunt.registerTask('travis', ['jshint',
                                  'jsonlint',
                                  'simplemocha',
                                  'execute']);

    grunt.registerTask('default', ['jshint',
                                   'jsonlint',
                                   'simplemocha',
                                   'execute']);
};  // done.
