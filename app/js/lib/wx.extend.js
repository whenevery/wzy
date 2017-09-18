module.exports = function(WY){
    WY.loading = function(msg){
        wx.showLoading({
            title:msg || '加载中',
            mask:true
        })
    };
    WY.toast = function(msg , type){
        var sendData;
        if(typeof msg =='object'){
            sendData = msg;
            if(sendData.done){
                setTimeout(sendData.done , sendData.duration || 1500);
            }
        }
        else sendData = {
            title:msg || '加载中',
            mask:true,
        };
        if(type || sendData.type){
            sendData.image = '/images/warn.png'
        }
        wx.showToast(sendData)
    };
    WY.onShareAppMessage = function(title , url){
        return {
            title: title||'我的地盘',
            path: url || '/pages/index/index',
            success: function(res) {
                // 转发成功
            },
            fail: function(res) {
                // 转发失败
            }
        };
    };
    var demoImg = '/images/photo/demo.jpg';
    WY.isDemoImg = function(url){
        return url == demoImg;
    };
    WY.getHeadImg = function(url){
        if(!url || demoImg == url)return demoImg;
        return global.WY.common.concatImgUrl(url);
    };
    WY.init = function(that , options){

    };
};