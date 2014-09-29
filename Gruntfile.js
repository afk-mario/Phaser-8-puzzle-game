module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: [
                    'js/lib/Phaser.js',
                    'js/src/Prefabs/NumberBlock.js',
                    'js/src/Prefabs/Board.js',
                    'js/src/Solver.js',
                    'js/src/States/Boot.js',
                    'js/src/States/Preloader.js',
                    'js/src/States/MainMenu.js',
                    'js/src/States/Credits.js',
                    'js/src/States/LeaderBoards.js',
                    'js/src/States/Play.js',
                    'js/src/Main.js'],
                dest: 'build/8puzzle.js',
            },
        },
        replace: {
            example: {
                src: ['build/8puzzle.js'],             // source files array (supports minimatch)
                dest: 'build/8puzzle.js',             // destination directory or file
                replacements: [{
                  from: 'js/res/',                   // string replacement
                  to: 'assets/'
              }]
          }            
      },  
      uglify: {
        build: {
            src: 'build/8puzzle.js',
            dest: 'build/8puzzle.min.js'
        }
    },
    imagemin: {
        dynamic: {
            files: [{
                expand: true,
                cwd: 'js/res/',
                src: ['**/*.{png,jpg,gif}'],
                dest: 'build/assets/'
            }]
        }
    },
    copy: {
      main: {
        files: [{
            expand: true,
            cwd: 'js/res/',
            src: ['**/*.{json,mp3,ogg,wav}'],
            dest: 'build/assets/'
        },
        {
            expand: true,
            cwd: 'js/res/',
            src: ['fonts/**'],
            dest: 'build/assets/'
        },
        ]
    }
},
});



    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', ['concat','replace','uglify','imagemin','copy']);

}; 
