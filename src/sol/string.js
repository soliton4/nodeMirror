define([], function(){
  return {
    endsWith: function(parStr, parEndsWith){
      if (parStr.substr(parStr.length - parEndsWith.length) == parEndsWith){
        return true;
      };
      return false;
    }
    , startsWith: function(parStr, parStartsWith){
      if (parStr.substr(0, parStartsWith.length) == parStartsWith){
        return true;
      };
      return false;
    }
  };
});