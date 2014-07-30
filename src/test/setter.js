var a = {
  set b(val){
    console.log("new value:" + val);
    this._b = val;
  },
  get b(){
    return this._b;
  }
};

a.b = 2;

a.b += 2;

console.log(a);
