module.exports = function(obj){
    if(obj){
        /*
         * 去掉重复值 会打乱顺序
         * */
        obj.each = function(arr , func){
            if(!arr || typeof arr != 'object' || typeof  func != 'function')return false;
            if(Array.isArray(arr)){
                for(var i= 0,len=arr.length;i<len;i++){
                    if(func.call(arr[i] , i , arr[i]) === false)return;
                }
            }
            else {
                for(var i in arr){
                    if(func.call(arr[i] , i , arr[i]) === false)return;
                }
            }
        };
        /*
         * 继承
         * */
        obj.extend = function(){
            var args = [].slice.call(arguments);
            var rt = args[0] || {};
            if(args.length <= 1){
                return rt;
            }
            for(var i=1; i<args.length ; i++){
                var obj = args[i];
                if(typeof obj == 'object')for(var i in obj){
                    if(!(i in rt) || rt[i] == null)rt[i] = obj[i];
                }
            }
            return rt;
        };
        /*
         * 强制继承
         * */
        obj.extendMore = function(){
            var args = [].slice.call(arguments);
            var rt = args[0] || {};
            if(args.length <= 1){
                return rt;
            }
            for(var i=1; i<args.length ; i++){
                var obj = args[i];
                if(obj)for(var i in obj){
                    if(obj[i] !=null)rt[i] = obj[i];
                }
            }
            return rt;
        };
        obj.parse = function(data){
            try{
                return JSON.parse(data);
            }catch (e){
                try{
                    return eval('('+data+')');
                }catch (e){
                    return data;
                }
            }
        };
        obj.stringify = function(data){
            try{
                return JSON.stringify(data) + '';
            }catch (e){
                return data + '';
            }
        };
        obj.clearNull = function(data){
            if(data)for(var key in data){
                if(data[key] === null)data[key] = '';
            }
            return data;
        };
        obj.keyArray = function(data){
            if(data)for(var key in data){
                if(/\[\d+\]/.test(key)){
                    var a = key.split(/\[|\]/);
                    var d = data[a[0]]  = data[a[0]] || [];
                    d[a[0]] = d[a[1]];
                    delete data.key;
                }
            }
            return data;
        };
    }
};