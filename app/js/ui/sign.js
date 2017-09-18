module.exports = function(that , call){
    that.signTap = function(event){
        var dataset = event.currentTarget.dataset;
        var countGzTa = dataset.gz;
        var openId = dataset.id;
        global.WY.request({
            url:global.WY.url.user.sign,
            method:'POST',
            header:{
                'content-type':'application/x-www-form-urlencoded'
            },
            data:{
                taOpenid:openId
            },
            success:function(data){
                global.WY.readyOnce('userInfo' , function(myUserInfo){
                    if(countGzTa){
                        myUserInfo.countGz --;
                    }else{
                        myUserInfo.countGz ++;
                    }
                    global.WY.ready('userInfo' , myUserInfo);
                });
                call && call(dataset);
            }
        })
    }
};