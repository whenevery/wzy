var WY = global.WY;
Page({
    data:{
        personList:[
            {
                call:'妈妈',
                name:'古秀婷',
                img:'/images/photo/mom.jpg'
            },
            {
                call:'爸爸',
                name:'吴云',
                img:'/images/photo/mom.jpg'
            }
        ]
    },
    onLoad:function(options){
    },

    onShareAppMessage:function(){
        return WY.onShareAppMessage('','/pages/relationship/index');
    },
    showImage:function(e){
        var index = e.currentTarget.dataset.index;
        var urls = [this.data.personList[index].img];
        // wx.previewImage({
        //     urls:urls,
        //     complete:function(e){
        //         console.log(e);
        //     }
        // })
    }
});