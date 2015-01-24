//
// -- ogv.js
// https://github.com/brion/ogv.js
// Copyright (c) 2013-2014 Brion Vibber
//

// -- StreamFile.js

/**
 * Quickie wrapper around XHR to fetch a file as array buffer chunks.
 *
 * Call streamFile.readBytes() after an onread event's data has been
 * processed to trigger the next read.
 *
 * IE 10: uses MSStream / MSStreamReader for true streaming
 * Firefox: uses moz-chunked-arraybuffer to buffer & deliver during download
 * Safari, Chrome: uses binary string to buffer & deliver during download
 *
 * @author Brion Vibber <brion@pobox.com>
 * @copyright 2014
 * @license MIT-style
 */
function StreamFile(options) {
	var self = this,
		url = options.url,
		started = false,
		onstart = options.onstart || function(){},
		onbuffer = options.onbuffer || function(){},
		onread = options.onread || function(){},
		ondone = options.ondone || function(){},
		onerror = options.onerror || function(){},
		bufferSize = options.bufferSize || 256,
		minBufferSize = options.minBufferSize || 65536,
		seekPosition = options.seekPosition || 0,
		bufferPosition = seekPosition,
		chunkSize = options.chunkSize || 1024 * 1024, // read/buffer up to a megabyte at a time
		waitingForInput = false,
		doneBuffering = false,
		bytesTotal = 0,
		bytesRead = 0,
		buffers = [],
		cachever = 0,
		responseHeaders = {};
		

	
	// -- internal private methods
	var internal = {
		/**
		 * @var {XMLHttpRequest}
		 */
		xhr: null,

		/**
		 * Test if a given responseType value is valid on an XHR
		 *
		 * @return boolean
		 */
		tryMethod: function(rt) {
			var xhr = new XMLHttpRequest();
			xhr.open("GET", url);
			try {
				// Set the response type and see if it explodes!
				xhr.responseType = rt;
			} catch (e) {
				// Safari 6 throws a DOM Exception on invalid setting
				return false;
			}
			// Other browsers just don't accept the setting, so check
			// whether it made it through.
			return (xhr.responseType == rt);
		},

		setBytesTotal: function(xhr) {
			if (xhr.status == 206) {
				bytesTotal = internal.getXHRRangeTotal(xhr);
				console.log('Total file size is ' + bytesTotal);
			} else {
				var contentLength = xhr.getResponseHeader('Content-Length');
				if (contentLength == null || contentLength == '') {
					// Unknown file length... maybe streaming live?
					bytesTotal = 0;
				} else {
					bytesTotal = parseInt(contentLength, 10);
				}
			}
		},
		
		// Save HTTP response headers from the HEAD request for later
		processResponseHeaders: function(xhr) {
			responseHeaders = {};
			var allResponseHeaders = xhr.getAllResponseHeaders(),
				headerLines = allResponseHeaders.split(/\n/);
			headerLines.forEach(function(line) {
				var bits = line.split(/:\s*/, 2);
				if (bits.length > 1) {
					var name = bits[0].toLowerCase(),
						value = bits[1];
					responseHeaders[name] = value;
				}
			});
		},
		
		openXHR: function() {
			var getUrl = url;
			if (cachever) {
				//
				// Safari sometimes messes up and gives us the wrong chunk.
				// Seems to be a general problem with Safari and cached XHR ranges.
				//
				// Interestingly, it allows you to request _later_ ranges successfully,
				// but when requesting _earlier_ ranges it returns the latest one retrieved.
				// So we only need to update the cache-buster when we rewind.
				//
				// https://bugs.webkit.org/show_bug.cgi?id=82672
				//
				getUrl += '?ogvjs_cachever=' + cachever;
			}

			var xhr = internal.xhr = new XMLHttpRequest();
			xhr.open("GET", getUrl);

			internal.setXHROptions(xhr);

			var range = null;
			if (seekPosition || chunkSize) {
				range = 'bytes=' + seekPosition + '-';
			}
			if (chunkSize) {
				if (bytesTotal) {
					range += Math.min(seekPosition + chunkSize, bytesTotal) - 1;
				} else {
					range += (seekPosition + chunkSize) - 1;
				}
			}
			if (range !== null) {
				xhr.setRequestHeader('Range', range);
			}
		
			bytesRead = 0;

			xhr.onreadystatechange = function(event) {
				if (xhr.readyState == 2) {
					if (xhr.status == 206) {
						var foundPosition = internal.getXHRRangeStart(xhr);
						if (seekPosition != foundPosition) {
							//
							// Safari sometimes messes up and gives us the wrong chunk.
							// Seems to be a general problem with Safari and cached XHR ranges.
							//
							// Interestingly, it allows you to request _later_ ranges successfully,
							// but when requesting _earlier_ ranges it returns the latest one retrieved.
							// So we only need to update the cache-buster when we rewind and actually
							// get an incorrect range.
							//
							// https://bugs.webkit.org/show_bug.cgi?id=82672
							//
							console.log('Expected start at ' + seekPosition + ' but got ' + foundPosition +
								'; working around Safari range caching bug: https://bugs.webkit.org/show_bug.cgi?id=82672');
							cachever++;
							internal.abortXHR(xhr);
							internal.openXHR();
							return;
						}
					}
					if (!started) {
						internal.setBytesTotal(xhr);
						internal.processResponseHeaders(xhr);
						started = true;
						onstart();
					}
					//internal.onXHRHeadersReceived(xhr);
					// @todo check that partial content was supported if relevant
				} else if (xhr.readyState == 3) {
					internal.onXHRLoading(xhr);
				} else if (xhr.readyState == 4) {
					// Complete.
					internal.onXHRDone(xhr);
				}
			};

			xhr.send();
		},
		
		getXHRRangeMatches: function(xhr) {
			// Note Content-Range must be whitelisted for CORS requests
			var contentRange = xhr.getResponseHeader('Content-Range');
			console.log(contentRange);
			return contentRange && contentRange.match(/^bytes (\d+)-(\d+)\/(\d+)/);
		},
		
		getXHRRangeStart: function(xhr) {
			var matches = internal.getXHRRangeMatches(xhr);
			if (matches) {
				return parseInt(matches[1], 10);
			} else {
				return 0;
			}
		},
		
		getXHRRangeTotal: function(xhr) {
			var matches = internal.getXHRRangeMatches(xhr);
			if (matches) {
				return parseInt(matches[3], 10);
			} else {
				return 0;
			}
		},
		
		setXHROptions: function(xhr) {
			throw new Error('abstract function');
		},

		/*
		onXHRHeadersReceived: function(xhr) {
			if (xhr.status >= 400) {
				// errrorrrrrrr
				console.log("HTTP " + xhr.status + ": " +xhr.statusText);
				onerror();
				xhr.abort();
			} else {
				internal.setBytesTotal(xhr);
				internal.processResponseHeaders(xhr);
				started = true;
				onstart();
			}
		},
		*/
		
		onXHRLoading: function(xhr) {
			throw new Error('abstract function');
		},
		
		onXHRDone: function(xhr) {
			console.log("DONE BUFFERING");
			doneBuffering = true;
		},
		
		abortXHR: function(xhr) {
			xhr.onreadystatechange = null;
			xhr.abort();
		},
		
		bufferData: function(buffer) {
			if (buffer) {
				buffers.push(buffer);
				onbuffer();
			
				internal.readNextChunk();
			}
		},
		
		bytesBuffered: function() {
			var bytes = 0;
			buffers.forEach(function(buffer) {
				bytes += buffer.byteLength;
			});
			return bytes;
		},
		
		dataToRead: function() {
			return internal.bytesBuffered() > 0;
		},
		
		popBuffer: function() {
			var bufferOut = new ArrayBuffer(bufferSize),
				bytesOut = new Uint8Array(bufferOut),
				byteLength = 0;
			
			function stuff(bufferIn) {
				var bytesIn = new Uint8Array(bufferIn);
				bytesOut.set(bytesIn, byteLength);
				byteLength += bufferIn.byteLength;
			}
			
			while (byteLength < minBufferSize) {
				var needBytes = minBufferSize - byteLength,
					nextBuffer = buffers.shift();
				if (!nextBuffer) {
					break;
				}

				if (needBytes >= nextBuffer.byteLength) {
					// if it fits, it sits
					stuff(nextBuffer);
				} else {
					// Split the buffer and requeue the rest
					var croppedBuffer = nextBuffer.slice(0, needBytes),
						remainderBuffer = nextBuffer.slice(needBytes);
					buffers.unshift(remainderBuffer);
					stuff(croppedBuffer);
					break;
				}
			}
			
			//console.log('got', bufferOut, byteLength);
			bytesRead += byteLength;
			bufferPosition += byteLength;
			return bufferOut.slice(0, byteLength);
		},
		
		clearReadState: function() {
			bytesRead = 0;
			doneBuffering = false;
			waitingForInput = true;
		},
		
		clearBuffers: function() {
			internal.clearReadState();
			buffers.splice(0, buffers.length);
			bufferPosition = seekPosition;
		},

		// Read the next binary buffer out of the buffered data
		readNextChunk: function() {
			if (waitingForInput) {
				waitingForInput = false;
				onread(internal.popBuffer());
				if (doneBuffering && !internal.dataToRead()) {
					internal.onReadDone();
				}
			}
		},
		
		onReadDone: function() {
			console.log('onReadDone');
			ondone();
		},
		
		// See if we can seek within already-buffered data
		quickSeek: function(pos) {
			return false;
		}

	};

	// -- Public methods
	self.readBytes = function() {
		if (internal.dataToRead()) {
			var buffer = internal.popBuffer();
			onread(buffer);
			if (doneBuffering && self.bytesBuffered < Math.min(bufferPosition + chunkSize, self.bytesTotal)) {
				//console.log('yo!', doneBuffering, seekPosition, bufferPosition, self.bytesRead, self.bytesBuffered, self.bytesTotal);
				seekPosition += chunkSize;
				console.log('1 seek to: ' + seekPosition);
				internal.clearReadState();
				internal.openXHR();
			}
		} else if (doneBuffering) {
			// We're out of data!
			internal.onReadDone();
		} else {
			// Nothing queued...
			waitingForInput = true;
		}
	};

	self.abort = function() {
		if (internal.xhr) {
			internal.abortXHR(internal.xhr);
			internal.xhr = null;
			internal.clearBuffers();
		}
	};
	
	self.seek = function(bytePosition) {
		console.log('seeking to: ' + bytePosition);
		if (internal.quickSeek(bytePosition)) {
			console.log('quick seek successful');
		} else {
			self.abort();
			seekPosition = bytePosition;
			internal.clearBuffers();
			internal.openXHR();
		}
	};
	
	self.getResponseHeader = function(headerName) {
		var lowerName = headerName.toLowerCase(),
			value = responseHeaders[lowerName];
		if (value === undefined) {
			return null;
		} else {
			return value;
		}
	};

	// -- public properties
	Object.defineProperty(self, 'bytesTotal', {
		get: function() {
			return bytesTotal;
		}
	});
	
	Object.defineProperty(self, 'bytesBuffered', {
		get: function() {
			return bufferPosition + internal.bytesBuffered();
		}
	});

	Object.defineProperty(self, 'bytesRead', {
		get: function() {
			return seekPosition + bytesRead;
		}
	});
	
	Object.defineProperty(self, 'seekable', {
		get: function() {
			return (self.bytesTotal > 0);
		}
	});

	// Handy way to call super functions
	var orig = {};
	for (var prop in internal) {
		orig[prop] = internal[prop];
	}

	// -- Backend selection and method overrides
	if (internal.tryMethod('moz-chunked-arraybuffer')) {
		console.log("Streaming input using moz-chunked-arraybuffer");

		internal.setXHROptions = function(xhr) {
			xhr.responseType = 'moz-chunked-arraybuffer';

			xhr.onprogress = function() {
				// xhr.response is a per-chunk ArrayBuffer
				internal.bufferData(xhr.response);
			};
		};
		
		internal.abortXHR = function(xhr) {
			xhr.onprogress = null;
			orig.abortXHR(xhr);
		};
		
		internal.onXHRLoading = function(xhr) {
			// we have to get from the 'progress' event
		};
		
	} else if (internal.tryMethod('ms-stream')) {
		// IE 10 supports returning a Stream from XHR.
		console.log("Streaming input using MSStreamReader");
		
		// Don't bother reading in chunks, MSStream handles it for us
		chunkSize = 0;
		
		var stream, streamReader;
		var restarted = false;
		
		internal.setXHROptions = function(xhr) {
			console.log('setting up new xhr');
			xhr.responseType = 'ms-stream';
		};

		internal.abortXHR = function(xhr) {
			console.log('aborting XHR and StreamReader');
			restarted = true;
			if (streamReader) {
				streamReader.abort();
				streamReader = null;
			}
			if (stream) {
				stream.msClose();
				stream = null;
			}
			orig.abortXHR(xhr);
		};
		
		internal.onXHRLoading = function(xhr) {
			console.log('transferring to StreamReader');
			// Transfer us over to the StreamReader...
			stream = xhr.response;
			xhr.onreadystatechange = null;
			if (waitingForInput) {
				waitingForInput = false;
				self.readBytes();
			}
		};
		
		internal.bytesBuffered = function() {
			// We don't know how much ahead is buffered, it's opaque.
			// Just return what we've read.
			return 0;
		};

		self.readBytes = function() {
			if (stream) {
				streamReader = new MSStreamReader();
				streamReader.onload = function(event) {
					var buffer = event.target.result,
						len = buffer.byteLength;
					if (len > 0) {
						bytesRead += len;
						bufferPosition += len;
						onread(buffer);
					} else {
						// Zero length means end of stream.
						ondone();
					}
				}
				streamReader.onerror = function(event) {
					onerror('mystery error streaming');
				}
				streamReader.readAsArrayBuffer(stream, bufferSize);
			} else {
				waitingForInput = true;
			}
		};

	} else if ((new XMLHttpRequest()).overrideMimeType !== undefined) {

		// Use old binary string method since we can read reponseText
		// progressively and extract ArrayBuffers from that.
		console.log("Streaming input using XHR progressive binary string");
		
		internal.setXHROptions = function(xhr) {
			xhr.responseType = "text";
			xhr.overrideMimeType('text/plain; charset=x-user-defined');
		};
	
		var lastPosition = 0;
		
		// Is there a better way to do this conversion? :(
		function stringToArrayBuffer(chunk) {
			var len = chunk.length,
				buffer = new ArrayBuffer(len),
				bytes = new Uint8Array(buffer);
			for (var i = 0; i < len; i++) {
				bytes[i] = chunk.charCodeAt(i);
			}
			return buffer;
		}
		
		internal.clearReadState = function() {
			orig.clearReadState();
			lastPosition = 0;
		};
		
		internal.onXHRLoading = function(xhr) {
			// xhr.responseText is a binary string of entire file so far
			var str = xhr.responseText;
			if (lastPosition < str.length) {
				var chunk = str.slice(lastPosition),
					buffer = stringToArrayBuffer(chunk);
				lastPosition = str.length;
				internal.bufferData(buffer);
			}
		};
		
		/*
		internal.quickSeek = function(pos) {
			var bufferedPos = pos - seekPosition;
			if (bufferedPos < 0) {
				return false;
			} else if (bufferedPos >= internal.xhr.responseText.length) {
				return false;
			} else {
				lastPosition = bufferedPos;
				bytesRead = lastPosition;
				setTimeout(function() {
					onbuffer()
				}, 0);
				return true;
			}
		};
		*/
	} else {
		throw new Error("No streaming HTTP input method found.");
	}
	
	internal.openXHR();
}


