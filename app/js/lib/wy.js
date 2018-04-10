var WY = {};
require('./wy.handler')(WY);
WY.common = {};
require('./prop');
require('./date.extend')(WY.common);
require('./string.extend')(WY.common);
require('./object.extend')(WY.common);
require('./wx.extend')(WY);
require('./session')(WY);
require('./location')(WY);
require('./jq')(WY);
require('./enum')(WY);
require('./gps')(WY);
require('./timer')(WY);
require('./window')(WY);
require('./wx.picker.data')(WY);
WY.config = require('../../config.js');
WY.url = require('../../url')(WY.config);
WY.request = require('./request');
for(var key in WY){
    WY[key].init && WY[key].init(WY);
}
WY.ready('appShow' , function(){
    WY.ready('appReady');
});
console.log(WY)
module.exports = WY;