module.exports = function(WY){
    var handlers = {};
    var readyHandler = {};
    WY.ready = function(type ,func , done){
        var handler = readyHandler[type] = readyHandler[type] || {};
        if(typeof func === 'function'){
            WY.bind('ready-' + type , func);
            if(handler.isReady){
                console.log('ready bind--' +type );
                func && func(handler.data, handler.done);
                return false;
            }
        }else{
            handler.data = func;
            handler.done = done;
            handler.isReady = true;
            WY.trigger('ready-' + type , handler.data , handler.done);
            if(handler.once){
                handler.once.forEach(function(a){
                    try{
                        a(handler.data , handler.done);
                    }catch (e){
                        console.error(e);
                    }
                });
                handler.once = [];
            }
        }
    };
    WY.readyOnce = function(type ,func){
        var handler = readyHandler[type] = readyHandler[type] || {};
        if(typeof func === 'function'){
            if(handler.isReady){
                func && func(handler.data , handler.done);
                return false;
            }else{
                handler.once = handler.once || [];
                handler.once.push(func);
            }
        }
    };
    WY.bind = function(event , func){
        console.log('bind --' +event );
        if(func){
            var handler = handlers[event] = handlers[event] || [];
            if(handler.indexOf(func) >= 0){
                return false;
            }
            handler.push(func);
        }
    };
    WY.unbind = function(event , func){
        if(func){
            var handler = handlers[event];
            if(handler){
                var index = handler.indexOf(func);
                if(index >= 0){
                    handler.splice(index , 1);
                }
            }

        }else{
            handlers[event] = [];
        }
    };
    WY.clearBind = function(func){
        if(func){
            for(var key in handlers){
                var o = handlers[key],index;
                if(o && o.length){
                    index = o.indexOf(func);
                    if(index >=0){
                        o.splice(index , 1);
                        return;
                    }
                }
            }
            for(var key in readyHandler){
                var o = readyHandler[key].once,index;
                if(o && o.length){
                    index = o.indexOf(func);
                    if(index >=0){
                        o.splice(index , 1);
                        return;
                    }
                }
            }
        }
    };
    WY.trigger = function(event , data , options){
        console.log('trigger --' +event );
        var handler = handlers[event];
        var nextStatus;
        handler && handler.forEach(function(a){
            try{
                if(a(data , options) === false){
                    nextStatus = false;
                }
            }catch (e){
                console.error(e);
            }
        });
        if(nextStatus === false)return false;
        if(event.indexOf('.') > 0){
            WY.trigger(event.replace(/\.\w+$/,'') , data , options);
        }
    };
};