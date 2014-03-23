
Mad.ArrayBuffers.ByteStream = Class.extend({
    available: function(n) {
        return this.absoluteAvailable(this.offset + n);
    },

    strEquals: function (offset, string) {
        for (var i = 0; i < string.length; i++) {
            if(this.getU8(offset + i, false) != string.charCodeAt(i)) return false;
        }
        return true;
    },

    getU8: function(offset, bigEndian) {
        var bytes = this.get(offset, 1);
        throw 'Wtf bytestream?'
        return bytes[0];
    },

    getU16: function(offset, bigEndian) {
        var bytes = this.get(offset, 2);
        if (!bigEndian) {
            bytes = bytes.reverse();
        }
        return (bytes[0] << 8) | bytes[1];
    },

    getU24: function(offset, bigEndian) {
        var bytes = this.get(offset, 3);
        if (!bigEndian) {
            bytes = bytes.reverse();
        }
        return (bytes[0] << 16) | (bytes[1] << 8) | bytes[2];
    },

    getU32: function(offset, bigEndian) {
        var bytes = this.get(offset, 4);
        if (!bigEndian) {
            bytes = bytes.reverse();
        }
        return (bytes[0] << 24) | (bytes[1] << 16) | (bytes[2] << 8) | bytes[3];
    },

    getI8: function(offset, bigEndian) {
        return this.getU8(offset, bigEndian) - 128;            // 2 ** 7
    },

    getI16: function(offset, bigEndian) {
        return this.getU16(offset, bigEndian) - 65536;         // 2 ** 15
    },

    getI32: function(offset, bigEndian) {
        return this.getU32(offset, bigEndian) - 2147483648;    // 2 ** 31
    },

    getSyncInteger: function(offset) {
        var bytes = this.get(offset, 4);
        return (bytes[0] << 21) | (bytes[1] << 14) | (bytes[2] << 7) | bytes[3];
    },

    peekU8: function(bigEndian) {
        return this.getU8(this.offset, bigEndian);
    },

    peekU16: function(bigEndian) {
        return this.getU16(this.offset, bigEndian);
    },

    peekU24: function(bigEndian) {
        return this.getU24(this.offset, bigEndian);
    },

    peekU32: function(bigEndian) {
        return this.getU32(this.offset, bigEndian);
    },

    peekI8: function(bigEndian) {
        return this.getI8(this.offset, bigEndian);
    },

    peekI16: function(bigEndian) {
        return this.getI16(this.offset, bigEndian);
    },

    peekI32: function(bigEndian) {
        return this.getI32(this.offset, bigEndian);
    },

    peekSyncInteger: function() {
        return this.getSyncInteger(this.offset);
    },

    readU8: function(bigEndian) {
        var result = this.peekU8(bigEndian);
        this.seek(1);
        return result;
    },

    readU16: function(bigEndian) {
        var result = this.peekU16(bigEndian);
        this.seek(2);
        return result;
    },

    readU24: function(bigEndian) {
        var result = this.peekU24(bigEndian);
        this.seek(3);
        return result;
    },

    readU32: function(bigEndian) {
        var result = this.peekU32(bigEndian);
        this.seek(4);
        return result;
    },

    readI8: function(bigEndian) {
        var result = this.peekI8(bigEndian);
        this.seek(1);
        return result;
    },

    readI16: function(bigEndian) {
        var result = this.peekI16(bigEndian);
        this.seek(2);
        return result;
    },

    readI32: function(bigEndian) {
        var result = this.peekI32(bigEndian);
        this.seek(4);
        return result;
    },

    readSyncInteger: function() {
        var result = this.getSyncInteger(this.offset);
        this.seek(4);
        return result;
    },

    readAsString: function(n) {
        var arr = this.read(n);
        var str = "";
        for (var i = 0; i < n; i++) {
            str += String.fromCharCode(arr[i]);
        }
        return str;
    }
});
