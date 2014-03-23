
/* Namespaces */
Mad = {};
Mad.ArrayBuffers = {};
Mad.BinaryStrings = {};

Mad.recoverable = function (error) {
    return (error & 0xff00) != 0;
};

// change this value for testing
Mad.enforceBinaryString = false;

if (!Mad.enforceBinaryString && typeof(ArrayBuffer) === 'function' && typeof(Uint8Array) === 'function') {
    console.log("Using ArrayBuffer");
    Mad.Storage = {
        backing: 'arraybuffer',

        newBuffer: function (length) {
            return new Uint8Array(length);
        },

        memcpy: function (dst, dstOffset, pSrc, srcOffset, length) {
            while (pSrc.parentStream) {
                srcOffset += pSrc.start;
                pSrc = pSrc.parentStream;
            }
            var src = pSrc.subarray ? pSrc : pSrc.buffer;
            var subarr = src.subarray(srcOffset, srcOffset + length);

            // oh my, memcpy actually exists in JavaScript?
            dst.set(subarr, dstOffset);
            return dst;
        }
    };
    Mad.FileStream = function (file, callback) {
        return new Mad.ArrayBuffers.FileStream(file, callback);
    }
    Mad.AjaxStream = function (file, callback) {
        return new Mad.ArrayBuffers.AjaxStream(file, callback);
    }
} else {
    console.log("Using BinaryString");
    Mad.Storage = {
        backing: 'binarystring',

        newBuffer: function (length) {
            return Mad.mul("\0", length);
        },

        memcpy: function (dst, dstOffset, src, srcOffset, length) {
            // this is a pretty weird memcpy actually - it constructs a new version of dst, because we have no other way to do it
            return dst.slice(0, dstOffset) + src.slice(srcOffset, srcOffset + length) + dst.slice(dstOffset + length);
        }
    };
    Mad.FileStream = function (file, callback) {
        return new Mad.BinaryStrings.FileStream(file, callback);
    }
    Mad.AjaxStream = function (file, callback) {
        return new Mad.BinaryStrings.AjaxStream(file, callback);
    }
}

// credit: http://blog.stevenlevithan.com/archives/fast-string-multiply
Mad.mul = function (str, num) {
        var i = Math.ceil(Math.log(num) / Math.LN2), res = str;
        do {
            res += res;
        } while (0 < --i);
        return res.slice(0, str.length * num);
};

Mad.rshift = function (num, bits) {
    return Math.floor(num / Math.pow(2, bits));
};

Mad.lshiftU32 = function (num, bits) {
    return Mad.bitwiseAnd(Mad.lshift(num, bits), 4294967295 /* 2^32 - 1 */);
};

Mad.lshift = function (num, bits) {
    return num * Math.pow(2, bits);
};

Mad.bitwiseOr = function (a, b) {
    var w = 2147483648; // 2^31

    var aHI = (a / w) << 0;
    var aLO = a % w;
    var bHI = (b / w) << 0;
    var bLO = b % w;

    return ((aHI | bHI) * w + (aLO | bLO));
};

Mad.bitwiseAnd = function (a, b) {
    var w = 2147483648; // 2^31

    var aHI = (a / w) << 0;
    var aLO = a % w;
    var bHI = (b / w) << 0;
    var bLO = b % w;

    return ((aHI & bHI) * w + (aLO & bLO));
};

/* Simple JavaScript Inheritance
 * By John Resig http://ejohn.org/
 * MIT Licensed.
 */
// Inspired by base2 and Prototype
(function(){
  var initializing = false, fnTest = /xyz/.test(function(){xyz;}) ? /\b_super\b/ : /.*/;
  // The base Class implementation (does nothing)
  this.Class = function(){};
  
  // Create a new Class that inherits from this class
  Class.extend = function(prop) {
    var _super = this.prototype;
    
    // Instantiate a base class (but only create the instance,
    // don't run the init constructor)
    initializing = true;
    var prototype = new this();
    initializing = false;
    
    // Copy the properties over onto the new prototype
    for (var name in prop) {
      // Check if we're overwriting an existing function
      prototype[name] = typeof prop[name] === "function" && 
        typeof _super[name] === "function" && fnTest.test(prop[name]) ?
        (function(name, fn){
          return function() {
            var tmp = this._super;
            
            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name];
            
            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            var ret = fn.apply(this, arguments);        
            this._super = tmp;
            
            return ret;
          };
        })(name, prop[name]) :
        prop[name];
    }
    
    // The dummy class constructor
    function Class() {
      // All construction is actually done in the init method
      if ( !initializing && this.init )
        this.init.apply(this, arguments);
    }
    
    // Populate our constructed prototype object
    Class.prototype = prototype;
    
    // Enforce the constructor to be what we expect
    Class.prototype.constructor = Class;

    // And make this class extendable
    Class.extend = arguments.callee;
    
    return Class;
  };
})();


