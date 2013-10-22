
var localPty;

var Term = function(par){
  var self = this;
  
  this._on = {
    data: []
    , resize: []
  };
  
  this.id = par.id;
  this.master = par.master;
  if (this.master.com){
    this.com = this.master.com.getSub(this.id);
    this.com.on("write", function(data){
      self.write(data);
    });
    this.com.on("resize", function(size){
      self.resize(size.x, size.y);
    });
    this.com.on("destroyterminal", function(){
      self.destroyterminal();
    });
  };
  
  if (process.platform == "win32" && !localPty){
    localPty = require("./pty-win/index.js");
  };
  var pty = localPty;
  if (!pty){
    pty = require("pty.js");
  };
  if (process.platform == "win32"){
    // use fork instead
    this.pty = pty.fork("cmd.exe", [], {
              name: 'cmd',
              cols: 80,
              rows: 30,
              cwd: process.env.HOME,
              env: process.env
    });
  }else{
    this.pty = pty.spawn("bash", [], {
      name: 'xterm-color',
      cols: 80,
      rows: 30,
      cwd: process.env.HOME,
      env: process.env
    });
  };
  
  this.pty.on("data", function(data){
    var i = 0;
    for (i = 0; i < self._on.data.length; ++i){
      try{
        self._on.data[i](data);
      }catch(e){
        console.log(e);
      };
    };
    if (self.com){
      self.com.emit("data", data);
    };
  });
  
};
Term.prototype = {
  destroy: function(){
    delete this.master._terminals[this.id];
    if (this.com){
      this.com.destroy();
    };
  }
  , destroyterminal: function(){
    this.destroy();
  }
  , write: function(data){
    this.pty.write(data);
  }
  , on: function(parWhat, parFun){
    this._on[parWhat].push(parFun);
  }
  , resize: function(x,y){
    var self = this;
    this.pty.resize(x,y);
    var i = 0;
    for (i = 0; i < self._on.resize.length; ++i){
      try{
        self._on.resize[i]({x: x, y: y});
      }catch(e){
        console.log(e);
      };
    };
    if (self.com){
      self.com.emit("resize", {x: x, y: y});
    };
  }
};


var Connector = function(par){
  this.id = par.id;
  this.master = par.master;
  this.com = this.master.com.getSub(this.id);
  
  this._on = {
    data: []
    , resize: []
  };
  
  var self = this;
  this.com.on("data",function(data){
    for (i = 0; i < self._on.data.length; ++i){
      try{
        self._on.data[i](data);
      }catch(e){
        console.log(e);
      };
    };
  });
  this.com.on("resize",function(data){
    for (i = 0; i < self._on.resize.length; ++i){
      try{
        self._on.resize[i](data);
      }catch(e){
        console.log(e);
      };
    };
  });
  
};
Connector.prototype = {
  destroy: function(){
  }
  , destroyterminal: function(){
    this.com.emit("destroyterminal");
  }
  , write: function(data){
    this.com.emit("write", data);
  }
  , on: function(parWhat, parFun){
    this._on[parWhat].push(parFun);
  }
  , resize: function(x,y){
    this.com.emit("resize", {x: x, y: y});
  }
};


var Master = function(){
  this._forward = false;
  this._terminals = {};
};

var _Master = {
  
  setRestartable: function(parObj){
    var self = this;
    this.restartableObj = parObj;
    this.com = this.restartableObj.getSub("terminal");
    if (this.restartableObj.isRestartable){
      if (process.platform == "win32"){
        this._forward = true;
      };
    }else{
      this.com.on("newTerminal", function(nodata, callback){
        self.newTerminal(function(term){
          callback(term.id);
        });
      });
      this.com.on("getTerminal", function(termid, callback){
        self.getTerminal(termid, function(term){
          callback(term.id);
        });
      });
      
      this.com.on("getList", function(nodata, callback){
        self.getList(callback);
      });
    };
  }
  
  , _freeId: function(){
    var i = 0;
    while (this._terminals[i]){
      ++i;
    };
    return i;
  }
  
  , newTerminal: function(parCallback){
    var self = this;
    if (this._forward){
      this.com.emit("newTerminal", null, function(parId){
        try{
          var term = new Connector({
            id: parId
            , master: self
            , forward: self._forward
            , com: self.com
          });
          parCallback(term);
        }catch(e){
          console.log(e);
        };
      });
      return;
    };
    var term = new Term({
      id: this._freeId()
      , master: this
      , forward: this._forward
      , com: this.com
    });
    this._terminals[term.id] = term;
    setTimeout(function(){
      parCallback(term);
    }, 0);
  }
  
  , getList: function(parCallback){
    if (this._forward){
      this.com.emit("getList", null, function(parList){
        parCallback(parList);
      });
      return;
    };
    var i;
    var ar = [];
    for (i in this._terminals){
      ar.push(i);
    };
    parCallback(ar);
  }
  
  , getTerminal: function(parId, parCallback){
    if (this._forward){
      var self = this;
      this.com.emit("getTerminal", parId, function(parId){
        try{
          var term = new Connector({
            id: parId
            , master: self
            , forward: self._forward
            , com: self.com
          });
          parCallback(term);
        }catch(e){
          console.log(e);
        };
      });
      return;
    };
    parCallback(this._terminals[parId]);
  }
  
  , setPty: function(pty){
    localPty = pty;
  }
  
};

Master.prototype = _Master;


module.exports = new Master();