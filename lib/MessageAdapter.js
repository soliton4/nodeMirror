
var events = require("events");

var declare = require("declare");





var MessageAdapter = declare([], {
  
  constructor: function(){
    this.openResponses = {};
    this._emit = this.emit;
    this.emit = function(name, msg, callback){
      this._emit("_data", {
        callback: callback ? this.registerCallback(callback) : false
      , name: name
      , msg: msg
      });
    };
    
    this.this.callbackCounter = 0;
    this.callbacks = {};
  }
  
  , registerCallback: function(callback){
    ++this.callbackCounter;
    var callbackCounter = this.callbackCounter;
    var self = this;
    this.callbacks[this.callbackCounter] = function(parMsg){
      delete self.callbacks[callbackCounter];
      callback(parMsg);
    };
    return callbackCounter;
  }
  
  , jsonData: function(parJsn){
    if (parJsn.answer){
      try{
        this.callbacks[parJsn.answer](parJsn.msg);
      }catch(e){
        // we catch both array miss error and callback error;
        this._emit("_error", {error: e, msg: parJsn.msg});
      };
      return;
    };
    if (!parJsn.callback){
      this._emit(parJsn.name, parJsn.msg);
      return;
    };
    var self = this;
    this._emit(parJsn.name, parJsn.msg, function(parData){
      self._emit("_data", {
        answer: parJsn.callback
        , msg: parData
      });
    });
  }
  
  , getSub: function(parName){
    return new Instance({
      name: parName
      , adapter: this
    });
  }
  
  
});

MessageAdapter = events.extend(MessageAdapter);


var Instance = declate([MessageAdapter], {
  constructor: function(par){
    this.name = par.name;
    this.adapter = par.adapter;
    var self = this;
    this.adapter.on("_sub_" + this.name, function(parMsg, callback){
      self._emit(parMsg.name, parMsg.msg, callback);
    });
    this.emit = function(name, msg, callback){
      this.adapter.emit("_sub_" + this.name, {
        name: name
      , msg: msg
      }, callback);
    };
  }
  
  
});

module.exports = MessageAdapter;
