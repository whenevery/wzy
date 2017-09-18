var sign = require('./sign');
var userInfo = require('./user-info');
var touchMove = require('./touchmove');
module.exports = function(options){
    var that = options.that;
    if(that.user){
        return;
    }
    global.WY.loading();
    userInfo(that);
    var dynamicList = [];
    var totalElements,showTotal = 0;
    var currentPage = 1,limit=10;
    var isFixed = false;
    that.loadMore = function(){
        if(that.data.showMore == false || showTotal >= totalElements)return;
        that.setData({
            showMore:false
        });
        if(totalElements>showTotal){
            currentPage ++ ;
            that.doSearch();
        }
    };
    that.addDynamic = function(){
        wx.navigateTo({
            url:'/pages/dynamic/add'
        });
    };
    that.showDetail = function(event){
        if(!openId){
            wx.navigateTo({
                url:'/pages/dynamic/detail?id='+event.currentTarget.dataset.id
            });
            return;
        }
        wx.switchTab({
            url:'/pages/dynamic/index',
            success:function(){
                wx.navigateTo({
                    url:'/pages/dynamic/detail?id='+event.currentTarget.dataset.id
                });
            }
        })
    };
    touchMove(that , {
        scroll:function(scrollTop){
            console.log(scrollTop);
            if(scrollTop > 180){
                if(!isFixed){
                    isFixed = true;
                    that.setData({
                        isFixed:isFixed,
                    })
                }
            }else{
                if(isFixed){
                    isFixed = false;
                    that.setData({
                        isFixed:isFixed,
                    })
                }
            }
        }
    });
    that.showFansTap = function(event){
      var type =   event.target.dataset.type;
      var count =   event.target.dataset.count;
      var openId = this.data.userInfo.openId;
      if(count > 0)wx.navigateTo({
          url:'/pages/user/fans?type='+type+'&openId='+openId
      });
    };
    that.backDynamic = function(){
         wx.switchTab({
             url:'/pages/dynamic/index'
         });
    };
    sign(that , function(){
        var userInfo = that.data.userInfo;
        var myCountGzTa = userInfo.myCountGzTa;
        userInfo.myCountGzTa = 1 - myCountGzTa;
        if(myCountGzTa){
            userInfo.countFs --;
        }else{
            userInfo.countFs ++;
        }
        that.setData({
            userInfo:userInfo
        });
    });
    function reset(){
        currentPage = 1;
        dynamicList = [];
        showTotal = 0;
        totalElements = null;
        isFixed = false;
        that.setData({
            totalElements:totalElements,
            showTotal:0,
            showMore:false,
            showList:false,
            isFixed:false,
            list:[],
        })
    }
    that.bindScrollToLower = function(event){
        if(showTotal < totalElements){
            currentPage++;
            that.doSearch();
        }
    };
    function getUserInfo(call){
        if(openId){
            that.searchUserInfo(call);
        }
        else global.WY.login.getOwnerInfo(call);
    }
    global.WY.bind('dynamic' , function(){
        reset();
        that.doSearch();
    });
    var openId = options.openId;
    that.onPullDownRefresh = function(){
        getUserInfo(function(){
            wx.stopPullDownRefresh();
        });
    };
    that.doSearch = function(){
        global.WY.request({
            url:global.WY.url.dynamic.list,
            data:{
                type:openId?'Ta':'MY',
                taOpenId:openId,
                currentPage:currentPage,
                limit:limit
            },
            success:function(data){
                wx.hideLoading();
                totalElements = data.result.totalElements;
                dynamicList = dynamicList.concat(data.result.content);
                showTotal = dynamicList.length;
                var rt = [];
                var lastYear,lastDay;
                var lastYearList,lastDayList;
                var nowYear = global.WY.common.parseDate(new Date  , 'Y')
                dynamicList.slice().forEach(function(a){
                    a.filePath = global.WY.common.concatImgUrl(a.files[0].filePath);
                    var showYear = global.WY.common.parseDate(a.rowAddTime  , 'Y');
                    if(!lastYear || showYear != lastYear){
                        lastYear = showYear;
                        //nowYear == showYear?'':showYear
                        lastYearList = {
                            year:showYear,
                            list:[]
                        };
                        rt.push(lastYearList);
                    }
                    var showDay = global.WY.common.parseDate(a.rowAddTime  , 'Ymd');
                    if(!lastDay || showDay != lastDay){
                        lastDay = showDay;
                        lastDayList = {
                            month:['一','二','三','四','五','六','七','八','九','十','十一','十二'][showDay.slice(4,6)-1],
                            day:showDay.slice(6),
                            list:[]
                        };
                        lastYearList.list.push(lastDayList);
                    }
                    lastDayList.list.push(a);
                });
                that.setData({
                    showMore:true,
                    totalElements:totalElements,
                    showTotal:showTotal,
                    showList:true,
                    list:rt
                });
            }
        })
    };
    that.searchUserInfo = function(call){
        global.WY.login.getOtherUserInfo(openId , function(userInfo){
            that.setData({
                isFixed:isFixed,
                openId:openId,
                userInfo:userInfo
            });
            call && call();
            reset();
            that.doSearch();
        });
    };
    if(openId){
        that.searchUserInfo();
    }
    else global.WY.ready('userInfo' , function(userInfo){
        reset();
        that.setData({
            isFixed:isFixed,
            totalElements:totalElements,
            showTotal:showTotal,
            openId:openId,
            userInfo:userInfo
        });
        that.doSearch();
    });
};