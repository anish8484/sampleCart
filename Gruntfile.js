module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
	   options: {
	      // define a string to insert between files in the concatenated output
	      separator: ';'
	   },
	   dist: {
	      // files needs to be concatenated
	      src: ['app/**/*.js'],
	      // location of the concatenated output JS file
	      dest: 'dist/<%= pkg.name %>.js'
	   }
	},
	uglify: {
   options: {
      // banner will be inserted at the top of the output which displays the date and time
      banner: '/*! <%= pkg.name %> <%= grunt.template.today() %> */\n'
   },
   dist: {
      files: {
         'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
      }
   }
},


		watch: {
			scripts: {
				files: ['app/js/**/*.js'],
				tasks: ['concat'],
				event: ['changed'],
				options: {
					spawn: false
				}
			}
		}
	});

	// Load the plugin that provides task(s).
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.loadNpmTasks('grunt-contrib-concat');

	// Default task(s).
	grunt.registerTask('default', ['concat', 'uglify']);

	// on production, concat and minify
   grunt.registerTask('prod', ['concat', 'min']);

};
