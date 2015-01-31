var GAME_MODEL = {
	shapes: ['test_shape_0.png', 'test_shape_1.png', 'test_shape_2.png'],

	shapeIndex: 0,

	distance: 10,

	maxDistance: 10,

	advanceShape: function() {
		GAME_MODEL.distance--;

		if (GAME_MODEL.distance <= 0) {
			GAME_MODEL.shapeIndex = (GAME_MODEL.shapeIndex + 1) % GAME_MODEL.shapes.length;
			GAME_MODEL.distance = GAME_MODEL.maxDistance;
			//$(document).trigger('nextShape');
		} else {
			//$(document).trigger('advanceShape');
		}
	},

	getCurrentShape: function() {
		return 'shapes/' + GAME_MODEL.shapes[GAME_MODEL.shapeIndex];
	},

} 