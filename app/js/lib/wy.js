var WY = {};
require('./wy.handler')(WY);
require('./wy.handler.wx')(WY);
WY.common = {};
require('./date.extend')(WY.common);
require('./string.extend')(WY.common);
require('./object.extend')(WY.common);
require('./wx.extend')(WY);
WY.config = require('../../config');
for(var key in WY){
    WY[key].init && WY[key].init(WY);
}
WY.ready('appShow' , function(){
    Promise.all([
    ]).then(function(){
        WY.ready('appReady');
    });
});
module.exports = WY;