module.exports = function(that , call){
    that.likeDynamicTap = function(event){
        var dataset = event.currentTarget.dataset;
        var id = dataset.id;
        global.WY.request({
            url:global.WY.url.dynamic.like,
            method:'POST',
            header:{
                'content-type':'application/x-www-form-urlencoded'
            },
            data:{
                id:id
            },
            success:function(data){
                global.WY.readyOnce('userInfo' , function(myUserInfo){
                    global.WY.ready('userInfo' , myUserInfo);
                });
                call && call(dataset);
            }
        })
    };
};