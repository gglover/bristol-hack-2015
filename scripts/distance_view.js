var DISTANCE_VIEW = {

	canvas: null,
	context: null,
	person: null,

	PERSON_PADDING: 40,
	
	initialize: function() {
		this.canvas = document.getElementById('distance-canvas');
		this.context = this.canvas.getContext('2d');
		this.person = new Image();
		this.person.src = "misc_images/person.png"
	},

	render: function() {
		var ctx = DISTANCE_VIEW.context;
		var cvs = DISTANCE_VIEW.canvas;

		ctx.fillStyle = '#FFFFFF';
		ctx.fillRect(0, 0, cvs.width, cvs.height);

		ctx.drawImage(DISTANCE_VIEW.person, cvs.width - DISTANCE_VIEW.PERSON_PADDING, 10);

		ctx.fillStyle = '#000000';
		var xpos = cvs.width - (cvs.width * (GAME_MODEL.distance / GAME_MODEL.maxDistance)) + DISTANCE_VIEW.PERSON_PADDING;
		ctx.fillRect(xpos, 0, 40, cvs.height);

	},
}