module.exports = function(config){
    var h5api = config.h5api;
    var appapi = config.appapi;
    return {
        login:{
            sessionKey :appapi + '/wechat/jscode/smallwzy',
            login :appapi + '/wechat/user/sm'
        },
        de:{
            info :appapi + '/wechat/key/de/smallwzy',
        }
    }
};