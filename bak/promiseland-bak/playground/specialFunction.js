var x = function y(){
  console.log("y called");
  y();
};

x();
y();