define([], function(){
  return function(parArray, parMember, parDesc){
    var smaller = parDesc ? 1 : -1;
    var equal = 0;
    var greater = -smaller;
    parArray.sort(function(a, b){
      if (a[parMember] < b[parMember]){
        return smaller;
      };
      if (b[parMember] < a[parMember]){
        return greater;
      };
      return equal;
    });
  };
});