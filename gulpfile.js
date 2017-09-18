var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    minifycss = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    del = require('del'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    less = require('gulp-less');


/**
 * 清除
 */
gulp.task('clean', function(cb) {
    console.log('clean start');
    return del(['*.zip','public','views','rev','build/js/build','app/app.wxss'], cb);
});
gulp.task('less',['clean'], function(cb) {
    console.log('less start');
    gulp.src('./build/less/*.less').pipe(less()).pipe(gulp.dest('./build/css/build')).on('end', cb); //编译less
});
/*
* 合并JS
* 减少请求次数
* */
gulp.task('concat-obj',['less'], function(cb) {
    console.log('concatJs start');
    var concatData = require('./concat');
    concatData.forEach(function(o , i){
        if(i == concatData.length - 1){
            console.log('concatJs end');
            gulp.src(o.src).pipe(concat(o.concatName)).pipe(gulp.dest(o.destPath)).on('end' , cb);
        }else{
            gulp.src(o.src).pipe(concat(o.concatName)).pipe(gulp.dest(o.destPath));
        }
    });
    if(!concatData.length)cb && cb();
});
gulp.task('default',['concat-obj'],function() {
    gulp.src(['./build/css/build/**']).pipe(minifycss()).pipe(gulp.dest('./build/css/dist')).on('end',function(){
        var concatCssData = require('./concat-css');
        concatCssData.forEach(function(o , i){
            if(i == concatCssData.length - 1){
                gulp.src(o.src).pipe(concat(o.concatName)).pipe(gulp.dest(o.destPath));
            }else{
                gulp.src(o.src).pipe(concat(o.concatName)).pipe(gulp.dest(o.destPath));
            }
        });
    });
});

gulp.task('build',['rev'],function(cb) {

});