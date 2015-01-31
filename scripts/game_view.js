var GAME_VIEW = {

	canvas: null,
	context: null,
	webcam: null,

	shapeImage: null,
	localMediaStream: null,

	SHAPE_MIN_WIDTH: 300,
	SHAPE_MIN_HEIGHT: 200,

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
		}, function() { console.error('failed.')} );
	},

	render: function() {
		var ctx = GAME_VIEW.context;
		var cvs = GAME_VIEW.canvas;
		
		ctx.fillStyle = '#000000';
		ctx.fillRect(0, 0, cvs.width, cvs.height);

		if (GAME_VIEW.localMediaStream) {
			ctx.drawImage(GAME_VIEW.webcam, 0, 0, cvs.width, cvs.height);
		}

		//Draw in advancing shape
		var shapeToDraw = GAME_MODEL.getCurrentShape();
		GAME_VIEW.shapeImage = new Image();
		GAME_VIEW.shapeImage.src = shapeToDraw;

		// Calculate size and position
		var xpos = ((cvs.width - GAME_VIEW._imageWidth()) / 2);
		var ypos = ((cvs.height - GAME_VIEW._imageHeight()) / 2);

		//console.log('xpos: ' + xpos);
		//console.log('ypos: ' + ypos);
		//console.log('height: ' + GAME_VIEW._imageHeight());
		//console.log('width: ' + GAME_VIEW._imageWidth());

		ctx.drawImage(GAME_VIEW.shapeImage, xpos, ypos, GAME_VIEW._imageWidth(), GAME_VIEW._imageHeight());
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