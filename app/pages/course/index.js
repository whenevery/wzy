var WY = global.WY;
Page({
    data:{
        courseList:[
            {
                title:'降临',
                remark:'今天开始留下足迹',
                date:'2016-05-29',
                img:'/images/course/2016-05-29-1.jpg'
            },
            {
                title:'一岁啦',
                remark:'我长大了',
                date:'2017-05-29',
                img:'/images/course/2017-05-29-1.jpg'
            }
        ],
        courseIndex:0,
        coursePrevShow:0,
        courseNextShow:0,
        courseData:''
    },
    onLoad:function(options){
        this.setIndex();
        console.log(this.data);
    },

    onShareAppMessage:function(){
        return WY.onShareAppMessage('','/pages/course/index');
    },
    setIndex:function(){
        var index = this.data.courseIndex;
        this.setData({
            coursePrevShow:index!==0,
            courseNextShow:this.data.courseList.length-1>index,
            courseData:this.data.courseList[index]
        });
    },
    changeIndex:function(e){
        var type = e.currentTarget.dataset.type;
        if(type === 'up'){
            if(this.data.courseIndex === 0)return false;
            this.data.courseIndex --;
        }else{
            if(this.data.courseIndex === this.data.courseList.length - 1)return false;
            this.data.courseIndex ++;
        }
        this.setIndex();
    }
});