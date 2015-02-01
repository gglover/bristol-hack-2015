GAME_VIEW.initialize();
DISTANCE_VIEW.initialize();
window.gameLoop = 0;



$(document).on('nextShape', function(count) {
	clearInterval(gameLoop);
	setTimeout(setGameLoop, 2000);
	GAME_VIEW.showScore();
	console.log('next');
});

$(document).on('started', function(count) {
	setGameLoop();
	console.log('start');
});

function setGameLoop() {
	window.gameLoop = setInterval( function() { 
		GAME_VIEW.render();
		DISTANCE_VIEW.render();
		GAME_MODEL.advanceShape();
	}, 50);
}