// -- AudioFeeder.js

(function() {
	var global = this,
		AudioContext = global.AudioContext || global.webkitAudioContext;

	/**
	 * Object that we can throw audio data into and have it drain out.
	 *
	 * Because changing the number of channels on the fly is hard, hardcoding
	 * to 2 output channels. That's also all we can do on IE with Flash output.
	 *
	 * @param options: dictionary of config settings:
	 *                 'base' - Base URL to find additional resources in,
	 *                          such as the Flash audio output shim
	 */
	function AudioFeeder(options) {
		var self = this;
		options = options || {};
	
		// Look for W3C Audio API
		if (!AudioContext) {
			// use Flash fallback
			console.log("No W3C Web Audio API available");
			var flashOptions = {};
			if (typeof options.base === 'string') {
				flashOptions.swf = options.base + '/dynamicaudio.swf';
			}
			this.flashaudio = new DynamicAudio( flashOptions );
		}

		var bufferSize = this.bufferSize = 4096,
			channels = 0, // call init()!
			rate = 0; // call init()!

		// Always create stereo output. For iOS we have to set this stuff up
		// before we've actually gotten the info from the codec because we
		// must initialize from a UI event. Bah!
		var outputChannels = 2;

		function freshBuffer() {
			var buffer = [];
			for (var channel = 0; channel < outputChannels; channel++) {
				buffer[channel] = new Float32Array(bufferSize);
			}
			return buffer;
		}
	
		var buffers = [],
			context,
			node,
			pendingBuffer = freshBuffer(),
			pendingPos = 0,
			muted = false,
			bufferHead = 0,
			playbackTimeAtBufferHead = -1,
			targetRate,
			dropped = 0,
			lostTime = 0;

		if(AudioContext) {
			if (typeof options.audioContext !== 'undefined') {
				// We were passed a pre-existing AudioContext object,
				// in the hopes this gets around iOS's weird activation rules.
				context = options.audioContext;
			} else {
				AudioFeeder.initSharedAudioContext();
				context = AudioFeeder.sharedAudioContext;
			}

			if (context.createScriptProcessor) {
				node = context.createScriptProcessor(bufferSize, 0, outputChannels)
			} else if (context.createJavaScriptNode) {
				node = context.createJavaScriptNode(bufferSize, 0, outputChannels)
			} else {
				throw new Error("Bad version of web audio API?");
			}
			targetRate = this.targetRate = context.sampleRate;
		} else {
			targetRate = this.targetRate = 44100; // flash fallback
		}
	
		function popNextBuffer() {
			// hack hack
			// fixme: grab the right number of samples
			// and... rescale 
			if (buffers.length > 0) {
				return buffers.shift();
			}
		}

		function audioProcess(event) {
			var playbackTime;
			if (typeof event.playbackTime === "number") {
				playbackTime = event.playbackTime;
			} else if (typeof event.timeStamp === "number") {
				playbackTime = (event.timeStamp - Date.now()) / 1000 + context.currentTime;
			} else {
				console.log("Unrecognized AudioProgressEvent format, no playbackTime or timestamp");
			}
			expectedTime = playbackTimeAtBufferHead + (bufferSize / context.sampleRate);
			if (expectedTime < playbackTime) {
				// we may have lost some time while something ran too slow
				lostTime += (playbackTime - expectedTime);
			}
			playbackTimeAtBufferHead = playbackTime;
			var inputBuffer = popNextBuffer(bufferSize);
			if (!inputBuffer) {
				// We might be in a throttled background tab; go ping the decoder
				// and let it know we need more data now!
				if (self.onstarved) {
					self.onstarved();
					inputBuffer = popNextBuffer(bufferSize);
				}
			}
			if (!muted && inputBuffer) {
				bufferHead += (bufferSize / context.sampleRate);
				playbackTimeAtBufferHead += (bufferSize / context.sampleRate);
				for (var channel = 0; channel < outputChannels; channel++) {
					var input = inputBuffer[channel],
						output = event.outputBuffer.getChannelData(channel);
					for (var i = 0; i < Math.min(bufferSize, input.length); i++) {
						output[i] = input[i];
					}
				}
			} else {
				if (inputBuffer) {
					// Pretend we played this audio
					bufferHead += (bufferSize / context.sampleRate);
					playbackTimeAtBufferHead += (bufferSize / context.sampleRate);
				} else {
					dropped++;
				}
				for (var channel = 0; channel < outputChannels; channel++) {
					var output = event.outputBuffer.getChannelData(channel);
					for (var i = 0; i < bufferSize; i++) {
						output[i] = 0;
					}
				}
			}
		}
	
		/**
		 * This is horribly naive and wrong.
		 * Replace me with a better algo!
		 */
		function resample(samples) {
			if (rate == targetRate && channels == outputChannels) {
				return samples;
			} else {
				var newSamples = [];
				for (var channel = 0; channel < outputChannels; channel++) {
					var inputChannel = channel;
					if (channel >= channels) {
						inputChannel = 0;
					}
					var input = samples[inputChannel],
						output = new Float32Array(Math.round(input.length * targetRate / rate));
					for (var i = 0; i < output.length; i++) {
						output[i] = input[(i * rate / targetRate) | 0];
					}
					newSamples.push(output);
				}
				return newSamples;
			}
		}

		/**
		 * Resampling, scaling and reordering for the Flash fallback.
		 * The Flash fallback expects 44.1 kHz, stereo
		 * Resampling: This is horribly naive and wrong.
		 * TODO: Replace me with a better algo!
		 */
		function resampleFlash(samples) {
			var sampleincr = rate / 44100;
			var samplecount = (samples[0].length * (44100 / rate)) | 0;
			var newSamples = new Int16Array(samplecount * 2);
			var chanLeft = samples[0];
			var chanRight = channels > 1 ? samples[1] : chanLeft;
			var multiplier = 16384; // smaller than 32768 to allow some headroom from those floats
			for(var s = 0; s < samplecount; s++) {
				var idx = (s * sampleincr) | 0;
				var idx_out = s * 2;
				// Use a smaller
				newSamples[idx_out] = chanLeft[idx] * multiplier;
				newSamples[idx_out + 1] = chanRight[idx] * multiplier;
			}
			return newSamples;
		}

		function resampleFlashMuted(samples) {
			// if muted: generate fitting number of samples for audio clock
			var samplecount = (samples[0].length * (44100 / rate)) | 0;
			return new Int16Array(samplecount * 2);
		}

	
		function pushSamples(samples) {
			var firstChannel = samples[0],
				sampleCount = firstChannel.length;
			for (var i = 0; i < sampleCount; i++) {
				for (var channel = 0; channel < outputChannels; channel++) {
					pendingBuffer[channel][pendingPos] = samples[channel][i];
				}
				if (++pendingPos == bufferSize) {
					buffers.push(pendingBuffer);
					pendingPos = 0;
					pendingBuffer = freshBuffer();
				}
			}
		}
	
		this.init = function(numChannels, sampleRate) {
			// warning: can't change channels here reliably
			rate = sampleRate;
			channels = numChannels;
			pendingBuffer = freshBuffer();
		};
	
		var hexDigits = ['0', '1', '2', '3', '4', '5', '6', '7',
						 '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
		var hexBytes = [];
		for (var i = 0; i < 256; i++) {
			hexBytes[i] = hexDigits[(i & 0x0f)] +
						  hexDigits[(i & 0xf0) >> 4];
		}
		function hexString(buffer) {
			var samples = new Uint8Array(buffer);
			var digits = "",
				len = samples.length;
			for (var i = 0; i < len; i++) {
				// Note that in IE 11 strong concatenation is twice as fast as
				// the traditional make-an-array-and-join here.
				digits += hexBytes[samples[i]];
			}
			return digits;
		}
	
		this.bufferData = function(samplesPerChannel) {
			if(this.flashaudio) {
				var resamples = !muted ? resampleFlash(samplesPerChannel) : resampleFlashMuted(samplesPerChannel);
				var flashElement = this.flashaudio.flashElement;
				if(resamples.length > 0) {
					var str = hexString(resamples.buffer)
					//console.log(str.length + ' bytes sent to Flash');
					if (flashElement.write) {
						flashElement.write(str);
					} else {
						console.log('NOT YET READY');
						self.waitUntilReady(function() {
							flashElement.write(str);
						});
					}
				}
			} else if (buffers) {
				samples = resample(samplesPerChannel);
				pushSamples(samples);
			} else {
				console.log('no valid whatsit');
				self.close();
			}
		};
	
		function samplesQueued() {
			if (buffers) {
				var samplesQueued = 0;
				buffers.forEach(function(buffer) {
					samplesQueued += buffer[0].length;
				});
			
				var bufferedSamples = samplesQueued;
				var remainingSamples = Math.floor(Math.max(0, (playbackTimeAtBufferHead - context.currentTime)) * context.sampleRate);
			
				return bufferedSamples + remainingSamples;
			} else {
				return 0;
			}
		};
	
		/**
		 * @return {
		 *   playbackPosition: {number} seconds, with a system-provided base time
		 *   samplesQueued: {int}
		 *   dropped: {int}
		 * }
		 */
		this.getPlaybackState = function() {
			if (this.flashaudio) {
				var flashElement = this.flashaudio.flashElement;
				if (flashElement.write) {
					return flashElement.getPlaybackState();
				} else {
					console.log('getPlaybackState USED TOO EARLY');
					return {
						playbackPosition: 0,
						samplesQueued: 0,
						dropped: 0
					};
				}
			} else {
				return {
					playbackPosition: context.currentTime - (dropped * bufferSize / context.sampleRate) - lostTime,
					samplesQueued: samplesQueued(),
					dropped: dropped
				}
			}
		}
	
		this.mute = function() {
			this.muted = muted = true;
		};
	
		this.unmute = function() {
			this.muted = muted = false;
		}
		
		this.close = function() {
			console.log('CLOSE AUDIO FEEDER');
			this.stop();

			if(this.flashaudio) {
				var wrapper = this.flashaudio.flashWrapper;
				wrapper.parentNode.removeChild(wrapper);
				this.flashaudio = null;
			}

			context = null;
			buffers = null;
		};
	
		this.waitUntilReady = function(callback) {
			if (self.flashaudio) {
				var times = 0,
					maxTimes = 100;
				function pingFlashPlugin() {
					setTimeout(function doPingFlashPlugin() {
						times++;
						if (self.flashaudio && self.flashaudio.flashElement.write) {
							callback(this);
						} else if (times > maxTimes) {
							console.log("Failed to initialize Flash audio shim");
							self.close();
							callback(null);
						} else {
							pingFlashPlugin();
						}
					}, 20);
				}
				pingFlashPlugin();
			} else {
				setTimeout(callback, 0);
			}
		};
		
		this.start = function() {
			if (this.flashaudio) {
				this.flashaudio.flashElement.start();
			} else {
				node.onaudioprocess = audioProcess;
				node.connect(context.destination);
				playbackTimeAtBufferHead = context.currentTime;
			}
		};
		
		this.stop = function() {
			if (this.flashaudio) {
				this.flashaudio.flashElement.stop();
			} else {
				if (node) {
					node.onaudioprocess = null;
					node.disconnect();
				}
			}
		};

		/**
		 * A callback when we find we're out of buffered data.
		 */
		this.onstarved = null;
	}
	
	AudioFeeder.sharedAudioContext = null;
	AudioFeeder.initSharedAudioContext = function() {
		if (AudioFeeder.sharedAudioContext === null) {
			if ( AudioContext ) {
				// We're only allowed 4 contexts on many browsers
				// and there's no way to discard them (!)...
				var context = AudioFeeder.sharedAudioContext = new AudioContext(),
					node;
				if ( context.createScriptProcessor ) {
					node = context.createScriptProcessor( 1024, 0, 2 );
				} else if ( context.createJavaScriptNode ) {
					node = context.createJavaScriptNode( 1024, 0, 2 );
				} else {
					throw new Error( "Bad version of web audio API?" );
				}

				// Don't actually run any audio, just start & stop the node
				node.connect( context.destination );
				node.disconnect();
			}
		}
	};
	
	global.AudioFeeder = AudioFeeder;



	/** Flash fallback **/

	/*
	The Flash fallback is based on https://github.com/an146/dynamicaudio.js

	This is the contents of the LICENSE file:

	Copyright (c) 2010, Ben Firshman
	All rights reserved.
 
	Redistribution and use in source and binary forms, with or without
	modification, are permitted provided that the following conditions are met:
 
	 * Redistributions of source code must retain the above copyright notice, this
	   list of conditions and the following disclaimer.
	 * Redistributions in binary form must reproduce the above copyright notice,
	   this list of conditions and the following disclaimer in the documentation
	   and/or other materials provided with the distribution.
	 * The names of its contributors may not be used to endorse or promote products
	   derived from this software without specific prior written permission.
 
	THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
	ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
	WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
	DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
	ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
	(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
	LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
	ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
	(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
	SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
	*/


	function DynamicAudio(args) {
		if (this instanceof arguments.callee) {
			if (typeof this.init === "function") {
				this.init.apply(this, (args && args.callee) ? args : arguments);
			}
		} else {
			return new arguments.callee(arguments);
		}
	}


	DynamicAudio.nextId = 1;

	DynamicAudio.prototype = {
		nextId: null,
		swf: 'dynamicaudio.swf?' + Math.random(),

		flashWrapper: null,
		flashElement: null,
	
		init: function(opts) {
			var self = this;
			self.id = DynamicAudio.nextId++;

			if (opts && typeof opts['swf'] !== 'undefined') {
				self.swf = opts['swf'];
			}


			self.flashWrapper = document.createElement('div');
			self.flashWrapper.id = 'dynamicaudio-flashwrapper-'+self.id;
			// Credit to SoundManager2 for this:
			var s = self.flashWrapper.style;
			s['position'] = 'fixed';
			s['width'] = '11px'; // must be at least 6px for flash to run fast
			s['height'] = '11px';
			s['bottom'] = s['left'] = '0px';
			s['overflow'] = 'hidden';
			self.flashElement = document.createElement('div');
			self.flashElement.id = 'dynamicaudio-flashelement-'+self.id;
			self.flashWrapper.appendChild(self.flashElement);

			document.body.appendChild(self.flashWrapper);

			var id = self.flashElement.id;

			self.flashWrapper.innerHTML = "<object id='"+id+"' width='10' height='10' type='application/x-shockwave-flash' data='"+self.swf+"' style='visibility: visible;'><param name='allowscriptaccess' value='always'></object>";
			self.flashElement = document.getElementById(id);
		},
	};

})();


// -- FrameSink.js

/**
 * @param HTMLCanvasElement canvas
 * @constructor
 */
function FrameSink(canvas, videoInfo) {
	var self = this,
		ctx = canvas.getContext('2d'),
		imageData = ctx.createImageData(videoInfo.frameWidth, videoInfo.frameHeight);

	
/**
 * Basic YCbCr->RGB conversion
 *
 * @author Brion Vibber <brion@pobox.com>
 * @copyright 2014
 * @license MIT-style
 *
 * @param ybcbr {bytesY, bytesCb, bytesCr, strideY, strideCb, strideCr, width, height, hdec, vdec}
 * @param TypedArray output: CanvasPixelArray or Uint8ClampedArray to draw RGBA into
 * Assumes that the output array already has alpha channel set to opaque.
 */
function convertYCbCr(ybcbr, output) {
	var width = ybcbr.width,
		height = ybcbr.height,
		hdec = ybcbr.hdec,
		vdec = ybcbr.vdec,
		bytesY = ybcbr.bytesY,
		bytesCb = ybcbr.bytesCb,
		bytesCr = ybcbr.bytesCr,
		strideY = ybcbr.strideY,
		strideCb = ybcbr.strideCb,
		strideCr = ybcbr.strideCr,
		outStride = 4 * width,
		YPtr = 0, Y0Ptr = 0, Y1Ptr = 0,
		CbPtr = 0, CrPtr = 0,
		outPtr = 0, outPtr0 = 0, outPtr1 = 0,
		colorCb = 0, colorCr = 0,
		multY = 0, multCrR = 0, multCbCrG = 0, multCbB = 0,
		x = 0, y = 0, xdec = 0, ydec = 0;

	if (hdec == 1 && vdec == 1) {
		// Optimize for 4:2:0, which is most common
		outPtr0 = 0;
		outPtr1 = outStride;
		ydec = 0;
		for (y = 0; y < height; y += 2) {
			Y0Ptr = y * strideY;
			Y1Ptr = Y0Ptr + strideY;
			CbPtr = ydec * strideCb;
			CrPtr = ydec * strideCr;
			for (x = 0; x < width; x += 2) {
				colorCb = bytesCb[CbPtr++];
				colorCr = bytesCr[CrPtr++];

				// Quickie YUV conversion
				// https://en.wikipedia.org/wiki/YCbCr#ITU-R_BT.2020_conversion
				// multiplied by 256 for integer-friendliness
				multCrR   = (409 * colorCr) - 57088;
				multCbCrG = (100 * colorCb) + (208 * colorCr) - 34816;
				multCbB   = (516 * colorCb) - 70912;

				multY = (298 * bytesY[Y0Ptr++]);
				output[outPtr0++] = (multY + multCrR) >> 8;
				output[outPtr0++] = (multY - multCbCrG) >> 8;
				output[outPtr0++] = (multY + multCbB) >> 8;
				outPtr0++;

				multY = (298 * bytesY[Y0Ptr++]);
				output[outPtr0++] = (multY + multCrR) >> 8;
				output[outPtr0++] = (multY - multCbCrG) >> 8;
				output[outPtr0++] = (multY + multCbB) >> 8;
				outPtr0++;

				multY = (298 * bytesY[Y1Ptr++]);
				output[outPtr1++] = (multY + multCrR) >> 8;
				output[outPtr1++] = (multY - multCbCrG) >> 8;
				output[outPtr1++] = (multY + multCbB) >> 8;
				outPtr1++;

				multY = (298 * bytesY[Y1Ptr++]);
				output[outPtr1++] = (multY + multCrR) >> 8;
				output[outPtr1++] = (multY - multCbCrG) >> 8;
				output[outPtr1++] = (multY + multCbB) >> 8;
				outPtr1++;
			}
			outPtr0 += outStride;
			outPtr1 += outStride;
			ydec++;
		}
	} else {
		outPtr = 0;
		for (y = 0; y < height; y++) {
			xdec = 0;
			ydec = y >> vdec;
			YPtr = y * strideY;
			CbPtr = ydec * strideCb;
			CrPtr = ydec * strideCr;

			for (x = 0; x < width; x++) {
				xdec = x >> hdec;
				colorCb = bytesCb[CbPtr + xdec];
				colorCr = bytesCr[CrPtr + xdec];

				// Quickie YUV conversion
				// https://en.wikipedia.org/wiki/YCbCr#ITU-R_BT.2020_conversion
				// multiplied by 256 for integer-friendliness
				multCrR   = (409 * colorCr) - 57088;
				multCbCrG = (100 * colorCb) + (208 * colorCr) - 34816;
				multCbB   = (516 * colorCb) - 70912;

				multY = 298 * bytesY[YPtr++];
				output[outPtr++] = (multY + multCrR) >> 8;
				output[outPtr++] = (multY - multCbCrG) >> 8;
				output[outPtr++] = (multY + multCbB) >> 8;
				outPtr++;
			}
		}
	}
}


	// Prefill the alpha to opaque
	var data = imageData.data,
		pixelCount = videoInfo.frameWidth * videoInfo.frameHeight * 4;
	for (var i = 0; i < pixelCount; i += 4) {
		data[i + 3] = 255;
	}

	/**
	 * Actually draw a frame into the canvas.
	 */
	self.drawFrame = function drawFrame(yCbCrBuffer) {
		convertYCbCr(yCbCrBuffer, imageData.data);

		ctx.putImageData(imageData,
						 0, 0,
						 videoInfo.picX, videoInfo.picY,
						 videoInfo.picWidth, videoInfo.picHeight);

	};

	return self;
}



// -- WebGLFrameSink.js


/**
 * Warning: canvas must not have been used for 2d drawing prior!
 *
 * @param HTMLCanvasElement canvas
 * @constructor
 */
function WebGLFrameSink(canvas, videoInfo) {
	var self = this,
		gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl'),
		debug = false; // swap this to enable more error checks, which can slow down rendering
	
	if (gl == null) {
		throw new Error('WebGL unavailable');
	}
	console.log('Using WebGL canvas for video drawing');

	// GL!
	function checkError() {
		if (debug) {
			err = gl.getError();
			if (err != 0) {
				throw new Error("GL error " + err);
			}
		}
	}
	
	function compileShader(type, source) {
		var shader = gl.createShader(type);
		gl.shaderSource(shader, source);
		gl.compileShader(shader);

		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			var err = gl.getShaderInfoLog(shader);
			gl.deleteShader(shader);
			throw new Error('GL shader compilation for ' + type + ' failed: ' + err);
		}
	
		return shader;
	}


	var vertexShader,
		fragmentShader,
		program,
		buffer,
		err;
	
	// In the world of GL there are no rectangles.
	// There are only triangles.
	// THERE IS NO SPOON.
	var rectangle = new Float32Array([
		// First triangle (top left, clockwise)
		-1.0, -1.0,
		+1.0, -1.0,
		-1.0, +1.0,

		// Second triangle (bottom right, clockwise)
		-1.0, +1.0,
		+1.0, -1.0,
		+1.0, +1.0
	]);

	var textures = {};
	function attachTexture(name, register, index, width, height, data) {
		var texture;
		if (textures[name]) {
			// Reuse & update the existing texture
			texture = textures[name];
		} else {
			textures[name] = texture = gl.createTexture();
		}
		checkError();
		gl.activeTexture(register);
		checkError();
		gl.bindTexture(gl.TEXTURE_2D, texture);
		checkError();
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
		checkError();
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		checkError();
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		checkError();
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		checkError();
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		checkError();
		
		gl.texImage2D(
			gl.TEXTURE_2D,
			0, // mip level
			gl.LUMINANCE, // internal format
			width, height,
			0, // border
			gl.LUMINANCE, // format
			gl.UNSIGNED_BYTE, //type
			data // data!
		);
		checkError();
	
		gl.uniform1i(gl.getUniformLocation(program, name), index);
		checkError();
		
		return texture;
	}

	function init(yCbCrBuffer) {
		vertexShader = compileShader(gl.VERTEX_SHADER, "attribute vec2 aPosition;\nattribute vec2 aLumaPosition;\nattribute vec2 aChromaPosition;\nvarying vec2 vLumaPosition;\nvarying vec2 vChromaPosition;\nvoid main() {\n    gl_Position = vec4(aPosition, 0, 1);\n    vLumaPosition = aLumaPosition;\n    vChromaPosition = aChromaPosition;\n}\n");
		fragmentShader = compileShader(gl.FRAGMENT_SHADER, "// inspired by https://github.com/mbebenita/Broadway/blob/master/Player/canvas.js\n// extra 'stripe' texture fiddling to work around IE 11's lack of gl.LUMINANCE or gl.ALPHA textures\n\nprecision mediump float;\nuniform sampler2D uTextureY;\nuniform sampler2D uTextureCb;\nuniform sampler2D uTextureCr;\nvarying vec2 vLumaPosition;\nvarying vec2 vChromaPosition;\nvoid main() {\n   // Y, Cb, and Cr planes are uploaded as LUMINANCE textures.\n   float fY = texture2D(uTextureY, vLumaPosition).x;\n   float fCb = texture2D(uTextureCb, vChromaPosition).x;\n   float fCr = texture2D(uTextureCr, vChromaPosition).x;\n\n   // Premultipy the Y...\n   float fYmul = fY * 1.1643828125;\n\n   // And convert that to RGB!\n   gl_FragColor = vec4(\n     fYmul + 1.59602734375 * fCr - 0.87078515625,\n     fYmul - 0.39176171875 * fCb - 0.81296875 * fCr + 0.52959375,\n     fYmul + 2.017234375   * fCb - 1.081390625,\n     1\n   );\n}\n");
	
		program = gl.createProgram();
		gl.attachShader(program, vertexShader);
		checkError();

		gl.attachShader(program, fragmentShader);
		checkError();

		gl.linkProgram(program);
		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			var err = gl.getProgramInfoLog(program);
			gl.deleteProgram(program);
			throw new Error('GL program linking failed: ' + err);
		}

		gl.useProgram(program);
		checkError();
	}
	
	self.drawFrame = function(yCbCrBuffer) {
		if (!program) {
			init(yCbCrBuffer);
		}

		// Set up the rectangle and draw it

		//
		// Set up geometry
		//
		
		buffer = gl.createBuffer();
		checkError();

		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		checkError();

		gl.bufferData(gl.ARRAY_BUFFER, rectangle, gl.STATIC_DRAW);
		checkError();

		var positionLocation = gl.getAttribLocation(program, 'aPosition');
		checkError();

		gl.enableVertexAttribArray(positionLocation);
		checkError();

		gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
		checkError();


		// Set up the texture geometry...
		function setupTexturePosition(varname, texWidth, texHeight) {
			// Warning: assumes that the stride for Cb and Cr is the same size in output pixels
			var textureX0 = videoInfo.picX / texWidth;
			var textureX1 = (videoInfo.picX + videoInfo.picWidth) / texWidth;
			var textureY0 = videoInfo.picY / texHeight;
			var textureY1 = (videoInfo.picY + videoInfo.picHeight) / texHeight;
			var textureRectangle = new Float32Array([
				textureX0, textureY0,
				textureX1, textureY0,
				textureX0, textureY1,
				textureX0, textureY1,
				textureX1, textureY0,
				textureX1, textureY1
			]);

			var texturePositionBuffer = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, texturePositionBuffer);
			checkError();
		
			gl.bufferData(gl.ARRAY_BUFFER, textureRectangle, gl.STATIC_DRAW);
			checkError();
		
			var texturePositionLocation = gl.getAttribLocation(program, varname);
			checkError();
		
			gl.enableVertexAttribArray(texturePositionLocation);
			checkError();
		
			gl.vertexAttribPointer(texturePositionLocation, 2, gl.FLOAT, false, 0, 0);
			checkError();
		}
		setupTexturePosition('aLumaPosition', yCbCrBuffer.strideY, yCbCrBuffer.height);
		setupTexturePosition('aChromaPosition', yCbCrBuffer.strideCb << yCbCrBuffer.hdec, yCbCrBuffer.height);
		
		// Create the textures...
		var textureY = attachTexture(
			'uTextureY',
			gl.TEXTURE0,
			0,
			yCbCrBuffer.strideY,
			yCbCrBuffer.height,
			yCbCrBuffer.bytesY
		);
		var textureCb = attachTexture(
			'uTextureCb',
			gl.TEXTURE1,
			1,
			yCbCrBuffer.strideCb,
			yCbCrBuffer.height >> yCbCrBuffer.vdec,
			yCbCrBuffer.bytesCb
		);
		var textureCr = attachTexture(
			'uTextureCr',
			gl.TEXTURE2,
			2,
			yCbCrBuffer.strideCr,
			yCbCrBuffer.height >> yCbCrBuffer.vdec,
			yCbCrBuffer.bytesCr
		);

		// Aaaaand draw stuff.
		gl.drawArrays(gl.TRIANGLES, 0, rectangle.length / 2);
		checkError();
	};

	return self;
}

