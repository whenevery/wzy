module.exports = function(WY){
    WY.wxReady = function(type , func , wxObj){
        wxObj.wxWyHandler = wxObj.wxWyHandler || [];
        wxObj.wxWyHandler.push(func);
        WY.ready(type , func);
    };
    WY.wxReadyOnce = function(type , func , wxObj){
        wxObj.wxWyHandler = wxObj.wxWyHandler || [];
        wxObj.wxWyHandler.push(func);
        WY.readyOnce(type , func);
    };
    WY.wxBind = function(type , func , wxObj){
        wxObj.wxWyHandler = wxObj.wxWyHandler || [];
        wxObj.wxWyHandler.push(func);
        WY.bind(type , func);
    };
    WY.wxUnBind = function(wxObj){
        var wxWyHandler = wxObj.wxWyHandler;
        if(wxWyHandler){
            wxWyHandler.forEach(function(a){
                WY.clearBind(a);
            })
        }
    };
};