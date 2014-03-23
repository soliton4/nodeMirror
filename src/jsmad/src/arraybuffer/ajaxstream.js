Mad.ArrayBuffers.AjaxStream = Mad.ArrayBuffers.ByteStream.extend({
    init: function (url) {
        this.offset = 0;

        var request = new XMLHttpRequest();
        request.open('GET', url);
        request.responseType = "arraybuffer";
        
        this.request = request;
        this.amountRead = 0;
        this.inProgress = true;
        this.finalAmount = false;
        this.callbacks = [];
        this.buffer = new Uint8Array(0);
        
        var self = this;
        
        var iteration = 0;
        
        var ochange = function () {
            console.log("ochange! callbacks.length = " + self.callbacks.length + ", iteration = " + iteration);
            console.log("readyState = " + request.readyState + ", amountRead = " + self.amountRead + ", contentLength = " + self.contentLength);
            iteration += 1;
            if ((self.callbacks.length > 0 && iteration % 32 === 0) || iteration % 256 === 0) {
                self.updateBuffer();
                
                var newCallbacks = [];
                
                for (var i = 0; i < self.callbacks.length; i++) {
                    console.log("Handling callback " + i);
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
                self.updateBuffer();
                self.amountRead = self.contentLength;
                for (var i = 0; i < self.callbacks.length; i++) {
                    var callback = self.callbacks[i];
                    callback[1]();
                }
                
                window.clearInterval(self.timer);
                
                self.inProgress = false;
            }
        }
        
        request.onprogress = ochange;
        
        this.timer = window.setInterval(ochange, 250);
        
        request.send(null);
    },

    updateBuffer: function() {
        console.log("updateBuffer!");
        if (!this.finalAmount && this.request.response) {
            this.arrayBuffer = this.request.response;
            this.buffer = new Uint8Array(this.arrayBuffer);
            this.amountRead = this.buffer.length;
            console.log("typeof buffer = " + typeof(this.arrayBuffer) + ", amountRead = " + this.amountRead);
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
    },

    absoluteAvailable: function(n, updated) {
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
            throw new Error("buffer underflow with peek!");
        }
    },

    get: function(offset, length) {
        if (offset + length < this.amountRead) {
            var subarr = this.buffer.subarray(offset, offset + length);
            return subarr;
        } else {
            throw 'TODO: THROW GET ERROR!';
        }
    },

    getU8: function(offset, bigEndian) {
        return this.buffer[offset];
    },

    substream: function (offset, length) {
        return new Mad.ArrayBuffers.SubStream(this, offset, length);
    },

    requestAbsolute: function(n, callback) {
        console.log("requestAbsolute(" + n + ", ...), amountRead = " + this.amountRead);
        if (n < this.amountRead) {
            console.log("all fine, calling callback :)");
            callback();
        } else {
            console.log("pushing callback on queue");
            this.callbacks.push([n, callback]);
        }
    },

    request: function(n, callback) {
        this.requestAbsolute(this.offset + n, callback);
    }
});
