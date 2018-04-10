module.exports = function(WY){
    WY.enumData = {
    };
    WY.enum = {
        text:function(key , code){
            var o = WY.enumData[key];
            return o && o[code] || '';
        },
        indexValue:function(key  , index){
            var o = WY.enumData[key];
            return o && o[Object.keys(o)[index]] || '';
        },
        indexKey:function(key  , index){
            var o = WY.enumData[key];
            return o && Object.keys(o)[index] || '';
        }
    }
};