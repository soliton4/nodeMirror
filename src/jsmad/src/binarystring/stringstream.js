Mad.BinaryStrings.StringStream = function(string) {
    this.offset = 0;
    this.buffer = string;
    this.amountRead = string.length;
    this.length = string.length;
}

Mad.BinaryStrings.StringStream.prototype = new Mad.BinaryStrings.ByteStream();

Mad.BinaryStrings.StringStream.prototype.absoluteAvailable = function(n, updated) {
    return n < this['amountRead'];
}

Mad.BinaryStrings.StringStream.prototype.seek = function(n) {
    this['offset'] += n;
}

Mad.BinaryStrings.StringStream.prototype.read = function(n) {
    var result = this.peek(n);
    
    this.seek(n);
    
    return result;
}

Mad.BinaryStrings.StringStream.prototype.peek = function(n) {
    if (this.available(n)) {
        var offset = this['offset'];
        
        var result = this.get(offset, n);
        
        return result;
    } else {
        throw 'TODO: THROW PEEK ERROR!';
    }
}

Mad.BinaryStrings.StringStream.prototype.get = function(offset, length) {
    if (this.absoluteAvailable(offset + length)) {
        return this['buffer'].slice(offset, offset + length);
    } else {
        throw 'TODO: THROW GET ERROR!';
    }
}
