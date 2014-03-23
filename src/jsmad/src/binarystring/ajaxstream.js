Mad.BinaryStrings.AjaxStream = function(url) {
    this.offset = 0; 
    var request = window.XMLHttpRequest ? new XMLHttpRequest() :  ActiveXObject("Microsoft.XMLHTTP");
    
    // pseudo-binary XHR
    request.overrideMimeType('text/plain; charset=x-user-defined');
    request.open('GET', url);
    
    this.request = request;
    this.amountRead = 0;
    this.inProgress = true;
    this.callbacks = [];
    
    var self = this;
    
    var iteration = 0;
    
    var ochange = function () {
        iteration += 1;
        if ((self.callbacks.length > 0 && iteration % 64 === 0) || iteration % 256 === 0) {
            self.updateBuffer();
            
            var newCallbacks = [];
            
            for (var i = 0; i < self.callbacks.length; i++) {
                var callback = self.callbacks[i];
                
                if (callback[0] < self.amountRead) {
					try {
						callback[1]();
					} catch (e) {
						console.log(e);
					}
                } else {
                    newCallbacks.push(callback);
                }
            }
            
            self.callbacks = newCallbacks;
        }
        
        if (request.readyState === 4) {
			self.amountRead = self.contentLength;
            for (var i = 0; i < self.callbacks.length; i++) {
                var callback = self.callbacks[i];
                callback[1]();
            }
            
            window.clearInterval(self.timer);
            
            self.inProgress = false;
        }
    }
    
    request.onreadchange = ochange;
    
    this.timer = window.setInterval(ochange, 250);
    
    request.send(null);
}

Mad.BinaryStrings.AjaxStream.prototype = new Mad.BinaryStrings.ByteStream();

Mad.BinaryStrings.AjaxStream.prototype.updateBuffer = function() {
    if (!this.finalAmount) {
        this.arrayBuffer = this.request.mozResponseArrayBuffer;
        if(this.arrayBuffer) {
			this.byteBuffer = new Uint8Array(this.arrayBuffer);
			this.amountRead = this.arrayBuffer.byteLength;
		} else {
			this.buffer = this.request.responseText
			this.amountRead = this.buffer.length;
		}
        
		this.contentLength = this.request.getResponseHeader('Content-Length');
		if(!this.contentLength) {
			// if the server doesn't send a Content-Length Header, just use amountRead instead
			// it's less precise at first, but once everything is buffered it becomes accurate.
			this.contentLength = this.amountRead;
		}
    
        if (!this.inProgress) {
            this.finalAmount = true;
        }
        
        return true;
    } else {
        return false;
    }
}

Mad.BinaryStrings.AjaxStream.prototype.absoluteAvailable = function(n, updated) {
    if (n > this.amountRead) {
        if (updated) {
            throw new Error("buffer underflow with absoluteAvailable!");
        } else if (this.updateBuffer()) {
            return this.absoluteAvailable(n, true);
        } else {
            return false;
        }
    } else {
        return true;
    }
}

Mad.BinaryStrings.AjaxStream.prototype.seek = function(n) {
    this.offset += n;
}

Mad.BinaryStrings.AjaxStream.prototype.read = function(n) {
    var result = this.peek(n);
    
    this.seek(n);
    
    return result;
}

Mad.BinaryStrings.AjaxStream.prototype.peek = function(n) {
    if (this.available(n)) {
        var offset = this.offset;
        
        var result = this.get(offset, n);
        
        return result;
    } else {
        throw new Error("buffer underflow with peek!");
    }
}

Mad.BinaryStrings.AjaxStream.prototype.get = function(offset, length) {
    if (this.absoluteAvailable(offset + length)) {
		var tmpbuffer = "";
		if(this.byteBuffer) {
			for(var i = offset; i < offset + length; i += 1) {
				tmpbuffer = tmpbuffer + String.fromCharCode(this.byteBuffer[i]);
			}
		} else {
			for(var i = offset; i < offset + length; i += 1) {
				tmpbuffer = tmpbuffer + String.fromCharCode(this.buffer.charCodeAt(i) & 0xff);
			}
		}
		return tmpbuffer;
    } else {
		throw new Error("buffer underflow with get!");
    }
}

Mad.BinaryStrings.AjaxStream.prototype.getU8 = function(offset, bigEndian) {
	if(this.byteBuffer) {
		return this.byteBuffer[offset];
	}
		
    return this.get(offset, 1).charCodeAt(0);
}

Mad.BinaryStrings.AjaxStream.prototype.requestAbsolute = function(n, callback) {
    if (n < this.amountRead) {
        callback();
    } else {
        this.callbacks.push([n, callback]);
    }
}

Mad.BinaryStrings.AjaxStream.prototype.request = function(n, callback) {
    this.requestAbsolute(this.offset + n, callback);
}
