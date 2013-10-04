

var Master = function(){
};

var _Master = {
  setWorker: function(parBool){
    this.isWorker = parBool;
  }
  
  , setRestartable: function(parObj){
    this.restartableObj = parObj;
  }
  
  , newTerminal: function(parCallback){
    
  }
  
};

Master.prototype = _Master;


module.exports = new Master();