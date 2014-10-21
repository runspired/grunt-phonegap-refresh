/*global module, require*/
module.exports = function (grunt) {

    grunt.registerMultiTask("phonegap_refresh", "Update Assets in Phonegap", function () {

        grunt.loadNpmTasks("grunt-newer");
        grunt.loadNpmTasks("grunt-contrib-copy");
        /**
         * Options
         *
         * path : location of phonegap directory (usually 'phonegap')
         * platforms : the platforms you with to refresh in addition to the main source tree
         * refreshSource : if false, only the platform specific asset version will be updated
         * appName : the name of the app used by phonegap to create the app directory
         * icons : path to a directory containing icons to be copied into the platform's res folder for app icons
         * splash : path to a directory containing images to be copied into the platform's res folder for app launch screens
         * assets : path to a directory containing the asset files
         */
        var options = this.options({
                path : 'phonegap',
                platforms : ['ios'],
                refreshSource : true,
                appName : '',
                icons : {},
                splash : {},
                assets : ''
            }),

            PATH_ASSETS = options.assets + '/',
            PATH_ASSETS_ICONS_IOS = options.icons.ios + '/',
            PATH_ASSETS_SPLASH_IOS = options.splash.ios + '/',
            PATH_ASSETS_ICONS_ANDROID = options.icons.android + '/',
            PATH_ASSETS_SPLASH_ANDROID = options.splash.android + '/',

            //build paths
            PATH_WWW = options.path + '/www/',

            PATH_IOS_ASSETS = options.path + '/platforms/ios/www/',
            PATH_IOS_RES = options.path + '/platforms/ios/' + options.appName + '/Resources/',
            PATH_IOS_SPLASH = PATH_IOS_RES + 'splash/',
            PATH_IOS_ICONS = PATH_IOS_RES + 'icons/',

            PATH_ANDROID_ASSETS = options.path + '/platforms/android/assets/www/',
            PATH_ANDROID_RES = options.path + '/platforms/android/res/',
            PATH_ANDROID_SPLASH = PATH_ANDROID_RES + 'drawable/',//TODO: these are wrong, need to be dynamic
            PATH_ANDROID_ICONS = PATH_ANDROID_RES + 'drawable/',

            files = [];

        //create the copy task
        if (options.refreshSource) {
            files.push({
                expand : true,
                flatten : false,
                dest : PATH_WWW,
                src : '**',
                cwd : PATH_ASSETS,
                timestamp : true
            });
        }

        //create the ios task
        if (options.platforms.indexOf('ios') !== -1) {
            files.push(
                {
                    expand : true,
                    flatten : false,
                    dest : PATH_IOS_ASSETS,
                    src : '**',
                    cwd : PATH_ASSETS,
                    timestamp : true
                },
                {
                    expand : true,
                    flatten : false,
                    dest : PATH_IOS_ICONS,
                    src : '**',
                    cwd : PATH_ASSETS_ICONS_IOS,
                    timestamp : true
                },
                {
                    expand : true,
                    flatten : false,
                    dest : PATH_IOS_SPLASH,
                    src : '**',
                    cwd : PATH_ASSETS_SPLASH_IOS,
                    timestamp : true
                }
            );
        }

        //create the android task
        if (options.platforms.indexOf('android') !== -1) {
            files.push(
                {
                    expand : true,
                    flatten : false,
                    dest : PATH_ANDROID_ASSETS,
                    src : '**',
                    cwd : PATH_ASSETS,
                    timestamp : true
                },
                {
                    expand : true,
                    flatten : false,
                    dest : PATH_ANDROID_ICONS,
                    src : '**',
                    cwd : PATH_ASSETS_ICONS_ANDROID,
                    timestamp : true
                },
                {
                    expand : true,
                    flatten : false,
                    dest : PATH_ANDROID_SPLASH,
                    src : '**',
                    cwd : PATH_ASSETS_SPLASH_ANDROID,
                    timestamp : true
                }
            );
        }

        if (files.length) {
            grunt.config.merge({
                copy : {
                    phonegap_refresh : {
                        files : files
                    }
                }
            });
            grunt.task.run('newer:copy:phonegap_refresh');
        }
    });

};