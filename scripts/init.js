GAME_VIEW.initialize();
DISTANCE_VIEW.initialize();
setGameLoop();



$(document).on('nextShape', function() {
	clearInterval(gameLoop);
	setTimeout(setGameLoop, 1000);
});

function setGameLoop() {
	window.gameLoop = setInterval( function() { 
		GAME_VIEW.render();
		DISTANCE_VIEW.render();
		GAME_MODEL.advanceShape();
	}, 50);
}
