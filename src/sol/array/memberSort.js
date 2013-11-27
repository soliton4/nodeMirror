define([], function(){
  return function(parArray, parMember, parDesc){
    var smaller = parDesc ? 1 : -1;
    var equal = 0;
    var greater = -smaller;
    if (typeof parMember == "function"){
      return parArray.sort(function(a, b){
        var amember = parMember(a);
        var bmember = parMember(b);
        if (amember < bmember){
          return smaller;
        };
        if (bmember < amember){
          return greater;
        };
        return equal;
      });
      
    }else{
      return parArray.sort(function(a, b){
        if (a[parMember] < b[parMember]){
          return smaller;
        };
        if (b[parMember] < a[parMember]){
          return greater;
        };
        return equal;
      });
    };
  };
});