
Mad.ArrayBuffers.SubStream = Mad.ArrayBuffers.ByteStream.extend({
    init: function(stream, offset, length) {
        this.offset = 0; 
        this.start = offset;
        this.parentStream = stream;
        this.length = length;
    },

    substream: function (offset, length) {
        return new Mad.SubStream(this.parentStream, this.start + offset, length);
    },

    getU8: function(offset, bigEndian) {
        return this.parentStream.getU8(this.start + offset, bigEndian);
    },

    getU16: function(offset, bigEndian) {
        return this.parentStream.getU16(this.start + offset, bigEndian);
    },

    getU32: function(offset, bigEndian) {
        return this.parentStream.getU32(this.start + offset, bigEndian);
    },

    absoluteAvailable: function(n) {
        return this.parentStream.absoluteAvailable(this.start + n);
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
        return this.get(this.offset, n);
    },

    get: function(offset, length) {
        return this.parentStream.get(this.start + offset, length);
    },

    slice: function(start, end) {
        return this.parentStream.get(this.start + start, end - start);
    },

    requestAbsolute: function(n, callback) {
        this.parentStream.requestAbsolute(this.start + n)
    },

    request: function(n, callback) {
        this.parentStream.requestAbsolute(this.start + this.offset + n)
    }
});
