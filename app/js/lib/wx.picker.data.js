module.exports = function(WY){
    var pickerData = {};
    WY.getPickerData = function(key , call){
        var o = pickerData[key];
        //数据缓存30分钟
        if(o && Date.now() - o.cacheDate > 30 * 60 * 1000){
            call(o.data);
        }else{
            getPickerData(key , call);
        }
    };
    var pickerDataUrls = {
        merchantList:'http://127.0.0.1/server/picker/merchant/list',
    };
    function getPickerData(key , call){
        WY.request({
            url:pickerDataUrls[key],
            data:{},
            success:function(data){
                pickerData[key] = {
                    data:data,
                    cacheDate:Date.now()
                };
                call(data);
            }
        })
    }
};