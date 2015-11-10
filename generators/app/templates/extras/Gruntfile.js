"use strict";

module.exports = function(grunt) {
  require("load-grunt-tasks")(grunt);

	grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

		jshint: {
			all: ["assets/src/js/**/*.js"]
		},

		uglify: {
			build: {
				files: [{
					cwd: "assets/src/js",
					src: "**/*.js",
					dest: "assets/dist/js/",
					expand: true
				}]
			}
		},

		cssmin: {
			build: {
				files: {
					"assets/dist/css/main.min.css": "assets/src/css/main.css"
				}
			}
		},

		imagemin: {
			dist: {
				options: {
					optimizationLevel: 5
				},
				files: [{
					cwd: "assets/src/img",
					src: ["**/*.{png,jpg,gif}"],
					dest: "assets/dist/img",
					expand: true
				}]
			}
		},

		watch: {
			css: {
				files: ["assets/src/css/**/*.css"],
				tasks: ["newer:cssmin"]
			},
			js: {
				files: ["assets/src/js/**/*.js"],
				tasks: ["newer:jshint", "newer:uglify"]
			},
			img: {
				files: ["assets/src/img/**/*.{png,jpg,gif}"],
				tasks: ["newer:imagemin"]
			}
		},

		concurrent: {
			options: {
				logConcurrentOutput: true
			},
			tasks: ["watch"]
		}
	});

	grunt.registerTask("default",["jshint","uglify","imagemin","cssmin","handlebars","concurrent"]);
};
