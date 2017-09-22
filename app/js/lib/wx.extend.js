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
            path: url || '/pages/index',
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
    WY.getDistance = function(lat1,lng1,lat2,lng2){
        lat1 = lat1 || 0;
        lng1 = lng1 || 0;
        lat2 = lat2 || 0;
        lng2 = lng2 || 0;

        var rad1 = lat1 * Math.PI / 180.0;
        var rad2 = lat2 * Math.PI / 180.0;
        var a = rad1 - rad2;
        var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;

        var r = 6378137;
        return r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))
    }
};