var WY = global.WY;
Page({
    data:{
        infoList:[
            ['姓名','吴致远']
        ]
    },
    onUnload:function(){
        WY.oneUnBind(this);
    },
    onLoad:function(options){
      global.WY.wxInit(this)
    },
    onShareAppMessage:function(){
        return WY.onShareAppMessage();
    },
    chooseLocation:function(){
        wx.chooseLocation({
            success:function(a){
                console.log(a);
            }
        })
    },
    openLocation:function(e){
        console.log(e);
        var type = e.currentTarget.dataset.type;
        var location = ({
            birth:{
                name: "重庆市渝北区中医院", address: "重庆市渝北区渝航路87号", latitude: 29.71964, longitude: 106.62955
            },
            home:{
                name: "重庆市渝北区香语湖", address: "重庆市渝北区兰馨大道12号", latitude: 29.70318312347608, longitude: 106.61178868563842
            },
            momHome:{
                name: "高华村", address: "广东省梅州市五华县", latitude: 24.04028, longitude: 115.58986
            }
        })[type];
        console.log(location);
        wx.openLocation(location);
    }
});