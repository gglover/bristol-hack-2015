var DISTANCE_VIEW = {

	canvas: null,
	context: null,
	person: null,

	PERSON_PADDING: 80,
	
	initialize: function() {
		this.canvas = document.getElementById('distance-canvas');
		this.context = this.canvas.getContext('2d');
		this.person = new Image();
		this.person.src = "misc_images/person.png";
		DISTANCE_VIEW.render();
	},

	render: function() {
		var ctx = DISTANCE_VIEW.context;
		var cvs = DISTANCE_VIEW.canvas;

		ctx.fillStyle = '#ffeeac';
		ctx.fillRect(0, 0, cvs.width, cvs.height);

		ctx.drawImage(DISTANCE_VIEW.person, cvs.width - DISTANCE_VIEW.PERSON_PADDING, 10);

		if (GAME_MODEL.distance == 1 && GAME_MODEL.missedLastShape()) {
			ctx.fillStyle = '#de4a4a';
		} else if (GAME_MODEL.distance == 1) {
			ctx.fillStyle = '#b4ee73';
		} else {
			ctx.fillStyle = '#524a41';
		}
		var xpos = cvs.width - (cvs.width * (GAME_MODEL.distance / GAME_MODEL.maxDistance)) - DISTANCE_VIEW.PERSON_PADDING / 1.8;
		ctx.fillRect(xpos, 0, 30, cvs.height);

	},
}