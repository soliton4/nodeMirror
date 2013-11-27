// does not work !!!

define([], function(){
  return function(parArray, parMember, parDesc){
    var sort = {};
    var i;
    var l = parArray.length;
    for (i = 0; i < l; ++i){
      var id;
      if (typeof parMember == "function"){
        id = parMember(parArray[i]);
      }else{
        id = parArray[i][parMember];
      };
      var lc = id.toLowerCase();
      if (!sort[lc]){
        sort[lc] = {};
      };
      sort[lc][id] = parArray[i];
    };
    sortAr = [];
    for (i in sort){
      for (var j in sort[i]){
        sortAr.push(sort[i][j]);
      };
    };
    return sortAr;
  };
});