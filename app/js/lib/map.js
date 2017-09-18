var bmap = require('../ui/bmap-wx');
module.exports = {
    init:function(WY){
        var BMap = new bmap.BMapWX({
            ak: WY.config.ak
        });
        WY.ready('appShow' , function(){
            var fail = function(data) {
                console.log(data)
            };
            var success = function(data){
                WY.ready('mapSuccess',data);
            };
            BMap.regeocoding({
                fail: fail,
                success: success
            });
        })
    }
};