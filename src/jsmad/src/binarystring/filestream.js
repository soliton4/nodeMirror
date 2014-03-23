Mad.BinaryStrings.FileStream = function(file, callback) {
    this.offset = 0;
    var self = this, reader = new FileReader();
    
    reader.onload = function () {
      self['buffer']     = reader.result;
      self['amountRead'] = self['buffer'].length;
      self['contentLength'] = self['buffer'].length;
      
      self.length = self['amountRead'];
      
      callback(self);
    }
    
    reader.onerror = function () {
        console.log("Error!");
    }
    
    reader.readAsBinaryString(file);
}

Mad.BinaryStrings.FileStream.prototype = new Mad.BinaryStrings.ByteStream();

Mad.BinaryStrings.FileStream.prototype.absoluteAvailable = function(n, updated) {
    return n < this['amountRead'];
}

Mad.BinaryStrings.FileStream.prototype.substream = function (offset, length) {
    return new Mad.BinaryStrings.SubStream(this, offset, length);
}

Mad.BinaryStrings.FileStream.prototype.seek = function(n) {
    this['offset'] += n;
}

Mad.BinaryStrings.FileStream.prototype.read = function(n) {
    var result = this.peek(n);
    
    this.seek(n);
    
    return result;
}

Mad.BinaryStrings.FileStream.prototype.peek = function(n) {
    if (this.available(n)) {
        var offset = this['offset'];
        
        var result = this.get(offset, n);
        
        return result;
    } else {
        throw 'TODO: THROW PEEK ERROR!';
    }
}

Mad.BinaryStrings.FileStream.prototype.get = function(offset, length) {
    if (this.absoluteAvailable(offset + length)) {
        return this['buffer'].slice(offset, offset + length);
    } else {
        throw 'TODO: THROW GET ERROR!';
    }
}
