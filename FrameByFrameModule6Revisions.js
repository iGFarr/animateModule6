(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"FrameByFrameModule6Revisions_atlas_1", frames: [[931,230,35,159],[894,0,35,462],[931,0,70,228],[0,0,892,251]]}
];


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



(lib.CachedBmp_9 = function() {
	this.initialize(ss["FrameByFrameModule6Revisions_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(ss["FrameByFrameModule6Revisions_atlas_1"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_7 = function() {
	this.initialize(ss["FrameByFrameModule6Revisions_atlas_1"]);
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["FrameByFrameModule6Revisions_atlas_1"]);
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();
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
	props.labels = {justStanding:14,whipLeft:17,whipRight:18,speaking:22,flailing:35};
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
	this.frame_147 = function() {
		var _this = this;
		/*
		Moves the playhead to the specified frame label in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.gotoAndPlay('flailing');
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(16).call(this.frame_16).wait(1).call(this.frame_17).wait(1).call(this.frame_18).wait(3).call(this.frame_21).wait(12).call(this.frame_33).wait(114).call(this.frame_147).wait(2));

	// Layer_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#33FFFF").ss(4,1,1).p("AADh4QgIgLgJgLQAQAIAUgIQATgHAMgRQATgYAGgyQADgQAAgIQgBgNgFgJQgNgWgnAAQgfABgcASQgdAUgLAdQgKAgAPAgQAQAgAfAIAAFh6QAEgDAEgCQAAAAABABQAAgDABgDQgFAFgFAFgAADh3QAAAAAAgBQABgBABgBQgBABgBACQgYAegPAvQgKAhgMBGQAChCAMgoQAPgyAggZAALhsQgEgGgEgFAALhsQABgJACgJQAjBBAUBJQgTg/gng5gABFAMQAGAXAFAXAAHBzQADgaAAgaQAKAgAEBWQABAcAEAXQAGAlAMAYQgKgegIgfQgPg6gHg7QgCgQgBgRQgGhfANhfAhDE1QAmg1AVhAQALgmAEgn");
	this.shape.setTransform(8.075,30.925);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#33FFFF").ss(4,1,1).p("AAHhwQgHgLgJgLQAPAIAVgIQATgHANgRQATgYAIgyQADgQAAgIQAAgNgFgJQgMgWgnAAQggABgcASQgdAUgMAdQgLAgAOAgQAPAgAeAIAAHhvQAAAAAAgBQABgBABgBQgBABgBACQgZAegQAvQgMAhgOBGQAFhDANgnQARgyAggZAAPhkQABgJACgJQABgDAAgDQgFAFgFAFQAFgDAEgCQAAAAAAABQAiBBARBJQgRg/glg5QgEgGgEgFABFAUQAGAXADAXAAEB7QAEgaAAgaQAJAgABBWQABAcADAXQAFAlALAYQgJgegHgfQgNg6gFg7QgBgQgBgRQgDhfAQhfAhYEPQBVhEACgXQABgXAEgi");
	this.shape_1.setTransform(9.025,30.125);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#33FFFF").ss(4,1,1).p("AgFhwQgHgLgJgLQAQAIAVgIQATgHAOgRQAVgYAMgyQAEgQABgIQAAgNgEgJQgLgWgmAAQghABgdASQgfAUgNAdQgNAgALAgQAMAgAeAIAAGh2QAAgDABgDQgFAFgFAFQAEgDAEgCQAAAAABABQAdBBAYAnQgZgdghg5QgCgGgEgFQAAAAAAgBQABgBABgBQgBABgBACQgcAegUAvQgOAhgTBGQAKhDAQgnQAUgyAjgZAABhkQACgJADgJAA7gOIARBXAgZB7QAGgaACgaQAHAggFBWQgBAcAAAXQADAlAKAYQgIgegFgfQgIg6gBg7QAAgQABgRQAChfAXhfAhIEPQAhhEAEgXQAEgXAGgi");
	this.shape_2.setTransform(11.1778,30.125);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#33FFFF").ss(4,1,1).p("AgFhwQgGgLgIgLQAPAIAVgIQAUgHAPgRQAVgYAOgyQAEgQACgIQABgNgEgJQgKgWgnAAQggABgeASQggAUgOAdQgOAgAKAgQALAgAdAIAgChyQAEgDAEgCQAAAAABABQAAgDABgDQgFAFgFAFQgBABgBACQgBAAAAgBQABgBACgBgAABhkQgCgGgDgFQgdAegWAvQgPAhgWBGQAMhDASgnQAVgyAkgZAABhkQADgJADgJQAaBBAXAnIAOBXAghB7QABgQABgRQAGhfAahfAg+EZQAMhOAFgXQAEgXAIgiQAHgaADgaQAFAggIBWQgCAcAAAXQABAlAJAYQgGgegEgfQgGg6ABg7AA4gOQgYgdgfg5");
	this.shape_3.setTransform(12.735,30.125);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#33FFFF").ss(4,1,1).p("AgFhwQgGgLgIgLQAPAIAVgIQAUgHAPgRQAVgYAOgyQAEgQACgIQABgNgEgJQgKgWgnAAQggABgeASQggAUgOAdQgOAgAKAgQALAgAdAIAAHh2QAAgDABgDQgFAFgFAFQAEgDAEgCQAAAAABABQAaBBAXAnQgYgdgfg5QgCgGgDgFQgBAAAAgBQABgBACgBQgBABgBACQgdAegWAvQgPAhgWBGQAMhDASgnQAVgyAkgZAABhkQADgJADgJAg+EZQAMhOAFgXQAEgXAIgiQABgQABgRQAGhfAahfAA4gOIAOBXAghB7QAHgaADgaQAFAggIBWQgCAcAAAXQABAlAJAYQgGgegEgfQgGg6ABg7g");
	this.shape_4.setTransform(12.735,30.125);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#33FFFF").ss(4,1,1).p("AgOiEQgBgEgCgFQAsgMAfgmQAggmAEgvQAAgVgHgHQgIgIgaAAQg7AFgeAUQgVANgOAUQgOAVgBAWQgBAYAQAVQAQAVAXADAgHh1QAAgNgBgJQgDAEgDADQgHAMgHALQAGgBAFABQAFABAEAEQAAgHABgGgAgchtQgyBSgPBdQAJhJAWg+QAGgTALgLQAJgJAIgBgAgIhoQADACADAEQACADADAGQACADACAEQAgBFAWBRQgdhTgdhKQgFgOgFgOQgDgHgEgIAgZBOQAAgBgBgBQgNglARhFQALgtADgdAgZBOQAAgBAAgCQAhAiAQAwQAPAwgIAuQAHg5geg3QgBgDgRgcQgKgRgFgNgAgqE5QADgyAOi5");
	this.shape_5.setTransform(15.925,31);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#33FFFF").ss(4,1,1).p("AgOiEQgBgEgCgFQAsgMAfgmQAggmAEgvQAAgVgHgHQgIgIgaAAQg7AFgeAUQgVANgOAUQgOAVgBAWQgBAYAQAVQAQAVAXADAgHh1QAAgNgBgJQgDAEgDADQgHAMgHALQAGgBAFABQAFABAEAEQAAgHABgGgAgchtQgyBSgPBdQAJhJAWg+QAGgTALgLQAJgJAIgBgAgIhoQADACADAEQACADADAGQACADACAEQAgBFAWBRQgdhTgdhKQgFgOgFgOQgDgHgEgIAgZBOQAAgBgBgBQgNglARhFQALgtADgdAAoD+QgIhJgYgqQgBgDgRgcQgKgRgFgNQAAgBAAgCQAhAiAQAwQALAkAFA9gAAsEqQgBgYgDgUAgqE5QADgyAOi5");
	this.shape_6.setTransform(15.925,31);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#33FFFF").ss(4,1,1).p("AgMiZQAWgDAVgMQAZgOAOgWQAPgXADgbQAEgbgJgaQhFgGgpASQgaAMgSAWQgSAZABAbQABAdAYATQAXASAXgGQACAAADgEgAgRiVQgBgBgBgCQADAAAEgBAgXhuQAGgIAGgHQAAgBAAgBQgGAJgGAIQgYAlgPApQgUA0gCA2QAAg5AUg0QAQgpAZgigAgHiCQABAAAAAAQA+BbAVBsQgghog0hfgAgLh9QADgCABgDQgFgJgFgKAgHBEQgGgiAEg5QAFhGgHggAAgCwQgEgMgFgMQgKgXgFgMQgIgWgEgPQgCgGgBgGQAAgBAAgBQAXA2AQA4QASA+AIBAAg4E2QAxh1AAh9");
	this.shape_7.setTransform(16.0254,32.1388);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#33FFFF").ss(4,1,1).p("AADh4QgIgLgJgLQAQAIAUgIQATgHAMgRQATgYAGgyQADgQAAgIQgBgNgFgJQgNgWgnAAQgfABgcASQgdAUgLAdQgKAgAPAgQAQAgAfAIAAOh+QAAgDABgDQgFAFgFAFQAEgDAEgCQAAAAABABQAjBBAUBJQgTg/gng5QgEgGgEgFQgYAegPAvQgKAhgMBGQAChCAMgoQAPgyAggZAAFh6QgBABgBACQAAAAAAgBQABgBABgBgAALhsQABgJACgJAAHBzQgCgQgBgRQgGhfANhfAAHBzQADgaAAgaQAKAgAEBWQABAcAEAXQAGAlAMAYQgKgegIgfQgPg6gHg7gABFAMQAGAXAFAXAhDE1QAmg1AVhAQALgmAEgn");
	this.shape_8.setTransform(16.675,30.925);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#33FFFF").ss(4,1,1).p("AgFh4QAIgLAJgLQgQAIgUgIQgTgHgMgRQgTgYgGgyQgDgQAAgIQABgNAFgJQANgWAnAAQAfABAmAgQAnAgAAASQABASgPAfQgQAggfAIAgQh+QAAgDgBgDQAFAFAFAFQgEgDgEgCQAAAAgBABQgjBBgUBJQATg/Ang5QgBgJgCgJgAgFh4QgBgBgBgBQABABABACQAAAAAAgBgAgNhsQAEgGAEgFQAYAeAPAvQAKAhAMBGQgChCgMgoQgPgygggZAhHAMQgGAXgFAXAgJBzQACgQABgRQAGhfgNhfAgJBzQgDgaAAgaQgKAggEBWQgBAcgEAXQgGAlgMAYQAKgeAIgfQAPg6AHg7gABBE1Qgmg1gVhAQgLgmgEgn");
	this.shape_9.setTransform(16.303,30.925);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#33FFFF").ss(4,1,1).p("AADh4QgIgLgJgLQAQAIAUgIQATgHAMgRQATgYAGgyQADgQAAgIQgBgNgFgJQgNgWgnAAQgfABgcASQgdAUgLAdQgKAgAPAgQAQAgAfAIAAOh+QAAgDABgDQgFAFgFAFQAEgDAEgCQAAAAABABQAjBBAUBJQgTg/gng5QgEgGgEgFQAAAAAAgBQABgBABgBQgBABgBACQgYAegPAvQgKAhgMBGQAChCAMgoQAPgyAggZAALhsQABgJACgJAAHBzQgCgQgBgRQgGhfANhfAAHBzQADgaAAgaQAKAgAEBWQABAcAEAXQAGAlAMAYQgKgegIgfQgPg6gHg7gABFAMQAGAXAFAXAhDE1QAmg1AVhAQALgmAEgn");
	this.shape_10.setTransform(16.725,30.925);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#33FFFF").ss(0.2,1,1).p("AAdAAQAAABgIAAQgJABgMAAQgLAAgIgBQgJAAAAgBQAAAAAJAAQAIgBALAAQAMAAAJABQAIAAAAAAg");
	this.shape_11.setTransform(17.4,11.85);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#33FFFF").ss(4,1,1).p("AADh4QgIgLgJgLQAQAIAUgIQATgHAMgRQATgYAGgyQADgQAAgIQgBgNgFgJQgNgWgnAAQgfABgcASQgdAUgLAdQgKAgAPAgQAQAgAfAIAAFh6QAEgDAEgCQAAAAABABQAAgDABgDQgFAFgFAFQgBABgBACQAAAAAAgBQABgBABgBgAALhsQgEgGgEgFQgYAegPAvQgKAhgMBGQAChCAMgoQAPgyAggZAALhsQABgJACgJQAjBBAUBJQgTg/gng5gAAHBzQgCgQgBgRQgGhfANhfAAHBzQADgaAAgaQAKAgAEBWQABAcAEAXQAGAlAMAYQgKgegIgfQgPg6gHg7gABFAMQAGAXAFAXAhDE1QAmg1AVhAQALgmAEgn");
	this.shape_12.setTransform(16.725,30.925);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#660000").s().p("AgTABIgJgBIAJAAIATgBIAUABIAJAAIgJABIgUAAIgTAAg");
	this.shape_13.setTransform(17.4,11.85);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#33FFFF").ss(0.2,1,1).p("AAdgDQAAABgJAGQgIAHgMACQgLACgJgJQgIgIAAgBQAAAAAMgGQAMgFAJACQAKADAHADQAHADAAAAg");
	this.shape_14.setTransform(17.4,12.2018);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#660000").s().p("AgTAGIgJgJIAMgGQAMgFAJACIARAGIAHADIgJAHQgIAHgMACIgDAAQgKAAgGgHg");
	this.shape_15.setTransform(17.4,12.2018);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#33FFFF").ss(0.2,1,1).p("AAdAEQAAAAgLAHQgLAHgLAAQgMAAgGgHQgGgHAAAAQAAgBALgIQALgKALgCQAMgBAGALQAGAKAAABg");
	this.shape_16.setTransform(17.4,11.4647);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#660000").s().p("AgWALIgGgHIALgJQALgKALgCQAMgBAGALIAGALIgLAHQgLAHgLAAQgMAAgGgHg");
	this.shape_17.setTransform(17.4,11.4647);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#33FFFF").ss(0.2,1,1).p("AAdAAQAAAAgIACQgIACgKAKQgKAKgKgMQgLgMAAAAQAAAAAJgKQAIgLALAFQAMAFAJAGQAIAFAAAAg");
	this.shape_18.setTransform(17.4,11.8712);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().s("#33FFFF").ss(4,1,1).p("AADh4QgIgLgJgLQAQAIAUgIQATgHAMgRQATgYAGgyQADgQAAgIQgBgNgFgJQgNgWgnAAQgfABgcASQgdAUgLAdQgKAgAPAgQAQAgAfAIAAFh6QAEgDAEgCQAAAAABABQAAgDABgDQgFAFgFAFQgBABgBACQgYAegPAvQgKAhgMBGQAChCAMgoQAPgyAggZAALhsQgEgGgEgFQAAAAAAgBQABgBABgBAALhsQABgJACgJQAjBBAUBJQgTg/gng5gAAHBzQgCgQgBgRQgGhfANhfAAHBzQADgaAAgaQAKAgAEBWQABAcAEAXQAGAlAMAYQgKgegIgfQgPg6gHg7gABFAMQAGAXAFAXAhDE1QAmg1AVhAQALgmAEgn");
	this.shape_19.setTransform(16.725,30.925);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#660000").s().p("AgRAMIgLgMIAJgKQAIgLALAFQAMAFAIAGIAJAFIgIACQgIACgLAKQgDAEgFAAQgFAAgGgGg");
	this.shape_20.setTransform(17.4,11.8712);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("#33FFFF").ss(0.2,1,1).p("AAdAAQAAAAgIAGQgJAFgMgCQgLgCgIgDQgJgDAAgBQAAAAAJgDQAIgDALgCQAMgCAJAFQAIAFAAAAg");
	this.shape_21.setTransform(17.4,11.8499);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#660000").s().p("AAAAJQgLgCgIgDIgJgEIAJgDQAIgDALgCQAMgCAIAFIAJAFIgJAGQgGAEgHAAIgHgBg");
	this.shape_22.setTransform(17.4,11.8499);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("#33FFFF").ss(4,1,1).p("AADhqQgIgMgKgLQAQAJAVgIQATgIAMgQQASgYAHgyQADgQAIgZQAJgZgJgQQgJgQgtAPQgrAPgdATQgdATgKAeQgKAfAPAgQAPAgAfAJAAFhsQAEgDAEgDQAAABABAAQAAgDAAgDQgFAFgEAGQgBABgBABQAAAAAAAAQABgBABgBgAALhfQgEgFgEgGQgYAfgPAuQgLAhg7BkQAyhgAMgoQAPgxAggZAALhfQABgJACgJQAjBCAUBJQgThAgng5gAAHCAQgCgQgBgQQgHhgAOhfAAHCAQADgZgBgaQAKAfAFBWQABAcAEAXQAFAmA8AGQg6gNgHgfQgPg5gHg8gABFAaQAGAWAiAkAhsE9QBPgvAVhAQALgnAEgn");
	this.shape_23.setTransform(16.75,29.5591);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("#33FFFF").ss(4,1,1).p("AAUhrQgIgLgKgLQARAIAVgIQATgHAMgRQASgYAHgyQACgQAAgIQAAgNgGgJQgNgWhlBtQgQAQgMANQhHBFAahAQAehMgCAQQgBARAPAgQABADACADQAPAaAcAIAAXhtQAEgDAEgCQAAAAAAABQABgDAAgDQgFAFgEAFQgBABgBACQgBAAAAgBQABgBACgBgAAchfQgDgGgEgFQgYAegPAvQgEANgSgBQAKgDAEgMQAPgyAfgZAAchfQACgJABgJQAkBBAUBJQgTg/gog5gAAZCAQgCgQgBgRQgIhfAOhfAAZCAQADgagBgaQA+A6gOAwQgOAxgPAOQAGAlBTgFQhRgBgIgfQgPg6gGg7gAgogRQgagCg5gjQA7ArAYgGgABXAZQAGAXAth0AiJDBQB+BMAThAQAMgmAFgn");
	this.shape_24.setTransform(14.975,29.6385);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#33CCFF").ss(4,1,1).p("AAUh4QgIgLgKgLQARAIAVgIQATgHAMgRQASgYAHgyQACgQAAgIQAAgNgGgJQgNgWgmAAQghABgbASQgdAUgwABQgxABAPAgQAQAgBrBDAAXh6QAEgDAEgCQAAAAAAABQABgDAAgDQgFAFgEAFgAAUh4QABgBACgBQgBABgBACQgBAAAAgBgAAlhyQgEADgFADQgDgGgEgFQgYAegPAvQgLAhgMBGQi2gxBRgyQBRg0BRgeAAchsQACgJABgJQADAGADAGQAfA8ATBCQBIjKh6BMAAZBzQgCgQgBgRQgIhfAOhfAgxE1Qgqh9AlggQAmggApgFQADgagBgaQAIAZAEA8QABAPABASQACAcBhgYQhKgHgbgeQgMgOgCgTABXAMQAGAXBLguACMC5QhBA+gKAeQgEAKAEAG");
	this.shape_25.setTransform(14.9822,30.925);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#33FFFF").ss(4,1,1).p("ADTMmQgJgLgJgLQARAIAUgIQATgHAMgRQATgYAGgyQADgQAAgIQgBgNgFgJQgNgWgnAAQggABgcASQgdAUgLAdQgKAgAPAgQAQAgAfAIADVMkQAEgDAEgCQAAAAABABQAAgDABgDQgFAFgFAFQgBABgBACQAAAAAAgBQABgBABgBgADbMyQgEgGgEgFQgZAegPAvQAAACgJgEQABgBAAAAQAPgyAhgZADbMyQABgJACgJQAjBBAUBKQgThAgng5gADXQSQgCgQgBgRQgHhgAOhfADXQSQADgaAAgaQAKAgAEBWQABAcAEAXQgPg6gHg7gAc+yGUAWdARjgvuASqAEVOrQWZ3NrVliEgkJgLsQG4YqQTB+QQRB9AEgnA9yo6UgCDgIAAiXAes");
	this.shape_26.setTransform(-4.0859,-61.75);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("#33FFFF").ss(4,1,1).p("AilKdQgBgBAAAAQARAIAVgIQATgHYBgLQYCgLyPgoQyPgolggNQlegNnBs6QnAs7gkABQgjAAGaM/QGbM9gKAdQgKAgAPAgQAAABAAAAQAkAWAVAMQASAKAHAEQABAAABABQAAgBABAAQAAAAAAABQABgDAAgDQgCACgCADQgDACgCADQADgCAEgCIABAAQAkBBAUBKQgEgNhdhDQgEgCgDgDQAOgeAXgRIAAgBQABgBACgBQgBABgBACQgBAAAAAAIAAgBQgIgLgJgKgA8Dk9QLJGxGVD4QFGDDCBBMQAGALAHAIQAUAMANAIQAYAPAEACIAAAAAjPM6QkskI8CyrQENCoDtCUAjRKOQANAPAUAFAiTKzQgSAWgNAeQgFAMgEANQgIAWgHAoQgCgCgDgCAjKM+QgEATgEAXQABgZACgVQAEgkAIgZQAEgPAGgMQk/jl0Ls6AiPOeQgCgQgBgRQgCgPg2gwAiPOeQADgagBgaQAKAgAEBWQACAcADAXQAGAlANAYQgLgegIgfQgPg6gGg7gAhRM3QAGAXAEAXAjaRgQAmg1AUhAQAMgmAFgnAqlFsQFcDZB4BJ");
	this.shape_27.setTransform(31.8974,-50.175);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#33FFFF").ss(4,1,1).p("AADhqQgIgMgKgLQAQAJAVgIQATgIAMgQQASgYAHgyQADgQAIgZQAJgZgJgQQgJgQgtAPQgrAPgdATQgdATgKAeQgKAfAPAgQAPAgAfAJAAFhsQAEgDAEgDQAAABABAAQAAgDAAgDQgFAFgEAGQgBABgBABQAAAAAAAAQABgBABgBgAALhfQgEgFgEgGQgYAfgPAuQgLAhg7BkQAyhgAMgoQAPgxAggZAALhfQABgJACgJQAjBCAUBJQAGAWAiAkAAHCAQADgZgBgaQAKAfAFBWQABAcAEAXQAFAmA8AGQg6gNgHgfQgPg5gHg8QgCgQgBgQQgHhgAOhfABFAaQgThAgng5AhsE9QBPgvAVhAQALgnAEgn");
	this.shape_28.setTransform(16.75,29.5591);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("#33FFFF").ss(4,1,1).p("AhihqQgIgMgKgLQARAJAVgIQATgIAMgQQASgYAHgyQACgQAJgZQAJgZgKgQQgJgQgsAPQgtAPgcATQgdATgKAeQgKAfAPAgQAPAgAfAJAhfhsQAEgDAEgDQAAABAAAAQABgDAAgDQgFAFgEAGQgBABgBABQgBAAAAAAQABgBACgBgAhahfQgDgFgEgGQgZAfgPAuQgLAhg7BkQAyhgAMgoQAPgxAggZAhRhlQgEADgFADQACgJABgJQADAGADAGQAfA9ATBCQACAJAHALQAKARAUAVAhdCAQADgZgBgaQAFAOADAZQAEAfACAvQACAcADAXQAGAmA7AGQg5gNgIgfQgPg5gGg8QAEgFAGgHQAWgaAngsQA/hKBuh+QC/jbmnEQAgfAaQgThAgog5AjRE9QBPgvAUhAQAMgnAFgn");
	this.shape_29.setTransform(26.8845,29.5591);

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("#33FFFF").ss(4,1,1).p("Av8hDQgJgLgJgLQARAIAUgIQATgHAMgRQATgYAGgyQADgQAIgZQAJgZgJgPQgJgQgtAPQgsAPgcASQgdAUgLAdQgKAgAPAgQAQAgAfAIAv6hFQAEgDAEgCQAAAAABABQAAgDABgDQgFAFgFAFQgBABgBACQAAAAAAgBQABgBABgBgAv0g3QgEgGgEgFQgZAegPAuQgKAhg7BkQAxhgAMgoQAPgxAhgZAv0g3QABgJACgJQAjBBAUBJQAGAXAiAjAv4CoQADgaAAgaQAKAgAEBWQABAcAEAXQgPg6gHg7QgCgQgBgRQgHhgAOheAu6BBQgThAgng4AxsFkQBPgvAVhAQAMgmAEgnARDF9UAFWgXCgl7AVi");
	this.shape_30.setTransform(119.1351,25.6042);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f().s("#33FFFF").ss(4,1,1).p("AvUkEQgJgLgJgLQARAIAUgIQATgHAMgRQATgYAGgyQADgQAJgZQAIgZgJgQQgJgPgtAPQgsAPgcASQgdAUgLAdQgKAgAPAgQAQAgAfAIAvSkGQAEgDAEgCQAAAAABABQAAgDABgDQgFAFgFAFQgBABgBACQAAAAAAgBQABgBABgBgAvMj4QgEgGgEgFQgZAegPAvQgKAhg7BkQAxhgAMgoQAPgyAhgZAvMj4QABgJACgJQAjBBAUBKQAGAXAiAjAvQgYQADgaAAgaQAKAgAEBVQABAcAEAXQgPg6gHg6QgCgQgBgRQgHhgAOhfAuSh/QgThAgng5AxECjQBPgvAVhAQAMgmAEgmAOqIWUALNgddgoxAWj");
	this.shape_31.setTransform(115.106,44.9418);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f().s("#33FFFF").ss(4,1,1).p("Aydh6QgIgLgKgLQARAIAVgIQATgHAMgRQASgYAHgyQACgQAJgZQAJgZgKgQQgJgPgsAPQgtAPgcASQgdAUgKAdQgKAgAPAgQAPAgAfAIAyah8QAEgDAEgCQAAAAAAABQABgDAAgDQgFAFgEAFQgBABgBACQgBAAAAgBQABgBACgBgAyVhuQgDgGgEgFQgZAegPAvQgLAhg7BjQAyhfAMgoQAPgyAggZAyVhuQACgJABgJQAkBBAUBJQAGAXAiAjAyYBxQADgagBgaQAKAgAEBWQACAcADAXQgPg6gGg7QgCgQgBgRQgIhfAOhfAxaAKQgTg/gog5A0MEtQBPgvAUhAQAMgmAFgnAUNFNQodwx9zPK");
	this.shape_32.setTransform(135.175,31.1341);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("#33FFFF").ss(4,1,1).p("AzphXQgIgMgKgLQARAJAVgIQATgIAMgQQASgYAHgyQACgQAJgZQAJgZgKgQQgJgQgsAPQgtAPgcATQgdATgKAeQgKAfAPAgQAPAgAfAJAzmhZQAEgDAEgDQAAABAAAAQABgDAAgDQgFAFgEAGQgBABgBABQgBAAAAAAQABgBACgBgAzhhMQgDgFgEgGQgZAfgPAuQgLAhg7BkQAyhgAMgoQAPgxAggZAzhhMQACgJABgJQAkBCAUBJQAGAWAiAkAzkCTQADgZgBgaQAKAfAEBWQACAcADAXQgPg5gGg8QgCgQgBgQQgIhhAOheAymAtQgThAgog5A1YFQQBPgvAUhAQAMgnAFgnAVZhqQq1pX9zPJ");
	this.shape_33.setTransform(142.775,27.6625);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f().s("#33FFFF").ss(4,1,1).p("Ay3FuQgJgMgJgLQARAJAUgIQATgIAMgQQATgYAGgyQADgQAJgZQAIgZgJgQQgJgQgtAPQgsAPgcATQgdATgLAeQgKAfAPAgQAQAgAfAJAy1FsQAEgDAEgDQAAABABAAQAAgDABgDQgFAFgFAGQgBABgBABQAAAAAAAAQABgBABgBgAyvF5QgEgFgEgGQgZAfgPAuQgKAig7BkQAxhgAMgpQAPgxAhgZAyvF5QABgJACgJQAjBCAUBKQAGAWAiAkAyzJZQADgZAAgaQAKAfAEBWQABAcAEAXQgPg5gHg8QgCgQgBgQQgHhhAOhfAx1HzQgThBgng5A0nMWQBPgvAVhAQAMgnAEgnAUosVQpSIZ9zPK");
	this.shape_34.setTransform(137.8,-17.725);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f().s("#33FFFF").ss(4,1,1).p("AqYM9QgIgMgKgLQARAJAVgIQATgIAMgQQASgYAHgyQACgQAJgZQAJgZgJgQQgKgQgsAPQgtAPgcATQgdATgKAeQgKAfAPAgQAPAgAfAJAqVM7QAEgDAEgDQAAABAAAAQABgDAAgDQgFAFgEAGQgBABgBABQgBAAAAAAQABgBACgBgAqQNIQgDgFgEgGQgZAfgPAuQgLAig7BkQAyhgAMgpQAPgxAggZAqQNIQACgJABgJQAkBCAUBKQAGAWAiAkAqTQoQADgZgBgaQAKAfAEBWQACAcADAXQgPg5gGg8QgCgQgBgQQgIhhAOhfApVPCQgThBgog5AsHTlQBPgvAUhAQAMgnAFgnAJczkQKZW29zPL");
	this.shape_35.setTransform(83.4534,-64);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f().s("#33FFFF").ss(4,1,1).p("AnyFZQgJgLgJgLQARAIAUgIQATgHAMgRQATgYAGgyQADgQAIgZQAJgZgJgQQgJgPgtAPQgsAPgcASQgdAUgLAdQgKAgAPAgQAQAgAfAIAnwFXQAEgDAEgCQAAAAABABQAAgDABgDQgFAFgFAFQgBABgBACQAAAAAAgBQABgBABgBgAnqFlQgEgGgEgFQgZAegPAvQgKAhg7BkQAxhgAMgoQAPgyAhgZAnqFlQABgJACgJQAjBBAUBKQAGAXAiAjAnuJFQADgaAAgaQAKAgAEBWQABAcAEAXQgPg6gHg7QgCgQgBgRQgHhgAOhfAmwHeQgThAgng5ApiMBQBPgvAVhAQAMgmAEgnAgOsAQWpHw9zPK");
	this.shape_36.setTransform(66.929,-15.675);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f().s("#33FFFF").ss(4,1,1).p("AmnEwQgIgMgKgKQARAIAVgIQATgIAMgQQASgYAHgyQACgQAJgZQAJgZgJgQQgKgQgsAPQgtAPgcATQgdATgKAeQgKAfAPAgQAPAgAfAJAmkEuQAEgDAEgCQAAAAAAAAQABgDAAgCQgFAFgEAFQgBABgBABQgBAAAAAAQABgBACgBgAmfE8QgDgGgEgGQgZAfgPAvQgLAhg7BkQAyhgAMgpQAPgxAggZAmfE8QACgJABgKQAkBCAUBKQAGAWAiAkAmiIcQADgagBgaQAKAgAEBWQACAcADAXQgPg6gGg7QgCgQgBgRQgIhgAOhfAlkG1QgThAgog5AoWLYQBPgvAUhAQAMgmAFgnAnkrXQfKGe9zPK");
	this.shape_37.setTransform(59.3599,-11.55);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f().s("#33FFFF").ss(4,1,1).p("ABaKBQgJgLgJgLQARAIAUgIQATgHAMgRQATgYAGgyQADgQAIgZQAJgZgJgQQgJgPgtAPQgsAPgcASQgdAUgLAdQgKAgAPAgQAQAgAfAIABcJ/QAEgDAEgCQAAAAABABQAAgDABgDQgFAFgFAFQgBABgBACQAAAAAAgBQABgBABgBgABiKNQgEgGgEgFQgZAegPAvQgKAhg6BkQAwhgAMgoQAPgyAhgZABiKNQABgJACgJQAjBBAUBKQAGAXAiAjABeNtQADgaAAgaQAKAgAEBWQABAcAEAXQgPg6gHg7QgCgQgBgRQgHhgAOhfACcMGQgThAgng5AgVQpQBOgvAVhAQAMgmAEgnAtowoUAtQAQ/gd0APL");
	this.shape_38.setTransform(8.0303,-45.25);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f().s("#33FFFF").ss(4,1,1).p("As4gpQgCgEgCgEQgJgQgtAPQgsAPgcASQgdATgLAdQgKAgAPAgQAQAgAfAIAs4gpQAKgEALgEQAJgDAJgDUA5bgT0g7CAcjQgPg6gHg7QADgaAAgaQAKAgAEBWQABAcAEAXAuSCXQgJgLgJgLQARAIAUgIQATgHAMgRQATgYAGgyQADgQAJgYQAGgSgDgOAuQCVQAEgDAEgCQAAAAABABQAAgDABgDQgFAFgFAFQgBABgBACQAAAAAAgBQABgBABgBgAuKCjQgEgGgEgFQgZAegPAvQgKAhg7BkQAxhgAMgoQAPgyAhgZAuKCjQABgJACgJQAjBBAUBKQAGAXAiAjAuOGDQgCgQgBgRQgHhgAOhfAtQEcQgThAgng5AwCI/QBPgvAVhAQAMgmAEgn");
	this.shape_39.setTransform(108.5175,3.7022);

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f().s("#33FFFF").ss(0.2,1,1).p("AAZgOQABABgIAFQgHAEgKAFQgJAGgIAEQgIAEAAgBQAAAAAHgEQAHgFAKgFQAKgGAHgEQAIgEAAAAg");
	this.shape_40.setTransform(8.5266,14.2006);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f().s("#33FFFF").ss(4,1,1).p("Auvg0QgCgFgBAAQgQgJgkAqQglApgYAqQgZArAVANQAVANAdAVQAdATAfgIAuSAVQAAgBgBgBQgBgDgCgEQgEgNgEgVQgDgTAPA+QAAABAAABQAAgCgBgCQAAAAAAAAQgBgDgCgEQgTgygGgOAuZCgQgMgFgOgFQATgCANgRQANgQACgUQAEgdgSgtQgRhQgMAHAuXCdQACgEACgEIABAAQgBgDgBgDQgCAHgBAHQgBACAAABQAAAAgBAAQABgBABgCgAuMCmQgDgIgDgJQA8AlA0AyQgvgqg7gcQgGgDgGgDQgGAnAKAwQAIAigBB0QgGhrgJgpQgMgzAPgmAsiDsIAGAGQAEAFAHAEQASALAiAKAsRFoQAPAVATAeQALARAKAOQAAAAgBAAQgdgegZghQgHgIgHgJQgJgNgKgOQg2hQgkhZAsRGNQgGgSgIgRQgKgYgNgWQAOANAXAfAsRIdQAVg4gKgwQgFgUgGgUArDGvQgLAFgMAGQAEAFAEAFQgEgFgFgFQgJAFgJAEAqYFwQgCADgCADQgTAcgUAdQgHALgIAKAslJHQAMgWAIgUAphANQh1hQALgEAqzhPUA3SgTCg3iAbA");
	this.shape_41.setTransform(103.8316,4.477);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f("#660000").s().p("AgYAOIAHgEIARgKIARgKIAIgEIgHAGIgRAJIgRAKIgIAEIAAgBg");
	this.shape_42.setTransform(8.5266,14.2006);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f().s("#33FFFF").ss(0.2,1,1).p("AAOgYQABAAgEAIQgEAHgGAKQgEAKgFAHQgFAHgBAAQAAgBAEgHQAEgHAGgKQAFgKAFgHg");
	this.shape_43.setTransform(0.26,31.1017);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f().s("#33FFFF").ss(4,1,1).p("AurEeQgBgFAAgEIABgBQgCgBgCgCQACAHACAGQAAACABABQAOAlAhAlQAXAZA6BlQg7hagdgfQgjgmgGgpQAAgBAAgCgAudEgQgGABgHAAQAAAAgBAAQgOACgOADQAQgLADgVQADgVgIgSQgMgcgmgeQgBAAAAAAIgBgBQgCgBgCgCAudEgQgHgFgHgHQBHADBGASIAIABQAGACAHAAAseEpQg+gOhBAFAroGLQgQgLgQgJQALADARAGQALAFANAFQgNgPgLgPArdGTQgGgEgFgEQgCgFgCgGArsINQAVg3gKgwQgDgMgDgLQgBgCAAgCArdGTQgFgCgFgCQgKgFgJgEQhXgqhMg8Aq/GrQgOgNgQgLArIGcQgLgEgKgFArsFZQAPAVATAdQAKASALAOQAEAFAEAFQgFgFgEgFQgQgQgOgRAqeGgQgLAFgMAGQgBAAAAAAQgJAFgJAEApzFgQgCADgCADQgTAdgUAdQgHAKgIALArsDrQASAMAiAKApzJWQgBgZgEgWAwpB0QgEgDgBAAQgSABgKA2QgLA3AAAwQAAAyAZAAQAYACAjADQAkACAWgWAvrClQAAABABAAQgCgBAAAAQgDgCgCgCIgBgBQgLgKgOgQQgMgPAsAuQg3g9gHAMAvyCgQgrgjgMgJAo8gBQh1hRALgEAqOheUA3SgTCg3iAbA");
	this.shape_44.setTransform(100.1413,6.002);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f("#660000").s().p("AgOAZIAEgIIAKgRIAKgRIAEgHQABAAgEAIIgKARIgJARQgEAHgBAAIgBAAg");
	this.shape_45.setTransform(0.26,31.1017);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f().s("#33FFFF").ss(0.2,1,1).p("AAdAAQAAAAgIABQgJAAgMAAQgLAAgJAAQgIgBAAAAQAAAAAIAAQAJgBALAAQAMAAAJABQAIAAAAAAg");
	this.shape_46.setTransform(25,25.95);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f().s("#33FFFF").ss(4,1,1).p("AADhqQgIgMgKgLQAQAJAVgIQATgIAMgQQASgYAHgyQACgQAJgZQAJgZgJgQQgKgQgsAPQgsAPgcATQgdATgKAeQgKAfAPAgQAPAgAfAJAADhqQAAgBACgBQgBABgBABQAAAAAAAAgAANhxQABgDAAgDQgFAFgEAGQAEgDAEgDQAAABAAAAQAkBCAUBJQgThAgog5QACgJABgJgAAKhfQgDgFgEgGQgYAfgPAuQgLAhg7BkQAyhgAMgoQAPgxAggZAAcD1QgPg5gGg8QgCgQgBgQQgHhgANhfAhsE9QBPgvAUhAQAMgnAEgnQADgZgBgaQAKAfAEBWQACAcADAXQAGAmA8AGQg6gNgIgfABFAaQAGAWAiAk");
	this.shape_47.setTransform(24.35,43.6621);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f("#660000").s().p("AgUABIgIgBIAIAAIAUAAIAVAAIAIAAIgIABIgVABIgUgBg");
	this.shape_48.setTransform(25,25.95);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f().s("#33FFFF").ss(0.2,1,1).p("AAdAAQAAABgJAAQgIAAgMAAQgLAAgIAAQgJAAAAgBQAAAAAJAAQAIAAALAAQAMAAAIAAQAJAAAAAAg");
	this.shape_49.setTransform(36.75,3.65);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f().s("#33FFFF").ss(4,1,1).p("AADhqQgIgMgKgLQAQAJAVgIQATgIAMgQQASgYAHgyQACgQAJgZQAJgZgJgQQgKgQgsAPQgsAPgcATQgdATgKAeQgKAfAPAgQAPAgAfAJABFAaQAGAWAiAkAAFhsQAEgDAEgDQAAABABAAQAAgDAAgDQgFAFgEAGgAADhqQABgBABgBQgBABgBABQAAAAAAAAgAAKhfQACgJACgJQAjBCAUBJQgThAgog5QgDgFgEgGQgYAfgPAuQgLAhg7BkQAyhgAMgoQAPgxAggZAAHCAQgCgQgBgQQgHhgANhfAAHCAQADgZgBgaQAKAfAFBWQABAcAEAXQgPg5gHg8gAhsE9QBPgvAUhAQAMgnAEgnAAdD1QAFAmA8AGQg6gNgHgfg");
	this.shape_50.setTransform(36.1,21.3621);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f("#660000").s().p("AgTABIgJgBIAJAAIATAAIAUAAIAJAAIgJABIgUAAIgTAAg");
	this.shape_51.setTransform(36.75,3.65);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f().s("#33FFFF").ss(0.2,1,1).p("AAdAAQAAABgIAAQgJABgMAAQgLAAgJgBQgIAAAAgBQAAAAAIAAQAJgBALAAQAMAAAJABQAIAAAAAAg");
	this.shape_52.setTransform(5.1,14);

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f().s("#33FFFF").ss(4,1,1).p("AAChqQgHgMgKgLQAQAJAVgIQATgIAMgQQASgYAHgyQACgQAKgZQAIgZgJgQQgJgQgtAPQgsAPgcATQgdATgKAeQgKAfAPAgQAPAgAfAJAADhqQgBAAAAAAQABgBACgBQgBABgBABQgYAfgPAuQgLAhg7BkQAyhgAMgoQAPgxAfgZAANhxQABgDAAgDQgFAFgEAGQAEgDAEgDQAAABAAAAQAkBCAUBJQAGAWAiAkAAKhfQACgJABgJAAKhfQgDgFgEgGAAHCAQADgZgBgaQAKAfAEBWQACAcADAXQAGAmA8AGQg6gNgIgfQgPg5gGg8QgCgQgBgQQgHhgANhfABFAaQgThAgog5AhsE9QBPgvAUhAQALgnAFgn");
	this.shape_53.setTransform(4.45,31.7121);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f().s("#33FFFF").ss(4,1,1).p("AiJgHQD7giAQgHQATgHAMgRQASgYAHgyQACgQAJgZQAJgZgKgPQgJgQgsAPQgtAPgcASQgdAUgKAdQgKAgAPAgQAPAgAfAIABxgcQADgCAFgDQAAAAAAABQAAgDABgDQgFAFgEAFQgCABAAACQgBAAAAAAQABgCACgBgAB2gOQgDgGgEgFQgZAdgPAvQgLAig7BkQAyhgAMgpQAPgwAggZQgGgJjxAbAB2gOQACgJABgJQAkBBAUBJQADAOANARQAJANAPAPABzDRQADgZgBgaQAKAfAEBWQACAcADAXQgPg5gGg8QgCgQgCgQQgHhhAOheACxBqQgThAgog4AgBGOQBPgvAUhAQAMgnAFgnACIFGQADAUA2jRQAui0BVliAlDAQQBqgOBQgJ");
	this.shape_54.setTransform(6,21.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape}]}).to({state:[{t:this.shape_1}]},2).to({state:[{t:this.shape_2}]},2).to({state:[{t:this.shape_3}]},2).to({state:[{t:this.shape_4}]},2).to({state:[{t:this.shape_5}]},2).to({state:[{t:this.shape_6}]},2).to({state:[{t:this.shape_7}]},2).to({state:[{t:this.shape_8}]},2).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11}]},4).to({state:[{t:this.shape_15},{t:this.shape_12},{t:this.shape_14}]},2).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11}]},2).to({state:[{t:this.shape_17},{t:this.shape_12},{t:this.shape_16}]},2).to({state:[{t:this.shape_20},{t:this.shape_19},{t:this.shape_18}]},2).to({state:[{t:this.shape_22},{t:this.shape_19},{t:this.shape_21}]},2).to({state:[{t:this.shape_13},{t:this.shape_12},{t:this.shape_11}]},2).to({state:[{t:this.shape_13},{t:this.shape_23},{t:this.shape_11}]},1).to({state:[{t:this.shape_13},{t:this.shape_24},{t:this.shape_11}]},2).to({state:[{t:this.shape_13},{t:this.shape_11},{t:this.shape_25}]},2).to({state:[{t:this.shape_13},{t:this.shape_26},{t:this.shape_11}]},2).to({state:[{t:this.shape_13},{t:this.shape_27},{t:this.shape_11}]},2).to({state:[{t:this.shape_13},{t:this.shape_28},{t:this.shape_11}]},2).to({state:[{t:this.shape_13},{t:this.shape_28},{t:this.shape_11}]},2).to({state:[{t:this.shape_13},{t:this.shape_28},{t:this.shape_11}]},2).to({state:[{t:this.shape_13},{t:this.shape_28},{t:this.shape_11}]},2).to({state:[{t:this.shape_13},{t:this.shape_28},{t:this.shape_11}]},2).to({state:[{t:this.shape_13},{t:this.shape_29},{t:this.shape_11}]},2).to({state:[{t:this.shape_13},{t:this.shape_28},{t:this.shape_11}]},2).to({state:[{t:this.shape_13},{t:this.shape_30},{t:this.shape_11}]},23).to({state:[{t:this.shape_13},{t:this.shape_31},{t:this.shape_11}]},2).to({state:[{t:this.shape_13},{t:this.shape_32},{t:this.shape_11}]},3).to({state:[{t:this.shape_13},{t:this.shape_33},{t:this.shape_11}]},3).to({state:[{t:this.shape_13},{t:this.shape_34},{t:this.shape_11}]},3).to({state:[{t:this.shape_13},{t:this.shape_35},{t:this.shape_11}]},5).to({state:[{t:this.shape_13},{t:this.shape_36},{t:this.shape_11}]},8).to({state:[{t:this.shape_13},{t:this.shape_37},{t:this.shape_11}]},3).to({state:[{t:this.shape_13},{t:this.shape_38},{t:this.shape_11}]},1).to({state:[{t:this.shape_13},{t:this.shape_39},{t:this.shape_11}]},2).to({state:[{t:this.shape_42},{t:this.shape_41},{t:this.shape_40}]},3).to({state:[{t:this.shape_45},{t:this.shape_44},{t:this.shape_43}]},2).to({state:[{t:this.shape_13},{t:this.shape_28},{t:this.shape_11}]},7).to({state:[{t:this.shape_13},{t:this.shape_28},{t:this.shape_11}]},2).to({state:[{t:this.shape_13},{t:this.shape_28},{t:this.shape_11}]},2).to({state:[{t:this.shape_13},{t:this.shape_28},{t:this.shape_11}]},2).to({state:[{t:this.shape_48},{t:this.shape_47},{t:this.shape_46}]},2).to({state:[{t:this.shape_13},{t:this.shape_28},{t:this.shape_11}]},2).to({state:[{t:this.shape_13},{t:this.shape_28},{t:this.shape_11}]},2).to({state:[{t:this.shape_13},{t:this.shape_28},{t:this.shape_11}]},2).to({state:[{t:this.shape_51,p:{x:36.75,y:3.65}},{t:this.shape_50},{t:this.shape_49}]},2).to({state:[{t:this.shape_13},{t:this.shape_28},{t:this.shape_11}]},2).to({state:[{t:this.shape_51,p:{x:5.1,y:14}},{t:this.shape_53},{t:this.shape_52}]},2).to({state:[{t:this.shape_13},{t:this.shape_54},{t:this.shape_11}]},2).to({state:[{t:this.shape_13},{t:this.shape_28},{t:this.shape_11}]},2).to({state:[{t:this.shape_13},{t:this.shape_28},{t:this.shape_11}]},2).wait(1));

	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-237.5,-191.2,519.2,291.6);


(lib.EvenLessOfOne = function(mode,startPosition,loop,reversed) {
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
	this.shape.graphics.f().s("#33FFFF").ss(4,1,1).p("AADguQgIgLgJgLQAQAIAUgIQATgHAMgRQATgYAGgyQADgQAAgIQgBgNgFgJQgNgWgnAAQgfABgcASQgdAUgLAdQgKAgAPAgQAQAgAfAIAAFgwQAEgDAEgCQAAAAABABQAAgDABgDQgFAFgFAFQgBABgBACQAAAAAAgBQABgBABgBgAALgiQgEgGgEgFQgYAegPAuQgKAhgMBHQAChDAMgoQAPgxAggZAALgiQABgJACgJQAjBAAUBKQAGAXAFAXAAHC9QgCgQgBgRQgGhgANheAAHC9QADgaAAgaQAJAcAEBGAAODrQgEgXgDgXAAADrQAFgXACgXABFBWQgThAgng4");
	this.shape.setTransform(8.075,23.525);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.EvenLessOfOne, new cjs.Rectangle(-2,-2,20.2,51.1), null);


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


(lib.NotTheButton = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Layer_4
	this.shape = new cjs.Shape();
	this.shape.graphics.f("rgba(153,153,153,0.02)").s().p("AiHFTIAAqkIEPAAIAAKkg");
	this.shape.setTransform(7.85,32.2);
	this.shape._off = true;

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(3).to({_off:false},0).wait(1));

	// Layer_3
	this.notTheOneInTheButton = new lib.NotTheOne();
	this.notTheOneInTheButton.name = "notTheOneInTheButton";
	this.notTheOneInTheButton.setTransform(8.1,30.9,1,1,0,0,0,8.1,30.9);
	this.notTheOneInTheButton._off = true;
	var notTheOneInTheButtonFilter_1 = new cjs.ColorFilter(1,1,1,1,0,0,0,0);
	this.notTheOneInTheButton.filters = [notTheOneInTheButtonFilter_1];
	this.notTheOneInTheButton.cache(-239,-193,523,296);

	this.timeline.addTween(cjs.Tween.get(this.notTheOneInTheButton).wait(2).to({_off:false},0).to({_off:true},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(notTheOneInTheButtonFilter_1).wait(2).to(new cjs.ColorFilter(0.61,0.61,0.61,1,85.8,55.38,99.45,0), 0).wait(1));

	// Layer_2
	this.instance = new lib.CachedBmp_9();
	this.instance.setTransform(45.45,8.15,0.2894,0.2894);

	this.instance_1 = new lib.CachedBmp_8();
	this.instance_1.setTransform(27.5,-36.35,0.2894,0.2894);

	this.instance_2 = new lib.CachedBmp_7();
	this.instance_2.setTransform(-1.95,-1.95,0.2894,0.2894);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]},1).to({state:[]},1).wait(2));

	// Layer_1
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#33FFFF").ss(4,1,1).p("AADh4QgIgLgJgLQAQAIAUgIQATgHAMgRQATgYAGgyQADgQAAgIQgBgNgFgJQgNgWgnAAQgfABgcASQgdAUgLAdQgKAgAPAgQAQAgAfAIAAFh6QAEgDAEgCQAAAAABABQAAgDABgDQgFAFgFAFgAALhsQgEgGgEgFQgYAegPAvQgKAhgMBGQAChCAMgoQAPgyAggZQABgBABgBQgBABgBACQAAAAAAgBAALhsQABgJACgJQAjBBAUBJQAGAXAFAXAAHBzQgCgQgBgRQgGhfANhfAAHBzQADgaAAgaQAKAgAEBWQABAcAEAXQAGAlAMAYQgKgegIgfQgPg6gHg7gABFAMQgTg/gng5AhDE1QAmg1AVhAQALgmAEgn");
	this.shape_1.setTransform(8.075,30.925);

	this.timeline.addTween(cjs.Tween.get(this.shape_1).to({_off:true},1).wait(3));

	this.filterCacheList = [];
	this.filterCacheList.push({instance: this.notTheOneInTheButton, startFrame:2, endFrame:2, x:-239, y:-193, w:523, h:296});
	this.filterCacheList.push({instance: this.notTheOneInTheButton, startFrame:0, endFrame:0, x:-239, y:-193, w:523, h:296});
	this.filterCacheList.push({instance: this.notTheOneInTheButton, startFrame:3, endFrame:3, x:-239, y:-193, w:523, h:296});
	this.filterCacheList.push({instance: this.notTheOneInTheButton, startFrame:3, endFrame:4, x:-239, y:-193, w:523, h:296});
	this._renderFirstFrame();

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-5.7,-36.3,61.300000000000004,133.7);


// stage content:
(lib.FrameByFrameModule6Revisions = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {firstDecisionButtons:314,stopMainChar:90};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0,2,34,90,117,133,148,162,259,314,315,316,352,373,419,433,435,458,481];
	this.streamSoundSymbolsList[34] = [{id:"mixkittribaldrummingambience572mp3cutnetwav",startFrame:34,endFrame:555,loop:1,offset:0}];
	this.streamSoundSymbolsList[148] = [{id:"ohgeezwav",startFrame:148,endFrame:352,loop:1,offset:0}];
	this.streamSoundSymbolsList[315] = [{id:"mixkitretrogamenotification212wav",startFrame:315,endFrame:435,loop:1,offset:0}];
	this.streamSoundSymbolsList[352] = [{id:"turnTheGuidesOffwav",startFrame:352,endFrame:555,loop:1,offset:0}];
	this.streamSoundSymbolsList[435] = [{id:"mixkitretrogamenotification212wav",startFrame:435,endFrame:458,loop:1,offset:0}];
	this.streamSoundSymbolsList[458] = [{id:"mixkitretrogamenotification212wav",startFrame:458,endFrame:481,loop:1,offset:0}];
	this.streamSoundSymbolsList[481] = [{id:"mixkitretrogamenotification212wav",startFrame:481,endFrame:555,loop:1,offset:0}];
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
	this.frame_2 = function() {
		playSound("mixkitretrogamenotification212wav");
	}
	this.frame_34 = function() {
		var soundInstance = playSound("mixkittribaldrummingambience572mp3cutnetwav",0);
		this.InsertIntoSoundStreamData(soundInstance,34,555,1);
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
		_this.notTheButton.on("pressmove", moveChar);
		_this.notTheButton.on("stagemouseup", dropChar);
		
		function moveChar(e) {
			e.currentTarget.x = (e.stageX / stage.scaleX);
			e.currentTarget.y = (e.stageY / stage.scaleY);
			e.currentTarget.on("mouseup", dropChar);	
		}
		
		function dropChar(e) {
			_this.TheNottestOne.gotoAndStop('justStanding');
		}
		
		var _this = this;
		/*
		Mousing over the specified symbol instance executes a function.
		'3' is the number of the times event should be triggered.
		*/
		stage.enableMouseOver(3);
		
		_this.notTheButton.on('mousedown', function(){
		/*
		Moves the playhead to the specified frame number in the timeline and continues playback from that frame.
		Can be used on the main timeline or on movie clip timelines.
		*/
			_this.notTheButton.notTheOneInTheButton.gotoAndPlay('flailing');
		});
	}
	this.frame_315 = function() {
		var soundInstance = playSound("mixkitretrogamenotification212wav",0);
		this.InsertIntoSoundStreamData(soundInstance,315,435,1);
	}
	this.frame_316 = function() {
		var _this = this;
		/*
		Moves the playhead to the specified frame label in the timeline and stops the movie.
		Can be used on the main timeline or on movie clip timelines.
		*/
		_this.TheNottestOne.gotoAndStop('justStanding');
	}
	this.frame_352 = function() {
		var soundInstance = playSound("turnTheGuidesOffwav",0);
		this.InsertIntoSoundStreamData(soundInstance,352,555,1);
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
	this.frame_435 = function() {
		var soundInstance = playSound("mixkitretrogamenotification212wav",0);
		this.InsertIntoSoundStreamData(soundInstance,435,458,1);
	}
	this.frame_458 = function() {
		var soundInstance = playSound("mixkitretrogamenotification212wav",0);
		this.InsertIntoSoundStreamData(soundInstance,458,481,1);
	}
	this.frame_481 = function() {
		var soundInstance = playSound("mixkitretrogamenotification212wav",0);
		this.InsertIntoSoundStreamData(soundInstance,481,555,1);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(2).call(this.frame_2).wait(32).call(this.frame_34).wait(56).call(this.frame_90).wait(27).call(this.frame_117).wait(16).call(this.frame_133).wait(15).call(this.frame_148).wait(14).call(this.frame_162).wait(97).call(this.frame_259).wait(55).call(this.frame_314).wait(1).call(this.frame_315).wait(1).call(this.frame_316).wait(36).call(this.frame_352).wait(21).call(this.frame_373).wait(46).call(this.frame_419).wait(14).call(this.frame_433).wait(2).call(this.frame_435).wait(23).call(this.frame_458).wait(23).call(this.frame_481).wait(74));

	// startBtn
	this.startButton = new lib.startBtn();
	this.startButton.name = "startButton";
	this.startButton.setTransform(302,70);
	new cjs.ButtonHelper(this.startButton, 0, 1, 2);

	this.timeline.addTween(cjs.Tween.get(this.startButton).wait(2).to({alpha:0.8984},0).wait(2).to({alpha:0.8008},0).wait(2).to({alpha:0.6992},0).wait(2).to({alpha:0.6016},0).wait(2).to({alpha:0.5},0).wait(2).to({alpha:0.3984},0).wait(2).to({alpha:0.2891},0).wait(2).to({alpha:0.1992},0).wait(2).to({alpha:0.1016},0).to({_off:true},2).wait(535));

	// decisions
	this.keepSuffering = new lib.genericBtnFrame();
	this.keepSuffering.name = "keepSuffering";
	this.keepSuffering.setTransform(63.5,110.4,0.5644,0.5644);
	new cjs.ButtonHelper(this.keepSuffering, 0, 1, 2);

	this.text = new cjs.Text("Keep Suffering", "20px 'Trattatello'", "#00FF00");
	this.text.textAlign = "center";
	this.text.lineHeight = 38;
	this.text.lineWidth = 117;
	this.text.alpha = 0.72941176;
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
	this.text_1.alpha = 0.72941176;
	this.text_1.parent = this;
	this.text_1.setTransform(147.3,45.85);

	this.turnGuidesOff = new lib.genericBtnFrame();
	this.turnGuidesOff.name = "turnGuidesOff";
	this.turnGuidesOff.setTransform(59.25,110.5,0.5644,0.5644);
	new cjs.ButtonHelper(this.turnGuidesOff, 0, 1, 2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.text_1,p:{x:147.3,y:45.85}},{t:this.quitNow,p:{x:63.5,y:35.45}},{t:this.text,p:{x:150.3,y:120.8,text:"Keep Suffering"}},{t:this.keepSuffering}]},314).to({state:[]},2).to({state:[{t:this.text_1,p:{x:143.05,y:44.35}},{t:this.quitNow,p:{x:59.25,y:33.95}},{t:this.text,p:{x:146.05,y:119.3,text:"Turn Guides Off"}},{t:this.turnGuidesOff}]},117).to({state:[]},2).wait(120));

	// notTheButton
	this.notTheButton = new lib.NotTheButton();
	this.notTheButton.name = "notTheButton";
	this.notTheButton.setTransform(468.95,455,1.7275,1.7275,0,0,0,0,0.1);
	this.notTheButton._off = true;
	new cjs.ButtonHelper(this.notTheButton, 0, 1, 2, false, new lib.NotTheButton(), 3);

	this.timeline.addTween(cjs.Tween.get(this.notTheButton).wait(314).to({_off:false},0).to({_off:true},2).wait(239));
	this.notTheButton.addEventListener("tick", AdobeAn.handleFilterCache);

	// not_one
	this.TheNottestOne = new lib.NotTheOne();
	this.TheNottestOne.name = "TheNottestOne";
	this.TheNottestOne.setTransform(-17.4,508.35,1.7072,1.7072,0,0,0,8,30.9);
	this.TheNottestOne._off = true;

	this.instance = new lib.EvenLessOfOne();
	this.instance.setTransform(431.45,545.75,1.6383,1.6383,-90,0,0,8.1,23.4);

	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#33FFFF").ss(7,1,1).p("AiBhAQAGABAIgDQADgBAKgFQAMgDAZAAIA6ABQAGAAAKAAQAJAAAHgDQACgBAWgLQAWgLATAHAiogiQATAJAVAGQAZAHAoAGQA8AKAFABQAwAJAzANQAfAKAMAOQAEAGAHASQAHAPAHAG");
	this.shape.setTransform(493.875,549.36);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[]}).to({state:[{t:this.TheNottestOne}]},17).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},1).to({state:[{t:this.TheNottestOne}]},184).to({state:[{t:this.TheNottestOne}]},3).to({state:[{t:this.TheNottestOne}]},144).to({state:[{t:this.TheNottestOne}]},2).to({state:[{t:this.TheNottestOne}]},2).to({state:[{t:this.TheNottestOne}]},2).to({state:[{t:this.TheNottestOne}]},2).to({state:[{t:this.TheNottestOne}]},2).to({state:[{t:this.shape},{t:this.instance,p:{rotation:-90,x:431.45,y:545.75,regY:23.4,scaleX:1.6383,scaleY:1.6383}}]},12).to({state:[{t:this.shape},{t:this.instance,p:{rotation:-90,x:431.45,y:545.75,regY:23.4,scaleX:1.6383,scaleY:1.6383}}]},24).to({state:[{t:this.shape},{t:this.instance,p:{rotation:-75.0008,x:424.5,y:545.7,regY:23.4,scaleX:1.6383,scaleY:1.6383}}]},3).to({state:[{t:this.shape},{t:this.instance,p:{rotation:-60.0015,x:414.65,y:542.25,regY:23.5,scaleX:1.6382,scaleY:1.6382}}]},4).to({state:[{t:this.shape},{t:this.instance,p:{rotation:-45.0019,x:406.65,y:536.2,regY:23.5,scaleX:1.6382,scaleY:1.6382}}]},2).to({state:[{t:this.shape},{t:this.instance,p:{rotation:-30.0034,x:398.7,y:530.45,regY:23.5,scaleX:1.6382,scaleY:1.6382}}]},2).to({state:[{t:this.shape},{t:this.instance,p:{rotation:-15.0035,x:387.75,y:521.35,regY:23.6,scaleX:1.6382,scaleY:1.6382}}]},2).to({state:[{t:this.shape},{t:this.instance,p:{rotation:-0.0027,x:394.6,y:520.55,regY:23.6,scaleX:1.6382,scaleY:1.6382}}]},2).wait(34));
	this.timeline.addTween(cjs.Tween.get(this.TheNottestOne).wait(17).to({_off:false},0).wait(1).to({x:-10.55},0).wait(1).to({regX:8.1,x:-3.55},0).wait(1).to({regX:8,x:3.25},0).wait(1).to({x:10},0).wait(1).to({regX:8.1,x:17.05},0).wait(1).to({x:23.9},0).wait(1).to({x:30.8},0).wait(1).to({x:37.65},0).wait(1).to({x:44.55},0).wait(1).to({x:51.35},0).wait(1).to({x:58.2},0).wait(1).to({x:65.1},0).wait(1).to({x:71.95},0).wait(1).to({x:78.85},0).wait(1).to({x:85.65},0).wait(1).to({x:92.55},0).wait(1).to({x:99.4},0).wait(1).to({x:106.3},0).wait(1).to({x:113.15},0).wait(1).to({x:120.1},0).wait(1).to({x:126.9},0).wait(1).to({x:133.75},0).wait(1).to({x:140.65},0).wait(1).to({x:147.5},0).wait(1).to({x:154.4},0).wait(1).to({x:161.25},0).wait(1).to({x:168.15},0).wait(1).to({x:174.95},0).wait(1).to({x:181.85},0).wait(1).to({x:188.7},0).wait(1).to({x:195.6},0).wait(1).to({x:202.45},0).wait(1).to({x:209.25},0).wait(1).to({x:216.15},0).wait(1).to({x:223},0).wait(1).to({x:229.95},0).wait(1).to({x:236.8},0).wait(1).to({x:243.7},0).wait(1).to({x:250.5},0).wait(1).to({x:257.45},0).wait(1).to({x:264.25},0).wait(1).to({x:271.1},0).wait(1).to({x:278},0).wait(1).to({x:284.8},0).wait(1).to({x:291.75},0).wait(1).to({x:298.55},0).wait(1).to({x:305.45},0).wait(1).to({x:312.3},0).wait(1).to({x:319.2},0).wait(1).to({x:326.05},0).wait(1).to({x:333},0).wait(1).to({x:339.8},0).wait(1).to({x:346.65},0).wait(1).to({x:353.55},0).wait(1).to({x:360.4},0).wait(1).to({x:367.3},0).wait(1).to({x:374.1},0).wait(1).to({x:381},0).wait(1).to({x:387.85},0).wait(1).to({x:394.75},0).wait(1).to({x:401.6},0).wait(1).to({x:408.5},0).wait(1).to({x:415.35},0).wait(1).to({x:422.15},0).wait(1).to({x:429.05},0).wait(1).to({x:435.9},0).wait(1).to({x:442.85},0).wait(1).to({x:449.7},0).wait(1).to({x:456.6},0).wait(1).to({x:463.4},0).wait(1).to({x:470.3},0).wait(1).to({x:477.15},0).wait(1).to({x:484.05},0).wait(223).to({alpha:0},0).wait(3).to({alpha:1},0).wait(144).to({regY:31,rotation:-14.999,y:508.45},0).wait(2).to({regX:8.2,rotation:-29.9983,x:484.15},0).wait(2).to({rotation:-44.9975,y:508.4},0).wait(2).to({rotation:-59.9967,x:468.15,y:522.8},0).wait(2).to({rotation:-74.9959,x:468.05,y:534.1},0).wait(2).to({regX:8.1,regY:31.1,rotation:-89.9954,x:456.2,y:547.4},0).to({_off:true},12).wait(73));

	// leaveMeAlone
	this.instance_1 = new lib.CachedBmp_3();
	this.instance_1.setTransform(247.75,318,0.5,0.5);
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(312).to({_off:false},0).to({_off:true},4).wait(239));

	// counter
	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f().s("#FF9900").ss(2,1,1).p("Ag8CVIAehJQATgxAGgcQACgPADg3QABgfAHgeQADgNAEgNQACgHACgGAgjiJQgwATg4APQgBAdgBA7QAAAjAAAIQACAZAGASQAKAWAIALQANARARANQALAIAOAHQAJAFAKAEQA2AVA6gKQAjgFARgQQAOgPAEgaQADgWgFgZQgHglgSgqQgMgegYguQgKgXgMgIQgOgJgeADQgCAAgCAAQgeADgNgIgAATigQgCABgCABQgYALgaAK");
	this.shape_1.setTransform(911.2279,49.2113);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f().s("#FF9900").ss(2,1,1).p("AgjiPIAAAAQAbgLAXgLQgEANgDAOQAigEAOAJQAMAJAKAWQAYAuAMAfQASAqAHAlQAFAZgDAWQgEAZgOAPQgRARgjAEQg6AKg2gVQgKgEgIgEQgogagPgRIgBgDQgIgKgKgWQgGgSgCgZQAAgJAAgjQABg6ABgdQA4gQAwgSAAIiKQgHAdgBAfQgDA3gCAPQgGAdgTAxIgdBJQgPgIgLgIQgQgLgNgQAgjiPQAOAHAdgCAAPilQgkAdgOgH");
	this.shape_2.setTransform(911.2279,49.8613);
	this.shape_2._off = true;

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f().s("#FF9900").ss(2,1,1).p("Ag8CVIAehJQATgxAGgcQACgPADg3QABgfAHgeQgeADgNgIQgwATg4APQgBAdgBA7QAAAjAAAIQACAZAGASQAKAWAIALQANARARANQALAIAOAHQAJAFAKAEQA2AVA6gKQAjgFARgQQAOgPAEgaQADgWgFgZQgHglgSgqQgMgegYguQgKgXgMgIQgOgJgeADQgCAAgCAAQADgNAEgNQACgHACgGAATigQgCABgCABQgYALgaAK");
	this.shape_3.setTransform(911.2279,49.2113);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f().s("#FF9900").ss(2,1,1).p("AgIiRQACgBACgBQATgNACgGQgCALACgBQgDAEgBAFQgCAKgCAIQAAABAAABQABAAABAAQAcgCAMAJQALAIAJAWQAXAsALAdQAKAYAHAYQADAOADANQABAGABAFQACASgCAQQgDAYgNAPQgIAHgKAFQgMAGgRADQgXAGgXgCQgcAAgdgKQgIgEgHgDAiAhcQAAgJABgIQAzgMAsgPQAMgFAMgEQAKgCALgCQAAABAAABQgEAJgCAJQABAAABAAQAegCAMAJQALAIAJAVQAWAsAMAdQAQApAGAhQACAIABAHQABAQgBAOQgEAYgNAOQgQAQgfAFQg1AMgxgTQgFgBgEgCQgEgCgEgCQgOgGgKgHQgOgLgNgQQgEgFgFgKQgDgGgEgHQgFgQgCgWQAAgIAAgfAggiOQAMgDAMAAAiAhcQAAgHABgFQAzgKAsgOQALAJAaAAQABgEABgEQABAAABAAQgBAEAAADQgBABgBAAQABAAABAAQgGAfgCAeQgBA1gCANQgFAdgSAuAiCgfIACg9Ag2B4QANghANgfQASgsAFgYQAEgnABgXQAAgXAFgVQAAgBAAAAQAAAAABAAQgBAAAAABQgIAEgGABQgGACgFgBQgGABgEgB");
	this.shape_4.setTransform(910.642,49.29);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f().s("#FF9900").ss(2,1,1).p("AgIiQQABAAACgBQASgMACgFQgCAKACAAQgEAGgCAFQgDAHgBAHQACAAACAAQAAACAAACQgCAJAAAGQgBABAAAAQgDADgCACQgEAFgFABQgEAFgFAAQgFACgEAAAgeiVQALAAALAFIAAAAQAIADAJAAQABAAACAAQgCAIgBAGQAaAAALAIQAKAIAIAUQAUApALAbQAPAnAFAgQABAHABAGQAEATgCASQgDAXgMAOQgGAHgKAFQgLAGgPADQgVAHgUgBQgaABgagIQgHgDgHgDAAChrQACgIACgIQABAAACAAIAAAAQAZgBAMAJQAKAJAIAUQAVAqAKAbQAJAYAGAWQAEANACANQABADAAADQACAPgBANQgEAXgLAOQgOAPgdAFQgvANgtgPQgEgCgEgBQgEgCgDgBQgMgFgJgGQgOgJgLgOQgEgEgEgJQgDgFgDgHQgFgNgBgUQgBgGAAgdAh1hbQAAgPABgJQAugKAogMQALgDALgEAh1hbQAAgKABgGQAugEAogKQALALAVADAh2gwIABgrAABhmQABgCAAgDQACAAACAAQAAAAABAAQgEAhgCAcQgBAygBANQgEAcgQArAgyBZQAMgcAMgbQAQglAFgVQADgiABgTQABgNABgM");
	this.shape_5.setTransform(910.0909,49.4017);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f().s("#FF9900").ss(2,1,1).p("AhqhdQAAgTABgKQAqgHAjgIQAKgDAKgCIAAAAQAIAFAGAEQACABACAAQgBAEAAADQAAAEgBACQgBAOgBAKQAAAAAAABIAAAAQgDAigBAaQAAAwgCANQgCAbgPAoAgIiOQACgBABAAQAQgKABgEQgBAJABAAQgDAIgDAHQgBAEgBAEQADAAACAAQAWABAKAIQAIAIAIATQASAmAKAaQANAlAFAdQACAJABAJQABALgBALQgDAVgLANQgMAPgaAFQgqAPgogNQgEgBgDgBQgDgCgDgBQgLgEgIgFQgMgHgKgLQgDgEgEgIQgDgEgCgGQgFgLgBgRQAAgFAAgZAgcibQAKADAKAKAhqhdQAAgMABgEQAqABAkgFQAJAMASAFQACABAEABQgFAJgCAEQgDACgCAAQgDAIgEAAQgEAEgEACAhrhAIABgdAAAhgQABgLADgMQACAAACAAIAAAAQAWABALAJQAJAIAHATQATAoAJAbQAJAWAFAVQAEANACAMQAAADABADQADASgBAQQgDAWgKANQgGAHgJAFQgJAGgOAEQgSAIgTgBQgWADgXgGQgHgCgGgDAguA7QALgYALgWQAPggAEgRQADgbAAgRQAAgBABAAQAAgIABgH");
	this.shape_6.setTransform(909.5191,49.5118);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f().s("#FF9900").ss(2,1,1).p("AgIiJQACAAABgBQAOgHACgDQgCAIACAAQgFAJgCAIQACACACACQAAAAAAABQAAAEgBAEQgBATAAAMQgBABAAAAIABAAQgCAkgBAZQABAugBALQgDAbgNAlAhfhhQAAgSABgJQAlgEAggFQAJgCAIgCAgZidQAIAFAJAPIABAAQAGAIAFAGQgBADAAACQADAAACAAQATACAJAHQAHAIAHASQAQAkAJAYQAMAiAFAcQABAJABAJQABAJgBAKQgCATgKANQgKAOgXAGQglAQgjgKQgDgBgDgBQgDgBgDAAQgJgDgHgEQgLgFgIgKQgDgDgEgHQgCgDgCgFQgEgJgBgPQAAgDgBgWAhfhhQAAgJABgBQAlAGAhAAQAHAMAPAIQACgPADgPQACAAABABQABAAAAAAQAUACAJAIQAIAJAHARQAQAmAJAaQAIAUAFAUQADANACALQAAACAAABQAEASgBARQgCAVgKANQgFAHgHAEQgIAGgMAEQgQAJgQAAQgVAEgUgEQgGgBgFgCAhghMIABgVAgEg3QACgOAAgKQAAgBAAgBQADACAEABQgFASgDADQgBABAAABQgCAIgDABQgDAFgEAEAgpAhQAKgUAJgQQANgbAEgNQAAgHABgF");
	this.shape_7.setTransform(908.9436,49.225);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f().s("#FF9900").ss(2,1,1).p("AgHiDQABAAABAAQAMgFABgDQgBAHABAAQgEALgCAJQAAAAABAAQACAEACACQAAADAAACQgCAYAAAPQAAABAAAAIAAAAQAAAmgBAXQACAsgBALQgCAZgLAjAhUhiQAAgUABgIQAhgBAbgCQAIgBAIgBAgXifQAIAIAIAUQAAABAAAAQAFAKAEAIQAAAAAAAAQAAABABgBQATADAIAIQAHAIAGAQQAOAiAIAXQALAfAEAaQACAKAAAJQABAIgBAHQgCASgIAMQgJAOgUAHQggARgegIQgDAAgCgBQgDAAgCgBQgIgBgGgDQgJgEgHgHQgDgCgDgGQgCgDgBgDQgEgIgBgLQAAgCAAgTAhUhiQAAgLABAFQAhALAcAEQAHAOAMAJQABgGAAgGQABgMADgMQABAAACABQABAAABAAQAQADAIAIQAHAJAGAQQAOAkAIAYQAHAUAFATQACALACALQAEATgBARQgBAUgIAMQgEAGgHAFQgHAGgKAEQgOAKgOABQgRAFgSgCQgFAAgFgCAhVhYIABgKAgDhCQADADAFACQgDAWgDAEQgCANgDABQgCAHgDAFAglAHQAJgOAIgMQALgWAEgJQABgJABgH");
	this.shape_8.setTransform(908.36,48.8536);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f().s("#FF9900").ss(2,1,1).p("AgHh9QABAAABAAQAKgDABgCQgBAHABAAQgEAJgBAJQARADAHAJQAGAIAFAPQAMAfAHAWQAJAcAEAZQACAKABAKQAAABAAABQAEASgBAQQgBASgHAMQgDAGgFAEQgGAHgJAEQgLAMgMAAQgPAHgOAAQgFAAgEAAAhJhnQAAgUABgEQAcAAAYACQAGAAAHAAAgUihQAGALAHAZQAAAAAAABQAGASAGANQAAAAAAABQAOADAHAKQAGAIAFAPQANAiAGAWQAGATAFASQACAKACAJQAAAFgBAGQgBARgHALQgIAOgQAGQgbATgagFQgCAAgCAAQgCAAgCgBQgHAAgFgCQgHgCgGgGQgCAAgDgFQgBgCgCgDQgCgFgBgJQAAAAgBgPAhJhnQAAgLABAMgAgHg3QABgBABgBQACgLAAgJQABgIADgIQABAAABABQABAAABAAQgBAdAAATIAAAAQgBAagDAFQAAAOgCACQgCAJgDAGAgggRQAHgLAHgIQAIgNADgGQAGAGAFAFQABAoAAAUQACArAAAKQgCAZgJAfAhIhmQAcARAZAIQAEANAIAJ");
	this.shape_9.setTransform(907.81,48.55);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f().s("#FF9900").ss(2,1,1).p("AgHh4QABAAABAAQAIgBABgBQgBAFABAAQgDAJgBAJQAOAEAGAIQAFAIAEANQALAdAFAVQAIAaAEAWQABAKAAAJQABAEABADQADARAAAPQgBARgFALQgDAHgEADQgFAHgHAFQgIANgKABQgMAIgMACQgEAAgDABAgOg5QgBgEgBgFQgWgNgXgVQAAgVgBAIQABgRAAgBQAXAEAUAFQAGABAFABAgSikQAGAOAFAeQAAAAAAABQAFATAEAPQABACAAACQAAAgABAUQAAAdgCAHQABARgCADQgBAKgCAIAAChVQANAFAGAJQAFAJAEAOQALAfAGAVQAFASAEARQABAGABAGQABAFgBAFQgBAPgFALQgGANgOAHQgPAOgPADQgFABgHgBQgCABgBABQgCAAgBAAQgGAAgEAAQgGAAgFgFQgBABgCgEQgBgBgCgCQgCgDAAgGIgBgLAgOg5QAHgIACAAQABgGABgGQABgEACgFQABAAABABIAAAAAgcgsQAGgHAGgDQABgCABgBQAHARALALQACApABAUQACApAAAIQgBAUgGAXQgBAFgBAF");
	this.shape_10.setTransform(907.2281,48.325);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f().s("#FF9900").ss(2,1,1).p("AAEgNQgMgRgFgZQgSgRgSgbQgBgcAAAAQAAgKABADQASAGAQAJQAEACAEACQABAAABAAQAGABABgBQgBAFABAAQgCAIAAAIQAKAFAFAJQAEAHAEANQAIAZAFAUQAGAYADAUQABAKAAAKQACAFABAFQACAQAAANQAAAQgDAKQgCAHgDAEQgEAHgFAFQgGANgIADQgJAJgKAEQgDABgCABAgPinQAEARAEAjQAAAAAAABQAEAUADAQQABAFABAEQAAAiACAWQABAhgBAIQACAUgBACQAAANgDAJAAAhOQAAAAABAAQAKAGAFAKQAEAIAEAOQAJAcAFAUQADARAEAQQABAEAAAEQABADgBADQAAAOgEAKQgFANgLAHQgIALgIAFQgIAFgHAAQgCACgBABQgBAAgBAAQgEABgEABQgEACgDgCQgCABgBgCQgBAAAAgCQgCgBgBgDIAAgGAgXhHQAFgDAFACQAGgGACAEQABAAABgDQAAgBADgBQAAABAAAAAAEgNQACAqACATQADAmAAAIQAAALgBAKQgCAOgEAP");
	this.shape_11.setTransform(906.65,48.1);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f().s("#FF9900").ss(2,1,1).p("AADABQgKgSgEgaQgOgWgOghQAAgjgBgGQABgFAAAHQAOAJAMAMQADADAEADQAAAAABABQAFACAAAAQAAAEAAAAQgBAIgBAHQAIAGADAJQADAHADALQAHAXADASQAFAVADATQABAKAAAJQACAIABAHQADAOAAAMQABAQgDAJQgBAHgCADQgDAHgDAGQgEAPgFACQgGALgJAGQgCABgCACAgNiqQADATAEApQAAAAAAABQACAVADARQAAABAAAAQAHAHAEAKQADAIADAMQAHAaAEAUQAEAQADAOQAAABAAABQAAACAAADQAAALgDAKQgDANgHAHQgEAIgEAGQgHAKgHABQgBADgBABQgBAAAAABQgDACgCACQgDAEgDAAAgThiQAEABADAHQAFAAABAIQABAFABAAQAAAEACACIABAAQABAHAAAHQABAlACAVIABASQADAfACANQADAgABAKQAAABAAABQABAXgGAXAAEATQACAXAAAGQADAXgBADQABAPgCAK");
	this.shape_12.setTransform(906.1042,47.9);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f().s("#FF9900").ss(2,1,1).p("AgciMQAJAMAIAPIABAAQACAEACADQAAABABAAQAEAGAAAAQAAADAAABQgBAGgBAGQAFAIACAIQACAHADAKQAEAVADAQQADATACARQABAKABAJQAAABAAACQACAIABAHQACAOABALQABAOgBAJQgBAGgBADQgBAIgCAFQgBAQgDADQgDAMgGAIQgCADgBACAgOh9QABAEACAIQABACABADQADAGABAMQAAALABADQAAAGABAGQABAKABAJQABAnACAXIAFAtQABAHABAFIABAFQABAJABAHQgFAOgFAEQAAACAAABQgBABAAABQgBAEgBADQgBAFgBACQAAADgBAAQAAABAAAAQAAAEgBACQABAEgBgBAgKitQACAWACAtQAAABAAABQABAWACASQABABAAABQAFAIACAJQADAJACAKQAFAYADATQACANADAMQAAABAAABQAAALgCAIQgBAMgFAIQgCAHgBAFQADAUAAAFQACAVgFAVAgciZIAAANQAAAPAAAcQAKAmAKAaQADAeAHAUAAHA+QABAFAAACQAAACABADAAMBfQAAACAAABQACAQgCAM");
	this.shape_13.setTransform(905.545,47.675);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f().s("#FF9900").ss(2,1,1).p("AgSimQAAAHAAAQQAFAOAEATQABAFABAFQACAIABABQgBACABABQgBAFAAAFQACAJACAIQABAIAAAIQADASACAPQACAQABAQQABAJABAJQAAACAAABQAAADABACQABAIABAHQADAMABAKQABANAAAIQABAGAAAEQAAAHgBAGQACARgBAEQgBAKgCAIQAAADgBACIAAAAQgBAEgBACAgLiYQABAKABAQQABAJABAOIAAADQAAABAAAAQAAADAAACIABAGQAAAIAAAEQAAAIABAIQAAABAAABQAAACAAABQADAKACAJQAAAJACAJQADAVACASQABALACAJQAAAIAAAGQAAAMgBAIQgBAGAAAFQABAEAAADIAEAUQABAHABACQAAABAAABQABAHAAACQABAKAAAKQAAAHgBAGAgJiwQABAZABAwAgFg6QAAABAAABQAAAAAAABQABAMABAKQABApACAZIAHArQAAAGABAEQAAAAAAAAQAAACABABQAAACAAACAgGhYQAAAPABANAgSiPQAAATAAAcQAFArAGAfQADAfAEAYAAIBWQgBARgCAGQABACAAACQAAABAAABQAAAFAAAEQAAAIAAADIAAAFQAAACABABQAAAGAAAEQAAAHgBADAANBxQABAHABAEQABAQABANAAHBMQAAAHABAD");
	this.shape_14.setTransform(905.095,47.45);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f().s("#FF9900").ss(2,1,1).p("AgNizQAAAcAAA5QAAAwADAkQABAgAEAbQAGAyAEALQAGAfABAEQADAUgBAP");
	this.shape_15.setTransform(905.15,47.25);
	this.shape_15._off = true;

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f().s("#FF9900").ss(2,1,1).p("AgUiwQADATAEAjQABAMABAPQAAAXAAAIQAAAMAAAMQAAANABANQAAADAAAEQAAARAAAQQAAAOAAAOQABAGAAAGQACALAEAIQADAUAEAHQAEALADAIQADALACACQAFATAAAO");
	this.shape_16.setTransform(905.775,47.05);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f().s("#FF9900").ss(2,1,1).p("AgcitQAHARAHAiQAEAMABAOQAAAYgBAIQAAAMAAAOQAAAPAAALQAAAEAAAEQgBASgBAQQgBAOgBAOQgBAHAAAGQADAJAFAJQAGASAFAGQAFAKAEAHQAEALACACQAIARACAO");
	this.shape_17.setTransform(906.425,46.825);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f().s("#FF9900").ss(2,1,1).p("AgjiqQAKAPAKAgQAFAMACAOQAAAZgBAJQgBAMAAAOQAAAQAAAMQAAAEAAAFQgCARgDARQgBAOgEAPQAAAHgBAGQADAIAIAIQAFARAJAFQAFAKAGAGQAEAJAEACQAKAQADAO");
	this.shape_18.setTransform(907.1,46.625);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f().s("#FF9900").ss(2,1,1).p("AgrinQAOANANAeQAHAMADAOQgBAZgBAKQgBAMAAAQQAAARAAAMQAAAFgBADQgCATgFASQgCAOgFAPQgBAHgCAGQAEAGAJAIQAHAPALAFQAGAJAHAGQAGAIADACQANAOAFAN");
	this.shape_19.setTransform(907.75,46.4);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f().s("#FF9900").ss(2,1,1).p("AgyikQARALAQAdQAKALADAOQAAAagDAKQgBANAAARQAAASgBAMQAAAEgBAEQgDAUgFASQgEAOgGAQQgCAGgDAHQAFAFAKAHQAIAPANAEQAIAHAIAFQAGAIAFABQAPAOAGAM");
	this.shape_20.setTransform(908.4,46.2);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f().s("#FF9900").ss(2,1,1).p("Ag6ihQAVAJAUAcQALAKADAPQAAAagCALQgCANAAARQAAATgBANQgBAEgBAFQgDAUgHATQgFANgIARQgCAHgEAGQAGAEAMAGQAJAOAPADQAIAHAKAEQAHAGAFACQASAMAIAN");
	this.shape_21.setTransform(909.05,46);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f().s("#FF9900").ss(2,1,1).p("AhBidQAYAGAWAaQAOALADAOQAAAbgCALQgCANgBAUQgBAUgBALQAAAFgBAFQgEAUgKAUQgEAOgLARQgDAHgDAHQAGABAPAHQAIALASAEQAJAFAMAEQAHAFAGACQAUAKAKAM");
	this.shape_22.setTransform(909.75,45.8);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f().s("#FF9900").ss(2,1,1).p("AhJiaQAcAEAaAYQAPALAEAOQAAAcgDAMQgCAMgBAVQgBAVgBAMQgBAFgBAFQgFAUgKAVQgGANgMATQgEAGgEAHQAGAAARAHQAKAKAUACQAKAFANAEQAIAEAHABQAWAJAMAM");
	this.shape_23.setTransform(910.4,45.6);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f().s("#FF9900").ss(2,1,1).p("AhQiXQAfACAdAWQARALAEAOQAAAdgDANQgCAMgBAVQgBAXgCAMQgBAFgBAGQgGAVgLAUQgHAOgNATQgFAGgFAHQAHgBASAGQAKAJAYACQALAEAOACQAJAEAIABQAYAHAOAM");
	this.shape_24.setTransform(911.05,45.4);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f().s("#FF9900").ss(2,1,1).p("AhYiUQAjABAgAUQATALAFANQgBAegDANQgCANgCAXQgBAXgCAMQgBAGgCAFQgGAVgNAWQgHANgPATQgFAHgGAIQAHgDAVAGQALAHAZABQAMADAPACQAKACAJABQAaAGAQAM");
	this.shape_25.setTransform(911.7,45.175);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f().s("#FF9900").ss(2,1,1).p("AhgiRQAngBAjASQAVALAFAOQgBAegDANQgCANgCAYQgBAXgDAOQgBAGgCAGQgGAVgPAWQgIANgRAUQgFAHgHAIQAIgFAWAGQAMAGAcABQANACAQABQALABAJABQAdAFASAL");
	this.shape_26.setTransform(912.375,44.9694);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f().s("#FF9900").ss(2,1,1).p("AhniNQAqgEAmARQAXALAGANQgBAfgFAOQgBANgCAaQgBAYgEANQgBAGgCAGQgHAWgQAXQgJANgTAUQgGAHgHAIQAJgGAYAGQAMAEAfAAQAOABARABQAMAAAKABQAfADATAL");
	this.shape_27.setTransform(913.025,44.7201);

	this.shape_28 = new cjs.Shape();
	this.shape_28.graphics.f().s("#FF9900").ss(2,1,1).p("AhviKQAugFAqAPQAaALAFAQQADAIgDANQgBAHgFAPQgCANgCAbQgCAZgDANQgHAdgWAdQgOASgfAgQAJgIAaAFQATAEA9gBQAzgCAbAO");
	this.shape_28.setTransform(913.675,44.478);

	this.shape_29 = new cjs.Shape();
	this.shape_29.graphics.f().s("#FF9900").ss(2,1,1).p("AhviKQAugFAqAPQAaALAFAQQgBAcgFAPQgCANgCAbQgCAZgDANQgHAdgWAdQgOASgfAgQAJgIAaAFQATAEA9gBQAzgCAbAO");
	this.shape_29.setTransform(913.675,44.478);
	this.shape_29._off = true;

	this.shape_30 = new cjs.Shape();
	this.shape_30.graphics.f().s("#FF9900").ss(2,1,1).p("AhjiNQALgBALAAQAsACAUAJQARAHAHAKQAEAGACAFQADAJgDAMQgCAIgFAPQgBAEgBAGQgCALgCARQgEAVgDANQgCAegSAcQgJATgZAeQAFgCAJAAQAFAAAFACQAEAAADABQACABAEABQAKACASADQANADARAAQASABAMABQASACAOAI");
	this.shape_30.setTransform(911.75,43.9);

	this.shape_31 = new cjs.Shape();
	this.shape_31.graphics.f().s("#FF9900").ss(2,1,1).p("AhYiQQALgBAMAAQAtACASAJQAQAIAHALQADAFACAGQACAJgDAMQgBAIgGAOQgBAFgBAFQgDAMgDAPQgEAWgGALQABAdgLAbQgFATgTAdQAFgBAJABQAEABAEACQACABADABQACABACABQAIADAPAGQAKAFAOABQAPACAGAAQANACALAH");
	this.shape_31.setTransform(909.85,43.325);

	this.shape_32 = new cjs.Shape();
	this.shape_32.graphics.f().s("#FF9900").ss(2,1,1).p("AhMiUQALAAALAAQAuABARAKQAQAIAGAMQADAGABAGQACAJgDAMQgCAJgFANQgCAEgBAFQgDALgEAPQgGAUgHALQAFAcgGAbQgBATgMAcQAFAAAHACQADACADACQACABACACQABAAACACQAGADAMAKQAIAHAJACQALADACAAQAGABAIAG");
	this.shape_32.setTransform(907.925,42.75);

	this.shape_33 = new cjs.Shape();
	this.shape_33.graphics.f().s("#FF9900").ss(2,1,1).p("AhAiXQAKAAAMAAQAuAAARAKQAOAJAFANQADAGABAGQABAJgCAMQgDAJgFANQgBAEgBAFQgEALgFAOQgHATgJALQAKAagCAaQAEATgIAbQAGABAHAEQADACABADQACAAAAADQACABAAABQAFAFAIALQAEAKAGADQAHAEgDgBQABABAEAG");
	this.shape_33.setTransform(906,42.2);

	this.shape_34 = new cjs.Shape();
	this.shape_34.graphics.f().s("#FF9900").ss(2,1,1).p("Ag6iaQAKABANgBQAugBAQAMQAOAJADAPQADAFAAAGQABAKgDALQgCAKgFAMQgBAEgCAEQgFAMgFANQgIASgLALQAOAYAEAZQAIATgCAbQAGACAGAEQACADABAEQABAAAAADQAAABAAACQADAEAEAPQACAMADAEQACAFgHgBQgGAAABAF");
	this.shape_34.setTransform(904.6079,41.596);

	this.shape_35 = new cjs.Shape();
	this.shape_35.graphics.f().s("#FF9900").ss(2,1,1).p("Ag3idQAKABAMgBQAvgCAPAMQANAKADAQQABAGABAGQABAKgDALQgDAJgGANQAAADgCAEQgFAMgHAMQgJARgMAKQASAXAJAYQAMAUAEAaQAHADAEAFQACAEgBAEQABAAgBADQAAACgBABQABAGAAARQAAAPgBAFQgCAFgMgBQgMgBgCAF");
	this.shape_35.setTransform(903.65,41.025);

	this.shape_36 = new cjs.Shape();
	this.shape_36.graphics.f().s("#FF9900").ss(2,1,1).p("Ag9igQAKABANAAQAvgDAPANQALAKACAQQACAHAAAGQAAAKgDAKQgDALgFAMQgBADgCAEQgGALgHAMQgLAPgMAKQAVAWAOAXQAQAUALAZQAGAEAEAGQABAFgCAEQABAAgDAEQAAABgCADQgBAFgDAVQgDARgFAFQgGAHgQgBQgTgCgEAE");
	this.shape_36.setTransform(903.4167,40.425);

	this.shape_37 = new cjs.Shape();
	this.shape_37.graphics.f().s("#FF9900").ss(2,1,1).p("AhCijQAJABANAAQAwgEAOAOQALAKABASQABAGAAAHQgBAKgDAKQgCALgGALQgBAEgCADQgHAMgIAKQgKAPgQAJQAaAVAUAWQAUAUAQAYQAHAFADAIQAAAFgDAEQAAABgDAEQgCABgCADQgDAGgHAYQgGATgIAGQgJAIgVgCQgYgCgIAE");
	this.shape_37.setTransform(903.2031,39.85);

	this.shape_38 = new cjs.Shape();
	this.shape_38.graphics.f().s("#FF9900").ss(2,1,1).p("AhIinQAKACANAAQAHAAAOgCQAcgDANAOQAKAKAAAUQACAggSAeQgQAdgdAOQA5AlAtAvQAGAHADAIQAAAGgFAFQAAABgJAIQgGAHgKAbQgIAVgMAIQgNAJgZgDQgggDgLAD");
	this.shape_38.setTransform(903,39.2507);

	this.shape_39 = new cjs.Shape();
	this.shape_39.graphics.f().s("#FF9900").ss(2,1,1).p("AhIinQAKACANAAQAxgFANAOQAKAKAAAUQACAggSAeQgQAdgdAOQA5AlAtAvQAGAHADAIQAAAGgFAFQAAABgJAIQgGAHgKAbQgIAVgMAIQgNAJgZgDQgggDgLAD");
	this.shape_39.setTransform(903,39.2772);
	this.shape_39._off = true;

	this.shape_40 = new cjs.Shape();
	this.shape_40.graphics.f().s("#FF9900").ss(2,1,1).p("AhGigQAIACAMAAQAugCALANQAHAJACAOQAAADAAADQACAegQAdQgPAdgbAOQAFADAFADQAFAFAGAEQAFACAEADQAVAOATAQQASAOAPAPQAGAGACAHQAAAGgEAEQgBABgIAHQgEAFgJAWQgHARgIAHQgDACgCABQgLAIgYgDQgcgEgLACAhAiGQAJACAMgBQAtgGAMAMQABACABABQAHAIAAAQQABAbgPAaQgJARgPALQgHAGgIADQgBABgBAAQAHAEAGAEQAcAVAZAZQAKAKAKALQAHAIACAGQAAAFgEAFQAAABgFAEQgHAIgIAUQAAACgBADQgEAKgEAHQgEAGgFADQgCACgDACQgLAEgSgCQgHgBgGgBQgRAAgHAC");
	this.shape_40.setTransform(902.85,38.9558);

	this.shape_41 = new cjs.Shape();
	this.shape_41.graphics.f().s("#FF9900").ss(2,1,1).p("AhEiZQAIACAKABQAqgBAKAOQAIAKAAASQAAAEAAAFQgBAYgLAXQgPAcgXAOQAIAHAJAGQgBAAgBAAQAEACADACQAXAUAVAXQAJAKAKAKQAHAIABAFQABAFgDAEQAAABgFADQgGAIgGARQAAACgBACQgCAHgDAGQgEAIgFADQgCACgCABQgJAEgPgCQgHgBgFgBQgPABgFABAAKhkQADABACACQAIAHAAAPQACAYgOAXQgJAOgMAJQgGAEgHADQACACADACQAHAEAHAEQATALARAOQAQAMAOANQAGAFABAGQAAAEgDAEQgBABgHAGQgEAEgIATQgIATgKAFIAAAAQgLAGgVgEQgagEgJABAg3hkQAIABALgBQAigGAMAG");
	this.shape_41.setTransform(902.675,38.6083);

	this.shape_42 = new cjs.Shape();
	this.shape_42.graphics.f().s("#FF9900").ss(2,1,1).p("AhDiSQAHACAKABQAmACAJANQAHAKAAARQABAPgEAOQgCANgGAMQgNAagWAPQANAJALALQABABAAAAQASASARAUQAIAKAJAJQAHAIACAEQABAFgDADQAAABgEADQgEAGgFAPQAAACgBACQgBACgBADQgDALgFAFQgCACgCABQgHAEgNgCQgGgBgEgCQgNABgEACAABhIQAKAAAFAEQAHAGAAANQACAUgMATQgIALgKAHQgGADgHADQAAAAAAABQABAAAAAAQAKAEAHAFQASAJAQALQAPAKAMAKQAFAEACAGQAAADgDADQgBABgGAFQgEADgHAQQgIAQgJAEQgBAAgDABQgJADgQgDQgWgGgJAAAguhCQAHAAAJgCQAUgEALAA");
	this.shape_42.setTransform(902.525,38.2864);

	this.shape_43 = new cjs.Shape();
	this.shape_43.graphics.f().s("#FF9900").ss(2,1,1).p("AhBiMQAGAEAJABQAhAEAIANQAHAJAAARQABAagLAZQgBACgBABQAYgFAHAFQAGAEAAALQACAQgKAOQgHAKgJAFQgFADgGACQAJADAIAEQARAGAOAJQANAIALAHQAFAEABAEQAAADgDADQAAgBgGAFQgDACgHANQgGANgIADQgEABgFAAIAAAAQAAACgBABQgDAOgEAFQgBACgCABQgFADgLgCQgFgBgEgCQgKACgDABAgmghQAGAAAIgCQAGgCAEgBQgLAXgSAOQAdAaAYAfQAHALAJAIQAGAHACAEQABAEgCADQABAAgEADQgDAFgDANQgHAAgKgCQgUgGgHgB");
	this.shape_43.setTransform(902.375,37.9364);

	this.shape_44 = new cjs.Shape();
	this.shape_44.graphics.f().s("#FF9900").ss(2,1,1).p("AhAiFQAGAEAHACQAeAGAHAMQAGAKAAAPQABAZgKAYQgLAYgQAOQAZAbAVAeQAGAKAIAIQAGAHADADQABAEgBACQAAAAgDADQAAABgBACQgEgBgFgBQgRgHgGgCAgeAAQAFAAAIgCQAbgLAIAEQAFADABAIQABAMgIAMQgGAHgIADQgDACgFABQAHACAIACQAPAEANAHQAMAGAJAFQAEACACAEQAAACgDACQAAgBgFAEQgDABgGAKQgGALgHABQgFABgJgCQgBAEgCAHQAAABAAACQgBALgCAFQgCACgBAAQgEADgIgCQgEgBgDgCQgIACgCAC");
	this.shape_44.setTransform(902.225,37.59);

	this.shape_45 = new cjs.Shape();
	this.shape_45.graphics.f().s("#FF9900").ss(2,1,1).p("Ag+h+QAFAEAGACQAZAIAGANQAFAJAAAOQABAYgIAXQgJAXgOAOQAWAaASAdQAEAIAEAFQgDgBgCgBAgWAhQAFgCAGgCQAXgMAHADQAFABAAAGQACAJgHAHQgFAFgGACQgDABgFAAQAIAAAHACQAOABALAEQAKAEAJADQADACABACQAAACgCABQAAgBgFACQgCAAgFAIQgFAIgGAAQgHAAgNgFQgJgFgGgDQACADACACQAFAGADADQACADgBACQABAAgCACQgBACgBAJQAAABABABQgBAJAAAFQgBABgBABQgCACgHgCQgCgBgCgCQgGADgBAB");
	this.shape_45.setTransform(902.075,37.2694);

	this.shape_46 = new cjs.Shape();
	this.shape_46.graphics.f().s("#FF9900").ss(2,1,1).p("Ag8h4QADAEAGADQAVALAFAMQAEAJAAANQABAWgIAWQgGAWgNAPQATAZAPAcIAAAAQAFALAGAGQAFAGADADQACACAAABQAAAAgBABQABACAAAGQABABAAAAQABAIABAFQAAAAgBABQABACgGgCQgBgBgCgDQgEAEACAAAAPA/QgBAAgBAAQgCAAgEAAQADgBADAAQADAAADAAQAAAAABABQAMgCAKACQAJABAHABQADABAAABQAAABgBAAQAAAAgEABQgCgBgEAFQgEAFgFgCQgGgBgLgFQgGgEgDgDQgCAAAAgBQgEgDgCgBAgNBCQAEgCAFgDQATgNAFABQAEgBAAAFQACAEgFAEQgBABgBAAQgCABgCAA");
	this.shape_46.setTransform(901.9,36.95);

	this.shape_47 = new cjs.Shape();
	this.shape_47.graphics.f().s("#FF9900").ss(2,1,1).p("Ag6hxQADAEAEAEQARAMAEAMQADAJAAAMQABAWgGAUQgGAUgJAPQAPAaAMAbQAEAKAFAGQAGAGADACQABABABABQAAAAAAAAQAAAAAAABQACAAABAEQABAAABABQABAEACACQABACACACQgBAAAAABQACABgEgCQABgBgBgDAAVBPQgCgBgBgBQgBgBgDgBQAGgDAFAAQALgEAIAAQAIgBAGgCQABAAAAAAQAAgBgDABQgBgCgEACQgDACgEgCQgFgDgJgGQgKgKgDgEAAVBPQAAAAAAgBQAEgCAAACQACABgEAAQgBAAgBAAgAAABgQAAgBACgBQAOgNAFgCAgEBjQACgBACgC");
	this.shape_47.setTransform(901.675,36.6071);

	this.shape_48 = new cjs.Shape();
	this.shape_48.graphics.f().s("#FF9900").ss(2,1,1).p("Ag6h3QADAEADAEQAMAPAEALQACAJAAALQABAUgFAUQgEAUgHAOQALAZAJAbQADAKAFAFQAFAFADACQADABABAAIABAAQADgBADABQABABABAAQADAEAGAEQgBAAAAABQAEAAgCgBQACgCgBgCQABAEADAAAADB4QABgEADgDQAMgPACgEQADgDAAAAQACgDgCgEQAAgCgCgDQgBgDgBgCQAFgEAEgBQAKgHAGgDQAGgCAFgEQACgCABAAQAAgBgBgBQAAgBgDAAQgBgEgDAAQgCAAgEgFQgDgEgHgGQgHgKgDgF");
	this.shape_48.setTransform(901.6,37.6);

	this.shape_49 = new cjs.Shape();
	this.shape_49.graphics.f().s("#FF9900").ss(2,1,1).p("Ag4iFQABAFADAFQAIARACALQACAIAAALQAAASgDATQgDASgFAQQAIAYAGAaQACAKAEAFQAFAEAEABQACAAACAAQABAAABAAQAFgDAEgBQABAAABAAQAFADAHACQAAABgBAAQAHABAAgCQADgCAAgDQACAFAFAAAAKCGQABgEACgFQAHgPADgGQABgEAAgDQACgHAAgHQAAgFAAgFQABgEgBgDQAFgFADgCQAJgJAFgFQAEgFADgHQABgCABgBQAAgBgBgDQAAgBgBgBQgBgFgCgDQgCgDgCgFQgDgHgEgFQgFgLgBgG");
	this.shape_49.setTransform(901.45,39.25);

	this.shape_50 = new cjs.Shape();
	this.shape_50.graphics.f().s("#FF9900").ss(2,1,1).p("AATCTQAAgFABgEQADgRABgIQABgGAAgFQACgLABgKQACgIACgHQABgEAAgEQAEgGADgEQAGgMADgHQAEgHACgJQAAgDAAgCQAAgCAAgCQAAgDAAgBQgBgFgBgGQgBgGgBgGQgCgIgCgHQgDgMAAgHAg2iSQABAGABAFQAEASABALQABAJAAAJQAAASgCARQgBARgCAQQADAXADAZQABAKAEAEQAFAEADABQADAAADgBQABgBABAAQAGgEAGgDQABAAABAAQAGAAAJACIABAAQAHABAEgCQADgCABgDQAEAFAHAA");
	this.shape_50.setTransform(901.275,40.925);

	this.shape_51 = new cjs.Shape();
	this.shape_51.graphics.f().s("#FF9900").ss(2,1,1).p("Ag1ifIAACqQAAANAFACQAFAEALgFQAFgEAJgGQAIgEAOADQARAAAFgIQAGAHAHAAAA1hdQgCAQACAmQACAjgEASQgCAKgFAOQgDAHgFAPQgRAwAIA0");
	this.shape_51.setTransform(901.1558,42.6);

	this.shape_52 = new cjs.Shape();
	this.shape_52.graphics.f().s("#FF9900").ss(2,1,1).p("Ag1ifIAACqQAKATALgFQAFgEAJgGQAIgEAOADQARAAAFgIQAGAHAHAAAAbCgQgIg0ARgwQANgkACgKQAEgSgCgjQgCgmACgQ");
	this.shape_52.setTransform(901.1558,42.6);
	this.shape_52._off = true;

	this.shape_53 = new cjs.Shape();
	this.shape_53.graphics.f().s("#FF9900").ss(2,1,1).p("AAVCVQgBgEAAgDQACgOABgEQABgGAAgEQABgEABgDQAAgDABgDQABgDABgEQAAgEABgFQACgRAFgRQADgLACgFQACgHAAgFQABgBAAgBQABgFAAgFQACgHgBgEQAAgBgBAAQAAgEAAgGQAAgDAAgEQAAgDAAgFQABgQgBgRQAAgBAAgCQAAgDAAgDQAAgBABgBQAAgCAAgBQACgbAFgMAg2iUQAAAGABAGQADAPABAEQABAEAAAFQABADABADQAAADABADQAAADAAACQABAEAAADQAAANAAANQAAAEAAAGQAAAEgBAEQgBAFgBAGQgBAGgCAHQgBAGgBAGQAAAEAAADQACADACAAQAFADAKgHQAEgEAIgHQACAAACgBQADgCAEAAQACAAACAAQACAAACgBQACABADAAQARAAAHgHQAGAFAIAA");
	this.shape_53.setTransform(901.4,44.125);

	this.shape_54 = new cjs.Shape();
	this.shape_54.graphics.f().s("#FF9900").ss(2,1,1).p("AAmgqQAAgBAAAAQABgUgBgRQAAgCAAgBQAAgEABgDQAAgCABgBQAAgBABgBQAFgZAJgNAg3iIQAAAHACAFQAFAOACADQADAEABAEQAAADACACQACACAAADQABACABACQAAACAAACQAAAJAAAIQAAADAAAEQAAADgBACQgCAEgCAFQgCAGgDAFQgDAHgCAFQgBAEAAABQABACACAAQAFAAAJgGQAEgHAIgHQABgBACgBQADgDAEAAQACAAACgBQACAAACAAQADAAADABQASgBAJgHQAFADAFABAAOCJQgBgCACgCQADgMADgFQACgGABgEQABgEABgDQACgDABgDQABgEABgEQABgEABgGQABgTAFgUQAEgLAAgFQACgIAAgFQAAgBAAgBQAAgFAAgEQAAgIgCgFQgBAAgBgBQgBgEgBgGQAAgCAAgFQAAgDgBgEQADAAACAA");
	this.shape_54.setTransform(901.7,45.65);

	this.shape_55 = new cjs.Shape();
	this.shape_55.graphics.f().s("#FF9900").ss(2,1,1).p("AAfg6QAAgQgBgNQAAgBAAgCQAAgFACgDQAAgBABgBQAAgCACgBQAJgYAMgLAg3hvQAAAHACAGQAIANADADQAEACABADQACADACACQACACABACQACABAAAAQABADAAAAQAAAFABADQAAABgBADQAAABgCACQgCACgEAFQgDAFgFAFQgEAFgCAEQgCADAAABQABACABgCQAFgBAIgIQAEgJAGgHQACgBABgBQADgDAEgCQACAAACgBQACAAADAAQADAAAEAAQATAAAJgHQACABABAAAAICMQgBgBACgCQAHgLADgFQAEgGABgEQABgDADgDQACgDABgEQACgEABgEQABgFABgGQABgVAFgWQADgMABgGQABgIgBgGQAAgBAAgBQgBgFgCgEQAAgHgEgEQgBgBgBAAQgDgEgBgGQgBgEAAgFQgBgEAAgFQAAgGAAgFQAHADAHAA");
	this.shape_55.setTransform(901.975,45.8);

	this.shape_56 = new cjs.Shape();
	this.shape_56.graphics.f().s("#FF9900").ss(2,1,1).p("AAXhDQAAgPAAgLQAAgBAAgBQAAgGABgEQABgBABgBQABgBABgCQANgWAQgLAgegzQABgBABgBQABgCABgBQADgEAEgBQACgBACAAQADgBACAAQAEAAAFAAQAOAAAKgEAg4hUQAAAIADAFQAKANAFABQAFACACADQAAABABAAAgTgtQgBgBgBABQgDABgGAEQgDAEgHAEQgFAFgDADQgBAAAAABQAAgBAAAAIAAgBQAEgCAHgIQADgJAFgHQABABADABQADACABABQACAAABAAIAAABIAAgBQAAAAAAABgAABCQQgBAAADgBQAKgJAEgGQAFgGACgEQABgDAEgDQADgEABgDQADgEABgGQABgEAAgHQACgWAEgYQADgOABgGQABgJgCgGQAAgBAAgBQgCgFgDgFQgCgGgGgEQgBgBgBAAQgEgEgCgGQgBgEgBgGQAAgDgBgHQAAgJAAgIQADgCADgBQAJADAJgB");
	this.shape_56.setTransform(902.275,45.7583);

	this.shape_57 = new cjs.Shape();
	this.shape_57.graphics.f().s("#FF9900").ss(2,1,1).p("AAPhNQAAgMAAgJQAAgCAAgBQAAgHABgDQABgCACgBQABgBABgBQASgVATgLAgtgkQADgDADgEQACgMAGgIQABgBABgCQACgFAFgBQACgBACAAQADgBADAAQAEAAAFAAQAJgBAJgCQAIgCAHgDQAJADAKgBAgkggIgBABQgHADgDADQgEABAAgCQABABABgEIAAgBQABgCADgEQAGAEADAAQABABAAAAQAHAAACADQACABAEABQAEABABABQADAAABgCQAAABABgDQAAgCABgHQAAgCgBAAQgBgCgDAAQgDAAgHACQgEAEgIADgAg5g5QAAAIAEAGQAFAEADADAgFCUQgBABAFAAQAKgIAGgGQAGgGACgEQACgDAFgDQADgEACgDQADgFABgGQABgEABgIQABgYAEgaQADgPAAgGQABgJgCgHQAAgBgBgBQgCgGgFgEQgDgGgHgEQgBgBgCAAQgGgEgCgGQgCgEAAgGQgBgEgBgHQAAgOAAgL");
	this.shape_57.setTransform(902.575,45.775);

	this.shape_58 = new cjs.Shape();
	this.shape_58.graphics.f().s("#FF9900").ss(2,1,1).p("Ag6gfQAAAJAFAGQAPAKAHAAQAIgBADACQABACAGAAQAEAAACAAQADgBABgCQABAAAAgFQAAgFACgMQAAgEgBgBQgBgEgDgBQgFgBgIACQgGACgJADQgJAEgEABQgEAAAAgDIAAgFIAAAAQADgGAGgKQACgNAFgJQABgCABgBQACgGAFgCQACgBADAAQACgBADAAQAFAAAFAAQAGgBAHgBQANgCAJgEQAKACALgBAAIhYQgBgJAAgHQAAgCAAgBQAAgIACgDQABgCACgBQABgBACgBQAVgUAXgKAgMCXQAAADAFABQANgHAHgGQAIgHACgEQACgDAFgDQAFgDADgEQACgFACgGQABgFABgJQABgZAEgdQACgPAAgGQABgLgDgGQAAgBgBgBQgEgHgFgEQgEgGgJgEQgCAAgBgBQgIgDgCgHQgDgEgBgGQAAgEgBgIQAAgTAAgO");
	this.shape_58.setTransform(902.85,45.85);

	this.shape_59 = new cjs.Shape();
	this.shape_59.graphics.f().s("#FF9900").ss(2,1,1).p("Ag7gFQAAAIAGAGQASAKAHgBQAKgCACACQADAAAGAAQAFAAACgBQADgBABgEQABgBABgFQAAgJABgQQAAgGgBgCQgBgGgEgCQgEgCgKAAQgGACgLADQgKADgFAAQgFgBgBgEQAAAAABgHIAAAAQACgIAFgKQACgPAFgJQAAgCABgBQACgHAFgDQACgBADAAQACgBADAAQAGAAAFgBQAEAAADAAQAAgHAAgFQAAgCAAgBQAAgIABgEQACgBACgBQABgCACgBQAZgSAbgKAAAhjQARgDAOgEQAKABAMgBAgSCaQgBAEAGACQAQgGAIgGQAJgHADgEQACgCAGgEQAGgDACgEQAEgFABgHQABgFABgKQABgaAEggQACgPAAgHQAAgLgDgGQgBgCgBgCQgEgGgHgEQgFgGgLgDQgCgBgBAAQgJgEgDgGQgDgFgBgHQgBgEgBgIQAAgaAAgP");
	this.shape_59.setTransform(903.1732,45.925);

	this.shape_60 = new cjs.Shape();
	this.shape_60.graphics.f().s("#FF9900").ss(2,1,1).p("AAAgjQgDAAgEgBQgHABgNADQgLACgFgBQgGgCgBgFQAAgBAAgHIAAgBQACgJAEgLQACgRADgJQABgCABgCQABgHAFgDQACgBADgBQACAAAEgBQAGAAAGgBQAAAAAAAAQAAgDAAgDQAAgCAAgCQAAgIADgEQACgCACgBQABgBACgBQAdgQAegKAgIhvQAWgCASgGQALACAMgCAAAgjQAAAAAAgBQgDgFgCgHQAAgEgBgJQgBgggBgSAAOgZQgBAAAAgBQgKgDgDgGAAOgZQgCgEgDgDQgEgCgFgBAg7AUQgBAJAHAHQAVAJAIgCQALgDADABQADAAAHAAQAFgBADgCQADgBACgGQABgBABgHQAAgOABgTQAAgIgBgDQAAgCgBgCAgZCeQAAAFAHACQASgEAJgGQAKgIAEgDQADgCAHgEQAGgEACgEQAEgFACgHQABgFABgMQABgbAEgiQACgRgBgGQAAgMgEgHQgBgCgBgCQgFgGgIgEQgGgGgNgDQgCAAgBAA");
	this.shape_60.setTransform(903.4483,45.95);

	this.shape_61 = new cjs.Shape();
	this.shape_61.graphics.f().s("#FF9900").ss(2,1,1).p("AgEgiQgIAAgLABQgNACgGgCQgHgDgBgFQgBgCAAgJIAAAAQACgLADgMQACgSACgKQABgDABgBQABgIAFgEQACgBADgBQACAAAEgBQAEAAADAAQADgBADAAQAXgCATgGQAMABAMgCAgQh6QAAgBAAAAQAAgCAAgCQAAgJAEgEQABgCADgBQABgBAEgBQAfgPAhgJAgEgiQgCgCgBgBQgDgFgCgIQgBgEgBgKQgBgpgBgRAAUgYQgDgBgEgBQgDgBgCAAQgIgDgEgEAAUgYQgBgDgCgBQgHgFgLgBQgBAAgCAAAg8AuQgBAKAIAHQAXAIAKgDQAMgEADABQAEAAAGgCQAHgBADgCQAEgDACgGQABgCABgIQAAgSACgYQAAgKgBgEQgBgGgDgDAgfCgQgBAHAIADQAWgDAJgGQAMgIADgDQAEgCAHgEQAHgDADgFQAFgFACgIQABgFABgMQABgdADglQACgRgBgHQgBgNgFgHQgBgCgBgBQgGgHgJgEQgFgEgJgC");
	this.shape_61.setTransform(903.7235,46.025);

	this.shape_62 = new cjs.Shape();
	this.shape_62.graphics.f().s("#FF9900").ss(2,1,1).p("AgIghQgEgDgCgDQgEgFgCgIQgBgEgBgLQgBgtgBgRQAAgCAAgCIAAgBQAAgJAEgEQACgCADgBQABgBAEgBQAjgOAlgJAgIghQgFAAgHAAQgPABgGgCQgIgFgBgGQgBgDAAgJIAAgBQABgNADgMQABgUACgKQAAgDABgBQABgJAEgEQADgBADgBQACgBAFgBQABAAAAAAQAGAAAGgBQAYgDAVgFQAMAAANgBAAagYQgHgCgKgCQgDAAgDgBQgGgBgFgDAAagYQgBAAgBgBQgHgGgNgCQgEgBgIABAgmCkQgBAHAJAFQAZgCAKgGQANgJAEgCQAEgDAIgEQAIgDADgFQAFgFACgJQABgFACgNQAAgeADgnQACgSgBgHQgBgOgGgHQgBgCgCgCQgGgHgKgEQgDgCgEgCAg9BIQgBALAJAHQAaAHAKgEQANgFAEAAQADAAAJgCQAHgCAEgDQAEgDACgHQABgDACgKQAAgVABgeQAAgLgBgFQgBgJgFgG");
	this.shape_62.setTransform(904.0237,46.075);

	this.shape_63 = new cjs.Shape();
	this.shape_63.graphics.f().s("#FF9900").ss(2,1,1).p("AgfiRQABAAACAAQAHgBAHgBQAZgDAXgFQANAAANgCAgfiRQABgGACgDQACgCAEgBQACgBADgBQAogMAogJAgKghQgDAAgEAAQgQAAgHgDQgIgGgCgHQgBgDAAgLQAAAAAAgBQAAgOACgNQAAgWACgKQAAgDABgCQAAgKAFgDQADgCADgBQACAAACgBAgKghQgHgDgEgEQgEgFgCgJQgBgFgCgLQgBgwAAgRQAAgDAAgBQAAgDAAgDAAggWQAAAAgBAAQgJgFgSgCQgDgBgCAAQgFgBgEgCAAggWQgIgHgPgDQgHgBgMAAAgtCnQgBAJAKAFQAcAAALgHQAOgIAEgDQAFgCAJgEQAIgEAEgEQAFgGADgKQABgFABgNQABggADgpQABgTgBgIQgCgOgGgIQgBgCgCgCQgHgHgLgEAg+BjQgBALAKAHQAcAGAMgFQANgGAFAAQAEgBAJgDQAJgCADgDQAFgEADgIQABgEABgLQAAgZACgjQAAgOgBgFQgCgMgHgHIAAAA");
	this.shape_63.setTransform(904.3238,46.125);

	this.shape_64 = new cjs.Shape();
	this.shape_64.graphics.f().s("#FF9900").ss(2,1,1).p("AgmicIABAAQACgBAFgBQAHAAAIgBQAZgEAZgEQANgBAOgDAgmicQABgEACgCQADgCADgBQACgBAEgBQArgKAsgJAgLghQgCAAgBAAQgRgBgIgEQgIgHgCgIQgBgEgBgMQAAAAAAgBQAAgQABgNQAAgYABgKQAAgDAAgCQABgLAFgEQABgCAEgBAgLghQgLgDgFgGQgFgGgCgJQgBgEgCgNQgBgzgBgRQAAgCAAgCQAAgGABgEAAkgWQgDgCgDgBQgKgEgUgCQgCAAgDgBQgDAAgDgBAAkgWQgIgGgNgDQgKgCgQAAAgzCqQgBAKALAGQAeABAMgHQAQgJAFgCQAEgCALgEQAJgEADgFQAGgFADgLQABgFABgOQABgiADgrQAAgUgBgIQgCgOgHgJQgBgCgCgCQgGgGgJgDAg/B8QAAAMAKAHQAfAGANgGQAPgHAEgBQAFgCAKgCQAJgDAEgEQAGgFACgJQACgEABgNQAAgdACgnQAAgQgBgIQgCgMgIgIQgCgCgCgB");
	this.shape_64.setTransform(904.5989,46.2063);

	this.shape_65 = new cjs.Shape();
	this.shape_65.graphics.f().s("#FF9900").ss(2,1,1).p("AgtimQACgBACgBQADgBAEAAQAJgBAIgBQAagEAagEQAOgCAPgCAgtimQABgCABgBQADgCADgBQADgBAEgBQAvgJAwgIAgOgiQgQgBgIgFQgKgIgCgJQgBgEgBgNQAAgBAAAAQAAgSAAgOQgBgZABgLQAAgEAAgCQAAgLAFgFQABgBABAAAgOgiQgOgDgGgGQgGgGgCgKQgCgFgBgNQgCg2AAgRQAAgDAAgBQAAgJACgFAApgVQgGgEgHgCQgMgEgTgBQgEgBgDAAQgCgBgCAAAApgVQgIgGgMgDQgMgDgUgBQgBAAgCAAAhACXQgBAMAMAHQAhAFAOgHQAQgIAFgCQAFgBALgEQAKgDAEgFQAGgFADgKQABgFACgPQAAggACgsQAAgSgBgJQgDgOgHgJQgDgDgEgCAg7CtQAAAMAMAHQAgACAOgHQARgJAFgDQAFgCALgEQAKgDAEgFQAGgGADgLQABgGACgPQAAgjACguQABgUgCgIQgCgPgHgKQgCgCgDgCQgEgEgFgC");
	this.shape_65.setTransform(904.9302,46.2813);

	this.shape_66 = new cjs.Shape();
	this.shape_66.graphics.f().s("#FF9900").ss(2,1,1).p("ABBjHIhmAPQgFABgCABQgEABgDACQgFAFAAAMQAAANADBCQABAOACAFQACAKAGAGQAJAJAZACQAVACANADQATAFAKAMQAIAKADAPQABAKAAAUQgCAwAAAlQgCAQgBAFQgDAMgHAGQgEAFgLAEQgMAEgFACQgGACgRAJQgPAIgKACQgOACgMgIQgMgIAAgM");
	this.shape_66.setTransform(905.299,46.6211);
	this.shape_66._off = true;

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1}]}).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_2}]},1).to({state:[{t:this.shape_3}]},1).to({state:[{t:this.shape_4}]},1).to({state:[{t:this.shape_5}]},1).to({state:[{t:this.shape_6}]},1).to({state:[{t:this.shape_7}]},1).to({state:[{t:this.shape_8}]},1).to({state:[{t:this.shape_9}]},1).to({state:[{t:this.shape_10}]},1).to({state:[{t:this.shape_11}]},1).to({state:[{t:this.shape_12}]},1).to({state:[{t:this.shape_13}]},1).to({state:[{t:this.shape_14}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_15}]},1).to({state:[{t:this.shape_16}]},1).to({state:[{t:this.shape_17}]},1).to({state:[{t:this.shape_18}]},1).to({state:[{t:this.shape_19}]},1).to({state:[{t:this.shape_20}]},1).to({state:[{t:this.shape_21}]},1).to({state:[{t:this.shape_22}]},1).to({state:[{t:this.shape_23}]},1).to({state:[{t:this.shape_24}]},1).to({state:[{t:this.shape_25}]},1).to({state:[{t:this.shape_26}]},1).to({state:[{t:this.shape_27}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_29}]},1).to({state:[{t:this.shape_28}]},1).to({state:[{t:this.shape_30}]},1).to({state:[{t:this.shape_31}]},1).to({state:[{t:this.shape_32}]},1).to({state:[{t:this.shape_33}]},1).to({state:[{t:this.shape_34}]},1).to({state:[{t:this.shape_35}]},1).to({state:[{t:this.shape_36}]},1).to({state:[{t:this.shape_37}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_39}]},1).to({state:[{t:this.shape_38}]},1).to({state:[{t:this.shape_40}]},1).to({state:[{t:this.shape_41}]},1).to({state:[{t:this.shape_42}]},1).to({state:[{t:this.shape_43}]},1).to({state:[{t:this.shape_44}]},1).to({state:[{t:this.shape_45}]},1).to({state:[{t:this.shape_46}]},1).to({state:[{t:this.shape_47}]},1).to({state:[{t:this.shape_48}]},1).to({state:[{t:this.shape_49}]},1).to({state:[{t:this.shape_50}]},1).to({state:[{t:this.shape_51}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_52}]},1).to({state:[{t:this.shape_51}]},1).to({state:[{t:this.shape_53}]},1).to({state:[{t:this.shape_54}]},1).to({state:[{t:this.shape_55}]},1).to({state:[{t:this.shape_56}]},1).to({state:[{t:this.shape_57}]},1).to({state:[{t:this.shape_58}]},1).to({state:[{t:this.shape_59}]},1).to({state:[{t:this.shape_60}]},1).to({state:[{t:this.shape_61}]},1).to({state:[{t:this.shape_62}]},1).to({state:[{t:this.shape_63}]},1).to({state:[{t:this.shape_64}]},1).to({state:[{t:this.shape_65}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).to({state:[{t:this.shape_66}]},1).wait(1));
	this.timeline.addTween(cjs.Tween.get(this.shape_2).wait(1).to({_off:false},0).wait(3).to({_off:true},1).wait(550));
	this.timeline.addTween(cjs.Tween.get(this.shape_15).wait(17).to({_off:false},0).wait(300).to({_off:true},1).wait(237));
	this.timeline.addTween(cjs.Tween.get(this.shape_29).wait(331).to({_off:false},0).wait(103).to({_off:true},1).wait(120));
	this.timeline.addTween(cjs.Tween.get(this.shape_39).wait(445).to({_off:false},0).wait(12).to({_off:true},1).wait(97));
	this.timeline.addTween(cjs.Tween.get(this.shape_52).wait(471).to({_off:false},0).wait(9).to({_off:true},1).wait(74));
	this.timeline.addTween(cjs.Tween.get(this.shape_66).wait(495).to({_off:false},0).wait(60));

	// starSymbol
	this.shape_67 = new cjs.Shape();
	this.shape_67.graphics.f().s("#FF9900").ss(2,1,1).p("AhyB/IgPhHIgsA5IAShFIhAAgIAtg3IhHACIBBgdIhBgeIBHACIgtg3IBAAgIgShFIAsA5IAPhHIAOBHIArg5IgRBFIBAggIguA3IBHgCIhAAeIBAAdIhHgCIAuA3IhAggIARBFIgrg5gAD2hTQgSAUggAZQgLAJgLAMQADAQADAPQAKAxADAKQAIAhASAUACUhvQAQAyAKAsQgfAbghAlQgYAcg1BC");
	this.shape_67.setTransform(860.75,45.925);

	this.shape_68 = new cjs.Shape();
	this.shape_68.graphics.f("#FFCC00").s().p("AgNA/IgsA5IARhFIg/AgIAtg3IhHACIBBgeIhBgdIBHACIgtg3IA/AgIgRhFIAsA5IANhHIAOBHIAsg5IgRBFIA/ggIgtA3IBHgCIhBAdIBBAeIhHgCIAtA3Ig/ggIARBFIgsg5IgOBHg");
	this.shape_68.setTransform(849.175,45.225);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_68},{t:this.shape_67}]}).wait(555));

	// guide
	this.instance_2 = new lib.guides("synched",0);
	this.instance_2.setTransform(450.05,486.85,1,1,0,0,0,539.9,33);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(430).to({regX:524,regY:17.2,rotation:-0.0009,x:459.05,y:472.05},0).wait(1).to({regX:539.9,regY:33.1,rotation:-0.0015,x:474.95,y:487.9},0).wait(1).to({startPosition:0},0).wait(1).to({rotation:0.0112},0).wait(1).to({rotation:0.0187,y:487.85},0).wait(1).to({rotation:0.0244,y:466.25},0).wait(1).to({rotation:0.0288,y:444.65},0).wait(1).to({rotation:0.0324,x:475,y:423.05},0).wait(1).to({rotation:0.0354,y:401.5},0).wait(1).to({rotation:0.0378,y:379.85},0).wait(1).to({rotation:0.0398,y:358.25},0).wait(1).to({rotation:0.0414,y:336.65},0).wait(1).to({rotation:0.0426,y:315.05},0).wait(1).to({rotation:0.0436,y:293.4},0).wait(1).to({rotation:0.0443,x:474.95,y:271.8},0).wait(1).to({rotation:0.0448,y:250.2},0).wait(1).to({rotation:0.0451,y:228.6},0).wait(1).to({rotation:0.0452,y:207},0).wait(1).to({rotation:0.7289,x:474.75,y:185.6},0).wait(1).to({rotation:2.7199,x:474.2,y:153.7},0).wait(1).to({rotation:5.9368,x:473.25,y:122.1},0).wait(1).to({rotation:10.3076,x:471.9,y:90.8},0).wait(1).to({rotation:15.769,x:470.05,y:59.5},0).wait(1).to({rotation:22.2647,x:467.75,y:28.25},0).wait(1).to({rotation:29.7447,x:464.95,y:-3.25},0).wait(1).to({rotation:38.1641,x:461.75,y:-35.05},0).wait(1).to({rotation:47.4823,x:458.05,y:-67.3},0).wait(1).to({rotation:57.6621,x:454,y:-67.5},0).wait(1).to({rotation:68.6675,x:449.7,y:-68.55},0).wait(1).to({rotation:80.4607,x:445.5,y:-70.5},0).wait(1).to({rotation:92.9942,x:441.7,y:-73.5},0).wait(1).to({rotation:99.6995,x:439.85,y:-75.25},0).wait(1).to({rotation:102.342,x:439.1,y:-75.8},0).wait(1).to({rotation:103.4538,x:447.25,y:-115.9},0).wait(1).to({rotation:103.6361,x:455.55,y:-155.65},0).wait(1).to({rotation:103.1896,x:464,y:-195.3},0).wait(1).to({rotation:102.2751,x:472.55,y:-234.75},0).wait(1).to({rotation:100.9892,x:481.2,y:-274},0).wait(1).to({rotation:99.393,x:489.95,y:-313.25},0).wait(1).to({rotation:97.5243,x:498.75,y:-352.4},0).wait(1).to({rotation:95.4004,x:507.6,y:-391.5},0).wait(1).to({rotation:92.9942,x:516.6,y:-430.55},0).wait(1).to({x:524.95,y:-470.3},0).wait(1).to({x:533.3,y:-510},0).wait(1).to({x:532.65,y:-510.2},0).wait(1).to({x:532,y:-510.35},0).wait(1).to({x:531.3,y:-510.5},0).wait(1).to({x:530.65,y:-510.7},0).wait(1).to({x:530,y:-510.85},0).wait(1).to({x:529.3,y:-511},0).wait(1).to({x:518.7,y:-148},0).wait(1).to({x:508.05,y:215},0).wait(1).to({x:497.45,y:577.95},0).wait(1).to({x:486.8,y:940.95},0).wait(1).to({y:964},0).wait(1).to({y:987.1},0).wait(1).to({y:1010.15},0).wait(1).to({y:1033.25},0).wait(1).to({y:1056.35},0).wait(1).to({y:1079.4},0).wait(1).to({y:1102.5},0).wait(1).to({y:1125.55},0).wait(1).to({y:1148.65},0).wait(1).to({y:1171.75},0).wait(1).to({y:1194.8},0).wait(1).to({y:1217.9},0).wait(1).to({y:1240.95},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).to({_off:true},1).wait(28));

	// bushes
	this.instance_3 = new lib.bushTrio();
	this.instance_3.setTransform(457.25,669.5,1,1,0,0,0,336.5,36.5);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1).to({regX:335,regY:37,x:455.75,y:670},0).wait(16).to({scaleX:1.0007,scaleY:1.0007,x:449.3,y:669.95},0).wait(1).to({scaleX:1.0014,scaleY:1.0014,x:442.95,y:670},0).wait(1).to({scaleX:1.002,scaleY:1.002,x:436.55},0).wait(1).to({scaleX:1.0027,scaleY:1.0027,x:430.15},0).wait(1).to({scaleX:1.0034,scaleY:1.0034,x:423.75},0).wait(1).to({scaleX:1.0041,scaleY:1.0041,x:417.35},0).wait(1).to({scaleX:1.0048,scaleY:1.0048,x:410.95},0).wait(1).to({scaleX:1.0055,scaleY:1.0055,x:404.55},0).wait(1).to({scaleX:1.0061,scaleY:1.0061,x:398.2},0).wait(1).to({scaleX:1.0068,scaleY:1.0068,x:391.8},0).wait(1).to({scaleX:1.0075,scaleY:1.0075,x:385.4},0).wait(1).to({scaleX:1.0082,scaleY:1.0082,x:379},0).wait(1).to({scaleX:1.0089,scaleY:1.0089,x:372.6},0).wait(1).to({scaleX:1.0096,scaleY:1.0096,x:366.2},0).wait(1).to({scaleX:1.0102,scaleY:1.0102,x:359.85},0).wait(1).to({scaleX:1.0109,scaleY:1.0109,x:353.45},0).wait(1).to({scaleX:1.0116,scaleY:1.0116,x:347.05},0).wait(1).to({scaleX:1.0123,scaleY:1.0123,x:340.65},0).wait(1).to({scaleX:1.013,scaleY:1.013,x:334.3},0).wait(1).to({scaleX:1.0137,scaleY:1.0137,x:327.9},0).wait(1).to({scaleX:1.0143,scaleY:1.0143,x:321.5},0).wait(1).to({scaleX:1.015,scaleY:1.015,x:315.15},0).wait(1).to({scaleX:1.0157,scaleY:1.0157,x:308.75},0).wait(1).to({scaleX:1.0164,scaleY:1.0164,x:302.35},0).wait(1).to({scaleX:1.0171,scaleY:1.0171,x:295.95},0).wait(1).to({scaleX:1.0178,scaleY:1.0178,x:289.55},0).wait(1).to({scaleX:1.0184,scaleY:1.0184,x:283.15},0).wait(1).to({scaleX:1.0191,scaleY:1.0191,x:276.75},0).wait(1).to({scaleX:1.0198,scaleY:1.0198,x:270.4},0).wait(1).to({scaleX:1.0205,scaleY:1.0205,x:264},0).wait(1).to({scaleX:1.0212,scaleY:1.0212,x:257.6},0).wait(1).to({scaleX:1.0218,scaleY:1.0218,x:251.2},0).wait(1).to({scaleX:1.0225,scaleY:1.0225,x:244.8},0).wait(1).to({scaleX:1.0232,scaleY:1.0232,x:238.4},0).wait(1).to({scaleX:1.0239,scaleY:1.0239,x:232},0).wait(1).to({scaleX:1.0246,scaleY:1.0246,x:225.65},0).wait(1).to({scaleX:1.0253,scaleY:1.0253,x:219.25},0).wait(1).to({scaleX:1.0259,scaleY:1.0259,x:212.85},0).wait(1).to({scaleX:1.0266,scaleY:1.0266,x:206.45},0).wait(1).to({scaleX:1.0273,scaleY:1.0273,x:200.05},0).wait(1).to({scaleX:1.028,scaleY:1.028,x:193.65},0).wait(1).to({scaleX:1.0287,scaleY:1.0287,x:187.25},0).wait(1).to({scaleX:1.0294,scaleY:1.0294,x:180.9},0).wait(1).to({scaleX:1.03,scaleY:1.03,x:174.45},0).wait(1).to({scaleX:1.0307,scaleY:1.0307,x:168.1},0).wait(1).to({scaleX:1.0314,scaleY:1.0314,x:161.7},0).wait(1).to({scaleX:1.0321,scaleY:1.0321,x:155.3},0).wait(1).to({scaleX:1.0328,scaleY:1.0328,x:148.9},0).wait(1).to({scaleX:1.0335,scaleY:1.0335,x:142.5},0).wait(1).to({scaleX:1.0341,scaleY:1.0341,x:136.15},0).wait(1).to({scaleX:1.0348,scaleY:1.0348,x:129.7},0).wait(1).to({scaleX:1.0355,scaleY:1.0355,x:123.35},0).wait(1).to({scaleX:1.0362,scaleY:1.0362,x:116.95},0).wait(1).to({scaleX:1.0369,scaleY:1.0369,x:110.55},0).wait(1).to({scaleX:1.0375,scaleY:1.0375,x:104.15},0).wait(1).to({scaleX:1.0382,scaleY:1.0382,x:97.75},0).wait(1).to({scaleX:1.0389,scaleY:1.0389,x:91.4},0).wait(1).to({scaleX:1.0396,scaleY:1.0396,x:84.95},0).wait(1).to({scaleX:1.0403,scaleY:1.0403,x:78.6},0).wait(1).to({scaleX:1.041,scaleY:1.041,x:72.2},0).wait(1).to({scaleX:1.0416,scaleY:1.0416,x:65.8},0).wait(1).to({scaleX:1.0423,scaleY:1.0423,x:59.4},0).wait(1).to({scaleX:1.043,scaleY:1.043,x:53},0).wait(1).to({scaleX:1.0437,scaleY:1.0437,x:46.65},0).wait(1).to({scaleX:1.0444,scaleY:1.0444,x:40.2},0).wait(1).to({scaleX:1.0451,scaleY:1.0451,x:33.85},0).wait(1).to({scaleX:1.0457,scaleY:1.0457,x:27.45},0).wait(1).to({scaleX:1.0464,scaleY:1.0464,x:21.05},0).wait(1).to({scaleX:1.0471,scaleY:1.0471,x:14.7},0).wait(1).to({scaleX:1.0478,scaleY:1.0478,x:8.25},0).wait(1).to({scaleX:1.0485,scaleY:1.0485,x:1.9},0).wait(1).to({scaleX:1.0492,scaleY:1.0492,x:-4.55},0).wait(1).to({scaleX:1.0498,scaleY:1.0498,x:-10.9},0).wait(1).to({scaleX:1.0505,scaleY:1.0505,x:-17.3},0).wait(1).to({regX:336.1,regY:36.4,x:-15.8,y:669.55},0).wait(464));

	// floor
	this.shape_69 = new cjs.Shape();
	this.shape_69.graphics.f().s("rgba(0,0,0,0.569)").ss(1,1,1).p("EhBTgIiMCCnAAAIAARFMiCnAAAg");
	this.shape_69.setTransform(469.2727,622.6737,1.1232,1.1232);

	this.shape_70 = new cjs.Shape();
	this.shape_70.graphics.f("#999999").s().p("EhBTAIjIAAxFMCCmAAAIAARFg");
	this.shape_70.setTransform(469.2727,622.6737,1.1232,1.1232);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_70},{t:this.shape_69}]}).wait(555));

	// tree
	this.instance_4 = new lib.tree();
	this.instance_4.setTransform(825.85,401.95,1,1,0,0,0,61.1,158.1);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(17).to({x:824.85},0).wait(1).to({x:823.9},0).wait(1).to({x:822.9},0).wait(1).to({x:821.95},0).wait(1).to({x:820.95},0).wait(1).to({x:820},0).wait(1).to({x:819},0).wait(1).to({x:818.05},0).wait(1).to({x:817.05},0).wait(1).to({x:816.1},0).wait(1).to({x:815.1},0).wait(1).to({x:814.15},0).wait(1).to({x:813.2},0).wait(1).to({x:812.2},0).wait(1).to({x:811.25},0).wait(1).to({x:810.25},0).wait(1).to({x:809.3},0).wait(1).to({x:808.3},0).wait(1).to({x:807.35},0).wait(1).to({x:806.35},0).wait(1).to({x:805.4},0).wait(1).to({x:804.4},0).wait(1).to({x:803.45},0).wait(1).to({x:802.45},0).wait(1).to({x:801.5},0).wait(1).to({x:800.55},0).wait(1).to({x:799.55},0).wait(1).to({x:798.6},0).wait(1).to({x:797.6},0).wait(1).to({x:796.65},0).wait(1).to({x:795.65},0).wait(1).to({x:794.7},0).wait(1).to({x:793.7},0).wait(1).to({x:792.75},0).wait(1).to({x:791.75},0).wait(1).to({x:790.8},0).wait(1).to({x:789.85},0).wait(1).to({x:788.85},0).wait(1).to({x:787.9},0).wait(1).to({x:786.9},0).wait(1).to({x:785.95},0).wait(1).to({x:784.95},0).wait(1).to({x:784},0).wait(1).to({x:783},0).wait(1).to({x:782.05},0).wait(1).to({x:781.05},0).wait(1).to({x:780.1},0).wait(1).to({x:779.1},0).wait(1).to({x:778.15},0).wait(1).to({x:777.2},0).wait(1).to({x:776.2},0).wait(1).to({x:775.25},0).wait(1).to({x:774.25},0).wait(1).to({x:773.3},0).wait(1).to({x:772.3},0).wait(1).to({x:771.35},0).wait(1).to({x:770.35},0).wait(1).to({x:769.4},0).wait(1).to({x:768.4},0).wait(1).to({x:767.45},0).wait(1).to({x:766.45},0).wait(1).to({x:765.5},0).wait(1).to({x:764.55},0).wait(1).to({x:763.55},0).wait(1).to({x:762.6},0).wait(1).to({x:761.6},0).wait(1).to({x:760.65},0).wait(1).to({x:759.65},0).wait(1).to({x:758.7},0).wait(1).to({x:757.7},0).wait(1).to({x:756.75},0).wait(1).to({x:755.75},0).wait(1).to({x:754.8},0).wait(1).to({x:753.85},0).wait(465));

	// mountains
	this.instance_5 = new lib.mountainGroup("synched",0);
	this.instance_5.setTransform(495.05,458.3,1,1,0,0,0,556.6,347.8);

	this.timeline.addTween(cjs.Tween.get(this.instance_5).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({startPosition:0},0).wait(1).to({x:494.95},0).wait(1).to({x:494.8},0).wait(1).to({x:494.65},0).wait(1).to({x:494.55},0).wait(1).to({x:494.4},0).wait(1).to({x:494.25},0).wait(1).to({x:494.15},0).wait(1).to({x:494},0).wait(1).to({x:493.85},0).wait(1).to({x:493.7},0).wait(1).to({x:493.6},0).wait(1).to({x:493.45},0).wait(1).to({x:493.3},0).wait(1).to({x:493.2},0).wait(1).to({x:493.05},0).wait(1).to({x:492.9},0).wait(1).to({x:492.8},0).wait(1).to({x:492.65},0).wait(1).to({x:492.5},0).wait(1).to({x:492.35},0).wait(1).to({x:492.25},0).wait(1).to({x:492.1},0).wait(1).to({x:491.95},0).wait(1).to({x:491.85},0).wait(1).to({x:491.7},0).wait(1).to({x:491.55},0).wait(1).to({x:491.45},0).wait(1).to({x:491.3},0).wait(1).to({x:491.15},0).wait(1).to({x:491},0).wait(1).to({x:490.9},0).wait(1).to({x:490.75},0).wait(1).to({x:490.6},0).wait(1).to({x:490.5},0).wait(1).to({x:490.35},0).wait(1).to({x:490.2},0).wait(1).to({x:490.05},0).wait(1).to({x:489.95},0).wait(1).to({x:489.8},0).wait(1).to({x:489.65},0).wait(1).to({x:489.55},0).wait(1).to({x:489.4},0).wait(1).to({x:489.25},0).wait(1).to({x:489.15},0).wait(1).to({x:489},0).wait(1).to({x:488.85},0).wait(1).to({x:488.7},0).wait(1).to({x:488.6},0).wait(1).to({x:488.45},0).wait(1).to({x:488.3},0).wait(1).to({x:488.2},0).wait(1).to({x:488.05},0).wait(1).to({x:487.9},0).wait(1).to({x:487.8},0).wait(1).to({x:487.65},0).wait(1).to({x:487.5},0).wait(1).to({x:487.35},0).wait(1).to({x:487.25},0).wait(1).to({x:487.1},0).wait(1).to({x:486.95},0).wait(1).to({x:486.85},0).wait(1).to({x:486.7},0).wait(1).to({x:486.55},0).wait(1).to({x:486.45},0).wait(1).to({x:486.3},0).wait(1).to({x:486.15},0).wait(1).to({x:486},0).wait(1).to({x:485.9},0).wait(1).to({x:485.75},0).wait(1).to({x:485.6},0).wait(1).to({x:485.5},0).wait(1).to({x:485.35},0).wait(1).to({x:485.2},0).wait(1).to({x:485.05},0).wait(1).to({startPosition:0},0).wait(464));

	// background
	this.shape_71 = new cjs.Shape();
	this.shape_71.graphics.lf(["#CCFFFF","#FFFFFF"],[0,0.216],0,-305.1,0,305.1).s().p("EhBTAvrMAAAhfVMCCmAAAMAAABfVg");
	this.shape_71.setTransform(469.2727,341.3965,1.1232,1.1232);

	this.timeline.addTween(cjs.Tween.get(this.shape_71).wait(555));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(95.9,-709.5,956.6999999999999,2492.3);
// library properties:
lib.properties = {
	id: '82CA3E4424A4498F9AE734CF115DA5D2',
	width: 939,
	height: 683,
	fps: 24,
	color: "#E1E1E1",
	opacity: 1.00,
	manifest: [
		{src:"images/FrameByFrameModule6Revisions_atlas_1.png?1669805602313", id:"FrameByFrameModule6Revisions_atlas_1"},
		{src:"Sounds/mixkitretrogamenotification212wav.mp3?1669805602432", id:"mixkitretrogamenotification212wav"},
		{src:"Sounds/mixkittribaldrummingambience572mp3cutnetwav.mp3?1669805602432", id:"mixkittribaldrummingambience572mp3cutnetwav"},
		{src:"Sounds/ohgeezwav.mp3?1669805602432", id:"ohgeezwav"},
		{src:"Sounds/turnTheGuidesOffwav.mp3?1669805602432", id:"turnTheGuidesOffwav"},
		{src:"Sounds/whipwav.mp3?1669805602432", id:"whipwav"}
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