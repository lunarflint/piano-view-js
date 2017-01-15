/*
Copyright 2017 Lunarflint

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

function PianoView(canvasNode) {
   
	var WHITE_KEY_WIDTH = 100;
	var BLACK_KEY_WIDTH = 60;
	var WB_H_RATIO_L = 0.66;
	var WB_H_RATIO_M = 0.5;
	var WB_H_RATIO_R = 1 - WB_H_RATIO_L;
	var WB_V_RATIO = 0.4;
	var L_SHIFT_1 = WHITE_KEY_WIDTH - WB_H_RATIO_L * BLACK_KEY_WIDTH;   // C -> C# or F -> F#
	var L_SHIFT_2 = WHITE_KEY_WIDTH - L_SHIFT_1;                        // C# -> D or F# -> G
	var M_SHIFT_1 = WHITE_KEY_WIDTH - WB_H_RATIO_M * BLACK_KEY_WIDTH;   // G -> G#
	var M_SHIFT_2 = WHITE_KEY_WIDTH - M_SHIFT_1;                        // G# -> A
	var R_SHIFT_1 = WHITE_KEY_WIDTH - WB_H_RATIO_R * BLACK_KEY_WIDTH;   // D -> D# or A -> A#
	var R_SHIFT_2 = WHITE_KEY_WIDTH - R_SHIFT_1;                        // D# -> E or A# -> B
	var W_SHIFT = WHITE_KEY_WIDTH;                                      // E -> F or B -> C

	//init
	var obj = this;

	this.canvas = canvasNode;
	if(!this.canvas)
		throw 'canvas is null';

	var ctx = this.canvas.getContext('2d');
	if(!ctx)
		throw 'cannot get 2d context';

	ctx.strokeStyle = '#454545';
	ctx.lineWidth = 1;

	var position = 5 * 7 * WHITE_KEY_WIDTH; // Middle C / C5
	var scale = 1;

	var height = obj.canvas.height;

	var touches = {}; //this is a set, values are not used
	var pointerMap = {};


	this.getScale = function() { return obj.scale; }

	this.getPosition = function() { return obj.position; }

	this.setScale = function(scale_) {
		scale = scale_; 
		draw();
	}

	this.setPosition = function(position_) {
		position_ = position_ < 0 ? 0 : position_;
		position_ = position_ > 75 * WHITE_KEY_WIDTH ? 75 * WHITE_KEY_WIDTH : position_;
		position = position_; 
		draw();
	}

	this.drawBlackKey = function(ctx, x, isTouching) {
		var height = obj.canvas.height;
		ctx.fillStyle = isTouching ? '#8585b8' : '#111111';
		ctx.fillRect(x, 0, BLACK_KEY_WIDTH * scale, height * (1 - WB_V_RATIO));
		ctx.strokeRect(x, 0, BLACK_KEY_WIDTH * scale, height * (1 - WB_V_RATIO));
	}

	this.drawWhiteKeyL = function(ctx, x, isTouching) {
		var height = obj.canvas.height;
		var y = height * (1 - WB_V_RATIO);
		var ww = WHITE_KEY_WIDTH * scale;
		var bw = BLACK_KEY_WIDTH * scale;
		ctx.beginPath();
		ctx.moveTo(x + 0, 0);
		ctx.lineTo(x + 0, height);
		ctx.lineTo(x + ww, height);
		ctx.lineTo(x + ww, y);
		ctx.lineTo(x + ww - bw * WB_H_RATIO_L, y);
		ctx.lineTo(x + ww - bw * WB_H_RATIO_L, 0);
		ctx.closePath();
		ctx.fillStyle = isTouching ? '#8585b8' : '#eeeeee';
		ctx.fill();
		ctx.stroke();
	}

	this.drawWhiteKeyR = function(ctx, x, isTouching) {
		var height = obj.canvas.height;
		var y = height * (1 - WB_V_RATIO);
		var ww = WHITE_KEY_WIDTH * scale;
		var bw = BLACK_KEY_WIDTH * scale;
		ctx.beginPath();
		ctx.moveTo(x + 0, y);
		ctx.lineTo(x + 0, height);
		ctx.lineTo(x + ww, height);
		ctx.lineTo(x + ww, 0);
		ctx.lineTo(x + bw * (1 - WB_H_RATIO_R), 0);
		ctx.lineTo(x + bw * (1 - WB_H_RATIO_R), y);
		ctx.closePath();
		ctx.fillStyle = isTouching ? '#8585b8' : '#eeeeee';
		ctx.fill();
		ctx.stroke();
	}

	this.drawWhiteKeyG = function(ctx, x, isTouching) {
		var height = obj.canvas.height;
		var y = height * (1 - WB_V_RATIO);
		var ww = WHITE_KEY_WIDTH * scale;
		var bw = BLACK_KEY_WIDTH * scale;
		ctx.beginPath();
		ctx.moveTo(x + 0, y);
		ctx.lineTo(x + 0, height);
		ctx.lineTo(x + ww, height);
		ctx.lineTo(x + ww, y);
		ctx.lineTo(x + ww - bw * WB_H_RATIO_M, y);
		ctx.lineTo(x + ww - bw * WB_H_RATIO_M, 0);
		ctx.lineTo(x + bw * (1 - WB_H_RATIO_L), 0);
		ctx.lineTo(x + bw * (1 - WB_H_RATIO_L), y);
		ctx.closePath();
		ctx.fillStyle = isTouching ? '#8585b8' : '#eeeeee';
		ctx.fill();
		ctx.stroke();
	}

	this.drawWhiteKeyA = function(ctx, x, isTouching) {
		var height = obj.canvas.height;
		var y = height * (1 - WB_V_RATIO);
		var ww = WHITE_KEY_WIDTH * scale;
		var bw = BLACK_KEY_WIDTH * scale;
		ctx.beginPath();
		ctx.moveTo(x + 0, y);
		ctx.lineTo(x + 0, height);
		ctx.lineTo(x + ww, height);
		ctx.lineTo(x + ww, y);
		ctx.lineTo(x + ww - bw * WB_H_RATIO_R, y);
		ctx.lineTo(x + ww - bw * WB_H_RATIO_R, 0);
		ctx.lineTo(x + bw * (1 - WB_H_RATIO_M), 0);
		ctx.lineTo(x + bw * (1 - WB_H_RATIO_M), y);
		ctx.closePath();
		ctx.fillStyle = isTouching ? '#8585b8' : '#eeeeee';
		ctx.fill();
		ctx.stroke();
	}

	this.drawWhiteKeyD = function(ctx, x, isTouching) {
		var height = obj.canvas.height;
		var y = height * (1 - WB_V_RATIO);
		var ww = WHITE_KEY_WIDTH * scale;
		var bw = BLACK_KEY_WIDTH * scale;
		ctx.beginPath();
		ctx.moveTo(x + 0, y);
		ctx.lineTo(x + 0, height);
		ctx.lineTo(x + ww, height);
		ctx.lineTo(x + ww, y);
		ctx.lineTo(x + ww - bw * WB_H_RATIO_R, y);
		ctx.lineTo(x + ww - bw * WB_H_RATIO_R, 0);
		ctx.lineTo(x + bw * (1 - WB_H_RATIO_L), 0);
		ctx.lineTo(x + bw * (1 - WB_H_RATIO_L), y);
		ctx.closePath();
		ctx.fillStyle = isTouching ? '#8585b8' : '#eeeeee';
		ctx.fill();
		ctx.stroke();
	}

	function pixelToMidiNote(x, y) {
		var height = obj.canvas.height;

		var pos = x / scale + position;
		var octave = Math.floor(Math.floor(pos / WHITE_KEY_WIDTH) / 7); // 7 white keys in total
		var pos2 = pos - octave * WHITE_KEY_WIDTH * 7;

		var key;

		if (y > height * (1 - WB_V_RATIO)) { // lower half of the keyboard, must be white key
			key = Math.floor(pos / WHITE_KEY_WIDTH) % 7;
			switch (key) {
				//case 0: key = 0; break;   // C
				case 1: key = 2; break;     // D
				case 2: key = 4; break;     // E
				case 3: key = 5; break;     // F
				case 4: key = 7; break;     // G
				case 5: key = 9; break;     // A
				case 6: key = 11; break;    // B
			}
		}
		else { // upper half, need to check for black keys
			if(pos2 >= WHITE_KEY_WIDTH * 3) { // F - B
				if (pos2 < WHITE_KEY_WIDTH * 3 + L_SHIFT_1)
					key = 5; // F
				else if (pos2 < WHITE_KEY_WIDTH * 3 + L_SHIFT_1 + BLACK_KEY_WIDTH)
					key = 6; // F#
				else if (pos2 < WHITE_KEY_WIDTH * 3 + L_SHIFT_1 + L_SHIFT_2 + M_SHIFT_1)
					key = 7; // G
				else if (pos2 < WHITE_KEY_WIDTH * 3 + L_SHIFT_1 + L_SHIFT_2 + M_SHIFT_1 + BLACK_KEY_WIDTH)
					key = 8; // G#
				else if (pos2 < WHITE_KEY_WIDTH * 3 + L_SHIFT_1 + L_SHIFT_2 + M_SHIFT_1 + M_SHIFT_2 + R_SHIFT_1)
					key = 9; // A
				else if (pos2 < WHITE_KEY_WIDTH * 3 + L_SHIFT_1 + L_SHIFT_2 + M_SHIFT_1 + M_SHIFT_2 + R_SHIFT_1 + BLACK_KEY_WIDTH)
					key = 10; // A#
				else
					key = 11; // B

			}
			else { // C - E
				if (pos2 < L_SHIFT_1)
					key = 0; // C
				else if (pos2 < L_SHIFT_1 + BLACK_KEY_WIDTH)
					key = 1; // C#
				else if (pos2 < L_SHIFT_1 + L_SHIFT_2 + R_SHIFT_1)
					key = 2; // D
				else if (pos2 < L_SHIFT_1 + L_SHIFT_2 + R_SHIFT_1 + BLACK_KEY_WIDTH)
					key = 3; // D#
				else
					key = 4; // E
			}
		}
		return octave * 12 + key;
	}

	function draw() {
		var width = obj.canvas.width;
		var height = obj.canvas.height;

		var left = position;
		var right = position + width / scale;
		var pos = left - (left % WHITE_KEY_WIDTH) - WHITE_KEY_WIDTH;
		pos = pos < 0 ? 0 : pos;

		var note = pixelToMidiNote((pos - left) * scale, height); //get the white note at start

		while (pos < right) {
			var x = (pos - left) * scale;
			var isTouching = note in touches;
			switch (note % 12) {
				case 0: //C
					obj.drawWhiteKeyL(ctx, x, isTouching);
					pos += L_SHIFT_1;
					++note;
					break;

				case 1: //C#
					obj.drawBlackKey(ctx, x, isTouching);
					pos += L_SHIFT_2;
					++note;
					break;

				case 2: //D
					obj.drawWhiteKeyD(ctx, x, isTouching);
					pos += R_SHIFT_1;
					++note;
					break;

				case 3: //D#
					obj.drawBlackKey(ctx, x, isTouching);
					pos += R_SHIFT_2;
					++note;
					break;

				case 4: //E
					obj.drawWhiteKeyR(ctx, x, isTouching);
					pos += W_SHIFT;
					++note;
					break;

				case 5: //F
					obj.drawWhiteKeyL(ctx, x, isTouching);
					pos += L_SHIFT_1;
					++note;
					break;

				case 6: //F#
					obj.drawBlackKey(ctx, x, isTouching);
					pos += L_SHIFT_2;
					++note;
					break;

				case 7: //G
					obj.drawWhiteKeyG(ctx, x, isTouching);
					pos += M_SHIFT_1;
					++note;
					break;

				case 8: //G#
					obj.drawBlackKey(ctx, x, isTouching);
					pos += M_SHIFT_2;
					++note;
					break;

				case 9: //A
					obj.drawWhiteKeyA(ctx, x, isTouching);
					pos += R_SHIFT_1;
					++note;
					break;

				case 10: //A#
					obj.drawBlackKey(ctx, x, isTouching);
					pos += R_SHIFT_2;
					++note;
					break;

				case 11: //B
					obj.drawWhiteKeyR(ctx, x, isTouching);
					pos += W_SHIFT;
					++note;
					break;
			}
		}
	}

	draw();

	//input

	this.canvas.addEventListener('mousedown', function(ev) {
		down(ev, 0);
		ev.preventDefault();
	}, false);

	this.canvas.addEventListener('mouseup', function(ev) {
		up(ev, 0);
		ev.preventDefault();
	}, false);

	function down(ev, ptrId) {
		var x = ev.clientX;
		var y = ev.clientY;
		var note = pixelToMidiNote(x, y);
		touches[note] = 1;
		pointerMap[ptrId] = note;
		draw();

                var velocity = Math.floor(0.5 + y * 127 / (height * (1 - WB_V_RATIO)));
                velocity = velocity > 127 ? 127 : velocity;

		var evt = document.createEvent('CustomEvent');
		evt.initCustomEvent('keydown', false, false, { midiNote: note, velocity: velocity });
		obj.canvas.dispatchEvent(evt);
	}

	function up(ev, ptrId) {
		var note = pointerMap[ptrId];
		if(note) {
			delete touches[note];
			delete pointerMap[ptrId];
		}
		draw();
		var evt = document.createEvent('CustomEvent');
		evt.initCustomEvent('keyup', false, false, { midiNote: note });
		obj.canvas.dispatchEvent(evt);
	}

}
