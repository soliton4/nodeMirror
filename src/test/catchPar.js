var f = function(){
  
  //var e = {m: "orig"};
  
  try{
    throw {n: "new"};
  }catch(e){
    var e;
    console.log("trown:");
    console.log(e);
    //e = {dif: "rent"};
    //console.log(e);
  };
  console.log("aftermath:");
  console.log(e);
  
  //console.log(a);
};

f();