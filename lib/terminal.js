
var localPty;

var Term = function(par){
  var self = this;
  
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
    this.pty = pty.fork("c:\\windows\\system32\\cmd.exe", [], {
              name: 'cmd',
              cols: 80,
              rows: 80,
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
    self.onData(data);
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
  , onData: function(){}
  , resize: function(x,y){
    this.pty.resize(x,y);
  }
};


var Connector = function(par){
  this.id = par.id;
  this.master = par.master;
  this.com = this.master.com.getSub(this.id);
  
  var self = this;
  this.com.on("data",function(data){
    self.onData(data);
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
  , onData: function(){}
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
  
  , getTerminal: function(parId, parCallback){
    parCallback(this._terminals[parId]);
  }
  
  , setPty: function(pty){
    localPty = pty;
  }
  
};

Master.prototype = _Master;


module.exports = new Master();