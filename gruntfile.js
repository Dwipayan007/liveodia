/// <binding AfterBuild='default' Clean='default, concat' ProjectOpened='default' />
/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                report: 'min',
                mangle: false
            },
            js: { //target
                files: {
                    'dist/min/main.min.js': ['App/app.js','App/Directives/*js','App/Controllers/*.js','App/Services/*.js']
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
};