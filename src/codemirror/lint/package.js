
var profile = {
	resourceTags: {
		test: function(filename, mid){
			return false;
		}
      
      , copyOnly: function(){
        return true;
      }

		, amd: function(filename, mid){
			return true;
		}
	}
};