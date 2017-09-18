module.exports = function(that , handler){
    that.bindMainTouchMove = function(event){
        var touchE = event.changedTouches[0];
        handler.scroll && handler.scroll(touchE.pageY - touchE.clientY);
    };
};