GAME_VIEW.initialize();
DISTANCE_VIEW.initialize();

var interval = setInterval( function() { 
	GAME_VIEW.render();
	DISTANCE_VIEW.render();
	GAME_MODEL.advanceShape();
}, 50);

$(document).bind('nextShape', function() {
	//GAME_VIEW.detectCollision();
});
