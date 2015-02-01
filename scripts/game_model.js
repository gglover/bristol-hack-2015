var GAME_MODEL = {

	started: false,
	

	shapes: ['test_shape_easy_0.png', 'test_shape_easy_1.png', 'test_shape_0.png', 'test_shape_1.png', 'test_shape_2.png', 'test_shape_3.png', 'test_shape_4.png', 'test_shape_5.png', 
				'test_shape_6.png', 'test_shape_7.png', 'test_shape_8.png', 'test_shape_9.png', 'test_shape_10.png'],
	
	shapeIndex: 0,
	distance: 100,
	maxDistance: 100,

	missedShape: false,
	score: 0,
	
	initBackground: null,
	lastBackground: null,
	lastShapeView: null,
	collisionCount: 0,

	start: function() {
		GAME_MODEL.started = true;
		$(document).trigger('started');
	},

	advanceShape: function() {
		GAME_MODEL.distance--;

		if (GAME_MODEL.distance <= 0) {
			GAME_MODEL.shapeIndex = (GAME_MODEL.shapeIndex + 1) % GAME_MODEL.shapes.length;
			GAME_MODEL.distance = GAME_MODEL.maxDistance;
			$(document).trigger('nextShape');
		}
		GAME_MODEL.collisionCount = 0;
	},

	getCurrentShape: function() {
		return 'shapes/' + GAME_MODEL.shapes[GAME_MODEL.shapeIndex];
	},

	getScore: function() {
		if (GAME_MODEL.collisionCount < 100) { 
			GAME_MODEL.score += 5;
			return "PERFECT!"; 
		}
		else if (GAME_MODEL.collisionCount < 500) { 
			GAME_MODEL.score += 3;
			return "GREAT"; 
		} 
		else if (GAME_MODEL.collisionCount < 3000) { 
			GAME_MODEL.score += 2;
			return "GOOD"; 
		}
		else if (GAME_MODEL.collisionCount < 50000) { 
			GAME_MODEL.score += 0
			return "BOO"; 
		} 
		else { 
			GAME_MODEL.score -= 5
			return "MISS" 
		} 
	},

	missedLastShape: function() {
		return GAME_MODEL.collisionCount >= 6000;
	}

	

} 
