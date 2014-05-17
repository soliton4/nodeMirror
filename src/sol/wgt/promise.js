/*
  singleton / promise tools
*/
define([
  "dojo/_base/declare"
  , "dojo/Deferred"
  , "dojo/_base/array"
  , "dojo/promise/all"
  , "dojo/_base/lang"
], function(
  declare
  , Deferred
  , array
  , all
  , lang
){
  var solPromise;
  var SolPromise = declare("SolPromise", [
  ], {
    _isPromise: function(valueOrPromise){
      return valueOrPromise && typeof valueOrPromise.then === "function";
    }

    , _parseParameter: function(objectOrArray){
		// copied from dojo 1.9.0
		// summary:
		//		Takes multiple promises and returns a new promise that is fulfilled
		//		when all promises have been fulfilled.
		// description:
		//		Takes multiple promises and returns a new promise that is fulfilled
		//		when all promises have been fulfilled. If one of the promises is rejected,
		//		the returned promise is also rejected. Canceling the returned promise will
		//		*not* cancel any passed promises.
		// objectOrArray: Object|Array?
		//		The promise will be fulfilled with a list of results if invoked with an
		//		array, or an object of results when passed an object (using the same
		//		keys). If passed neither an object or array it is resolved with an
		//		undefined value.
		// returns: dojo/promise/Promise

		var object, array;
		if(objectOrArray instanceof Array){
			array = objectOrArray;
		}else if(objectOrArray && typeof objectOrArray === "object"){
			object = objectOrArray;
		}

		if(object){
			array = [];
			for(var key in object){
				if(Object.hasOwnProperty.call(object, key)){
					if (this._isPromise(object[key])){
						array.push(object[key]);
					};
				};
			};
		};

		if(!array){
			return;
		}
		return array;
	}

	, allDone: function(par){
		ar = this._parseParameter(par);
		if (!ar || !ar.length){ 
			return new Deferred().resolve(par);
		};
                
		var def = new Deferred();
		var waiting = ar.length;
		var resultFun = function(){
			if(--waiting === 0){
				def.resolve(par);
			};
		};
		array.forEach(ar, function(promise, index){
			promise.then(resultFun, resultFun);
		});
		return def.promise;	// dojo/promise/Promise
	}
  });
  solPromise = new SolPromise();
  return solPromise;
});
