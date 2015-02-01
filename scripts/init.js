GAME_VIEW.initialize();
DISTANCE_VIEW.initialize();
setGameLoop();



$(document).on('nextShape', function(count) {
	clearInterval(gameLoop);
	setTimeout(setGameLoop, 2000);
	GAME_VIEW.showScore();
});

function setGameLoop() {
	window.gameLoop = setInterval( function() { 
		GAME_VIEW.render();
		DISTANCE_VIEW.render();
		GAME_MODEL.advanceShape();
	}, 50);
}