/**
 * Static function to check if WebGL will be available with appropriate features.
 *
 * @return boolean
 */
WebGLFrameSink.isAvailable = function() {
	var canvas = document.createElement('canvas');
	canvas.width = 1;
	canvas.height = 1;
	try {
		gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
	} catch (e) {
		return false;
	}
	if (gl) {
		var register = gl.TEXTURE0,
			width = 4,
			height = 4,
			texture = gl.createTexture(),
			data = new Uint8Array(width * height);

		gl.activeTexture(register);
		gl.bindTexture(gl.TEXTURE_2D, texture);
		gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true)
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texImage2D(
			gl.TEXTURE_2D,
			0, // mip level
			gl.LUMINANCE, // internal format
			width, height,
			0, // border
			gl.LUMINANCE, // format
			gl.UNSIGNED_BYTE, //type
			data // data!
		);

		var err = gl.getError();
		if (err) {
			// Doesn't support luminance textures?
			return false;
		} else {
			return true;
		}
	} else {
		return false;
	}
};



// -- Bisector.js

/**
 * Give as your 'process' function something that will trigger an async
 * operation, then call the left() or right() methods to run another
 * iteration, bisecting to the given direction.
 *
 * Caller is responsible for determining when done.
 *
 * @params options object {
 *   start: number,
 *   end: number,
 *   process: function(start, position, end)
 * }
 */
