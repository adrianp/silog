/**
The MIT License (MIT) http://opensource.org/licenses/MIT

Copyright (c) 2014 Adrian-Tudor Panescu <adrian [at] panescu [dot] com>

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

/*global module:false*/
module.exports = function(grunt) {

    // Task loading:
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-execute');
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.loadNpmTasks('grunt-mocha-cov');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Task description:
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['src/*.js', 'src/**/*.js', 'Gruntfile.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },  // end JSHint task

        jsonlint: {
            all: {
                src: [ 'package.json', 'bower.json' ]
            }
        },  // end JSONLint task

        execute: {
            target: {
                src: ['src/demo/demo.js']
            }
        },  // end script running task

        yuidoc: {
            all: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description%>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                    paths: ['./src/'],
                    outdir: './docs/'
                }
            }
        },  // end docs running task

        mochacov: {
            test: {
                options: {
                    reporter: 'spec',
                }
            },
            coverage: {
                options: {
                    reporter: 'html-cov',
                    coverage: true
                }
            },
            coveralls: {
                options: {
                    coveralls: {
                        serviceName: 'travis-ci'
                    }
                }
            },
            options: {
                files: ['src/test/*_test.js'],
                ui: 'bdd',
                colors: true,
                output: 'coverage.html'
            }
        },  // end mocha/ coverage task

        uglify: {
            silog: {
                src: 'src/silog.js',
                dest: 'min/silog.min.js',
                options: {
                    sourceMap: true,
                }
            }
        }  // end uglify

    });

    // Task registration:
    grunt.registerTask('lint', ['jshint',
                                'jsonlint']);

    grunt.registerTask('npmtest', ['jshint',
                                   'jsonlint',
                                   'execute',
                                   'mochacov:test']);

    grunt.registerTask('test', ['execute',
                                'mochacov:test',
                                'mochacov:coverage']);

    grunt.registerTask('package', ['yuidoc',
                                   'uglify']);

    grunt.registerTask('travis', ['jshint',
                                  'jsonlint',
                                  'execute',
                                  'mochacov:test',
                                  'mochacov:coveralls']);

    grunt.registerTask('commit', ['jshint',
                                  'jsonlint',
                                  'execute',
                                  'mochacov:test']);

    grunt.registerTask('default', ['jshint',
                                   'jsonlint',
                                   'execute',
                                   'mochacov:test',
                                   'mochacov:coverage']);
};  // done.
