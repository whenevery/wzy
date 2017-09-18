var cityData = require('../data/city.data');
var __cityCodes = ['500000','110000','310000','120000'];
__cityCodes.forEach(function(a , i){
    var o = cityData.filter(function(b){
        return b.code == a;
    })[0];
    var index = cityData.indexOf(o);
    cityData.splice(index , 1);
    cityData.unshift(o);
});
function getDataList(code){
    if(code)code+='';
    if(/0000$/.test(code)){
        return [].concat(getDataList(code.slice(0 , 2) + '0100') , getDataList(code.slice(0 , 2) + '0200'));
    }
    code = code || '000000';
    return cityData.filter(function(a){
       return a.parentCode == code;
    });
}
function getIndex(name , data){
    if(!name)return 0;
    var index;
    data.every(function(a , i){
        if(a.name == name){
            index = i;
            return false;
        }
        return true;
    });
    return index || 0;
}
var dataList = [
    getDataList()
];
module.exports  = function(options){
    var that = options.that;
    var count = options.count;
    var current = 0;
    that.selectCityTap = function(){
        options.done(citySelectValue);
    };
    that.closeCityWindow = function(){
        that.setData({
            citySelect:false,
        });
    };
    that.changeCurrent = function(event){
        var selectCurrent = event.target.dataset.current;
        if(selectCurrent != current){
            current = selectCurrent;
            setData();
        }
    };
    that.bindCityItemTap = function(event){
        var index = event.target.dataset.index;
        var item = event.target.dataset.item;
        current = index;
        if(current < count - 1)current++;
        citySelectValue[index] = citySelectData[index][item].name;
        changeData(index);
    };
    var citySelectValue = that.data.citySelectValue || [];
    var citySelectData = dataList.slice();
    var citySelectIndex = [];
    function changeData(changeIndex){
        for(var i=0;i<count;i++){
            var val = changeIndex >= i ? citySelectValue[i] : '';
            var index = getIndex(val , citySelectData[i]);
            citySelectValue[i] = citySelectData[i][index].name;
            citySelectIndex[i] = index;
            citySelectData[i+1] = getDataList(citySelectData[i][index].code);
        }
        setData();
    }
    changeData(count);
    function setData(){
        that.setData({
            citySelect:true,
            cityData:{
                current:current,
                citySelectIndex:citySelectIndex,
                citySelectValue:citySelectValue,
                citySelectData:citySelectData.slice(0,count)
            }
        });
    }
    return {

  };
};