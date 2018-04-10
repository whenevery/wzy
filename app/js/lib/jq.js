module.exports = function(WY){
    WY.$ = function(selector){
        var exec = wx.createSelectorQuery();
        return exec.selectAll(selector);
    };
    WY.$.boundingClientRect = function(selector){
        return exec.selectAll(selector);
    }
};