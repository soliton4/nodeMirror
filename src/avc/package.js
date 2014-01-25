
var profile = {
	resourceTags: {
		test: function(filename, mid){
			return false;
		}
      
      , copyOnly: function(filename){
        return true; // sigh
        /*if (filename == "avc-codec.js" || filename == "Avc.js" || filename == "canvas.js"){
          return true;
        };
        return false;*/
      }

		, amd: function(filename, mid){
          if (filename.substr(filename.length - 3) == ".js"){
			return true;
          };
          return false;
		}
	}
};