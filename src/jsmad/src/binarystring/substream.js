
Mad.BinaryStrings.SubStream = function(stream, offset, length) {
    this.offset = 0;
    this.start = offset;
    this.parentStream = stream;
    this.length = length;
}

Mad.BinaryStrings.SubStream.prototype = new Mad.BinaryStrings.ByteStream;

Mad.BinaryStrings.SubStream.prototype.substream = function (offset, length) {
    return new Mad.BinaryStrings.SubStream(this.parentStream, this.start + offset, length);
}


Mad.BinaryStrings.SubStream.prototype.absoluteAvailable = function(n) {
    return this.parentStream.absoluteAvailable(this.start + n);
}

Mad.BinaryStrings.SubStream.prototype.seek = function(n) {
    this.offset += n;
}

Mad.BinaryStrings.SubStream.prototype.read = function(n) {
    var result = this.peek(n);
    
    this.seek(n);
    
    return result;
}

Mad.BinaryStrings.SubStream.prototype.peek = function(n) {
    return this.get(this.offset, n);
}

Mad.BinaryStrings.SubStream.prototype.get = function(offset, length) {
    return this.parentStream.get(this.start + offset, length);
}

Mad.BinaryStrings.SubStream.prototype.slice = function(start, end) {
    return this.parentStream.get(this.start + start, end - start);
}

Mad.BinaryStrings.SubStream.prototype.requestAbsolute = function(n, callback) {
    this.parentStream.requestAbsolute(this.start + n)
}

Mad.BinaryStrings.SubStream.prototype.request = function(n, callback) {
    this.parentStream.requestAbsolute(this.start + this.offset + n)
}