function Bisector(options) {
	var start = options.start,
		end = options.end,
		position = 0,
		self = this,
		n = 0;

	function iterate() {
		n++;
		position = Math.floor((start + end) / 2);
		console.log('iterateBisect', n, start, end, position);
		return options.process(start, end, position);
	}
	
	self.start = function() {
		iterate();
		return self;
	};

	self.left = function() {
		end = position;
		return iterate();
	};

	self.right = function() {
		start = position;
		return iterate();
	};
}


// -- OgvJsPlayer.js

/**
 * Constructor for an analogue of the TimeRanges class
 * returned by various HTMLMediaElement properties
 *
 * Pass an array of two-element arrays, each containing a start and end time.
 */
OgvJsTimeRanges = window.OgvJsTimeRanges = function(ranges) {
	Object.defineProperty(this, 'length', {
		get: function getLength() {
			return ranges.length;
		}
	});
	this.start = function(i) {
		return ranges[i][0];
	};
	this.end = function(i) {
		return ranges[i][1];
	}
	return this;
}

/**
 * Player class -- instantiate one of these to get an 'ogvjs' HTML element
 * which has a similar interface to the HTML audio/video elements.
 *
 * @param options: optional dictionary of options:
 *                 'base': string; base URL for additional resources, such as Flash audio shim
 *                 'webGL': bool; pass true to use WebGL acceleration if available
 *                 'forceWebGL': bool; pass true to require WebGL even if not detected
 */
