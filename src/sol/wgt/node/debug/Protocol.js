define([
  "dojo/_base/declare"
  , "dojo/json"
  , "dojo/Deferred"
  , "dojo/_base/lang"
], function(
  declare
  , json
  , Deferred
  , lang
){
  return declare([], {
    constructor: function(){
      this.bufStr = "";
      this._events = {};
      this.seq = 0;
      this._responseHandler = {};
      this._requestsRunning = {};
    }
    
    , destroy: function(){
      delete this._events;
      delete this._responseHandler;
    }
    
    , write: function(data){
      if (typeof(data) == "STRING"){
        this.bufStr += data;
      }else{
        this.bufStr += data.toString();
      };
      var doCont = true;
      while (doCont){
        if (this.expectBody){
          doCont = this.parseBody();
        }else{
          doCont = this.parseHead();
        };
      };
    }
    
    , parseBody: function(){
      if (this.bufStr.length >= this.contentLength){
        this._newMsg({
          head: this.head
          , body: this.bufStr.substr(0, this.contentLength)
        });
        this.bufStr = this.bufStr.substr(this.contentLength);
        this.expectBody = false;
        return true;
      }else{
        //console.log(this.bufStr.length + " from " + this.contentLength);
      };
    }
    
    , parseHead: function(){
        var seperatorPos = this.bufStr.indexOf("\r\n\r\n");
        if (seperatorPos > -1){
          this.headStr = this.bufStr.substr(0, seperatorPos);
          this.bufStr = this.bufStr.substr(seperatorPos + 4);
          this._parseHead();
          if (this.head["Content-Length"]){
            this.contentLength = parseInt(this.head["Content-Length"], 10);
            if (this.contentLength){
              this.expectBody = true;
            }else{
              this._newMsg({
                head: this.head
                , body: undefined
              });
            };
          };
          return true;
        };
      return false;
    }
    
    , _parseHead: function(){
      this.head = {};
      var headAr = this.headStr.split("\r\n");
      var i;
      var dpPos;
      for (i = 0; i < headAr.length; ++i){
        dpPos = headAr[i].indexOf(":");
        if (dpPos > -1){
          var nameStr = headAr[i].substr(0, dpPos);
          var valueStr = headAr[i].substr(dpPos + (headAr[i][dpPos + 1] == " " ? 2 : 1));
          this.head[nameStr] = valueStr;
        }else{
          console.log("ignored header line:" + headAr[i]);
        };
      };
    }
    
    , _newMsg: function(parMsg){
      //console.log("msg:");
      //console.log(parMsg);
      if (this._events._message){
        for (var i = 0; i < this._events._message.length; ++i){
          try{
            this._events._message[i](parMsg);
          }catch(e){};
        };
      };
      if (parMsg.body === undefined){
        return;
      };
      var body = json.parse(parMsg.body);
      if (body.type == "event"){
        this._handleEvent(body);
        return;
      };
      if (body.type == "response"){
        this._handleResponse(body);
        return;
      };
      console.log("unknown Message:" + parMsg.body);
    }
    
    , _handleEvent: function(parEvent){
      //console.log(parEvent);
      //console.log(parEvent.event);
      if (this._events[parEvent.event]){
        for (var i = 0; i < this._events[parEvent.event].length; ++i){
          try{
            this._events[parEvent.event][i](parEvent.body);
          }catch(e){};
        };
      };
    }
    
    , on: function(parWhat, parFun){
      if (!this._events[parWhat]){
        this._events[parWhat] = [];
      };
      this._events[parWhat].push(parFun);
    }
    
    , _data: function(data){
      if (this._events.data){
        for (var i = 0; i < this._events.data.length; ++i){
          try{
            this._events.data[i](data);
          }catch(e){};
        };
      };
    }
    
    , _handleResponse: function(parMsg){
      if (this._responseHandler[parMsg.command]){
        this._responseHandler[parMsg.command](parMsg);
      }else{
        console.log("no response Handler for:");
        console.log(parMsg);
      };
    }
    
    , _expectResponse: function(par){
      var def = new Deferred();
      if (this._responseHandler[par.command]){
        console.log("trying to double handle response");
      };
      this._responseHandler[par.command] = lang.hitch(this, function(response){
        delete this._responseHandler[par.command];
        def.resolve(response);
      });
      return def.promise;
    }
    
    , getSource: function(par){
      var def = new Deferred();
      var dataStr = "";
      var dataJsn = {
        seq: this.seq++
        , type: "request"
        , "command"   : "scripts"
        , "arguments" : {
          "ids": [par.id]
          , "includeSource" : true
        }
      };
      
      dataStr = "Content-Length: ";
      var jsnStr = json.stringify(dataJsn);
      dataStr += jsnStr.length;
      dataStr += "\r\n\r\n";
      dataStr += jsnStr;
      this._data(dataStr);
      
      //"type":"response","command":"scripts","success":true,"body":
      
      this._expectResponse({
        command: "scripts"
      }).then(function(parResponse){
        def.resolve({
          id: parResponse.body[0].id
          , name: parResponse.body[0].name
          , source: parResponse.body[0].source
        });
      });
      
      return def;
    }
    
    /*"arguments" : { "fromFrame" : <number>
                  "toFrame" : <number>
                  "bottom" : <boolean, set to true if the bottom of the stack is requested>*/
    , backtrace: function(par){
      var def = new Deferred();
      this._commmand("backtrace", par).then(function(res){
        def.resolve(res);
      });
      return def;
    }
    
    , setExceptionBreak: function(par){
      var def = new Deferred();
      this._commmand("setexceptionbreak", par).then(function(res){
        def.resolve(res);
      });
      return def;
    }
    
    , version: function(par){
      var def = new Deferred();
      this._commmand("version", par).then(function(res){
        def.resolve(res);
      });
      return def;
    }
    
    , setFrame: function(nr){
      var def = new Deferred();
      this._commmand("frame", {
        number: nr
      }).then(function(res){
        def.resolve(res);
      });
      return def;
    }
    
    , _commmand: function(parCmd, parArg){
      var def = new Deferred();
      var dataStr = "";
      var dataJsn = {
        seq: this.seq++
        , type: "request"
        , "command": parCmd
      };
      
      if (parArg){
        dataJsn.arguments = parArg;
      };
      
      dataStr = "Content-Length: ";
      var jsnStr = json.stringify(dataJsn);
      dataStr += jsnStr.length;
      dataStr += "\r\n\r\n";
      dataStr += jsnStr;
      
      var request = {
        data: dataStr
        , command: parCmd
        , handle: function(parResponse){
          //console.log(parResponse);
          def.resolve(parResponse);
        }
      };
      
      var self = this;
      var execRequest = function(parRequest){
        if (!self._requestsRunning[parRequest.command]){
          self._requestsRunning[parRequest.command] = {
            queue: []
          };
        };
        
        self._data(parRequest.data);
        self._expectResponse({
          command: parRequest.command
        }).then(function(parResponse){
          parRequest.handle(parResponse);
          
          var entry = self._requestsRunning[parRequest.command];
          if (entry && entry.queue.length){
            execRequest(entry.queue.shift());
            
          }else{
            delete self._requestsRunning[parRequest.command];
            
          };
        });
      };
      
      if (this._requestsRunning[request.command]){
        this._requestsRunning[request.command].queue.push(request);
      }else{
        execRequest(request);
      };
      
      return def;
    }
    
    , cont: function(par){
      var def = new Deferred();
      this._commmand("continue", par.step ? {
        stepaction: par.step
      } : undefined).then(function(res){
        def.resolve(res);
      });
      return def;
    }
    
  });
});