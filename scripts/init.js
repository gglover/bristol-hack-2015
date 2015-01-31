GAME_VIEW.initialize();
setInterval( function() { GAME_VIEW.render(); GAME_MODEL.advanceShape(); }, 100);
