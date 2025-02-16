// Generated on 2015-08-12 using
// generator-webapp 1.0.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Automatically load required grunt tasks
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });

    // Configurable paths
    var config = {
        app: 'app',
        dist: 'dist'
    };

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        config: config,

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            babel: {
                files: ['<%= config.app %>/scripts/{,*/}*.js'],
                tasks: ['babel:dist']
            },
            babelTest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['babel:test', 'test:watch']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            sass: {
                files: ['<%= config.app %>/styles/{,*/}*.{scss,sass}', '<%= config.app %>/modules/{,*/}*.{scss,sass}'],
                tasks: ['sass:server', 'postcss']
            },
            styles: {
                files: ['<%= config.app %>/styles/{,*/}*.css', '<%= config.app %>/modules/{,*/}*.css'],
                tasks: ['newer:copy:styles', 'postcss']
            },
            assemble: {
                files: ['<%= config.app %>/{content,data,templates}/{,*/}*.{md,hbs,yml}', '<%= config.app %>/modules/{,*/}*.{htm,hbs,json}'],
                tasks: ['assemble']
            },
            livereload: {
                options: {
                  livereload: '<%= connect.options.livereload %>'
                },
                files: [
                  '<%= config.dist %>/{,*/}*.html',
                  '<%= config.dist %>/assets/{,*/}*.css',
                  '<%= config.dist %>/assets/{,*/}*.js',
                  '<%= config.dist %>/assets/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        browserSync: {
            options: {
                notify: false,
                background: true
            },
            livereload: {
                options: {
                    files: [
                        '<%= config.app %>/{,*/}*.html',
                        '.tmp/styles/{,*/}*.css',
                        '<%= config.app %>/images/{,*/}*',
                        '.tmp/scripts/{,*/}*.js'
                    ],
                    port: 9000,
                    server: {
                        baseDir: ['.tmp', config.app],
                        routes: {
                            '/bower_components': './bower_components'
                        }
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    open: false,
                    logLevel: 'silent',
                    host: 'localhost',
                    server: {
                        baseDir: ['.tmp', './test', config.app],
                        routes: {
                            '/bower_components': './bower_components'
                        }
                    }
                }
            },
            dist: {
                options: {
                    background: false,
                    server: '<%= config.dist %>'
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.dist %>/*',
                        '!<%= config.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        eslint: {
            target: [
                'Gruntfile.js',
                '<%= config.app %>/scripts/{,*/}*.js',
                '!<%= config.app %>/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },

        // Mocha testing framework configuration options
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://<%= browserSync.test.options.host %>:<%= browserSync.test.options.port %>/index.html']
                }
            }
        },

        // Compiles ES6 with Babel
        babel: {
            options: {
                sourceMap: true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/scripts',
                    src: '{,*/}*.js',
                    dest: '.tmp/scripts',
                    ext: '.js'
                }]
            },
            test: {
                files: [{
                    expand: true,
                    cwd: 'test/spec',
                    src: '{,*/}*.js',
                    dest: '.tmp/spec',
                    ext: '.js'
                }]
            }
        },

        // Compiles Sass to CSS and generates necessary files if requested
        sass: {
            options: {
                sourceMap: true,
                sourceMapEmbed: true,
                sourceMapContents: true,
                includePaths: ['.']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/styles',
                    src: ['*.{scss,sass}'],
                    dest: '.tmp/styles',
                    ext: '.css'
                }]
            },
            server: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/styles',
                    src: ['*.{scss,sass}'],
                    dest: '.tmp/styles',
                    ext: '.css'
                }]
            }
        },

        postcss: {
            options: {
                map: true,
                processors: [
                    // Add vendor prefixed styles
                    require('autoprefixer-core')({
                        browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
                    })
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the HTML file
        wiredep: {
            app: {
                //src: ['<%= config.app %>/index.html'],
                src: ['<%= config.app %>/templates/layouts/default.hbs'],
                exclude: ['bootstrap.js'],
                // includeSelf: true,
                ignorePath: /^(\.\.\/)*\.\./
            },
            sass: {
                src: ['<%= config.app %>/styles/{,*/}*.{scss,sass}'],
                ignorePath: /^(\.\.\/)+/
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= config.dist %>/scripts/{,*/}*.js',
                    '<%= config.dist %>/styles/{,*/}*.css',
                    '<%= config.dist %>/images/{,*/}*.*',
                    '<%= config.dist %>/styles/fonts/{,*/}*.*',
                    '<%= config.dist %>/*.{ico,png}'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
          options: {
            dest: '<%= config.dist %>'
          },
          html: '<%= config.app %>/index.html'
        },
    
        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: [
                    '<%= config.dist %>',
                    '<%= config.dist %>/images',
                    '<%= config.dist %>/styles'
                ]
            },
            html: ['<%= config.dist %>/{,*/}*.html'],
            css: ['<%= config.dist %>/styles/{,*/}*.css']
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: '<%= config.dist %>/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= config.dist %>/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    // true would impact styles with attribute selectors
                    removeRedundantAttributes: false,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: '{,*/}*.html',
                    dest: '<%= config.dist %>'
                }]
            }
        },

        // By default, your `index.html`'s <!-- Usemin block --> will take care
        // of minification. These next options are pre-configured if you do not
        // wish to use the Usemin blocks.
        // cssmin: {
        //   dist: {
        //     files: {
        //       '<%= config.dist %>/styles/main.css': [
        //         '.tmp/styles/{,*/}*.css',
        //         '<%= config.app %>/styles/{,*/}*.css'
        //       ]
        //     }
        //   }
        // },
        // uglify: {
        //   dist: {
        //     files: {
        //       '<%= config.dist %>/scripts/scripts.js': [
        //         '<%= config.dist %>/scripts/scripts.js'
        //       ]
        //     }
        //   }
        // },
        // concat: {
        //   dist: {}
        // },

        assemble: {
            pages: {
                options: {
                    flatten: true,
                    assets: '<%= config.dist %>/assets',
                    layout: '<%= config.app %>/templates/layouts/default.hbs',
                    data: ['<%= config.app %>/data/*.{json,yml}', '<%= config.app %>/modules/**/*.{json,yml}'],
                    partials: ['<%= config.app %>/templates/partials/*.{hbs,htm}', '<%= config.app %>/modules/**/*.{hbs,htm}'], 
                    plugins: ['assemble-contrib-permalinks', 'assemble-contrib-sitemap'],
                },
                files: {
                    // '<%= config.dist %>/': ['<%= config.app %>/templates/pages/*.hbs']
                    '<%= config.app %>/': ['<%= config.app %>/templates/pages/*.hbs']
                }
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        'images/{,*/}*.webp',
                        '{,*/}*.html',
                        'styles/fonts/{,*/}*.*'
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: '.',
                    src: 'bower_components/bootstrap-sass/assets/fonts/bootstrap/*',
                    dest: '<%= config.dist %>'
                }]
            }
        },

        // Generates a custom Modernizr build that includes only the tests you
        // reference in your app
        modernizr: {
            dist: {
                devFile: 'bower_components/modernizr/modernizr.js',
                outputFile: '<%= config.dist %>/scripts/vendor/modernizr.js',
                files: {
                    src: [
                        '<%= config.dist %>/scripts/{,*/}*.js',
                        '<%= config.dist %>/styles/{,*/}*.css',
                        '!<%= config.dist %>/scripts/vendor/*'
                    ]
                },
                uglify: true
            }
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: [
                'babel:dist',
                'sass:server'
            ],
            test: [
                'babel'
            ],
            dist: [
                'babel',
                'sass',
                'imagemin',
                'svgmin'
            ]
        },

    });

    grunt.loadNpmTasks('assemble');
    
    grunt.registerTask('serve', 'start the server and preview your app', function(target) {

        if (target === 'dist') {
            return grunt.task.run(['build', 'browserSync:dist']);
        }

        grunt.task.run([
            'clean:server',
            'assemble',
            'wiredep',
            'concurrent:server',
            'postcss',
            'browserSync:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function(target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run([target ? ('serve:' + target) : 'serve']);
    });

    grunt.registerTask('test', function(target) {
        if (target !== 'watch') {
            grunt.task.run([
                'clean:server',
                'concurrent:test',
                'postcss'
            ]);
        }

        grunt.task.run([
            'browserSync:test',
            'mocha'
        ]);
    });

    grunt.registerTask('build', [
        'clean:dist',
        //'assemble',
        'wiredep',        
        'useminPrepare',
        'concurrent:dist',
        'postcss',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'modernizr',
        'filerev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('default', [
        'newer:eslint',
        'test',
        'build'
    ]);
};