var wy = require('../lib/wy');
module.exports = function(options){
  var that = options.that;
  var imgPath = options.imgPath;
  var cutData = that.data.cutData || {
          show:false
  };
  cutData.imgPath = imgPath;
  cutData.left = 10;
  cutData.top = 10;
  var context = wx.createCanvasContext('cutCanvas');
  var windowWidth = wy.window.getWindowWidth();
  var windowHeight = wy.window.getWindowHeight();
  var imgWidth = 200,imgHeight=200;
  var isTouchStart;
  var autoLeft,autoTop,autoX,autoY;
  var autoImgWidth,autoImgHeight;
  var scale;
  that.cutImageLoad = function(event ){
      autoImgWidth = event.detail.width;
      autoImgHeight = event.detail.height;
      scale = autoImgWidth / windowWidth;
      cutData.imgWidth = windowWidth;
      cutData.imgHeight = autoImgHeight * windowWidth/autoImgWidth;
      cutData.canvasWidth = scale * imgWidth;
      cutData.canvasHeight = scale * imgHeight;
      cutData.show = true;
      setData();
      draw();
  };
  that.cutImageTouchStart = function(event){
      isTouchStart = true;
      var e = event.changedTouches[0];
      autoLeft = cutData.left;
      autoTop = cutData.top;
      autoX = e.pageX;
      autoY = e.pageY;
  };
  that.cutImageTouchEnd = that.cutImageTouchCancel = function(){
      isTouchStart = false;
  };
  that.cancelCutImage = options.cancel;
  that.cutImageTouchMove = function(event){
      if(!isTouchStart)return false;
      var e = event.changedTouches[0];
      var _x = e.pageX;
      var _y = e.pageY;
      var left = autoLeft + _x - autoX;
      if(left < 0){
          left = 0
      }else if(left > windowWidth - imgWidth){
          left = windowWidth - imgWidth;
      }
      var top = autoTop + _y - autoY;
      if(top < 0){
          top = 0;
      }else if(top > windowHeight - imgHeight){
          top = windowHeight - imgHeight;
      }
      if(left != cutData.left || top != cutData.top){
          cutData.left = left;
          cutData.top = top;
          setData();
          draw();
      }
  };
  function draw(){
      context.clearRect(0,0,imgWidth,imgHeight);
      context.beginPath();
      context.drawImage(imgPath , -cutData.left * scale , -cutData.top * scale  , autoImgWidth  , autoImgHeight);
      context.draw();
  }
  that.confirmCutImage = function(){
        wx.canvasToTempFilePath({
            canvasId:'cutCanvas',
            success:function(res){
                setData();
                options.done(res.tempFilePath);
            }
        });
  };
  function setData(data){
      data = data || {};
      data.cutData = cutData;
      that.setData(data);
  }
  setData(options.data);
};