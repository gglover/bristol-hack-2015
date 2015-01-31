GAME_VIEW.initialize();

setInterval( function() { 
	GAME_VIEW.render(); 
	GAME_MODEL.advanceShape();
}, 100);

$(document).bind('nextShape', function() {
	GAME_VIEW.detectCollision();
});