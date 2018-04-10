module.exports = function(WY){
    WY.ready('wx-authorize-userLocation',function(){
        wx.getLocation({
            type:'wgs84',
            success:function(data){
                WY.locationData = data;
                WY.ready('get-location-wgs84' , data);
                WY.ready('get-location' , data);
            }
        });
    });
};