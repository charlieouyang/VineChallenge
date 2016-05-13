module.exports = function (grunt) {
	var modRewrite = require('connect-modrewrite');

	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		sass : {
			dist : {
				options : {
					style : 'compressed'
				},
				files : {
					'src/css/style.css' : ['src/sass/style.scss']
				}
			}
		},
		watch : {
			css : {
				files : ['src/sass/*.scss', 'src/js/*.js'],
				tasks : ['sass']
			}
		},
		connect : {
			server : {
				options : {
					port : 8765,
					open : true,
					base : ['./src'],
					middleware : function (connect, options) {
						var middlewares;
						middlewares = [];
						middlewares.push(modRewrite(['^[^\\.]*$ /index.html [L]']));
						options.base.forEach(function (base) {
							return middlewares.push(connect["static"](base));
						});
						return middlewares;
					}
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.registerTask('default', ['connect', 'watch']);
};