OgvJsPlayer = window.OgvJsPlayer = function(options) {
	options = options || {};
	var webGLdetected = WebGLFrameSink.isAvailable();
	var useWebGL = !!options.webGL && webGLdetected;
	if(!!options.forceWebGL) {
		useWebGL = true;
		if(!webGLdetected) {
			console.log("No support for WebGL detected, but WebGL forced on!");
		}
	}
	
	var State = {
		INITIAL: 'INITIAL',
		SEEKING_END: 'SEEKING_END',
		LOADED: 'LOADED',
		PLAYING: 'PLAYING',
		PAUSED: 'PAUSED',
		SEEKING: 'SEEKING',
		ENDED: 'ENDED'
	}, state = State.INITIAL;
	
	var SeekState = {
		NOT_SEEKING: 'NOT_SEEKING',
		BISECT_TO_TARGET: 'BISECT_TO_TARGET',
		BISECT_TO_KEYPOINT: 'BISECT_TO_KEYPOINT',
		LINEAR_TO_TARGET: 'LINEAR_TO_TARGET'
	}, seekState = SeekState.NOT_SEEKING;
	
	var audioOptions = {};
	if (typeof options.base === 'string') {
		// Pass the resource dir down to AudioFeeder,
		// so it can load the dynamicaudio.swf
		audioOptions.base = options.base;
	}
	if (typeof options.audioContext !== 'undefined') {
		// Try passing a pre-created audioContext in?
		audioOptions.audioContext = options.audioContext;
	}
	
	var canvas = document.createElement('canvas');
	var frameSink;
	
	// Return a magical custom element!
	var self = document.createElement('ogvjs');
	self.style.display = 'inline-block';
	self.style.position = 'relative';
	self.style.width = '0px'; // size will be expanded later
	self.style.height = '0px';

	canvas.style.position = 'absolute';
	canvas.style.top = '0';
	canvas.style.left = '0';
	canvas.style.width = '100%';
	canvas.style.height = '100%';
	self.appendChild(canvas);

	var getTimestamp;
	if (window.performance === undefined || window.performance.now === undefined) {
		getTimestamp = Date.now;
	} else {
		getTimestamp = window.performance.now.bind(window.performance);
	}

	var placeboCodec, codec, audioFeeder;
	var muted = false,
		initialAudioPosition = 0.0,
		initialAudioOffset = 0.0;
	function initAudioFeeder() {
		console.log('init audio feeder');
		audioFeeder = new AudioFeeder( audioOptions );
		if (muted) {
			audioFeeder.mute();
		}
		audioFeeder.onstarved = function() {
			// If we're in a background tab, timers may be throttled.
			// When audio buffers run out, go decode some more stuff.
			pingProcessing();
		};
		audioFeeder.init(audioInfo.channels, audioInfo.rate);
	}
	
	function startAudio(offset) {
		audioFeeder.start();
		var state = audioFeeder.getPlaybackState();
		initialAudioPosition = state.playbackPosition;
		if (offset !== undefined) {
			initialAudioOffset = offset;
		}
		console.log('START AUDIO AT', initialAudioPosition, initialAudioOffset);
	}
	
	function stopAudio() {
		initialAudioOffset = getAudioTime();
		audioFeeder.stop();
	}
	
	/**
	 * Get audio playback time position in file's units
	 *
	 * @return {number} seconds since file start
	 */
	function getAudioTime(state) {
		state = state || audioFeeder.getPlaybackState();
		//console.log(state.playbackPosition, initialAudioPosition, initialAudioOffset);
		return (state.playbackPosition - initialAudioPosition) + initialAudioOffset;
	}

	var stream,
		byteLength = 0,
		duration = null,
		lastSeenTimestamp = null,
		nextProcessingTimer,
		started = false,
		paused = true,
		ended = false,
		loadedMetadata = false,
		startedPlaybackInDocument = false;
	
	var framesPlayed = 0;
	// Benchmark data, exposed via getPlaybackStats()
	var framesProcessed = 0, // frames
		targetPerFrameTime = 1000 / 60, // ms
		demuxingTime = 0, // ms
		videoDecodingTime = 0, // ms
		audioDecodingTime = 0, // ms
		bufferTime = 0, // ms
		drawingTime = 0, // ms
		totalJitter = 0; // sum of ms we're off from expected frame delivery time
	// Benchmark data that doesn't clear
	var droppedAudio = 0; // number of times we were starved for audio

	function stopVideo() {
		// kill the previous video if any
		paused = true; // ?
		ended = true;
		
		continueVideo = null;
		
		if (stream) {
			stream.abort();
			stream = null;
		}
		if (placeboCodec) {
			placeboCodec.destroy();
			placeboCodec = null;
		}
		if (codec) {
			codec.destroy();
			codec = null;
		}
		if (audioFeeder) {
			audioFeeder.close();
			audioFeeder = null;
		}
		if (nextProcessingTimer) {
			clearTimeout(nextProcessingTimer);
			nextProcessingTimer = null;
		}
	}
	
	function togglePauseVideo() {
		if (self.paused) {
			self.play();
		} else {
			self.pause();
		}
	}
	
	var continueVideo = null;
	
	var lastFrameTime = getTimestamp(),
		frameEndTimestamp = 0.0,
		yCbCrBuffer = null;
	var lastFrameDecodeTime = 0.0;		
	var targetFrameTime;
	var lastFrameTimestamp = 0.0;

	function processFrame() {
		yCbCrBuffer = codec.dequeueFrame();
		frameEndTimestamp = yCbCrBuffer.timestamp;
	}

	function drawFrame() {
		if (thumbnail) {
			self.removeChild(thumbnail);
			thumbnail = null;
		}

		var start, delta;

		start = getTimestamp();

		frameSink.drawFrame(yCbCrBuffer);

		delta = getTimestamp() - start;
		lastFrameDecodeTime += delta;
		drawingTime += delta;

		framesProcessed++;
		framesPlayed++;

		doFrameComplete();
	}

	function doFrameComplete() {
		if (startedPlaybackInDocument && !document.body.contains(self)) {
			// We've been de-parented since we last ran
			// Stop playback at next opportunity!
			setTimeout(function() {
				self.stop();
			}, 0);
		}

		var newFrameTimestamp = getTimestamp(),
			wallClockTime = newFrameTimestamp - lastFrameTimestamp,
			jitter = Math.abs(wallClockTime - 1000 / fps);
		totalJitter += jitter;

		if (self.onframecallback) {
			self.onframecallback({
				cpuTime: lastFrameDecodeTime,
				clockTime: wallClockTime
			});
		}
		lastFrameDecodeTime = 0;
		lastFrameTimestamp = newFrameTimestamp;
	}


	// -- seek functions
	var seekTargetTime = 0.0,
		seekTargetKeypoint = 0.0,
		bisectTargetTime = 0.0,
		lastSeekPosition,
		lastFrameSkipped,
		seekBisector;

	function startBisection(targetTime) {
		bisectTargetTime = targetTime;
		seekBisector = new Bisector({
			start: 0,
			end: stream.bytesTotal - 1,
			process: function(start, end, position) {
				if (position == lastSeekPosition) {
					return false;
				} else {
					lastSeekPosition = position;
					lastFrameSkipped = false;
					codec.flush();
					stream.seek(position);
					stream.readBytes();
					return true;
				}
			}
		});
		seekBisector.start();
	}

	function seek(toTime) {
		if (stream.bytesTotal == 0) {
			throw new Error('Cannot bisect a non-seekable stream');
		}
		state = State.SEEKING;
		seekTargetTime = toTime;
		seekTargetKeypoint = -1;
		lastFrameSkipped = false;
		lastSeekPosition = -1;
		codec.flush();
		
		if (codec.hasAudio && audioFeeder) {
			stopAudio();
		}
		
		var offset = codec.getKeypointOffset(toTime);
		if (offset > 0) {
			// This file has an index!
			//
			// Start at the keypoint, then decode forward to the desired time.
			//
			seekState = SeekState.LINEAR_TO_TARGET;
			stream.seek(offset);
			stream.readBytes();
		} else {
			// No index.
			//
			// Bisect through the file finding our target time, then we'll
			// have to do it again to reach the keypoint, and *then* we'll
			// have to decode forward back to the desired time.
			//
			seekState = SeekState.BISECT_TO_TARGET;
			startBisection(seekTargetTime);
		}
	}
	
	function continueSeekedPlayback() {
		seekState = SeekState.NOT_SEEKING;
		state = State.PLAYING;
		frameEndTimestamp = codec.frameTimestamp;
		console.log('SEEKED', codec.audioTimestamp, codec.frameTimestamp);
		if (codec.hasAudio) {
			seekTargetTime = codec.audioTimestamp;
			startAudio(seekTargetTime);
		} else {
			seekTargetTime = codec.frameTimestamp;
		}
	}
	
	/**
	 * @return {boolean} true to continue processing, false to wait for input data
	 */
	function doProcessLinearSeeking() {
		var frameDuration;
		if (codec.hasVideo) {
			frameDuration = 1 / videoInfo.fps;
		} else {
			frameDuration = 1 / 256; // approximate packet audio size, fake!
		}
		
		if (codec.hasVideo) {
			if (!codec.frameReady) {
				// Haven't found a frame yet, process more data
				return true;
			} else if (codec.frameTimestamp < 0 || codec.frameTimestamp + frameDuration < seekTargetTime) {
				// Haven't found a time yet, or haven't reached the target time.
				// Decode it in case we're at our keyframe or a following intraframe...
				codec.decodeFrame();
				codec.dequeueFrame();
				return true;
			} else {
				// Reached or surpassed the target time. 
				if (codec.hasAudio) {
					// Keep processing the audio track
				} else {
					continueSeekedPlayback();
					return false;
				}
			}
		}
		if (codec.hasAudio) {
			if (!codec.audioReady) {
				// Haven't found an audio packet yet, process more data
				return true;
			}
			if (codec.audioTimestamp < 0 || codec.audioTimestamp + frameDuration < seekTargetTime) {
				// Haven't found a time yet, or haven't reached the target time.
				// Decode it so when we reach the target we've got consistent data.
				codec.decodeAudio();
				codec.dequeueAudio();
				return true;
			} else {
				continueSeekedPlayback();
				return false;
			}
		}
		return true;
	}
	
	function doProcessBisectionSeek() {
		var frameDuration,
			timestamp;
		if (codec.hasVideo) {
			if (!codec.frameReady) {
				console.log('no frame found yet');
				// Haven't found a frame yet, process more data
				return true;
			}
			timestamp = codec.frameTimestamp;
			frameDuration = 1 / videoInfo.fps;
		} else if (codec.hasAudio) {
			if (!codec.audioReady) {
				console.log('no audio found yet');
				// Haven't found an audio packet yet, process more data
				return true;
			}
			timestamp = codec.audioTimestamp;
			frameDuration = 1 / 256; // approximate packet audio size, fake!
		} else {
			throw new Error('Invalid seek state; no audio or video track available');
		}

		if (timestamp < 0) {
			console.log('no timestamps found yet');
			// Haven't found a time yet.
			// Decode in case we're at our keyframe or a following intraframe...
			if (codec.frameReady) {
				codec.decodeFrame();
				codec.dequeueFrame();
			}
			if (codec.audioReady) {
				codec.decodeAudio();
				codec.dequeueAudio();
			}
			return true;
		} else if (timestamp - frameDuration > bisectTargetTime) {
			console.log('frame too high', codec.frameTimestamp, bisectTargetTime);
			if (seekBisector.left()) {
				// wait for new data to come in
			} else {
				console.log('gave up on bisect left');
				seekTargetTime = codec.frameTimestamp;
				continueSeekedPlayback();
			}
			return false;
		} else if (timestamp + frameDuration < bisectTargetTime) {
			console.log('frame too low', codec.frameTimestamp, bisectTargetTime);
			if (seekBisector.right()) {
				// wait for new data to come in
			} else {
				console.log('gave up on bisect right');
				seekTargetTime = codec.frameTimestamp;
				continueSeekedPlayback();
			}
			return false;
		} else {
			console.log('found it?', timestamp, bisectTargetTime);
			// Reached the bisection target!
			if (seekState == SeekState.BISECT_TO_TARGET && (codec.hasVideo && codec.keyframeTimestamp < codec.frameTimestamp)) {
				// We have to go back and find a keyframe. Sigh.
				seekState = SeekState.BISECT_TO_KEYPOINT;
				startBisection(codec.keyframeTimestamp);
				return false;
			} else {
				// Switch to linear mode to find the final target.
				seekState = SeekState.LINEAR_TO_TARGET;
				return true;
			}
		}
		return true;
	}
	

	/**
	 * In IE, pushing data to the Flash shim is expensive.
	 * Combine multiple small Vorbis packet outputs into
	 * larger buffers so we don't have to make as many calls.
	 */
	function joinAudioBuffers(buffers) {
		if (buffers.length == 1) {
			return buffers[0];
		}
		var sampleCount = 0,
			channelCount = buffers[0].length,
			i,
			c,
			out = [];
		for (i = 0; i < buffers.length; i++) {
			sampleCount += buffers[i][0].length;
		}
		for (c = 0; c < channelCount; c++) {
			var channelOut = new Float32Array(sampleCount);
			var position = 0;
			for (i = 0; i < buffers.length; i++) {
				var channelIn = buffers[i][c];
				channelOut.set(channelIn, position);
				position += channelIn.length;
			}
			out.push(channelOut);
		}
		return out;
	}

	function doProcessing() {
		nextProcessingTimer = null;
		
		var audioBuffers = [];
		function queueAudio() {
			if (audioBuffers.length > 0) {
				var start = getTimestamp();
				audioFeeder.bufferData(joinAudioBuffers(audioBuffers));
				var delta = (getTimestamp() - start);
				lastFrameDecodeTime += delta;
				bufferTime += delta;

				if (!codec.hasVideo) {
					framesProcessed++; // pretend!
					doFrameComplete();
				}
			}
		}
		
		var audioBufferedDuration = 0,
			decodedSamples = 0,
			audioState = null;

		var n = 0;
		while (true) {
			//console.log(n, state, codec.hasAudio, codec.audioReady, codec.audioTimestamp, codec.hasVideo, codec.frameReady, codec.frameTimestamp);
			n++;
			if (n > 100) {
				//throw new Error("Got stuck in the loop!");
				console.log("Got stuck in the loop!");
				pingProcessing(10);
				return;
			}

			if (state == State.INITIAL) {
				if (placeboCodec) {
					placeboCodec.process();
				}
				var more = codec.process();

				if (loadedMetadata) {
					// we just fell over from headers into content; call onloadedmetadata etc
					if (!codec.hasVideo && !codec.hasAudio) {
						throw new Error('No audio or video found, something is wrong');
						return;
					}
					if (duration === null) {
						if (stream.seekable) {
							console.log('Seeking to find duration...');
							state = State.SEEKING_END;
							lastSeenTimestamp = -1;
							codec.flush();
							stream.seek(Math.max(0, stream.bytesTotal - 65536 * 2));
							stream.readBytes();
							return;
						} else {
							console.log('Stream not seekable and no x-content-duration; assuming infinite stream.');
							state = State.LOADED;
							continue;
						}
					} else {
						// We already know the duration.
						state = State.LOADED;
						continue;
					}
				}

				if (!more) {
					// Read more data!
					stream.readBytes();
					return;
				} else {
					// Keep processing headers
					continue;
				}
			}
			
			if (state == State.SEEKING_END) {
				// Look for the last item.
				var more = codec.process();
				
				//console.log('video', codec.hasVideo, codec.frameReady, codec.frameTimestamp);
				if (codec.hasVideo && codec.frameReady) {
					lastSeenTimestamp = Math.max(lastSeenTimestamp, codec.frameTimestamp);
					codec.discardFrame();
				}
				//console.log('audio', codec.hasAudio, codec.audioReady, codec.audioTimestamp);
				if (codec.hasAudio && codec.audioReady) {
					lastSeenTimestamp = Math.max(lastSeenTimestamp, codec.audioTimestamp);
					codec.decodeAudio();
					codec.dequeueAudio();
				}
				//console.log('lastSeenTimestamp', lastSeenTimestamp);
				
				if (!more) {
					// Read more data!
					if (stream.bytesRead < stream.bytesTotal) {
						stream.readBytes();
						return;
					} else {
						// We are at the end!
						if (lastSeenTimestamp > 0) {
							duration = lastSeenTimestamp;
							console.log('detected duration ' + duration + ' from end');
						} else {
							console.log('did not find a duration');
						}
						
						// Ok, seek back to the beginning and resync the streams.
						state = State.LOADED;
						codec.flush();
						stream.seek(0);
						stream.readBytes();
						return;
					}
				} else {
					// Keep processing headers
					continue;
				}
			}
			
			if (state == State.LOADED) {
				state = State.READY;
				if (self.onloadedmetadata) {
					self.onloadedmetadata();
				}
				if (paused) {
					// Paused? stop here.
					return;
				} else {
					// Not paused? Continue on to play processing.
					continue;
				}
			}
			
			if (state == State.READY) {
				console.log('metadata!', codec, codec.hasAudio, codec.hasVideo, duration);
				state = State.PLAYING;
				lastFrameTimestamp = getTimestamp();
				targetFrameTime = lastFrameTimestamp + 1000.0 / fps
				if (codec.hasAudio) {
					initAudioFeeder();
					audioFeeder.waitUntilReady(function() {
						startAudio(0.0);
						pingProcessing(0);
					});
				} else {
					pingProcessing(0);
				}

				// Fall over to play processing
				return;
			}
			
			if (state == State.SEEKING) {
				if (!codec.process()) {
					stream.readBytes();
					return;
				}
				if (seekState == SeekState.NOT_SEEKING) {
					throw new Error('seeking in invalid state (not seeking?)');
				} else if (seekState == SeekState.BISECT_TO_TARGET) {
					doProcessBisectionSeek();
				} else if (seekState == SeekState.BISECT_TO_KEYPOINT) {
					doProcessBisectionSeek();
				} else if (seekState == SeekState.LINEAR_TO_TARGET) {
					doProcessLinearSeeking();
				}
				
				// Back to the loop to process more data
				continue;
			}
			
			// Process until we run out of data or
			// completely decode a video frame...
			var currentTime = getTimestamp();
			var start = getTimestamp();
			
			if (placeboCodec) {
				placeboCodec.process();
			}
			var more = codec.process();
			
			var delta = (getTimestamp() - start);
			lastFrameDecodeTime += delta;
			demuxingTime += delta;

			if (!more) {
				queueAudio();
				if (stream) {
					// Ran out of buffered input
					stream.readBytes();
				} else {
					// Ran out of stream!
					var finalDelay = 0;
					if (codec.hasAudio) {
						// This doesn't seem to be enough with Flash audio shim.
						// Not quite sure why.
						finalDelay = audioBufferedDuration;
					}
					console.log('End of stream reached in ' + finalDelay + ' ms.');
					setTimeout(function() {
						stopVideo();
						ended = true;
						if (self.onended) {
							self.onended();
						}
					}, finalDelay);
				}
				return;
			}
			
			if ((codec.hasAudio || codec.hasVideo) && !(codec.audioReady || codec.frameReady)) {
				// Have to process some more pages to find data. Continue the loop.
				continue;
			}

			if (codec.hasAudio && audioFeeder) {
				if (!audioState) {
					audioState = audioFeeder.getPlaybackState();
					audioPlaybackPosition = getAudioTime(audioState);
					audioBufferedDuration = (audioState.samplesQueued / audioFeeder.targetRate) * 1000;
					droppedAudio = audioState.dropped;
				}

				// Drive on the audio clock!
				var fudgeDelta = 0.1,
					readyForAudio = audioState.samplesQueued <= (audioFeeder.bufferSize * 2),
					frameDelay = (frameEndTimestamp - audioPlaybackPosition) * 1000,
					readyForFrame = (frameDelay <= fudgeDelta);
				//console.log('frame', readyForFrame, codec.frameReady, frameEndTimestamp, audioPlaybackPosition, frameDelay);
				//console.log('audio', readyForAudio, codec.audioReady, audioPlaybackPosition, audioBufferedDuration);

				var startTimeSpent = getTimestamp();
				if (codec.audioReady && readyForAudio) {
					//console.log('audio', readyForAudio, codec.audioReady, audioPlaybackPosition, audioBufferedDuration);
					var start = getTimestamp();
					var ok = codec.decodeAudio();
					var delta = (getTimestamp() - start);
					lastFrameDecodeTime += delta;
					audioDecodingTime += delta;

					var start = getTimestamp();
					if (ok) {
						var buffer = codec.dequeueAudio();
						//audioFeeder.bufferData(buffer);
						audioBuffers.push(buffer);
						audioBufferedDuration += (buffer[0].length / audioInfo.rate) * 1000;
						decodedSamples += buffer[0].length;
					}
				}
				if (codec.frameReady && readyForFrame) {
					var start = getTimestamp();
					var ok = codec.decodeFrame();
					var delta = (getTimestamp() - start);
					lastFrameDecodeTime += delta;
					videoDecodingTime += delta;
					if (ok) {
						processFrame();
						drawFrame();
					} else {
						// Bad packet or something.
						console.log('Bad video packet or something');
					}
					targetFrameTime = currentTime + 1000.0 / fps;
				}
			
				// Check in when all audio runs out
				var bufferDuration = (audioFeeder.bufferSize / audioFeeder.targetRate) * 1000;
				var nextDelays = [];
				if (audioBufferedDuration <= bufferDuration * 2) {
					// NEED MOAR BUFFERS
				} else {
					// Check in when the audio buffer runs low again...
					nextDelays.push(bufferDuration / 2);
					
					if (codec.hasVideo) {
						// Check in when the next frame is due
						// Subtract time we already spent decoding
						var deltaTimeSpent = getTimestamp() - startTimeSpent;
						nextDelays.push(frameDelay - deltaTimeSpent);
					}
				}
				
				//console.log(n, audioPlaybackPosition, frameEndTimestamp, audioBufferedDuration, bufferDuration, frameDelay, '[' + nextDelays.join("/") + ']');
				var nextDelay = Math.min.apply(Math, nextDelays);
				if (nextDelays.length > 0) {
					if (placeboCodec) {
						// We've primed the JIT compiler... or something... by now;
						// throw away the placebo copy.
						placeboCodec.destroy();
						placeboCodec = null;
					}

					// Keep track of how much time we spend queueing audio as well
					// This is slow when using the Flash shim on IE 10/11
					var start = getTimestamp();
					queueAudio();
					var delta = getTimestamp() - start;
					pingProcessing(Math.max(0, nextDelay - delta));
					return;
				}
			} else if (codec.hasVideo) {
				// Video-only: drive on the video clock
				if (codec.frameReady && getTimestamp() >= targetFrameTime) {
					if (placeboCodec) {
						// We've primed the JIT compiler... or something... by now;
						// throw away the placebo copy.
						placeboCodec.destroy();
						placeboCodec = null;
					}

					// it's time to draw
					var start = getTimestamp();
					var ok = codec.decodeFrame();
					var delta = (getTimestamp() - start);
					lastFrameDecodeTime += delta;
					videoDecodingTime += delta;
					if (ok) {
						processFrame();
						drawFrame();
						targetFrameTime += 1000.0 / fps;
						pingProcessing(0);
					} else {
						console.log('Bad video packet or something');
						pingProcessing(Math.max(0, targetFrameTime - getTimestamp()));
					}
				} else {
					// check in again soon!
					pingProcessing(Math.max(0, targetFrameTime - getTimestamp()));
				}
				return;
			} else {
				// Ok we're just waiting for more input.
				console.log('Still waiting for headers...');
			}
		}
	}

	function pingProcessing(delay) {
		if (delay === undefined) {
			delay = -1;
		}
		if (delay >= 0) {
			if (nextProcessingTimer) {
				// already scheduled
				return;
			}
			//console.log('delaying for ' + delay);
			nextProcessingTimer = setTimeout(doProcessing, delay);
		} else {
			if (nextProcessingTimer) {
				clearTimeout(nextProcessingTimer);
			}
			doProcessing(); // warning: tail recursion is possible
		}
	}

	var fps = 60;

	var videoInfo,
		audioInfo;

	function startProcessingVideo() {
		if (started || codec) {
			console.log('Already started');
			return;
		}
		var options = {};
		
		// Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/536.30.1 (KHTML, like Gecko) Version/6.0.5 Safari/536.30.1
		if (navigator.userAgent.match(/Version\/6\.0\.[0-9a-z.]+ Safari/)) {
			// Something may be wrong with the JIT compiler in Safari 6.0;
			// when we decode Vorbis with the debug console closed it falls
			// into 100% CPU loop and never exits.
			//
			// Blacklist audio decoding for this browser.
			//
			// Known working in Safari 6.1 and 7.
			options.audio = false;
			console.log('Audio disabled due to bug on Safari 6.0');
		}
		
		framesProcessed = 0;
		demuxingTime = 0;
		videoDecodingTime = 0;
		audioDecodingTime = 0;
		bufferTime = 0;
		drawingTime = 0;
		started = true;

		// There's some kind of problem with the JIT in iOS 7 Safari
		// that sometimes trips up on optimized Vorbis builds, at least
		// on my iPad 3 (A5X SoC).
		//
		// Exercising some of the ogg & vorbis library code paths with
		// a second decoder for the first few packets of data seems to
		// be enough to work around this.
		//
		// Non-deterministic debugging ROCKS!
		//
		placeboCodec = new OgvJs(options);

		codec = new OgvJs(options);
		codec.oninitvideo = function(info) {
			videoInfo = info;
			fps = info.fps;
			targetPerFrameTime = 1000 / fps;
			
			if (width == 0) {
				self.style.width = self.videoWidth + 'px';
			}
			if (height == 0) {
				self.style.height = self.videoHeight + 'px';
			}
			
			canvas.width = info.picWidth;
			canvas.height = info.picHeight;
			console.log('useWebGL is', useWebGL);
			if (useWebGL) {
				frameSink = new WebGLFrameSink(canvas, videoInfo);
			} else {
				frameSink = new FrameSink(canvas, videoInfo);
			}
		};
		codec.oninitaudio = function(info) {
			audioInfo = info;
		};
		codec.onloadedmetadata = function() {
			loadedMetadata = true;
			console.log('skeleton duration', codec.duration);
			if (!isNaN(codec.duration)) {
				// Use duration from ogg skeleton index
				duration = codec.duration;
			}
		};

		stream.readBytes();
	}
	
	function loadCodec(callback) {
		if (typeof window.OgvJs == 'function') {
			if (callback) {
				callback();
			}
		} else if (OgvJsPlayer.loadingNode !== null) {
			if (callback) {
				OgvJsPlayer.loadingCallbacks.push(callback);
			}
		} else {
			if (callback) {
				OgvJsPlayer.loadingCallbacks.push(callback);
			}
			OgvJsPlayer.loadingNode = document.createElement('script');
			document.querySelector('head').appendChild(OgvJsPlayer.loadingNode);

			var url = 'ogv-codec.js';
			if (options.base) {
				url = options.base + '/' + url;
			}
			if (typeof window.OgvJsVersion === 'string') {
				url = url + '?version=' + encodeURIComponent(window.OgvJsVersion);
			}
			
			OgvJsPlayer.loadingNode.onload = function() {
				if (typeof window.OgvJs === 'function') {
					OgvJsPlayer.loadingCallbacks.forEach(function(cb) {
						cb();
					});
					OgvJsPlayer.loadingNode.onload = null;
					OgvJsPlayer.loadingCallbacks.splice(0, OgvJsPlayer.loadingCallbacks.length);
				} else {
					throw new Error('Could not load ogv-codec.js');
				}
			};
			OgvJsPlayer.loadingNode.src = url;
		}
	}
	
	/**
	 * HTMLMediaElement load method
	 */
	self.load = function() {
		if (stream) {
			// already loaded.
			return;
		}
	
		loadCodec();

		started = false;
		stream = new StreamFile({
			url: self.src,
			bufferSize: 65536 * 4,
			onstart: function() {
				// Fire off the read/decode/draw loop...
				byteLength = stream.bytesTotal;
				console.log('byteLength: ' + byteLength);
			
				// If we get X-Content-Duration, that's as good as an explicit hint
				var durationHeader = stream.getResponseHeader('X-Content-Duration');
				if (typeof durationHeader === 'string') {
					duration = parseFloat(durationHeader);
					console.log('X-Content-Duration: ' + duration);
				}
				loadCodec(startProcessingVideo);
			},
			onread: function(data) {
				// Pass chunk into the codec's buffer
				codec.receiveInput(data);
				if (placeboCodec) {
					placeboCodec.receiveInput(data);
				}

				// Continue the read/decode/draw loop...
				pingProcessing();
			},
			ondone: function() {
				if (state == State.SEEKING) {
					console.log("bumped into end during seeking?");
					pingProcessing();
				} else if (state == State.SEEKING_END) {
					console.log("bumped into end during seeking-to-end, that's probably good");
					pingProcessing();
				} else {
					console.log("reading^H^H^^H^H buffering? done.");
					//throw new Error('wtf is this');
					stream = null;
			
					// Let the read/decode/draw loop know we're out!
					pingProcessing();
				}
			},
			onerror: function(err) {
				console.log("reading error: " + err);
			}
		});
	};
	
	/**
	 * HTMLMediaElement canPlayType method
	 */
	self.canPlayType = function(type) {
		// @todo: implement better parsing
		if (type === 'audio/ogg; codecs="vorbis"') {
			return 'probably';
		} else if (type === 'audio/ogg; codecs="opus"') {
			return 'probably';
		} else if (type.match(/^audio\/ogg\b/)) {
			return 'maybe';
		} else if (type === 'video/ogg; codecs="theora"') {
			return 'probably';
		} else if (type === 'video/ogg; codecs="theora,vorbis"') {
			return 'probably';
		} else if (type === 'video/ogg; codecs="theora,opus"') {
			return 'probably';
		} else if (type.match(/^video\/ogg\b/)) {
			return 'maybe';
		} else {
			return '';
		}
	};
	
	/**
	 * HTMLMediaElement play method
	 */
	self.play = function() {
		if (!audioOptions.audioContext) {
			OgvJsPlayer.initSharedAudioContext();
		}
		
		if (!stream) {
			self.load();
		}
		
		if (paused) {
			startedPlaybackInDocument = document.body.contains(self);
			paused = false;
			if (continueVideo) {
				continueVideo();
			} else {
				continueVideo = function() {
					if (audioFeeder) {
						startAudio();
					}
					pingProcessing(0);
				}
				if (!started) {
					loadCodec(startProcessingVideo);
				} else {
					continueVideo();
				}
			}
			if (self.onplay) {
				self.onplay();
			}
		}
	};
	
	/**
	 * custom getPlaybackStats method
	 */
	self.getPlaybackStats = function() {
		return {
			targetPerFrameTime: targetPerFrameTime,
			framesProcessed: framesProcessed,
			demuxingTime: demuxingTime,
			videoDecodingTime: videoDecodingTime,
			audioDecodingTime: audioDecodingTime,
			bufferTime: bufferTime,
			drawingTime: drawingTime,
			droppedAudio: droppedAudio,
			jitter: totalJitter / framesProcessed
		};
	};
	self.resetPlaybackStats = function() {
		framesProcessed = 0;
		demuxingTime = 0;
		videoDecodingTime = 0;
		audioDecodingTime = 0;
		bufferTime = 0;
		drawingTime = 0;
		totalJitter = 0;
	};
	
	/**
	 * HTMLMediaElement pause method
	 */
	self.pause = function() {
		if (!stream) {
			console.log('initializing stream');
			paused = true;
			self.load();
		} else if (!paused) {
			console.log('pausing');
			clearTimeout(nextProcessingTimer);
			nextProcessingTimer = null;
			if (audioFeeder) {
				stopAudio();
			}
			paused = true;
			if (self.onpause) {
				self.onpause();
			}
		}
	};
	
	/**
	 * custom 'stop' method
	 */
	self.stop = function() {
		stopVideo();
	};

	/**
	 * HTMLMediaElement src property
	 */
	self.src = "";
	
	/**
	 * HTMLMediaElement buffered property
	 */
	Object.defineProperty(self, "buffered", {
		get: function getBuffered() {
			var estimatedBufferTime;
			if (stream && byteLength && duration) {
				estimatedBufferTime = (stream.bytesBuffered / byteLength) * duration;
			} else {
				estimatedBufferTime = 0;
			}
			return new OgvJsTimeRanges([[0, estimatedBufferTime]]);
		}
	});
	
	/**
	 * HTMLMediaElement seekable property
	 */
	Object.defineProperty(self, "seekable", {
		get: function getSeekable() {
			if (duration === null) {
				return new OgvJsTimeRanges([]);
			} else {
				return new OgvJsTimeRanges([[0, duration]]);
			}
		}
	});
	
	/**
	 * HTMLMediaElement currentTime property
	 */
	Object.defineProperty(self, "currentTime", {
		get: function getCurrentTime() {
			if (state == State.SEEKING) {
				return seekTargetTime;
			} else {
				if (codec && codec.hasAudio && audioFeeder) {
					if (paused) {
						return initialAudioOffset - initialAudioPosition;
					} else {
						return getAudioTime();
					}
				} else if (codec && codec.hasVideo) {
					return frameEndTimestamp;
				} else {
					return 0;
				}
			}
		},
		set: function setCurrentTime(val) {
			if (stream && byteLength && duration) {
				seek(val);
			}
		}
	});
	
	/**
	 * HTMLMediaElement duration property
	 */
	Object.defineProperty(self, "duration", {
		get: function getDuration() {
			if (codec && loadedMetadata) {
				if (duration !== null) {
					return duration;
				} else {
					return Infinity;
				}
			} else {
				return NaN;
			}
		}
	});
	
	/**
	 * HTMLMediaElement paused property
	 */
	Object.defineProperty(self, "paused", {
		get: function getPaused() {
			return paused;
		}
	});
	
	/**
	 * HTMLMediaElement ended property
	 */
	Object.defineProperty(self, "ended", {
		get: function getEnded() {
			return ended;
		}
	});
	
	/**
	 * HTMLMediaElement ended property
	 */
	Object.defineProperty(self, "seeking", {
		get: function getEnded() {
			return (state == State.SEEKING);
		}
	});
	
	/**
	 * HTMLMediaElement muted property
	 */
	Object.defineProperty(self, "muted", {
		get: function getMuted() {
			return muted;
		},
		set: function setMuted(val) {
			muted = val;
			if (audioFeeder) {
				if (muted) {
					audioFeeder.mute();
				} else {
					audioFeeder.unmute();
				}
			}
		}
	});
	
	var poster = '', thumbnail;
	Object.defineProperty(self, "poster", {
		get: function getPoster() {
			return poster;
		},
		set: function setPoster(val) {
			poster = val;
			if (!started) {
				if (thumbnail) {
					self.removeChild(thumbnail);
				}
				thumbnail = new Image();
				thumbnail.src = poster;
				thumbnail.className = 'ogvjs-poster';
				thumbnail.style.position = 'absolute';
				thumbnail.style.top = '0';
				thumbnail.style.left = '0';
				thumbnail.style.width = '100%';
				thumbnail.style.height = '100%';
				thumbnail.onload = function() {
					if (width == 0) {
						self.style.width = thumbnail.naturalWidth + 'px';
					}
					if (height == 0) {
						self.style.height = thumbnail.naturalHeight + 'px';
					}
				}
				self.appendChild(thumbnail);
			}
		}
	});
	
	// Video metadata properties...
	Object.defineProperty(self, "videoWidth", {
		get: function getVideoWidth() {
			if (videoInfo) {
				if (videoInfo.aspectNumerator > 0 && videoInfo.aspectDenominator > 0) {
					return Math.round(videoInfo.picWidth * videoInfo.aspectNumerator / videoInfo.aspectDenominator);
				} else {
					return videoInfo.picWidth;
				}
			} else {
				return 0;
			}
		}
	});
	Object.defineProperty(self, "videoHeight", {
		get: function getVideoHeight() {
			if (videoInfo) {
				return videoInfo.picHeight;
			} else {
				return 0;
			}
		}
	});
	Object.defineProperty(self, "ogvjsVideoFrameRate", {
		get: function getOgvJsVideoFrameRate() {
			if (videoInfo) {
				return videoInfo.fps;
			} else {
				return 0;
			}
		}
	});
	
	// Audio metadata properties...
	Object.defineProperty(self, "ogvjsAudioChannels", {
		get: function getOgvJsAudioChannels() {
			if (audioInfo) {
				return audioInfo.channels;
			} else {
				return 0;
			}
		}
	});
	Object.defineProperty(self, "ogvjsAudioSampleRate", {
		get: function getOgvJsAudioChannels() {
			if (audioInfo) {
				return audioInfo.rate;
			} else {
				return 0;
			}
		}
	});
	
	// Display size...
	var width = 0, height = 0;
	Object.defineProperty(self, "width", {
		get: function getWidth() {
			return width;
		},
		set: function setWidth(val) {
			width = parseInt(val, 10);
			self.style.width = width + 'px';
		}
	});
	
	Object.defineProperty(self, "height", {
		get: function getHeight() {
			return height;
		},
		set: function setHeight(val) {
			height = parseInt(val, 10);
			self.style.height = height + 'px';
		}
	});

	// Events!

	/**
	 * custom onframecallback, takes frame decode time in ms
	 */
	self.onframecallback = null;
	
	/**
	 * Called when all metadata is available.
	 * Note in theory we must know 'duration' at this point.
	 */
	self.onloadedmetadata = null;
	
	/**
	 * Called when we start playback
	 */
	self.onplay = null;
	
	/**
	 * Called when we get paused
	 */
	self.onpause = null;
	
	/**
	 * Called when playback ends
	 */
	self.onended = null;
	
	return self;
}

OgvJsPlayer.initSharedAudioContext = function() {
	AudioFeeder.initSharedAudioContext();
};

OgvJsPlayer.loadingNode = null,
OgvJsPlayer.loadingCallbacks = [];


window.OgvJsVersion = "Mon Dec 8 03:28:20 UTC 2014";