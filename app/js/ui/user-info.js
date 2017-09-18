module.exports = function(that , sts , id){
    that.showUserInfo = function(event){
        var openId =  event.currentTarget.dataset.id;
        if(global.WY.login.isOwner(openId)){
            wx.switchTab({
                url:'/pages/user/index'
            })
        }
        else{
            if(sts && id){
                return flase;
            }
            wx.navigateTo({
                url:'/pages/user/other?openId='+openId
            });
        }
    };
    that.showDetailInfo = function(event){
        var openId =  event.currentTarget.dataset.id || '';
        wx.navigateTo({
            url:'/pages/user/info?openId='+openId
        });
    }
};