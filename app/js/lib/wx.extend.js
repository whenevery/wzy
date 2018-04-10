module.exports = function(WY){
    var hasAuthorize = {};
    var authorizeSuccessCount = 0;
    var authorizeCompleteCount = 0;
    function doAuthorize(key , sts){
        if(!sts && hasAuthorize[key]){
            authorizeCompleteCount++;
            authorizeSuccessCount++;
            checkAuthorize();
            return false;
        }
        wx.authorize({
            scope:'scope.'+key,
            success:function(){
                hasAuthorize[key] = 1;
                WY.ready('wx-authorize-'+key);
                authorizeSuccessCount++;
            },
            fail:function(){

            },
            complete:function(){
                authorizeCompleteCount++;
                checkAuthorize();
            }
        });
    }
    function checkAuthorize(){
        if(authorizeCompleteCount >= authorizeType.length){
            if(authorizeSuccessCount < authorizeType.length){
                //openSetting();
            }
        }
    }
    function openSetting(){
        wx.openSetting({
            success:function(e){
                getSetting();
            }
        })
    }
    var authorizeType = ['userInfo','userLocation'];
    function doAuthorizeAll(){
        authorizeType.forEach(function(a){
            doAuthorize(a);
        })
    }
    function getSetting(){
        wx.getSetting({
            success:function(e){
                authorizeType.every(function(a){
                    if( ! e.authSetting['scope.' + a ]){
                        hasAuthorize[a] = 0;
                        checkAuthorize();
                        return false
                    }else{
                        authorizeCompleteCount --;
                        doAuthorize(a);
                        return true;
                    }
                });
            }
        })
    }
    doAuthorizeAll();
    //绑定事件相关
    WY.oneReady = function(type , func , oneObj){
        oneObj = oneObj || WY.autoWxObj;
        oneObj.vueWyHandler = oneObj.vueWyHandler || [];
        oneObj.vueWyHandler.push(oneObj);
        WY.ready(type , func);
    };
    WY.oneReadyOnce = function(type , func , oneObj){
        oneObj = oneObj || WY.autoWxObj;
        oneObj.vueWyHandler = oneObj.vueWyHandler || [];
        oneObj.vueWyHandler.push(oneObj);
        WY.readyOnce(type , func);
    };
    WY.oneBind = function(type , func , oneObj){
        oneObj = oneObj || WY.autoWxObj;
        oneObj.vueWyHandler = oneObj.vueWyHandler || [];
        oneObj.vueWyHandler.push(oneObj);
        WY.bind(type , func);
    };
    WY.oneUnBind = function(oneObj){
        oneObj = oneObj || WY.autoWxObj;
        var vueWyHandler = oneObj.vueWyHandler;
        if(vueWyHandler){
            vueWyHandler.forEach(function(a){
                WY.clearBind(a);
            })
        }
    };
    var toastTimer;
    WY.bind('wy-toast' ,function(txt , delay){
        clearTimeout(toastTimer);
        if(WY.autoWxObj)WY.autoWxObj.setData({
            doShowToast:1,
            showToastContent:txt
        });
        toastTimer = setTimeout(function(){
            if(WY.autoWxObj)WY.autoWxObj.setData({
                doShowToast:0
            })
        } , delay || 1500);
    });
    var confirmCall;
    WY.bind('wy-confirm' ,function(txt , call){
        confirmCall = call;
        if(WY.autoWxObj)WY.autoWxObj.setData({
            doShowConfirm:1,
            showConfirmContent:txt
        });
    });
    WY.bind('get-product',function(supplierId , call){
        WY.request({
            url:WY.url.product.list,
            data:{
                supplierId:supplierId,
            },
            success:function(a){
                call && call(a.data);
            }
        })
    });
    WY.wxInit = function(wxObj , options){
        WY.trigger('check-session')
        WY.autoWxObj = wxObj;
        options = options || {};
        wxObj.allEventHandler = function(){

        };
        wxObj.menuChange = function(e){
            this.setData({
                menuCurrent:e.target.dataset.index
            });
        };
        wxObj.onUnload = function(){
            console.log('on unload');
            WY.oneUnBind(this);
        };
        wxObj.menuSwiperCurrentChange = function(e){
            this.setData({
                menuCurrent:e.detail.current
            });
        };
        wxObj.navigateTo = function(e){
            var dataset = e.currentTarget.dataset;
            var link = dataset.link;
            if(link){
                var item = dataset.item;
                var params = dataset.params;
                if(params){
                    link = WY.common.addUrlParam(link , WY.common.copyProp(item,params.split(',')))
                }
                wx.navigateTo({
                    url:link
                });
            }
        };
        wxObj.tableScroll = function(e){
            this.setData({
                tableScrollLeft:e.detail.scrollLeft,
                tableScrollTop:e.detail.scrollTop,
            })
        };
        if(!wxObj.searchFormSubmit){
            wxObj.searchFormSubmit = function(e){
                this.reset();
                this.doSearch(e.detail.value);
            }
        }
        if(!wxObj.setPageData){
            wxObj.setPageData = function(a){
                wxObj.setData({
                    pageData:a.result.list,
                    tableDataAble:1,
                    totalData:a.result
                })
            }
        }
        if(!wxObj.setAllPageData){
            wxObj.setAllPageData = function(a){
                wxObj.setData({
                    pageData:wxObj.data.pageData.concat(a.result.list),
                })
            }
        }
        if(!wxObj.pageDataHandler){
            wxObj.pageDataHandler = function(a,func){
                a.result.list = a.result.list.map(func);
            }
        }
        if(!wxObj.reset){
            wxObj.setData({
                pageNum:1,
                pageSize:10,
                pageData:[],
            });
            wxObj.reset = function(){
                this.data.pageNum = 1;
                this.data.pageData = [];
            }
        }
        if(!wxObj.pageDataScrollToLower){
            wxObj.pageDataScrollToLower = function(){
                this.data.pageNum++;
                this.doSearch();
            }
        }
        if(!wxObj.doGive){
            WY.oneBind('do-give',function(supplierId){
                wxObj.doGive(null  , supplierId);
            },wxObj);
            wxObj.doGive = function(e , supplierId){
                var options;
                if(supplierId){
                    options = {
                        supplierId:supplierId
                    }
                }else{
                    options = e.currentTarget.dataset.options;
                }
                wx.navigateTo({
                    url:WY.common.addUrlParam('/pages/my/give' , options)
                });
            }
        }
        if(!wxObj.openLocation){
            wxObj.openLocation = function(e){
                var item = e.target.dataset.item;
                var gps = WY.wgs84togcj02(item.gpsLongitude - 0,item.gpsDimension - 0);
                console.log(item);
                console.log(gps);
                wx.openLocation({
                    latitude:gps[1],
                    longitude:gps[0],
                    name:item.supplierName,
                });
            }
        }
        function pickerChange(name){
            return function(e){
                var pickerData = this.data.pickerData[name];
                pickerData.value = e.detail.value;
                this.setData({
                    pickerData:this.data.pickerData
                })
            }
        }
        if(options.pickerChangeHandler){
            options.pickerChangeHandler.forEach(function(a){
                wxObj[a+'PickerChange'] = pickerChange(a);
            });
        }

        wxObj.getPhoneNumber = function(data){
            if(data.iv)WY.trigger('de-key-info',data , function(o){
                wxObj.writePhoneNumber = o.purePhoneNumber;
                wxObj.setData({
                    bindPhoneNumber:o.purePhoneNumber,
                })
            });
        };
        WY.ready('do-bind-phone' , function(){
            wxObj.setData({
                doBindPhone:1,
            })
        });
        wxObj.inputPhoneNumber = function(e){
            this.writePhoneNumber = e.detail.value;
        };
        wxObj.doBindPhone = function(e){
            var data = e.detail.value;
            if(!data.phone || !/^1\d{10}$/.test(data.phone)){
                WY.toast('请输入有效的手机号！');
                return false;
            }
            if(!data.sendCode || !/^\d{6}$/.test(data.sendCode)){
                WY.toast('请输入有效的验证码！');
                return false;
            }
            data.sendType = 'BINDING';
            WY.request({
                url:WY.url.sms.check,
                data:data,
                method:'POST',
                notBody:1,
                success:function(a){
                    WY.trigger('send-bind-phone' , data.phone , function(){
                        wxObj.setData({
                            doBindPhone:0,
                        });
                    });
                }
            })
        };
        wxObj.sendSms = function(e){
            if(wxObj.smsDisabled)return false;
            var phone = this.writePhoneNumber;
            if(!phone || !/^1\d{10}$/.test(phone)){
                WY.toast('请输入有效的手机号！');
                return false;
            }
            WY.request({
                url:WY.url.sms.send,
                data:{
                    sendType:'BINDING',
                    phone:phone,
                },
                method:'POST',
                notBody:1,
                success:function(a){
                    wxObj.smsDisabled = 1;
                    WY.timer(e.target , 0 , function(){
                        wxObj.smsDisabled = 0;
                    });
                }
            })
        };
        wxObj.doHideConfirm = function(){
            if(confirmCall && confirmCall(0) === false){
                return false;
            }
            wxObj.setData({
                doShowConfirm:0,
            });
        };
        wxObj.doSubmitConfirm = function(){
            if(confirmCall && confirmCall(1) === false){
                return false;
            }
            wxObj.setData({
                doShowConfirm:0,
            });
        };

    }
};