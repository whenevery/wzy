module.exports = function(WY){
    WY.timer = function(el , time , done){
       var timer;
       var autoHtml = el.innerHTML;
       time = time || 60;
       timer = setTimeout(function(){
           el.innerHTML = time + '秒后发送';
           if(time === 0){
               el.innerHTML = autoHtml;
               return done && done();
           }
           time--;
       } , 1000);
       return function(){
           return timer;
       }
    };
};