var WY = global.WY;
Page({
    data:{
      userInfo:''
    },
    onUnload:function(){
        WY.oneUnBind(this);
    },
    onLoad:function(options){
        var that = this
        WY.oneReady('appReady',function(){

        },this);
        WY.oneReady('user-info',function(userInfo){
            that.setData({
              userInfo:userInfo
            })
        },this);
    },
    onShareAppMessage:function(){
        return WY.onShareAppMessage();
    }
});