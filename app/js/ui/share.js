module.exports = function(options){
    var isAnimate;
    if(isAnimate == true)return false;
    isAnimate = true;
    var that = options.that;
    var duration = options.duration || 1000;
    var animation = wx.createAnimation({
        duration: duration,
        timingFunction: 'ease',
        transformOrigin:'50% 0'
    });
    animation.rotateX(-90).step();
    that.setData({
        showAnimation:true,
        animationData:animation.export()
    });
    animation.rotateX(0).step();
    that.setData({
        animationData:animation.export()
    });
    setTimeout(function(){
        animation.rotateX(-90).step();
        console.log('step 2');
        that.setData({
            animationData:animation.export()
        });
        setTimeout(function(){
            that.setData({
                showAnimation:false
            });
            isAnimate = false;
        } , duration);
    } , 1000);

};