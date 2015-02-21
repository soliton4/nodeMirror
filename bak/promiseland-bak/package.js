var miniExcludes = {
	},
	amdExcludes = {
	},
	copyOnly = {
      "parser.js": true,
      "_parser.js": true
	},
	isJsRe = /\.js$/,
	isTestRe = /\/test\//;

var profile = {
	resourceTags: {
		test: function(filename, mid){
			return isTestRe.test(filename);
		},

		miniExclude: function(filename, mid){
			return isTestRe.test(filename) || mid in miniExcludes;
		},

		amd: function(filename, mid){
			return isJsRe.test(filename) && !(mid in amdExcludes);
		},

		copyOnly: function(filename, mid){
          return true;
			return filename == "_parser.js" || filename == "parser.js" || (mid in copyOnly);
		}
	}
};
