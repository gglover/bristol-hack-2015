var GAME_VIEW = {

	canvas: null,
	context: null,
	webcam: null,

	shapeImage: null,
	localMediaStream: null,

	SHAPE_MIN_WIDTH: window.innerWidth/1.4,
	SHAPE_MIN_HEIGHT: (window.innerHeight - 50)/1.4,

	initialize: function() {
		this.canvas = document.getElementById('game-canvas');
		this.context = this.canvas.getContext('2d');

		// Setup webcam
		navigator.getUserMedia  = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;

		this.webcam = document.querySelector('video');
		navigator.getUserMedia({video: true}, function(stream) {
			GAME_VIEW.webcam.src = window.URL.createObjectURL(stream);
			GAME_VIEW.localMediaStream = stream;

			GAME_VIEW.beginCaptureBackground();
		}, function() {} );
	},

	render: function() {
		var ctx = GAME_VIEW.context;
		var cvs = GAME_VIEW.canvas;

		ctx.canvas.width  = window.innerWidth;
  		ctx.canvas.height = window.innerHeight - 50;

		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, cvs.width, cvs.height);

		if (GAME_VIEW.localMediaStream) {
			GAME_MODEL.lastBackground = GAME_VIEW.captureBackground();
		}

		// Only display webcam data if background undetected
		if (!GAME_MODEL.started) { return; }

		// Get bitmask of person's position against background
		var personMask = GAME_VIEW.detectPeople();
		ctx.putImageData(GAME_MODEL.lastBackground, 0, 0);

		//Draw in advancing shape
		var shapeToDraw = GAME_MODEL.getCurrentShape();
		GAME_VIEW.shapeImage = new Image();
		GAME_VIEW.shapeImage.src = shapeToDraw;

		GAME_VIEW.shapeImage.width = window.innerWidth;
		GAME_VIEW.shapeImage.height = window.innerHeight - 50;

		// Calculate size and position
		var xpos = ((cvs.width - GAME_VIEW._imageWidth()) / 2);
		var ypos = ((cvs.height - GAME_VIEW._imageHeight()) / 2);

		ctx.drawImage(GAME_VIEW.shapeImage, xpos, ypos, GAME_VIEW._imageWidth(), GAME_VIEW._imageHeight());

		var data = GAME_VIEW.context.getImageData(0, 0, GAME_VIEW.canvas.width, GAME_VIEW.canvas.height);
		GAME_MODEL.lastShapeView = data;

		//var data1 = GAME_VIEW.detectCollision(personMask);
		if (GAME_MODEL.distance == 1) {
			ctx.putImageData(GAME_VIEW.detectCollision(personMask), 0, 0);
		}

	},

	beginCaptureBackground: function() {
		var $overlay = $('#message-overlay');
		$overlay.text('Please step out of the frame.');
		//setTimeout(function() { $overlay.text('5') }, 4000);
		//setTimeout(function() { $overlay.text('4') }, 5000);
		//setTimeout(function() { $overlay.text('3') }, 6000);
		//setTimeout(function() { $overlay.text('2') }, 7000);
		//setTimeout(function() { $overlay.text('1') }, 8000);
		setTimeout(function() {
			$overlay.text('');
			GAME_MODEL.initBackground = GAME_VIEW.captureBackground();
			GAME_MODEL.started = true;
		}, 5000);

	},

	captureBackground: function() {
		GAME_VIEW.context.drawImage(GAME_VIEW.webcam, 0, 0, window.innerWidth, window.innerHeight);
    	//get the canvas data
    	var data = GAME_VIEW.context.getImageData(0, 0, window.innerWidth, window.innerHeight);
		return data;

	},

	detectPeople: function() {
			var bgData = GAME_MODEL.initBackground.data;
			var	pData = GAME_MODEL.lastBackground.data;

			var width = GAME_MODEL.initBackground.width;
			var height = GAME_MODEL.initBackground.height;

			for (var i = 0; i < bgData.length; i += 4) {
				if ((Math.abs(bgData[i] - pData[i]) < 30) &&
					(Math.abs(bgData[i + 1] - pData[i + 1]) < 30) &&
					(Math.abs(bgData[i + 2] - pData[i + 2]) < 30)) {
				} else {
					pData[i + 3] = 240;
					pData[i] = 0;
					//pData[i+1] = 0;
					//pData[i+2] = 0;

				}
			}
			return pData;
	},
	


	detectCollision: function(pData) {
			var ret = GAME_MODEL.lastShapeView;
			for (var i = 0; i < ret.data.length; i += 4) {
				if (pData[i + 3] < 255 && ret.data[i] == 255) {
					ret.data[i] = 255;
					ret.data[i+1] = 0;
					ret.data[i+2] = 0;

					GAME_MODEL.collisionCount++;
				}
			}
			return ret;

	},

	showScore: function() {
		debugger;
		$('#message-overlay').text(GAME_MODEL.getScore());
		setTimeout(function() {
			$('#message-overlay').text('');
		}, 1500);
	},

	_imageWidth: function() {
				// Take difference between largest and smallest size
		return (GAME_VIEW.shapeImage.width - (GAME_VIEW.SHAPE_MIN_WIDTH))
				// Take a fraction of that
				* (GAME_MODEL.distance / GAME_MODEL.maxDistance)
				// Add it to the smallest size
				+ GAME_VIEW.SHAPE_MIN_WIDTH;
	},

	_imageHeight: function() {
		return (GAME_VIEW.shapeImage.height - (GAME_VIEW.SHAPE_MIN_HEIGHT))
				* (GAME_MODEL.distance / GAME_MODEL.maxDistance)
				+ GAME_VIEW.SHAPE_MIN_HEIGHT;
	}
}
