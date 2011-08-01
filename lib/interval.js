// Friendly interval
// Initialize once, then start, stop & restart with single calls

'use strict';

var ee    = require('event-emitter')
  , ntick = require('./next-tick');

var o = ee({
	init: function (i, start) {
		this.f = this.emit.bind(this, 'tick');
		this.i = i;
		this.start.bind(this);
		return this;
	},
	start: function () {
		if (!this.t) {
			this.t = setInterval(this.f, this.i);
			this.running = true;
			this.emit('start');
		}
	},
	stop: function () {
		if (this.t) {
			clearInterval(this.t);
			this.t = null;
			this.running = false;
			this.emit('stop');
		}
	},
	restart: function () {
		this.stop();
		this.start();
	}
});

module.exports = function (i, start) {
	return Object.create(o).init(i, start);
};
