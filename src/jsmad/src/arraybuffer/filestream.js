
Mad.ArrayBuffers.FileStream = Mad.ArrayBuffers.ByteStream.extend({
    init: function (file, callback) {
        this.offset        = 0;

        // Check for the various File API support.
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            // Great success! All the File APIs are supported.
        } else {
            alert('The File APIs are not fully supported in this browser.');
            return null;
        } 
        
        var self = this;
        var reader = new FileReader();
        reader.onload = function () {
          self.buffer        = new Uint8Array(reader.result);
          self.amountRead    = self.buffer.length;
          self.contentLength = self.buffer.length;
          self.length = self.amountRead;
          
          callback(self);
        }
        
        reader.onerror = function () {
            console.log("Error loading file " + file);
        }

        // Only supported from Firefox 7 and Chrome 'Something'
        reader.readAsArrayBuffer(file);
    },

    substream: function (offset, length) {
        return new Mad.ArrayBuffers.SubStream(this, offset, length);
    },

    absoluteAvailable: function(n, updated) {
        return n < this.amountRead;
    },

    getU8: function(offset, bigEndian) {
        return this.buffer[offset];
    },

    seek: function(n) {
        this.offset += n;
    },

    read: function(n) {
        var result = this.peek(n);
        this.seek(n);
        return result;
    },

    peek: function(n) {
        if (this.available(n)) {
            var offset = this.offset;
            
            var result = this.get(offset, n);
            
            return result;
        } else {
            throw 'TODO: THROW PEEK ERROR!';
        }
    },

    get: function(offset, length) {
        if (offset + length < this.contentLength) {
            var subarr = this.buffer.subarray(offset, offset + length);
            return subarr;
        } else {
            throw 'TODO: THROW GET ERROR!';
        }
    }
});
