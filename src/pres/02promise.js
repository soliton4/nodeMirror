var continueFun = function(result){
  restOfProgram(result);
};

userinput().then(function(res){
  if (res){
    readFile().then(continueFun);
  }else{
    readFromNetwork().then(function(res){
      postProcess(res).then(continueFun);
    });
  };
});