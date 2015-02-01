var GAME_VIEW = {

	canvas: null,
	context: null,
	webcam: null,

	shapeImage: null,
	localMediaStream: null,

	SHAPE_MIN_WIDTH: window.innerWidth/1.2,
	SHAPE_MIN_HEIGHT: (window.innerHeight - 20)/1.2,

	initialize: function() {
		this.canvas = document.getElementById('game-canvas');
		this.context = this.canvas.getContext('2d');

		this.canvas.width  = $(window).width();
  		this.canvas.height = $(window).height() - 50;

  		// flip data
		GAME_VIEW.context.translate(GAME_VIEW.canvas.width, 0);
		GAME_VIEW.context.scale(-1, 1);

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
		debugger;
		var ctx = GAME_VIEW.context;
		var cvs = GAME_VIEW.canvas;

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
		GAME_VIEW.shapeImage.height = window.innerHeight - 20;

		// Calculate size and position
		var xpos = ((cvs.width - GAME_VIEW._imageWidth()) / 2);
		var ypos = ((cvs.height - GAME_VIEW._imageHeight()) / 2);

		ctx.drawImage(GAME_VIEW.shapeImage, xpos, ypos, GAME_VIEW._imageWidth(), GAME_VIEW._imageHeight());

		var data = GAME_VIEW.context.getImageData(0, 0, GAME_VIEW.canvas.width, GAME_VIEW.canvas.height);
		GAME_MODEL.lastShapeView = data;

		if (GAME_MODEL.distance == 1) {
			ctx.putImageData(GAME_VIEW.detectCollision(personMask), 0, 0);
		}

	},

	beginCaptureBackground: function() {
		var $overlay = $('#message-overlay');
		GAME_VIEW.flashMessage('Please step out of the frame.', 3000);
		setTimeout(function() { GAME_VIEW.flashMessage('3', 500); }, 4000);
		setTimeout(function() { GAME_VIEW.flashMessage('2', 500); }, 5000);
		setTimeout(function() { GAME_VIEW.flashMessage('1', 500); }, 6000);
		setTimeout(function() {
			GAME_MODEL.initBackground = GAME_VIEW.captureBackground();
			GAME_MODEL.started = true;
			GAME_MODEL.start();
		}, 7000);

	},

	detectPeople: function() {
			var bgData = GAME_MODEL.initBackground.data;
			var	pData = GAME_MODEL.lastBackground.data;

			var width = GAME_MODEL.initBackground.width;
			var height = GAME_MODEL.initBackground.height;

			for (var i = 0; i < bgData.length; i += 4) {
				if ((Math.abs(bgData[i] - pData[i]) < 42) &&
					(Math.abs(bgData[i + 1] - pData[i + 1]) < 42) &&
					(Math.abs(bgData[i + 2] - pData[i + 2]) < 42)) {
				} else {
					pData[i + 3] = 200;
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

	captureBackground: function() {
		GAME_VIEW.context.drawImage(GAME_VIEW.webcam, 0, 0, GAME_VIEW.canvas.width, GAME_VIEW.canvas.height);
    	//get the canvas data
    	//var data = GAME_VIEW.context.getImageData(0, 0, GAME_VIEW.canvas.width, GAME_VIEW.canvas.height);
		//GAME_VIEW.context.drawImage(GAME_VIEW.webcam, 0, 0);

    	// draw image
		//GAME_VIEW.context.putImageData(ImageData, 0, 0);
		
    	// getImage data again
		var data = GAME_VIEW.context.getImageData(0, 0, GAME_VIEW.canvas.width, GAME_VIEW.canvas.height);
		return data;

	},

	showScore: function() {
		GAME_VIEW.flashMessage(GAME_MODEL.getScore(), 1000);
		$('#score-number').text(GAME_MODEL.score);
		
	},

	flashMessage: function(message, time) {
		$mo = $('#message-overlay');
		$mo.show().text(message);
		setTimeout(function() {
			$mo.fadeOut(500);
		}, time - 500);
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
