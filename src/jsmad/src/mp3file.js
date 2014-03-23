Mad.MP3File = function(stream) {
    this.stream = stream;
}

Mad.MP3File.prototype.getID3v2Header = function() {
    if (this.stream.strEquals(0, "ID3")) {
        var headerStream = this.stream.substream(0, 10);
        
        headerStream.seek(3); // 'ID3'
        
        var major = headerStream.readU8();
        var minor = headerStream.readU8();
        
        var flags = headerStream.readU8();
        
        var length = headerStream.readSyncInteger();
        
        return { version: '2.' + major + '.' + minor, major: major, minor: minor, flags: flags, length: length };
    } else {
        return null;
    }
}

Mad.MP3File.prototype.getID3v2Stream = function() {
    var header = this.getID3v2Header();
    
    if (header) {
        if (header.major > 2) {
            return new Mad.ID3v23Stream(header, this.stream.substream(10, header.length));
        } else {
            return new Mad.ID3v22Stream(header, this.stream.substream(10, header.length));
        }
    } else {
        return null;
    }
}

Mad.MP3File.prototype.getMpegStream = function() {
    var id3header = this.getID3v2Header();
    
    if (id3header) {
        var offset = 10 + id3header.length;
    } else {
        var offset = 0;
    }
    
    var length = this.stream.length - offset;

    return new Mad.Stream(this.stream.substream(offset), length);   
}
