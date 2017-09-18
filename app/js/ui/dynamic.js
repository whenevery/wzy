var handlers = {};
module.exports = function(that , type , url){
    that.addDynamic = function(){
        wx.navigateTo({
            url:'/pages/dynamic/add'
        });
    };
    var handler = handlers[type];
    if(!handler){
        handler = {
            that:that,
            func : function(){
                handler.that.setData({
                    dynamicAddInfo:{
                        display:'inline-block',
                        left:global.WY.window.getCenterLeft(100)
                    }
                });
            }
        };
        global.WY.ready('systemInfo',function(){
            handler.func();
        });
    }
    else{
        handler.that = that;
        handler.func();
    }
};