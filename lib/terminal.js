
var localPty;

var Term = function(par){
  this.id = par.id;
  this.master = par.master;
  if (this.master.com){
    this.com = this.master.com.getSub(this.id);
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
  
  var self = this;
  this.pty.on("data", function(data){
    self.onData(data);
  });
  
};
Term.prototype = {
  destroy: function(){
    delete this.master._terminals[this.id];
    if (this.com){
      this.com.destroy();
    };
  }
  , write: function(data){
    this.pty.write(data);
  }
  , onData: function(){}
  , resize: function(x,y){
    this.pty.resize(x,y);
  }
};


var Master = function(){
  this._forward = false;
  this._terminals = {};
};

var _Master = {
  
  setRestartable: function(parObj){
    this.restartableObj = parObj;
    this.com = this.restartableObj.getSub("terminal");
    if (this.restartableObj.isRestartable){
      this._forward = true;
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
    var term = new Term({
      id: this._freeId()
      , master: this
    });
    this._terminals[term.id] = term;
    parCallback(term);
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