var _returnPs = new Promise();
var __UNIQUENAME1 = new Promise();
if(a){
dostuff().then(function(__UNIQUENAME2){try{__UNIQUENAME2;
__UNIQUENAME1.resolve();}catch(__returnError){_returnPs.reject(__returnError);
 }; });
}else{
dootherStuff().then(function(__UNIQUENAME3){try{__UNIQUENAME3;
__UNIQUENAME1.resolve();}catch(__returnError){_returnPs.reject(__returnError);
 }; });};
;
dosomeMore();
