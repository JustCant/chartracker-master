module.exports = function(grunt) {

    grunt.initConfig({
      uglify: {
        my_target: {
          files: {
            'public/build/main.min.js': ['public/app.js', 'public/app/controllers/*.js', 'public/app/directives/*.js']
          }
        }
      },
      cssmin: {
        target: {
          files: {
            'public/build/styles.min.css': ['public/assets/css/styles.css']
          }
        }
      },
      less: {
        development: {
          files: {
            'public/assets/css/styles.css': ['public/assets/less/main.less']
          }
        },
      },
      watch: {
          js: {
            files: ['public/app.js', 'public/app/**/*.js'],
            tasks: ['uglify'],
          },
          css: {
            files: ['public/assets/css/*.css'],
            tasks: ['cssmin'],
          },
          less: {
            files: ['public/assets/less/*.less'],
            tasks: ['less'],
          },
        },
    });

  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['uglify', 'less', 'cssmin',  'watch']);

};
