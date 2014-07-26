"use strict";

module.exports = function( grunt ) {
	// Definição dos arquivos js
	var filesJS = [
            'src/js/APP.js', 
            'src/js/APP.Home.js'
        ];

	// Load all tasks
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		// Watch
		watch: {
			css: {
				files: [ 'src/sass/**/*' ],
				tasks: [ 'compass:src', 'concat:css' ]
			},

			js: {
				files: 'src/js/**/*',
				tasks: [ 'concat:js' ]
			}
		},

		// Compass scss
		compass: {
			src: {
				options: {
					config: 'config.rb'
				}
			},

			dist: {
				options: {
					force: true,
					config: 'config.rb',
					outputStyle: 'compressed',
					relativeAssets: true
				}
			}
		},

		// Concateção dos arquivos CSS e JS
		concat: {
			css: {
				src: 'src/css/main.css',
				dest: 'dist/css/styles.combined.min.css'
			},

			js: {
				src: filesJS,

				dest: 'dist/js/scripts.combined.min.js'
			}
		},

		// Concateção e minificação dos arquivos e JS
		uglify: {
			options: {
				mangle: false
			},

			dist: {
				files: {
					'dist/js/scripts.combined.min.js': filesJS
				}
			}
		},

		// Otimização das imagens
		imagemin: {
		    dynamic: {
		    	files: [{
		        	expand: true,
		        	cwd: 'src/images',
		        	src: ['**/*.{png,jpg,gif}'],
		        	dest: 'dist/images'
		    	}]
		    }
		},

		browserSync: {
            files: {

                // Aplicando o recurso de Live Reload nos seguintes arquivos
                src : [
                	'dist/css/styles.combined.min.css',
                	'dist/js/scripts.combined.min.js',
                	'**/*.html',
                	'**/*.php'
                ]

            },

            options: {

                // Definindo um IP manualmente
                host : "177.95.199.42",

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
	// grunt.registerTask( 'default', [ 'browserSync', 'watch' ] );
  grunt.registerTask( 'default', [ 'browserSync', 'watch' ] );
	grunt.registerTask( 'img', [ 'imagemin' ] );
	grunt.registerTask( 'src', [ 'compass:src', 'concat:js', 'concat:css' ] );
	grunt.registerTask( 'dist', [ 'compass:dist', 'uglify:dist', 'concat:css', 'imagemin' ] );
};