module.exports = function (grunt) {

    // ===========================================================================
    // CONFIGURE GRUNT ===========================================================
    // ===========================================================================
    grunt.initConfig({

        // get the configuration info from package.json ----------------------------
        pkg: grunt.file.readJSON('package.json'),

        // all of our configuration will go here
        // check all js files for errors
        jshint: {
            all: ['public/js/**/*.js']
        },

        // take all the js files and minify them into app.min.js
        uglify: {
            build: {
                files: {
                    'public/dist/js/app.min.js': ['public/js/**/*.js', 'public/js/*.js']
                }
            }
        },

        watch: {
            js: {
                files: ['public/js/**/*.js'],
                tasks: ['jshint', 'uglify']
            }
        },

        // watch our node server for changes
        nodemon: {
            dev: {
                script: 'server.js'
            }
        },

        // run watch and nodemon at the same time
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            tasks: ['nodemon', 'watch']
        }



    });

    // ===========================================================================
    // LOAD GRUNT PLUGINS ========================================================
    // ===========================================================================
    // we can only load these if they are in our package.json
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-nodemon');

    grunt.registerTask('default', ['jshint', 'uglify', 'concurrent']);

};