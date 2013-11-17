'use strict';

/*global module:false*/
module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-simple-mocha');

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
                reporter: 'tap'
            }
        },  // end Mocha task
    });

    grunt.registerTask('lint', ['jshint',
                                'jsonlint']);

    grunt.registerTask('test', ['simplemocha']);

    grunt.registerTask('travis', ['jshint',
                                  'jsonlint',
                                  'simplemocha']);

    grunt.registerTask('default', ['jshint',
                                   'jsonlint',
                                   'simplemocha']);
};
