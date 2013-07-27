
var profile = {
	resourceTags: {
		test: function(filename, mid){
			return false;
		}
      
      , copyOnly: function(){
        return false;
      }

		, amd: function(filename, mid){
          if (filename.substr(filename.length - 3) == ".js"){
			return true;
          };
          return false;
		}
	}
};