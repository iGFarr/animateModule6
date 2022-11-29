(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.NotTheOne = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {whipLeft:17,whipRight:18,speaking:22};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// timeline functions:
	this.frame_16 = function() {
		var _this = this;
		/*
		Moves the playhead to the specified frame label in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndPlay(0);
	}
	this.frame_17 = function() {
		playSound("whipwav");
	}
	this.frame_18 = function() {
		playSound("whipwav");
	}
	this.frame_21 = function() {
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
	}
	this.frame_33 = function() {
		var _this = this;
		/*
		Moves the playhead to the specified frame label in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndPlay('speaking');
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(16).call(this.frame_16).wait(1).call(this.frame_17).wait(1).call(this.frame_18).wait(3).call(this.frame_21).wait(12).call(this.frame_33).wait(2));

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#33FFFF").ss(4,1,1).p("AADh4QgIgLgJgLQAQAIAUgIQATgHAMgRQATgYAGgyQADgQAAgIQgBgNgFgJQgNgWgnAAQgfABgcASQgdAUgLAdQgKAgAPAgQAQAgAfAIAAFh6QAEgDAEgCQAAAAABABQAAgDABgDQgFAFgFAFgAALhsQgEgGgEgFQgYAegPAvQgKAhgMBGQAChCAMgoQAPgyAggZQABgBABgBQgBABgBACQAAAAAAgBAALhsQABgJACgJQAjBBAUBJQAGAXAFAXAAHBzQgCgQgBgRQgGhfANhfAAHBzQADgaAAgaQAKAgAEBWQABAcAEAXQAGAlAMAYQgKgegIgfQgPg6gHg7gABFAMQgTg/gng5AhDE1QAmg1AVhAQALgmAEgn");
	this.shape.setTransform(8.075,30.925);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#33FFFF").ss(4,1,1).p("AAHhwQgHgLgJgLQAPAIAVgIQATgHANgRQATgYAIgyQADgQAAgIQAAgNgFgJQgMgWgnAAQggABgcASQgdAUgMAdQgLAgAOAgQAPAgAeAIAAHhwQABgBABgBQgBABgBACQAAAAAAgBgAAJhyQAFgDAEgCQAAAAAAABQABgDAAgDQgFAFgFAFgAAPhkQABgJACgJQAiBBARBJQAGAXADAXAAPhkQgEgGgEgFQgZAegQAvQgMAhgOBGQAFhDANgnQARgyAggZAhYEPQBVhEACgXQABgXAEgiQgBgQgBgRQgDhfAQhfAAEB7QAEgaAAgaQAJAgABBWQABAcADAXQAFAlALAYQgJgegHgfQgNg6gFg7gABFAUQgRg/glg5");
	this.shape_1.setTransform(9.025,30.125);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#33FFFF").ss(4,1,1).p("AgFhwQgHgLgJgLQAQAIAVgIQATgHAOgRQAVgYAMgyQAEgQABgIQAAgNgEgJQgLgWgmAAQghABgdASQgfAUgNAdQgNAgALAgQAMAgAeAIAAGh2QAAgDABgDQgFAFgFAFQAEgDAEgCQAAAAABABQAdBBAYAnIARBXAgFhwQABgBABgBQgBABgBACQgcAegUAvQgOAhgTBGQAKhDAQgnQAUgyAjgZgAABhkQgCgGgEgFQAAAAAAgBAABhkQACgJADgJAhIEPQAhhEAEgXQAEgXAGgiQAAgQABgRQAChfAXhfAgZB7QAGgaACgaQAHAggFBWQgBAcAAAXQADAlAKAYQgIgegFgfQgIg6gBg7gAA7gOQgZgdghg5");
	this.shape_2.setTransform(11.1778,30.125);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#33FFFF").ss(4,1,1).p("AgFhwQgGgLgIgLQAPAIAVgIQAUgHAPgRQAVgYAOgyQAEgQACgIQABgNgEgJQgKgWgnAAQggABgeASQggAUgOAdQgOAgAKAgQALAgAdAIAgChyQAEgDAEgCQAAAAABABQAAgDABgDQgFAFgFAFQgBABgBACQgBAAAAgBQABgBACgBgAABhkQgCgGgDgFQgdAegWAvQgPAhgWBGQAMhDASgnQAVgyAkgZAABhkQADgJADgJQAaBBAXAnQgYgdgfg5gAA4gOIAOBXAghB7QAHgaADgaQAFAggIBWQgCAcAAAXQABAlAJAYQgGgegEgfQgGg6ABg7gAg+EZQAMhOAFgXQAEgXAIgiQABgQABgRQAGhfAahf");
	this.shape_3.setTransform(12.735,30.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#33FFFF").ss(4,1,1).p("AgFhwQgGgLgIgLQAPAIAVgIQAUgHAPgRQAVgYAOgyQAEgQACgIQABgNgEgJQgKgWgnAAQggABgeASQggAUgOAdQgOAgAKAgQALAgAdAIAAHh2QAAgDABgDQgFAFgFAFQAEgDAEgCQAAAAABABQAaBBAXAnIAOBXAABhkQgCgGgDgFQgdAegWAvQgPAhgWBGQAMhDASgnQAVgyAkgZQABgBACgBQgBABgBACQgBAAAAgBAABhkQADgJADgJAghB7QAHgaADgaQAFAggIBWQgCAcAAAXQABAlAJAYQgGgegEgfQgGg6ABg7QABgQABgRQAGhfAahfAg+EZQAMhOAFgXQAEgXAIgiAA4gOQgYgdgfg5");
	this.shape_4.setTransform(12.735,30.125);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#33FFFF").ss(4,1,1).p("AgOiEQgBgEgCgFQAsgMAfgmQAggmAEgvQAAgVgHgHQgIgIgaAAQg7AFgeAUQgVANgOAUQgOAVgBAWQgBAYAQAVQAQAVAXADAgHh1QAAgNgBgJQgDAEgDADQgHAMgHALQAGgBAFABQAFABAEAEQAAgHABgGQgDgHgEgIAgchtQgyBSgPBdQAJhJAWg+QAGgTALgLQAJgJAIgBgAADhZQACADACAEQAgBFAWBRQgdhTgdhKQgFgOgFgOAgIhoQADACADAEQACADADAGAgZBOQAAgBAAgCQAhAiAQAwQAPAwgIAuQAHg5geg3QgBgDgRgcQgKgRgFgNQAAgBgBgBQgNglARhFQALgtADgdAgqE5QADgyAOi5");
	this.shape_5.setTransform(15.925,31);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#33FFFF").ss(4,1,1).p("AgOiEQgBgEgCgFQAsgMAfgmQAggmAEgvQAAgVgHgHQgIgIgaAAQg7AFgeAUQgVANgOAUQgOAVgBAWQgBAYAQAVQAQAVAXADAgHh1QAAgNgBgJQgDAEgDADQgHAMgHALQAGgBAFABQAFABAEAEQAAgHABgGQgDgHgEgIAgchtQgyBSgPBdQAJhJAWg+QAGgTALgLQAJgJAIgBgAADhZQACADACAEQAgBFAWBRQgdhTgdhKQgFgOgFgOAgIhoQADACADAEQACADADAGAgZBOQAAgBAAgCQAhAiAQAwQALAkAFA9QgIhJgYgqQgBgDgRgcQgKgRgFgNQAAgBgBgBQgNglARhFQALgtADgdAAsEqQgBgYgDgUAgqE5QADgyAOi5");
	this.shape_6.setTransform(15.925,31);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#33FFFF").ss(4,1,1).p("AgMiZQAWgDAVgMQAZgOAOgWQAPgXADgbQAEgbgJgaQhFgGgpASQgaAMgSAWQgSAZABAbQABAdAYATQAXASAXgGQgBgBgBgCQADAAAEgBgAgRiVQACAAADgEAgXhuQAGgIAGgHQAAgBAAgBQgGAJgGAIQgYAlgPApQgUA0gCA2QAAg5AUg0QAQgpAZgigAgHiCQABAAAAAAQA+BbAVBsQgghog0hfQgFgJgFgKAgLh9QADgCABgDAgHBEQAAgBAAgBQAXA2AQA4QgEgMgFgMQgKgXgFgMQgIgWgEgPQgCgGgBgGQgGgiAEg5QAFhGgHggAAgCwQASA+AIBAAg4E2QAxh1AAh9");
	this.shape_7.setTransform(16.0254,32.1388);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#33FFFF").ss(4,1,1).p("AADh4QgIgLgJgLQAQAIAUgIQATgHAMgRQATgYAGgyQADgQAAgIQgBgNgFgJQgNgWgnAAQgfABgcASQgdAUgLAdQgKAgAPAgQAQAgAfAIAAOh+QAAgDABgDQgFAFgFAFQAEgDAEgCQAAAAABABQAjBBAUBJQAGAXAFAXAAFh6QgBABgBACQAAAAAAgBQABgBABgBgAALhsQgEgGgEgFQgYAegPAvQgKAhgMBGQAChCAMgoQAPgyAggZAALhsQABgJACgJAAHBzQADgaAAgaQAKAgAEBWQABAcAEAXQAGAlAMAYQgKgegIgfQgPg6gHg7QgCgQgBgRQgGhfANhfABFAMQgTg/gng5AhDE1QAmg1AVhAQALgmAEgn");
	this.shape_8.setTransform(16.675,30.925);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#33FFFF").ss(4,1,1).p("AgFh4QAIgLAJgLQgQAIgUgIQgTgHgMgRQgTgYgGgyQgDgQAAgIQABgNAFgJQANgWAnAAQAfABAmAgQAnAgAAASQABASgPAfQgQAggfAIAgQh+QAAgDgBgDQAFAFAFAFQgEgDgEgCQAAAAgBABQgjBBgUBJQgGAXgFAXAgHh6QABABABACQAAAAAAgBQgBgBgBgBgAgNhsQAEgGAEgFQAYAeAPAvQAKAhAMBGQgChCgMgoQgPgygggZAgNhsQgBgJgCgJAgJBzQgDgaAAgaQgKAggEBWQgBAcgEAXQgGAlgMAYQAKgeAIgfQAPg6AHg7QACgQABgRQAGhfgNhfAhHAMQATg/Ang5ABBE1Qgmg1gVhAQgLgmgEgn");
	this.shape_9.setTransform(16.303,30.925);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#33FFFF").ss(4,1,1).p("AADh4QgIgLgJgLQAQAIAUgIQATgHAMgRQATgYAGgyQADgQAAgIQgBgNgFgJQgNgWgnAAQgfABgcASQgdAUgLAdQgKAgAPAgQAQAgAfAIAAOh+QAAgDABgDQgFAFgFAFQAEgDAEgCQAAAAABABQAjBBAUBJQAGAXAFAXAADh4QABgBABgBQgBABgBACQgYAegPAvQgKAhgMBGQAChCAMgoQAPgyAggZgAALhsQgEgGgEgFQAAAAAAgBAALhsQABgJACgJAAHBzQADgaAAgaQAKAgAEBWQABAcAEAXQAGAlAMAYQgKgegIgfQgPg6gHg7QgCgQgBgRQgGhfANhfABFAMQgTg/gng5AhDE1QAmg1AVhAQALgmAEgn");
	this.shape_10.setTransform(16.725,30.925);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#33FFFF").ss(0.2,1,1).p("AAdAAQAAABgIAAQgJABgMAAQgLAAgIgBQgJAAAAgBQAAAAAJAAQAIgBALAAQAMAAAJABQAIAAAAAAg");
	this.shape_11.setTransform(17.4,11.85);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#33FFFF").ss(4,1,1).p("AADh4QgIgLgJgLQAQAIAUgIQATgHAMgRQATgYAGgyQADgQAAgIQgBgNgFgJQgNgWgnAAQgfABgcASQgdAUgLAdQgKAgAPAgQAQAgAfAIAAFh6QAEgDAEgCQAAAAABABQAAgDABgDQgFAFgFAFQgBABgBACQAAAAAAgBQABgBABgBgAALhsQgEgGgEgFQgYAegPAvQgKAhgMBGQAChCAMgoQAPgyAggZAALhsQABgJACgJQAjBBAUBJQAGAXAFAXAAHBzQADgaAAgaQAKAgAEBWQABAcAEAXQAGAlAMAYQgKgegIgfQgPg6gHg7QgCgQgBgRQgGhfANhfABFAMQgTg/gng5AhDE1QAmg1AVhAQALgmAEgn");
	this.shape_12.setTransform(16.725,30.925);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#660000").s().p("AgTABIgJgBIAJAAIATgBIAUABIAJAAIgJABIgUAAIgTAAg");
	this.shape_13.setTransform(17.4,11.85);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#33FFFF").ss(0.2,1,1).p("AAdgDQAAABgJAGQgIAHgMACQgLACgJgJQgIgIAAgBQAAAAAMgGQAMgFAJACQAKADAHADQAHADAAAAg");
	this.shape_14.setTransform(17.4,12.2018);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#33FFFF").ss(4,1,1).p("AADh4QgIgLgJgLQAQAIAUgIQATgHAMgRQATgYAGgyQADgQAAgIQgBgNgFgJQgNgWgnAAQgfABgcASQgdAUgLAdQgKAgAPAgQAQAgAfAIAAFh6QAEgDAEgCQAAAAABABQAAgDABgDQgFAFgFAFgAADh3QAAAAAAgBQABgBABgBQgBABgBACQgYAegPAvQgKAhgMBGQAChCAMgoQAPgyAggZAALhsQgEgGgEgFAALhsQABgJACgJQAjBBAUBJQAGAXAFAXAAHBzQADgaAAgaQAKAgAEBWQABAcAEAXQAGAlAMAYQgKgegIgfQgPg6gHg7QgCgQgBgRQgGhfANhfABFAMQgTg/gng5AhDE1QAmg1AVhAQALgmAEgn");
	this.shape_15.setTransform(16.725,30.925);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#660000").s().p("AgTAGIgJgJIAMgGQAMgFAJACIARAGIAHADIgJAHQgIAHgMACIgDAAQgKAAgGgHg");
	this.shape_16.setTransform(17.4,12.2018);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#33FFFF").ss(0.2,1,1).p("AAdAEQAAAAgLAHQgLAHgLAAQgMAAgGgHQgGgHAAAAQAAgBALgIQALgKALgCQAMgBAGALQAGAKAAABg");
	this.shape_17.setTransform(17.4,11.4647);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#660000").s().p("AgWALIgGgHIALgJQALgKALgCQAMgBAGALIAGALIgLAHQgLAHgLAAQgMAAgGgHg");
	this.shape_18.setTransform(17.4,11.4647);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().s("#33FFFF").ss(0.2,1,1).p("AAdAAQAAAAgIACQgIACgKAKQgKAKgKgMQgLgMAAAAQAAAAAJgKQAIgLALAFQAMAFAJAGQAIAFAAAAg");
	this.shape_19.setTransform(17.4,11.8712);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#660000").s().p("AgRAMIgLgMIAJgKQAIgLALAFQAMAFAIAGIAJAFIgIACQgIACgLAKQgDAEgFAAQgFAAgGgGg");
	this.shape_20.setTransform(17.4,11.8712);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("#33FFFF").ss(0.2,1,1).p("AAdAAQAAAAgIAGQgJAFgMgCQgLgCgIgDQgJgDAAgBQAAAAAJgDQAIgDALgCQAMgCAJAFQAIAFAAAAg");
	this.shape_21.setTransform(17.4,11.8499);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#660000").s().p("AAAAJQgLgCgIgDIgJgEIAJgDQAIgDALgCQAMgCAIAFIAJAFIgJAGQgGAEgHAAIgHgBg");
	this.shape_22.setTransform(17.4,11.8499);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_3}]},2).to({state:[{t:this.shape_4}]},2).to({state:[{t:this.shape_5}]},2).to({state:[{t:this.shape_6}]},2).to({state:[{t:this.shape_7}]},2).to({state:[{t:this.shape_8}]},2).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11}]},4).to({state:[{t:this.shape_16},{t:this.shape_15},{t:this.shape_14}]},2).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11}]},2).to({state:[{t:this.shape_18},{t:this.shape_15},{t:this.shape_17}]},2).to({state:[{t:this.shape_20},{t:this.shape_12},{t:this.shape_19}]},2).to({state:[{t:this.shape_22},{t:this.shape_12},{t:this.shape_21}]},2).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-2,-2.2,29.4,67.3);


(lib.startBtn = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// down
	this.text = new cjs.Text("Start", "56px 'Trattatello'", "#FF0000");
	this.text.textAlign = "center";
	this.text.lineHeight = 103;
	this.text.lineWidth = 276;
	this.text.parent = this;
	this.text.setTransform(169,5.5);
	this.text.shadow = new cjs.Shadow("rgba(51,204,255,1)",3,3,4);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#33FFFF").ss(4,1,1).p("A6jo5MA1HAAAIAARzMg1HAAAg");
	this.shape.setTransform(170,57);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("A6jI6IAAxzMA1HAAAIAARzg");
	this.shape_1.setTransform(170,57);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape},{t:this.text}]},2).wait(1));

	// over
	this.text_1 = new cjs.Text("Start", "56px 'Trattatello'", "#3366FF");
	this.text_1.textAlign = "center";
	this.text_1.lineHeight = 103;
	this.text_1.lineWidth = 276;
	this.text_1.parent = this;
	this.text_1.setTransform(169,5.5);
	this.text_1.shadow = new cjs.Shadow("rgba(51,204,255,1)",3,3,4);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#33FFFF").ss(4,1,1).p("A6jo5MA1HAAAIAARzMg1HAAAg");
	this.shape_2.setTransform(170,57);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#666666").s().p("A6jI6IAAxzMA1HAAAIAARzg");
	this.shape_3.setTransform(170,57);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_3},{t:this.shape_2},{t:this.text_1}]},1).to({state:[]},1).wait(1));

	// Layer_1
	this.text_2 = new cjs.Text("Start", "56px 'Trattatello'", "#00FFFF");
	this.text_2.textAlign = "center";
	this.text_2.lineHeight = 103;
	this.text_2.lineWidth = 276;
	this.text_2.parent = this;
	this.text_2.setTransform(168,5.55);
	this.text_2.shadow = new cjs.Shadow("rgba(51,204,255,1)",3,3,4);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#33FFFF").ss(4,1,1).p("A6jo5MA1HAAAIAARzMg1HAAAg");
	this.shape_4.setTransform(169,57.05);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#000000").s().p("A6jI6IAAxzMA1HAAAIAARzg");
	this.shape_5.setTransform(169,57.05);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4},{t:this.text_2}]}).to({state:[]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-6,-5,359,132);


(lib.genericBtnFrame = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_3
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(255,0,0,0.698)").ss(1,1,1).p("AvTn4IenAAQDRAACUCUQCUCUAADQQAADRiUCUQiUCUjRAAI+nAAQjRAAiUiUQiUiUAAjRQAAjQCUiUQCUiUDRAAg");
	this.shape.setTransform(148.5,50.5);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("rgba(0,255,51,0.098)").s().p("AvTH5QjRAAiUiUQiUiUAAjRQAAjQCUiUQCUiUDRAAIenAAQDRAACUCUQCUCUAADQQAADRiUCUQiUCUjRAAg");
	this.shape_1.setTransform(148.5,50.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_1},{t:this.shape}]},2).wait(1));

	// Layer_2
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("rgba(255,0,0,0.698)").ss(1,1,1).p("AvTn4IenAAQDRAACUCUQCUCUAADQQAADRiUCUQiUCUjRAAI+nAAQjRAAiUiUQiUiUAAjRQAAjQCUiUQCUiUDRAAg");
	this.shape_2.setTransform(148.5,50.5);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("rgba(0,153,255,0.098)").s().p("AvTH5QjRAAiUiUQiUiUAAjRQAAjQCUiUQCUiUDRAAIenAAQDRAACUCUQCUCUAADQQAADRiUCUQiUCUjRAAg");
	this.shape_3.setTransform(148.5,50.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.shape_3},{t:this.shape_2}]},1).to({state:[]},1).wait(1));

	// Layer_1
	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("rgba(51,255,255,0.698)").ss(1,1,1).p("AvTn4IenAAQDRAACUCUQCUCUAADQQAADRiUCUQiUCUjRAAI+nAAQjRAAiUiUQiUiUAAjRQAAjQCUiUQCUiUDRAAg");
	this.shape_4.setTransform(148.5,50.5);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("rgba(0,0,0,0.098)").s().p("AvTH5QjRAAiUiUQiUiUAAjRQAAjQCUiUQCUiUDRAAIenAAQDRAACUCUQCUCUAADQQAADRiUCUQiUCUjRAAg");
	this.shape_5.setTransform(148.5,50.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_5},{t:this.shape_4}]}).to({state:[]},1).wait(2));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,299,103);


(lib.tree = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(102,51,0,0.957)").ss(38,1,1).p("AAQOAQAghtACiOQAChZgNimIhZ0F");
	this.shape.setTransform(72.158,233.625);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#006600").ss(52,1,1).p("AI7iMQAIiOgphtQgviAh4hIQh+hMh1AuAHUFLQAfhXAch4QAlibAHhoQAAgDAAgCQAAgBgBAAQgdgyglgFQgVgDgWANQgOAHgYAUQhHA7g5A2QgUhggNg7QgXhsgfg9QgshXhKgbQg1gTg7ARQgkhkhAg6Qg3gvhIgLQhNgKg3AmQgnAcgbA1QgTAlgTA+QhBDpAOC9QgUAXgLAYQgPAigDA0QgBAegBA9QgCAWgLBCQgJA4gBAhQgCAxAQAoQARAuAjAXQAcASApAFQAfAEAsgEQBMgEAzgNQAogKAigQQAVAKAXAHQA8ATBBAEQgBAoAGAiQACAKADAKQAPAyAhAbQAyAmBKgQQBBgPA5gwQBkhVBBiUQAPghAOgoQAoglAegsQA9hXAKhqQALhsgxhZADlHUQBMg8AZhHQAUg1gFhGQgDgrgShRQgQhMgNg8QhuBkhABSQiOC5gJC6QBrAGB7gkQAPgFAOgEQBZgeBIgvQArgbAjghAAJAbQAgjtgni6QgJgxgPgpQgGACgGACQg/AVgtAzQgwA3gbBXQglAJgoATQg1AZheBAQgwAggZAXQgMAMgKAMQAFBKARBEQAlCQBdBuQBRBhBoAuQAWgLASgNQA5gqAlhLQAEgHADgHQAchAAUhlQALg9AIg7QADhIgDhQQgCglgFgVQgGgggRgUQghgrhNgCQgqgBgsANQgOAsgJA1QgaCsAeCrQAOBSAgAoQAXAbAgAKQAiAMAdgOQAEgBADgCQAwgcAMhgQALhTADhcgAi6IyQBIAfBZgMQAHgBAGgBQBTgPBXgyQAngWAggY");
	this.shape_1.setTransform(61.0653,70.46);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.tree, new cjs.Rectangle(-26,-26,174.2,368.3), null);


(lib.mountainGroup = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,255,255,0.71)").ss(1,1,1).p("EASKgu0IAcAxINfXWIOt5fMAoMBFmI9bAAMATKAhNMh+FAAAIFPpEMgq0AAAMA1RhcPIAEgHIAagvIAEgGIAmhCIR4e/IDhmJIA4hiIAZgrIDkGHIP77nIA8hnICjkbIAIgNIAeg2IAWAmIEHHIEgh6Ab0MAbkgvuEgh6Ab0Im0ACMAaCgthEgsJAtjIKPxvEA5jAVaMgy9AAAMAZfgsH");
	this.shape.setTransform(556.575,349.45);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("rgba(255,255,255,0.769)").ss(13,1,1).p("EAmjgFcQgCAbgBAcQgDAEgGgBQgGgBgDgEQgFgGAAgOQAAgHABgFQANgMAMgJQAQgNAQgKQAXgQADgOQABgQgWgVQAQAJAPALQgHgIgEgKQgFgOAFgNEAmKgFHQABgMACgLQgRAegWAZQASgSASgOgEAnngGiQAbATAXAZQAkAmAYAuQAMAZALAMQgdgdgUglQgMgUgGgLQgLgSgLgLQgGgGgOgLQgOgLgGgHQgCgCgCgCgEAoZgGeQgGgegMgpQgFgVgKgHEAmNgFeQAGgsAXgkQgKArgTAlgEAndgH3QgEglgOgfQgfBugJBxAG2sUQAEACADABQADAAACABQADAAADgCQACgBACgCQAIgGgHgMQgEgKgLgIIghgYIgDgDQAAgBABgBQABACABADQAPAnAKAWgAHCsQQgBgFAAgEQADAEAEADQB6B+A+CpQg8gFgegBQgXAAgUACQAYAWAYAJQAEACAeAHQAWAGALAGQAQAKAYAfQAXAeAQAJQAbgkgEgxQgBgOgDgNQgJgcgUgVIgCgEAFvq0QApgGArgGQADgcgBgZQAOAeAPAWQAFAHAMARQAKAPAGAKQAEAHAJAPQAIANAJAHAHFr1QgBgOgCgNAH7nvQgYACgWAEQguALgkAZQgoAbgSAmQgKAagOAEQgKACgRgMQgTgOgPgQQgSAMgWAGQgfAHgYgJQAggZAegdQAJgJAJgJQAvgwAmg1QAUgbARgcQACgDABgCQANgVAMgCQALgCARAOQAPAOA5BMQASAYASARgAGztqQgDgJABgPQAAgSgBgHQAAgGgHgYQgFgSAGgNAGMteQgSg3gNgmQgHgXgGgRQAMAJAJASQANAaAHAuQACAUAEAQQACALADAKQACgHAEgGIgLgIIgDgCIg2gnQhCBogcB8QgBADgBACQAIgCAHgBQAWAEAMAJQALALADAVQACANgBAYQgCATgCAPQgDAggFATQgKAugWAeQgNASgRAMQgSgSgPgUQgSgYgNgbQgDgFgCgFQgCgEgCgEQgNgggIggQgKgtADguQAigJAhgDQAXgCAXABQABAAABAAQAGABAFABQAzgMA3gJQAUhIARhIQAAgCAAgBQAKAfAQAOQAEAEAEACQADAGACAFQAFAKAFAKAFXpiQAMgpAMgpAFFonQAJgeAJgdACjn5QhOCKgXApQApgaAmgeQgMgFgKgIQAcgtAZgvQAjhFAbhJQgoBGgfA2gAyhPkQgCgZABgYQACgiAHghQAFgRAIgEQADgCAHAAQAHgBADgBQACAAANgGQAAgBABAAQAJgFAGADQAEACAEAIQAHAOABAIQABADAAAIQAAAHACAEQAEAMAUAJQATAJABABQAKAGAFAHQADAGAFAQQAFAOAFAGEgnngF5QACgngHggQgKgsgjg1QgDgEgCgEQgGgJAAgIQAAgGADgEQAAACABACQAAALACAMQAIBOAeBHQAHASAKAJQADADADABQAFADAJACQAMADAEABQAOAHAOAaQAPAbALAIQgEgNgKgZQgvh4gvhuEgprgElQAcieAMhBQABgJACgGQAAAEABAEQAOBZAJAoQARBMAcA2QAOg6AEgiQABgLABgK");
	this.shape_1.setTransform(603.6125,102.275);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#66CCCC").s().p("EgxYA2nIFPpFMgq0AAAMA1RhcOIAEgHIAagvIAEgGIAmhCIR4e/IDhmIIA4hjIAZgsIDkGIMgbkAvuMAbkgvuIP77nIA8hnICjkbIAfBeIg2goQhCBpgdB8QAdh8BChpIA2AoIACABIAGAVIgBADQgRBIgUBJQg3AJgyALQAygLA3gJIgXBSIADgGQAMgVANgBIADgBIAAAAIABAAQAJAAANALIAAAAIABABQAPAOA6BMQASAYASARQgSgRgSgYQg6hMgPgOIgBgBIAAAAQgNgLgJAAIgBAAIAAAAIgDABQgNABgMAVIgDAGIAXhSIBVgNQACgUAAgSIgBgPQAOAeAQAWIAQAYIAQAZIAOAWQAIANAIAHQgIgHgIgNIgOgWIgQgZIgQgYQgQgWgOgeIABAPQAAASgCAUIhVANQAUhJARhIIABgDQAKAgAPANIAIAGIAFALIAKAUIgKgUIgFgLIgIgGQgPgNgKggQABgHAEgFIAEACIAYA9IAIADIAFABIACAbIgCgbQADAAACgCIAEgCQAFgEAAgFQAAgFgDgFQgFgJgKgJIghgYIAhAYQAKAJAFAJQADAFAAAFQAAAFgFAEIgEACIgHgHIACAJIgFgBIgIgDIgYg9IgCgEIgCACIgLgJIgGgkQgGgtgNgbQANAbAGAtIAGAkIgCgBIgfheIAIgNIAeg2IAWAmIEHHIIADAEIAcAyQAEAMABAPIAAALQAAAqgXAfQgRgJgXgeQgXgegQgLQgMgGgVgFIgjgKQgXgJgYgWQAUgCAWAAQAeABA8AFQg9iph7h+QB7B+A9CpQg8gFgegBQgWAAgUACQgZACgVAEQguAMgkAYQgoAcgSAlQgLAagNAFIgBAAIgCAAIAAAAIgBAAQgHgBgKgGIgCgBIgBAAIAAAAIgBgBIgBAAIgBgBIgBAAQgSgOgQgRQASgMANgSQAVgeALguQAEgTAEgfQATgbASgcQgSAcgTAbIADgjIABgSIgBgTQgDgUgMgMQgLgJgWgEIgPADIABgEIgBAEIAPgDQAWAEALAJQAMAMADAUIABATIgBASIgDAjQgnA0guAwIgTASQgRgYgOgbQAOAbARAYQgeAdggAZIABABIACAAIAAAAQAMAEANAAIABAAIAAAAQAKAAALgCIABAAIABAAIADgBQAWgGASgMQAQARASAOIABAAIABABIABAAIABABIAAAAIABAAIACABQAKAGAHABIABAAIAAAAIACAAIABAAQANgFALgaQASglAogcQAkgYAugMQAVgEAZgCQAYAWAXAJIAjAKQAVAFAMAGQAQALAXAeQAXAeARAJQAXgfAAgqIAAgLQgBgPgEgMINfXWIOt5fMAoMBFkI9bAAMATKAhOgEgsJAtiIKPxuIm0ABMAaCgtgMgaCAtgIG0gBgAGmVZMAy9AAAMgy9AAAMAZfgsFMgZfAsFgArL3DIgBgdIABgTIgBATIABAdgAqC5YQAEABADAJQAIANABAIIABALQAAAHABAFQAFALATAJIAUAKQAKAGAFAHQAEAGAFAQQAEAPAGAFQgGgFgEgPQgFgQgEgGQgFgHgKgGIgUgKQgTgJgFgLQgBgFAAgHIgBgLQgBgIgIgNQgDgJgEgBIgFgCIgBAAIAAAAQgDAAgEACIgBAAIgBABIgCABIACgBIABgBIABAAQAEgCADAAIAAAAIABAAIAFACgEAvBgtFIAUARIAUARQALALALATIASAeQAUAlAdAeQgLgMgMgaQgXgugkgmQgYgYgagUQgIgIgDgKQgDgHAAgHQAAgHACgGQgCAGAAAHQAAAHADAHQADAKAIAIQgQgKgQgJQAVATAAAPIAAACQgCAOgYAQIgfAXQAJhwAfhvQANAfAEAmQgEgmgNgfQgfBvgJBwIgaAVIADgXQgQAegWAZQASgRARgPIAAAMQAAAOAFAGQADAEAFABIABAAIACAAIABAAQADAAACgCIAAAAQABgdADgbIAfgXQAYgQACgOIAAgCQAAgPgVgTQAQAJAQAKIADAFgEgglgqwQAOg6AEgiIACgVIABgRQAAgdgGgYQgJgsgkg2IgFgIIgCgXIACAXQgGgJAAgIQAAAIAGAJQAJBOAeBIQAHARAJAJIgCAVQgEAigOA6Qgbg2gShMQgJgogNhZQANBZAJAoQASBMAbA2IAAAAgEgiUgrMQAbieANhCQgNBCgbCegEge3grQIgOgmQguh3gvhuQAvBuAuB3IAOAmQgLgHgPgcQgOgagOgHIgPgDQgKgCgFgEIgGgEIAGAEQAFAEAKACIAPADQAOAHAOAaQAPAcALAHIAAAAgEAIVgruQApgaAlgeQgMgEgKgJQAdgtAYgvQAkhFAahIIhGB7QgOgfgHghQAHAhAOAfIhlCzIAAAAgEAtjgsGQATglAKgrQgWAlgHArgEAveguNQALApAGAfQgGgfgLgpQgFgUgKgHQAKAHAFAUgEAMbgvPIATg6IgTA6gEALOgxIIACAAIAMABIgMgBIgCAAIgBgBIgSAAIAAAAIgBAAIgVABIgEAAIAEAAIAVgBIABAAIAAAAIASAAIABABgEAOJg0SQgCgGAAgLIAAgHIAAgLIAAgOQgBgGgGgXQgDgJAAgIQAAgIADgHQgDAHAAAIQAAAIADAJQAGAXABAGIAAAOIAAALIAAAHQAAALACAGgEAwRgrnIgSgeQgLgTgLgLIgUgRIgUgRIgDgFQAaAUAYAYQAkAmAXAuQAMAaALAMQgdgegUglgEAtugrKIgBAAQgFgBgDgEQgFgGAAgOIAAgMIAagVQgDAbgBAdIAAAAQgCACgDAAIgBAAIgCAAgEAtjgsGIgDAXQgRAPgSARQAWgZAQgegEAJ6guhIADAIIAFAKQgYAvgdAtQAKAJAMAEQglAegpAaIBlizgEAt6gsEIAAAAgEAuAgtWQgKArgTAlQAHgrAWglgEAJ/gshQgNAAgMgEIAAAAIgCAAIgBgBQAggZAegdIATgSQAugwAng0QgEAfgEATQgLAugVAeQgNASgSAMQgSgRgPgVQAPAVASARQgSAMgWAGIgDABIgBAAIgBAAQgLACgKAAIAAAAIgBAAgEggRgshIAAAAgEggRgshQgJgJgHgRQgehIgJhOIAFAIQAkA2AJAsQAGAYAAAdIgBARIAAAAgEALCgs2IAAAAgEALCgs2IAAAAgEASmguCgEAKCguPIAAAAgEAJ9guZIgDgIIBGh7QgaBIgkBFIgFgKgEghIgvRIAAAAgEAMJgvSIAAAAgEANFgxbIAAAAgEAOZgy4IgCgJIAHAHQgCACgDAAIAAAAgEANlg0EIALAJQgEAFgBAHIgGgVgEANwgz7IACgCIACAEgEANlg0EgEANEg1jIAAAAg");
	this.shape_2.setTransform(556.575,349.45);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_2},{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-3.8,1115.2,703.6999999999999);


(lib.guides = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").ss(1,1,1).p("EhT8gFKQEkABEgACUBUgAATBCegATQEKgCEHgBEhUWgASMCoTAAAEhT8AFLMCoTAAA");
	this.shape.setTransform(539.875,33.075);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-1,-1,1081.8,68.2);


(lib.bushTrio = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(0,102,0,0.698)").s().p("Egz2AGZQgMgBgKgHQgPgKgEgSQgDgSAKgPIA2hKIAkglIgRABIgBgCIAAgBIAAAAIgBgDIAAgGIABgCIAAgBIAAgBIACgBIAAgBIAEgDIABAAIAAAAIABgBIACAAIAFgCIgTgTIgBgCIgCgBIgQgUIgBgCIgCgCIgRgYIgeg4IgUgzIgIgdIgIg1IgChtIACgRIABgCIAAgCIANg/IAFghIABgGQABgHAEgFQAFgFAHgBQAIgBAGAFQAHAFABAIIAOAxIAFAMIABADIAFAJIABABIABABIADAGIABABIAmA3IABABIAMASIABABIABADIAEAGIABADIAEAIIARA3IABAGIACAFIAAABIADAQIAAACIAAABIAFAtIAAADIAAAcIAAACIgBAOIAAADIAAAEIgBAFIACAAIABAAIABABIACAAIAUACIgFgwIADgnQACgQADgLIATg/IALgVIABgEIACgDIAFgMIABgDIABgDIAJgTIBEhsIANgQIABgBIABgBIAbgdIABAAIAAgDQADgLAKgHQAKgHAMACQANACAIALQAHAKgCANIgJA4IAAACIAAACIgXBOIgYA/IgPAeIgFAJIgBABIgEAIIgCACIgCADIgPAXIgCADIgCACIgJANIgBABIgCADIgSAUIgBABIgBACIgRASIgCACIgSASIgBABIgBABIAAAAIAAAAIggAaIgGAEIAQAQIAAABIABAAIAAAAIAAAAIAAABIAMAQIABACIAEAIIADAJIAAABIABABIAAACIAAAIIAAADIgBABIAAABIAAAAIAAAAIgCACIAAABIgGAGIgBABIgJAIIgEADIAAAAIgBAAIAAABIgDABIgCABIgCABIgDABIAAABIABACIAAABIAAABIAAAAIABACIAAAEIABAIIAAADIBogyIAAgBIAEgCIAqggIA4g4IBJhZIADgDIBXhcQAZgbAYgWQAZgZAbgVIA3gsQAggYAZgRIAegUIACgBIABgCIBcg0QABAAAAAAQABAAABAAQAAAAABAAQAAAAABAAQAGADgDAFIgFANIgBACIgrBRIgCACIgTAfQgYAigTAYIguA2QgUAWgeAdIgUASIgDADIgCABIgCACIhVBAQgmAcgVANIhgA1IgCACIgbAQQgRAKgNAJIgcAVIgYAUIAAABIgBABIgqAsIgBACIgCABIgdAjQgWAagdAaIhZA7IgqAWQgJAFgLAAIgCAAgAMHF/QgIgGgBgKIgRhjQgFgagHgXIgDgMIgWg5IgBAZIgBAGIAAACIgEAWIgGAQIgBACIAAACIgLAUIgBADIAAAAIgBAAIAAABIgGAIIAAABQgDACgDAAQgDAAgCgCIgHgGIgBgBIAAAAIgBgBIgQgTIgBgCIgVgiIAAgBIgFgJIgFgNIAAgBIgEgMIgBgBIAAgDIgBgCIgBgDIgBgEIAAgBIgBgGIgBgBIAAgCIAAgDIAAgDIgBAAIABgQIAAgBIAAgBIACgKIAAgCIAAgCIAHgcIAAgCIAAgCIACgKIAAgEIAAgEIAAgDQgBgQgEgMIgDgGIgBgDIgBgCIAAgBIAAgBIgRgXIgBgBIgBgCIgDgDIgKgKIAAAAIAAAAIAAgBIgbgdIgigxIgCgCIgBgDIgEgGIgCgCIgRgkIgGgRIAAgBIgBgBIAAgDIgCgFIgBgDIAAgBIgBgCIgCgKIgIgoIgBgFIAAgCIAAgCIgCgrIgBgCIAAgBIABgBIAAgJIgRAMIgBABIgBAAIgCACIgGAEIgDACIgBABIgBAAIAAAAIgHAEIAAAAIAAAAIACgCIATgPIABgBIAAAAIAAgBIABAAIADgDIgDABIgZARIgBABIgBAAIAAAAIgBABIgCABIgFACIAAABIgBAAIABgCIACgBIAAAAIABgBIAWgSIACgCIABAAIAAgBIACgBIAmgdIACgBIABgBIABAAIAZgRIABAAIABgBIACgBIABgBIAAABIAAAAIgBABIgDADIgCACIgCACIgXATIgDADIABgBIACgBIACgBIAAAAIAAAAIAYgQIAAAAIABAAIgHAGIgBABIgLAJIAAAAIgBABIgRANIAAAAIAIADIABAAIABAAIAXAJIAIACIADABIAgAFIACAAIABAAIAkAHIADABQAMACAPAGIASAIIACAAIABABIAEACIAEADIAEACIABABIABAAIABACIACABIACACIAEADIAFAEIAAAAIACACIAAAAIAAAAIAHAIIAQAYIAHANIAAABIAAABIAAAAIAPAoIABABIAAABIAAABIAVBJQAFASAGAfIAGArIAAADIAHBcIAAADIAAADIAEAfIAAADIAIA1IABADIADAPIAMAxIANApIADAGIAAAAIAJgKIBahdIBihSIABgBIARgOIABgBIACgBIAZgVIADgCICjiHIACgDIAGgGIABgBIABgBIAKgJIABgCIApgtIAug8IA4hSQABgDAEAAQAGAAAAAGIAAAPIAAADIAAAHIgIA9IgUBGIgeBDIgIANIgOAYIgBABIAAAAIgBABIgsA6IgHAIIgCADIg+A9Ig3AsIgXAQIgTANIgBABIgBAAIgSAMIgBABIgBABIj3CYIgSAMQgFADgGABIgDAAQgIAAgHgFgAKhA6IgehHIgGgRIACAXIAAABIABABIAAACIABADIAFARIAEAKIABAAIAAABIABACIACADIAFAIIAAAAIAAABIABAAIAHAJIABACIABABIAEAEgEA0uADvIAAgBIgLgtQgFgTgJgYIgSgmIgBgCQgKgUgMgSIgDgFIgmgzIgBgBIgBgCIgvg0IhShNIgCgCIgCgCIibh8IgoBbQgWAugTAmIgHAMIgBABIgBADIgiA4IgBABIAAABIgCADIgHAKIguA5IgEAEIgCADIgNANIgDACIglAgIgCABIgBABIgqAcIgBAAIAAABIgCAAIgPAJIg+AaIg0AOIgEACIgBAAIgGABIgDABIgDABIiCAZQgOACgMAAQgHAAgIgCIgCgBIgBAAIgCgBIgBAAIAAAAIgDgBIAAgBIgBAAIAAAAIgBgBIgBAAIAAAAIgEgDQgIgGgEgHQgEgHgDgIIgDgOIgBgHIAAgSIABgCIAAgFIAPi9IAAgDIAiijIAghYIANgaIABgDIAOgdIABgCIAEgHQANgRAVgDQAVgEASAMIAhAaIADADIAEACIADADIADADIAfAdIAjArIABACIACABIAKAQIAAAAIABABIAMASIAEAHIACAEIAVApIARAwIAJAjIAAACIABAEIAAAEIAAABIABABIAAACIABAIIABAEIACAuIgDAlIAvhNIAPgeIABgCIAJgUIABgCIABgCIAEgKIAghSIBAiqIAHgLQAPgWAagEQAagFAWAPIAAABIAoAcIBwBdIBJBLIABABIA6BEQASAYALARIAjA6IABACIACAEIALAWIABADIASArQAKAbAFAVIAHArIAAACIABABIAAADQADAZgCAZIAAAGIAAADIgBAJIgFAfQAAAEgEABIgCAAQgEAAgBgFgEAnRgDuIhqEIIgNAqIgUBgIAAACIgBABIAAACIAAACIAAAFIgBACIAAAGIABABIABAIIACAGIAEAEIABAAIAAABIABAAIAAAAIARABIAJgCIBBgPIBEgXIABAAIABAAIASgIIA0gcIAbgUIABgCIAJgHIACgCIACgBIAHgHIACgCIACgBIAOgPIACgCIABgBIAAgDIgBgEIAAgEIAAgDIAAgEIgCgLIAAgEIgCgOIgBgEIgCgLIgUg8IAAgCIgBAAIAAAAIgDgIIAAgBIgBgBIAAgBIgDgFIAAgCIgfg3Igog0IgBAAIAAgBIAAAAIgBAAIgBgCIgJgKIgBgCIgCgBIgCgCIgogmIgDgCIgBgBg");
	this.shape.setTransform(335.025,36.9911);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.bushTrio, new cjs.Rectangle(-4.1,-3.8,678.3000000000001,81.7), null);


// stage content:
(lib.FrameByFrameModule6Discussion = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {firstDecisionButtons:314,stopMainChar:90};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,1,34,90,117,133,148,162,259,314,315,352,373,419,433];
	this.streamSoundSymbolsList[34] = [{id:"mixkittribaldrummingambience572mp3cutnetwav",startFrame:34,endFrame:480,loop:1,offset:0}];
	this.streamSoundSymbolsList[148] = [{id:"ohgeezwav",startFrame:148,endFrame:352,loop:1,offset:0}];
	this.streamSoundSymbolsList[315] = [{id:"mixkitretrogamenotification212wav",startFrame:315,endFrame:480,loop:1,offset:0}];
	this.streamSoundSymbolsList[352] = [{id:"turnTheGuidesOffwav",startFrame:352,endFrame:480,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.startButton.on('click', function(){
		/*
		Play a Movie Clip/Video or the current timeline.
		Plays the specified movie clip or video.
		*/
		_this.play();
		});
	}
	this.frame_1 = function() {
		playSound("mixkitretrogamenotification212wav");
	}
	this.frame_34 = function() {
		var soundInstance = playSound("mixkittribaldrummingambience572mp3cutnetwav",0);
		this.InsertIntoSoundStreamData(soundInstance,34,480,1);
	}
	this.frame_90 = function() {
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.TheNottestOne.stop();
	}
	this.frame_117 = function() {
		var _this = this;
		/*
		Moves the playhead to the specified frame label in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.TheNottestOne.gotoAndStop('whipLeft');
	}
	this.frame_133 = function() {
		var _this = this;
		/*
		Moves the playhead to the specified frame number in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.TheNottestOne.gotoAndStop('whipRight');
	}
	this.frame_148 = function() {
		var soundInstance = playSound("ohgeezwav",0);
		this.InsertIntoSoundStreamData(soundInstance,148,352,1);
	}
	this.frame_162 = function() {
		var _this = this;
		/*
		Moves the playhead to the specified frame label in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.TheNottestOne.gotoAndPlay('speaking');
	}
	this.frame_259 = function() {
		var _this = this;
		/*
		Moves the playhead to the specified frame label in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.TheNottestOne.gotoAndStop('whipRight');
	}
	this.frame_314 = function() {
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.quitNow.on('click', function(){
		/*
		Moves the playhead to the specified frame number in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndStop(0);
		});
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.keepSuffering.on('click', function(){
		/*
		Play a Movie Clip/Video or the current timeline.
		Plays the specified movie clip or video.
		*/
		_this.play();
		});
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
	}
	this.frame_315 = function() {
		var soundInstance = playSound("mixkitretrogamenotification212wav",0);
		this.InsertIntoSoundStreamData(soundInstance,315,480,1);
	}
	this.frame_352 = function() {
		var soundInstance = playSound("turnTheGuidesOffwav",0);
		this.InsertIntoSoundStreamData(soundInstance,352,480,1);
	}
	this.frame_373 = function() {
		var _this = this;
		/*
		Moves the playhead to the specified frame label in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.TheNottestOne.gotoAndPlay('speaking');
	}
	this.frame_419 = function() {
		var _this = this;
		/*
		Moves the playhead to the specified frame label in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.TheNottestOne.gotoAndStop('whipRight');
	}
	this.frame_433 = function() {
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.quitNow.on('click', function(){
		/*
		Moves the playhead to the specified frame label in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndStop(0);
		});
		
		
		var _this = this;
		/*
		Clicking on the specified symbol instance executes a function.
		*/
		_this.turnGuidesOff.on('click', function(){
		/*
		Play a Movie Clip/Video or the current timeline.
		Plays the specified movie clip or video.
		*/
		_this.play();
		});
		var _this = this;
		/*
		Stop a Movie Clip/Video
		Stops the specified movie clip or video.
		*/
		_this.stop();
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(33).call(this.frame_34).wait(56).call(this.frame_90).wait(27).call(this.frame_117).wait(16).call(this.frame_133).wait(15).call(this.frame_148).wait(14).call(this.frame_162).wait(97).call(this.frame_259).wait(55).call(this.frame_314).wait(1).call(this.frame_315).wait(37).call(this.frame_352).wait(21).call(this.frame_373).wait(46).call(this.frame_419).wait(14).call(this.frame_433).wait(47));

	// startBtn
	this.startButton = new lib.startBtn();
	this.startButton.name = "startButton";
	this.startButton.setTransform(302,70);
	new cjs.ButtonHelper(this.startButton, 0, 1, 2);

	this.timeline.addTween(cjs.Tween.get(this.startButton).wait(2).to({alpha:0.8984},0).wait(2).to({alpha:0.8008},0).wait(2).to({alpha:0.6992},0).wait(2).to({alpha:0.6016},0).wait(2).to({alpha:0.5},0).wait(2).to({alpha:0.3984},0).wait(2).to({alpha:0.2891},0).wait(2).to({alpha:0.1992},0).wait(2).to({alpha:0.1016},0).to({_off:true},2).wait(460));

	// decisions
	this.keepSuffering = new lib.genericBtnFrame();
	this.keepSuffering.name = "keepSuffering";
	this.keepSuffering.setTransform(63.5,110.4,0.5644,0.5644);
	new cjs.ButtonHelper(this.keepSuffering, 0, 1, 2);

	this.text = new cjs.Text("Keep Suffering", "20px 'Trattatello'", "#00FF00");
	this.text.textAlign = "center";
	this.text.lineHeight = 38;
	this.text.lineWidth = 117;
	this.text.alpha = 0.74509804;
	this.text.parent = this;
	this.text.setTransform(150.3,120.8);

	this.quitNow = new lib.genericBtnFrame();
	this.quitNow.name = "quitNow";
	this.quitNow.setTransform(63.5,35.45,0.5644,0.5644);
	new cjs.ButtonHelper(this.quitNow, 0, 1, 2);

	this.text_1 = new cjs.Text("Quit Now", "20px 'Trattatello'", "#00FF00");
	this.text_1.textAlign = "center";
	this.text_1.lineHeight = 38;
	this.text_1.lineWidth = 111;
	this.text_1.alpha = 0.74509804;
	this.text_1.parent = this;
	this.text_1.setTransform(147.3,45.85);

	this.turnGuidesOff = new lib.genericBtnFrame();
	this.turnGuidesOff.name = "turnGuidesOff";
	this.turnGuidesOff.setTransform(59.25,110.5,0.5644,0.5644);
	new cjs.ButtonHelper(this.turnGuidesOff, 0, 1, 2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.text_1,p:{x:147.3,y:45.85}},{t:this.quitNow,p:{x:63.5,y:35.45}},{t:this.text,p:{x:150.3,y:120.8,text:"Keep Suffering"}},{t:this.keepSuffering}]},314).to({state:[]},2).to({state:[{t:this.text_1,p:{x:143.05,y:44.35}},{t:this.quitNow,p:{x:59.25,y:33.95}},{t:this.text,p:{x:146.05,y:119.3,text:"Turn Guides Off"}},{t:this.turnGuidesOff}]},117).wait(47));

	// not_one
	this.TheNottestOne = new lib.NotTheOne();
	this.TheNottestOne.name = "TheNottestOne";
	this.TheNottestOne.setTransform(-17.4,508.35,1.7072,1.7072,0,0,0,8,30.9);
	this.TheNottestOne._off = true;

	this.timeline.addTween(cjs.Tween.get(this.TheNottestOne).wait(17).to({_off:false},0).wait(1).to({x:-10.55},0).wait(1).to({regX:8.1,x:-3.55},0).wait(1).to({regX:8,x:3.25},0).wait(1).to({x:10},0).wait(1).to({regX:8.1,x:17.05},0).wait(1).to({x:23.9},0).wait(1).to({x:30.8},0).wait(1).to({x:37.65},0).wait(1).to({x:44.55},0).wait(1).to({x:51.35},0).wait(1).to({x:58.2},0).wait(1).to({x:65.1},0).wait(1).to({x:71.95},0).wait(1).to({x:78.85},0).wait(1).to({x:85.65},0).wait(1).to({x:92.55},0).wait(1).to({x:99.4},0).wait(1).to({x:106.3},0).wait(1).to({x:113.15},0).wait(1).to({x:120.1},0).wait(1).to({x:126.9},0).wait(1).to({x:133.75},0).wait(1).to({x:140.65},0).wait(1).to({x:147.5},0).wait(1).to({x:154.4},0).wait(1).to({x:161.25},0).wait(1).to({x:168.15},0).wait(1).to({x:174.95},0).wait(1).to({x:181.85},0).wait(1).to({x:188.7},0).wait(1).to({x:195.6},0).wait(1).to({x:202.45},0).wait(1).to({x:209.25},0).wait(1).to({x:216.15},0).wait(1).to({x:223},0).wait(1).to({x:229.95},0).wait(1).to({x:236.8},0).wait(1).to({x:243.7},0).wait(1).to({x:250.5},0).wait(1).to({x:257.45},0).wait(1).to({x:264.25},0).wait(1).to({x:271.1},0).wait(1).to({x:278},0).wait(1).to({x:284.8},0).wait(1).to({x:291.75},0).wait(1).to({x:298.55},0).wait(1).to({x:305.45},0).wait(1).to({x:312.3},0).wait(1).to({x:319.2},0).wait(1).to({x:326.05},0).wait(1).to({x:333},0).wait(1).to({x:339.8},0).wait(1).to({x:346.65},0).wait(1).to({x:353.55},0).wait(1).to({x:360.4},0).wait(1).to({x:367.3},0).wait(1).to({x:374.1},0).wait(1).to({x:381},0).wait(1).to({x:387.85},0).wait(1).to({x:394.75},0).wait(1).to({x:401.6},0).wait(1).to({x:408.5},0).wait(1).to({x:415.35},0).wait(1).to({x:422.15},0).wait(1).to({x:429.05},0).wait(1).to({x:435.9},0).wait(1).to({x:442.85},0).wait(1).to({x:449.7},0).wait(1).to({x:456.6},0).wait(1).to({x:463.4},0).wait(1).to({x:470.3},0).wait(1).to({x:477.15},0).wait(1).to({x:484.05},0).wait(390));

	// guide
	this.instance = new lib.guides("synched",0);
	this.instance.setTransform(450.05,486.85,1,1,0,0,0,539.9,33);

	
	var _tweenStr_0 = cjs.Tween.get(this.instance).wait(1).to({regY:33.1,y:486.95},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1);
	this.timeline.addTween(_tweenStr_0.to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({x:450.5,y:474.1},0).wait(1).to({x:450.95,y:461.3},0).wait(1).to({x:451.35,y:448.5},0).wait(1).to({x:451.8,y:435.65},0).wait(1).to({x:452.2,y:422.85},0).wait(1).to({x:452.65,y:410.05},0).wait(1).to({x:453.05,y:397.25},0).wait(1).to({x:453.5,y:384.4},0).wait(1).to({x:453.9,y:371.6},0).wait(1).to({x:454.35,y:358.8},0).wait(1).to({x:454.75,y:346},0).wait(1).to({x:455.2,y:333.15},0).wait(1).to({x:455.6,y:320.35},0).wait(1).to({x:456.05,y:307.55},0).wait(1).to({x:456.45,y:294.75},0).wait(1).to({x:456.9,y:281.9},0).wait(1).to({x:457.3,y:269.1},0).wait(1).to({x:457.75,y:256.3},0).wait(1).to({x:458.15,y:243.5},0).wait(1).to({x:458.6,y:230.65},0).wait(1).to({x:459,y:217.85},0).wait(1).to({x:459.45,y:205.05},0).wait(1).to({x:459.85,y:192.25},0).wait(1).to({x:460.3,y:179.4},0).wait(1).to({x:460.7,y:166.6},0).wait(1).to({x:461.15,y:153.8},0).wait(1).to({x:461.55,y:141},0).wait(1).to({x:462,y:128.15},0).wait(1).to({x:462.4,y:115.35},0).wait(1).to({x:462.85,y:102.55},0).wait(1).to({x:463.25,y:89.75},0).wait(1).to({x:463.7,y:76.9},0).wait(1).to({x:464.1,y:64.1},0).wait(1).to({x:464.55,y:51.3},0).wait(1).to({x:464.95,y:38.5},0).wait(1).to({x:465.4,y:25.7},0).wait(1).to({x:465.8,y:12.9},0).wait(1).to({x:466.25,y:0.1},0).wait(1).to({x:466.65,y:-12.7},0).wait(1).to({x:467.1,y:-25.55},0).wait(1).to({x:467.5,y:-38.35},0).wait(1).to({x:467.95,y:-51.15},0).wait(1).to({x:468.35,y:-64},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1));

	// bushes
	this.instance_1 = new lib.bushTrio();
	this.instance_1.setTransform(457.25,669.5,1,1,0,0,0,336.5,36.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({regX:335,regY:37,x:455.75,y:670},0).wait(16).to({scaleX:1.0007,scaleY:1.0007,x:449.3,y:669.95},0).wait(1).to({scaleX:1.0014,scaleY:1.0014,x:442.95,y:670},0).wait(1).to({scaleX:1.002,scaleY:1.002,x:436.55},0).wait(1).to({scaleX:1.0027,scaleY:1.0027,x:430.15},0).wait(1).to({scaleX:1.0034,scaleY:1.0034,x:423.75},0).wait(1).to({scaleX:1.0041,scaleY:1.0041,x:417.35},0).wait(1).to({scaleX:1.0048,scaleY:1.0048,x:410.95},0).wait(1).to({scaleX:1.0055,scaleY:1.0055,x:404.55},0).wait(1).to({scaleX:1.0061,scaleY:1.0061,x:398.2},0).wait(1).to({scaleX:1.0068,scaleY:1.0068,x:391.8},0).wait(1).to({scaleX:1.0075,scaleY:1.0075,x:385.4},0).wait(1).to({scaleX:1.0082,scaleY:1.0082,x:379},0).wait(1).to({scaleX:1.0089,scaleY:1.0089,x:372.6},0).wait(1).to({scaleX:1.0096,scaleY:1.0096,x:366.2},0).wait(1).to({scaleX:1.0102,scaleY:1.0102,x:359.85},0).wait(1).to({scaleX:1.0109,scaleY:1.0109,x:353.45},0).wait(1).to({scaleX:1.0116,scaleY:1.0116,x:347.05},0).wait(1).to({scaleX:1.0123,scaleY:1.0123,x:340.65},0).wait(1).to({scaleX:1.013,scaleY:1.013,x:334.3},0).wait(1).to({scaleX:1.0137,scaleY:1.0137,x:327.9},0).wait(1).to({scaleX:1.0143,scaleY:1.0143,x:321.5},0).wait(1).to({scaleX:1.015,scaleY:1.015,x:315.15},0).wait(1).to({scaleX:1.0157,scaleY:1.0157,x:308.75},0).wait(1).to({scaleX:1.0164,scaleY:1.0164,x:302.35},0).wait(1).to({scaleX:1.0171,scaleY:1.0171,x:295.95},0).wait(1).to({scaleX:1.0178,scaleY:1.0178,x:289.55},0).wait(1).to({scaleX:1.0184,scaleY:1.0184,x:283.15},0).wait(1).to({scaleX:1.0191,scaleY:1.0191,x:276.75},0).wait(1).to({scaleX:1.0198,scaleY:1.0198,x:270.4},0).wait(1).to({scaleX:1.0205,scaleY:1.0205,x:264},0).wait(1).to({scaleX:1.0212,scaleY:1.0212,x:257.6},0).wait(1).to({scaleX:1.0218,scaleY:1.0218,x:251.2},0).wait(1).to({scaleX:1.0225,scaleY:1.0225,x:244.8},0).wait(1).to({scaleX:1.0232,scaleY:1.0232,x:238.4},0).wait(1).to({scaleX:1.0239,scaleY:1.0239,x:232},0).wait(1).to({scaleX:1.0246,scaleY:1.0246,x:225.65},0).wait(1).to({scaleX:1.0253,scaleY:1.0253,x:219.25},0).wait(1).to({scaleX:1.0259,scaleY:1.0259,x:212.85},0).wait(1).to({scaleX:1.0266,scaleY:1.0266,x:206.45},0).wait(1).to({scaleX:1.0273,scaleY:1.0273,x:200.05},0).wait(1).to({scaleX:1.028,scaleY:1.028,x:193.65},0).wait(1).to({scaleX:1.0287,scaleY:1.0287,x:187.25},0).wait(1).to({scaleX:1.0294,scaleY:1.0294,x:180.9},0).wait(1).to({scaleX:1.03,scaleY:1.03,x:174.45},0).wait(1).to({scaleX:1.0307,scaleY:1.0307,x:168.1},0).wait(1).to({scaleX:1.0314,scaleY:1.0314,x:161.7},0).wait(1).to({scaleX:1.0321,scaleY:1.0321,x:155.3},0).wait(1).to({scaleX:1.0328,scaleY:1.0328,x:148.9},0).wait(1).to({scaleX:1.0335,scaleY:1.0335,x:142.5},0).wait(1).to({scaleX:1.0341,scaleY:1.0341,x:136.15},0).wait(1).to({scaleX:1.0348,scaleY:1.0348,x:129.7},0).wait(1).to({scaleX:1.0355,scaleY:1.0355,x:123.35},0).wait(1).to({scaleX:1.0362,scaleY:1.0362,x:116.95},0).wait(1).to({scaleX:1.0369,scaleY:1.0369,x:110.55},0).wait(1).to({scaleX:1.0375,scaleY:1.0375,x:104.15},0).wait(1).to({scaleX:1.0382,scaleY:1.0382,x:97.75},0).wait(1).to({scaleX:1.0389,scaleY:1.0389,x:91.4},0).wait(1).to({scaleX:1.0396,scaleY:1.0396,x:84.95},0).wait(1).to({scaleX:1.0403,scaleY:1.0403,x:78.6},0).wait(1).to({scaleX:1.041,scaleY:1.041,x:72.2},0).wait(1).to({scaleX:1.0416,scaleY:1.0416,x:65.8},0).wait(1).to({scaleX:1.0423,scaleY:1.0423,x:59.4},0).wait(1).to({scaleX:1.043,scaleY:1.043,x:53},0).wait(1).to({scaleX:1.0437,scaleY:1.0437,x:46.65},0).wait(1).to({scaleX:1.0444,scaleY:1.0444,x:40.2},0).wait(1).to({scaleX:1.0451,scaleY:1.0451,x:33.85},0).wait(1).to({scaleX:1.0457,scaleY:1.0457,x:27.45},0).wait(1).to({scaleX:1.0464,scaleY:1.0464,x:21.05},0).wait(1).to({scaleX:1.0471,scaleY:1.0471,x:14.7},0).wait(1).to({scaleX:1.0478,scaleY:1.0478,x:8.25},0).wait(1).to({scaleX:1.0485,scaleY:1.0485,x:1.9},0).wait(1).to({scaleX:1.0492,scaleY:1.0492,x:-4.55},0).wait(1).to({scaleX:1.0498,scaleY:1.0498,x:-10.9},0).wait(1).to({scaleX:1.0505,scaleY:1.0505,x:-17.3},0).wait(390));

	// floor
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("rgba(0,0,0,0.569)").ss(1,1,1).p("EhBTgIiMCCnAAAIAARFMiCnAAAg");
	this.shape.setTransform(469.2727,622.6737,1.1232,1.1232);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#999999").s().p("EhBTAIjIAAxFMCCmAAAIAARFg");
	this.shape_1.setTransform(469.2727,622.6737,1.1232,1.1232);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(480));

	// tree
	this.instance_2 = new lib.tree();
	this.instance_2.setTransform(825.85,401.95,1,1,0,0,0,61.1,158.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(17).to({x:824.85},0).wait(1).to({x:823.9},0).wait(1).to({x:822.9},0).wait(1).to({x:821.95},0).wait(1).to({x:820.95},0).wait(1).to({x:820},0).wait(1).to({x:819},0).wait(1).to({x:818.05},0).wait(1).to({x:817.05},0).wait(1).to({x:816.1},0).wait(1).to({x:815.1},0).wait(1).to({x:814.15},0).wait(1).to({x:813.2},0).wait(1).to({x:812.2},0).wait(1).to({x:811.25},0).wait(1).to({x:810.25},0).wait(1).to({x:809.3},0).wait(1).to({x:808.3},0).wait(1).to({x:807.35},0).wait(1).to({x:806.35},0).wait(1).to({x:805.4},0).wait(1).to({x:804.4},0).wait(1).to({x:803.45},0).wait(1).to({x:802.45},0).wait(1).to({x:801.5},0).wait(1).to({x:800.55},0).wait(1).to({x:799.55},0).wait(1).to({x:798.6},0).wait(1).to({x:797.6},0).wait(1).to({x:796.65},0).wait(1).to({x:795.65},0).wait(1).to({x:794.7},0).wait(1).to({x:793.7},0).wait(1).to({x:792.75},0).wait(1).to({x:791.75},0).wait(1).to({x:790.8},0).wait(1).to({x:789.85},0).wait(1).to({x:788.85},0).wait(1).to({x:787.9},0).wait(1).to({x:786.9},0).wait(1).to({x:785.95},0).wait(1).to({x:784.95},0).wait(1).to({x:784},0).wait(1).to({x:783},0).wait(1).to({x:782.05},0).wait(1).to({x:781.05},0).wait(1).to({x:780.1},0).wait(1).to({x:779.1},0).wait(1).to({x:778.15},0).wait(1).to({x:777.2},0).wait(1).to({x:776.2},0).wait(1).to({x:775.25},0).wait(1).to({x:774.25},0).wait(1).to({x:773.3},0).wait(1).to({x:772.3},0).wait(1).to({x:771.35},0).wait(1).to({x:770.35},0).wait(1).to({x:769.4},0).wait(1).to({x:768.4},0).wait(1).to({x:767.45},0).wait(1).to({x:766.45},0).wait(1).to({x:765.5},0).wait(1).to({x:764.55},0).wait(1).to({x:763.55},0).wait(1).to({x:762.6},0).wait(1).to({x:761.6},0).wait(1).to({x:760.65},0).wait(1).to({x:759.65},0).wait(1).to({x:758.7},0).wait(1).to({x:757.7},0).wait(1).to({x:756.75},0).wait(1).to({x:755.75},0).wait(1).to({x:754.8},0).wait(1).to({x:753.85},0).wait(390));

	// mountains
	this.instance_3 = new lib.mountainGroup("synched",0);
	this.instance_3.setTransform(495.05,458.3,1,1,0,0,0,556.6,347.8);

	
	var _tweenStr_1 = cjs.Tween.get(this.instance_3).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({x:494.95},0).wait(1).to({x:494.8},0).wait(1).to({x:494.65},0).wait(1).to({x:494.55},0).wait(1).to({x:494.4},0).wait(1).to({x:494.25},0).wait(1).to({x:494.15},0).wait(1).to({x:494},0).wait(1).to({x:493.85},0).wait(1).to({x:493.7},0).wait(1).to({x:493.6},0).wait(1).to({x:493.45},0).wait(1).to({x:493.3},0).wait(1).to({x:493.2},0).wait(1).to({x:493.05},0).wait(1).to({x:492.9},0).wait(1).to({x:492.8},0).wait(1).to({x:492.65},0).wait(1).to({x:492.5},0).wait(1).to({x:492.35},0).wait(1).to({x:492.25},0).wait(1).to({x:492.1},0).wait(1).to({x:491.95},0).wait(1).to({x:491.85},0).wait(1).to({x:491.7},0).wait(1).to({x:491.55},0).wait(1).to({x:491.45},0).wait(1).to({x:491.3},0).wait(1).to({x:491.15},0).wait(1).to({x:491},0).wait(1).to({x:490.9},0).wait(1).to({x:490.75},0).wait(1).to({x:490.6},0).wait(1).to({x:490.5},0).wait(1).to({x:490.35},0).wait(1).to({x:490.2},0).wait(1).to({x:490.05},0).wait(1).to({x:489.95},0).wait(1).to({x:489.8},0).wait(1).to({x:489.65},0).wait(1).to({x:489.55},0).wait(1).to({x:489.4},0).wait(1).to({x:489.25},0).wait(1).to({x:489.15},0).wait(1).to({x:489},0).wait(1).to({x:488.85},0).wait(1).to({x:488.7},0).wait(1).to({x:488.6},0).wait(1).to({x:488.45},0).wait(1).to({x:488.3},0).wait(1).to({x:488.2},0).wait(1).to({x:488.05},0).wait(1).to({x:487.9},0).wait(1).to({x:487.8},0).wait(1).to({x:487.65},0).wait(1).to({x:487.5},0).wait(1).to({x:487.35},0).wait(1).to({x:487.25},0).wait(1).to({x:487.1},0).wait(1).to({x:486.95},0).wait(1).to({x:486.85},0).wait(1).to({x:486.7},0).wait(1).to({x:486.55},0).wait(1).to({x:486.45},0).wait(1).to({x:486.3},0).wait(1).to({x:486.15},0).wait(1).to({x:486},0).wait(1).to({x:485.9},0).wait(1).to({x:485.75},0).wait(1).to({x:485.6},0).wait(1).to({x:485.5},0).wait(1).to({x:485.35},0).wait(1).to({x:485.2},0).wait(1).to({x:485.05},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1);
	this.timeline.addTween(_tweenStr_1.to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1));

	// background
	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.lf(["#CCFFFF","#FFFFFF"],[0,0.216],0,-305.1,0,305.1).s().p("EhBTAvrMAAAhfVMCCmAAAMAAABfVg");
	this.shape_2.setTransform(469.2727,341.3965,1.1232,1.1232);

	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(480));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(95.9,243.4,956.6999999999999,567);
// library properties:
lib.properties = {
	id: '82CA3E4424A4498F9AE734CF115DA5D2',
	width: 939,
	height: 683,
	fps: 24,
	color: "#E1E1E1",
	opacity: 1.00,
	manifest: [
		{src:"Sounds/mixkitretrogamenotification212wav.mp3", id:"mixkitretrogamenotification212wav"},
		{src:"Sounds/mixkittribaldrummingambience572mp3cutnetwav.mp3", id:"mixkittribaldrummingambience572mp3cutnetwav"},
		{src:"Sounds/ohgeezwav.mp3", id:"ohgeezwav"},
		{src:"Sounds/turnTheGuidesOffwav.mp3", id:"turnTheGuidesOffwav"},
		{src:"Sounds/whipwav.mp3", id:"whipwav"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['82CA3E4424A4498F9AE734CF115DA5D2'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;
