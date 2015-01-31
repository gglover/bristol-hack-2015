var GAME_MODEL = {

	started: false,
	
	shapes: ['test_shape_5.png', 'test_shape_6.png', 'test_shape_7.png', 'test_shape_5.png', 'test_shape_4.png', 'test_shape_3.png', 
		'test_shape_5.png', 'test_shape_1.png', 'test_shape_2.png', 'test_shape_0.png'],
	
	shapeIndex: 0,
	distance: 10,
	maxDistance: 10,

	initBackground: null,
	lastBackground: null,
	lastShapeView: null,

	advanceShape: function() {
		GAME_MODEL.distance--;

		if (GAME_MODEL.distance <= 0) {
			GAME_MODEL.shapeIndex = (GAME_MODEL.shapeIndex + 1) % GAME_MODEL.shapes.length;
			GAME_MODEL.distance = GAME_MODEL.maxDistance;
			$(document).trigger('nextShape');
		}
	},

	getCurrentShape: function() {
		return 'shapes/' + GAME_MODEL.shapes[GAME_MODEL.shapeIndex];
	},

} 