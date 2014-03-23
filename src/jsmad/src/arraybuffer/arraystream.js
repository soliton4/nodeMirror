
Mad.ArrayBuffers.ArrayStream = Mad.ArrayBuffers.ByteStream.extend({
    init: function (buffer) {
        this.offset        = 0;
        this.buffer        = buffer;
        this.amountRead    = this.buffer.length;
        this.contentLength = this.buffer.length;
        this.length = this.amountRead;
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
