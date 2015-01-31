var HT = {

	status: null,
	player: null,
	sectionStart: 0,
	sectionEnd: 0,
	bpm: 0,

	//sectionRestartTime: 0,
	
	initialize: function() {
		HT.status = 'unloaded';
		//setInterval(this._monitorPlayback, 500);
	},

	/* Moving frames at user display */

	move: function() {
		ETM.sectionStart = ETM.sectionEnd = 0;
		ETM.status = 'idle';
	},

	restart: function(videoId) {
		ETM.status = 'switching';
		ETM.player.loadVideoById({videoId: videoId});
	},


	/* Move actual game frames */

	move: function() {
		ETM.player.playVideo();
	},

	restart: function() {
		ETM.player.pauseVideo();
	},

	pass: function() {
		ETM.player.pauseVideo();
	},

	fail: function() {
		ETM.player.pauseVideo();
	}
};
