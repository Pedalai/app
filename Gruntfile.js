"use strict";

module.exports = function( grunt ) {
	// Definição dos arquivos js
	var filesJS = [
		'app/src/js/app.js',
		'app/src/js/services/requestAjax.js',
		'app/src/js/controllers/list-controller.js',
		'app/src/js/controllers/map-controller.js',
		'app/src/js/filters/search.js',
		'app/src/js/directives/map.js'
	];

	// Load all tasks
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  // Tasks Time
  require('time-grunt')(grunt);

	grunt.initConfig({
		// Watch
		watch: {
			css: {
				files: [ 'app/src/sass/**/*' ],
				tasks: [ 'sass:dist', 'concat:css' ]
			},

			js: {
				files: [ 'app/src/js/**/*' ],
				tasks: [ 'concat:js' ]
			}
		},

    // SASS
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: 'sass/*.scss',
          dest: 'src/css/',
          ext: '.css'
        }]
      }
    },
    
		// Concateção dos arquivos CSS e JS
		concat: {
			css: {
				src: 'app/src/css/main.css',
				dest: 'app/dist/css/styles.combined.min.css'
			},

			js: {
				src: filesJS,
				dest: 'app/dist/js/scripts.combined.min.js'
			}
		},

		// Concateção e minificação dos arquivos e JS
		uglify: {
			options: {
				mangle: false
			},

			dist: {
				files: {
					'app/dist/js/scripts.combined.min.js': filesJS
				}
			}
		},

		// Otimização das imagens
		imagemin: {
		    dynamic: {
		    	files: [{
		        	expand: true,
		        	cwd: 'app/src/images',
		        	src: ['**/*.{png,jpg,gif}'],
		        	dest: 'app/dist/images'
		    	}]
		    }
		},

		browserSync: {
            files: {

                // Aplicando o recurso de Live Reload nos seguintes arquivos
                src : [
                	'app/dist/css/styles.combined.min.css',
                	'**/*.html',
                	'**/*.php'
                ]

            },

            options: {

                // Definindo um IP manualmente
                host : "",

                // Integrando com a tarefa "watch"
                watchTask: true,

                // Sincronizando os eventos entre os dispositívos
                ghostMode: {
                	clicks: true,
                    scroll: true,
                    links: true,
                    forms: true
                }
            }
        }
	});

	// registrando tarefa default
	grunt.registerTask( 'default', [ 'browserSync', 'watch' ] );
	grunt.registerTask( 'img', [ 'imagemin' ] );
	grunt.registerTask( 'src', [ 'sass:dist', 'concat:js', 'concat:css' ] );
	grunt.registerTask( 'dist', [ 'sass:dist', 'uglify:dist', 'concat:css', 'imagemin' ] );
};