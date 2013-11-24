var miniExcludes = {
	},
	amdExcludes = {
	},
	copyOnly = {
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
			return mid in copyOnly;
		}
	}
};
