module.exports = function(WY){
    WY.loading = function(msg){
        wx.showLoading({
            title:msg || '加载中',
            mask:true
        })
    };
    WY.toast = function(msg , type){
        var sendData;
        if(typeof msg ==='object'){
            sendData = msg;
            if(sendData.done){
                setTimeout(sendData.done , sendData.duration || 1500);
            }
        }
        else{
            if(msg)msg+='';
            sendData = {
                title:msg || '加载中',
                mask:true,
            };
        }
        if(type || sendData.type){
            sendData.image = '/images/warn.png'
        }
        wx.showToast(sendData)
    };
    WY.newToast = function(msg , delay){
        msg+='';
        WY.trigger('wy-toast' , msg , delay);
    };
    WY.confirm = function(msg , func){
        msg+='';
        WY.trigger('wy-confirm' , msg , func);
    };
    WY.onShareAppMessage = function(title , url){
        return {
            title: title || '我的地盘',
            path: url || '/pages/index',
            success: function(res) {
                // 转发成功
            },
            fail: function(res) {
                // 转发失败
            }
        };
    };
    WY.navigateBack = function(num){
        num = num || 1;
        wx.navigateBack({
            delta:num
        })
    }
};