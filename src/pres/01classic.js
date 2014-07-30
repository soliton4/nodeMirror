var continueFun = function(result){
  restOfProgram(result);
};

userinput(function(err, res){
  if (err){
    return;
  };
  if (res){
    readFile(function(err, res){
      if (err){
        return;
      };
      continueFun(res);
    });
  }else{
    readFromNetwork(function(err, res){
      if (err){
        return;
      };
      postProcess(res, function(err, res){
        if (err){
          return;
        };
        continueFun(res);
      });
    });
  };
});