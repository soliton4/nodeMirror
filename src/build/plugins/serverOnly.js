define([], function(){
	return {
		start:function(
			mid,
			referenceModule,
			bc
		){
			var result = [bc.amdResources["main/serverOnly"]];
          if (!bc.staticHasFeatures["server-modules"]){
			return result;
          };
				var module = bc.amdResources[mid];
				if(!module){
					bc.log("legacyMissingDependency", ["reference module", referenceModule.mid, "dependency", mid]);
				}else{
					result.push(module);
				}
			return result;
		}
	};
});

