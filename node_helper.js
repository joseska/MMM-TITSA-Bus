/* Magic Mirror
 * Node Helper: MMM-TITSA-Bus
 *
 * By Jose M. Luis
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');
const request = require('request');
var parseString = require('xml2js').parseString;

const REQUIRED_FIELDS = ['idParada'];


module.exports = NodeHelper.create({
	start: function() {
		const self = this;

		self.started = false;
		self.config = [];
		self.stats = {};
		self.llegadas1 = {};
	},

	socketNotificationReceived: function(notification, payload) {
		const self = this;

		switch (notification) {
			case 'START':
				self.handleStartNotification(payload);

		}
	},

	handleStartNotification: function(payload) {
		const self = this;

		if (self.started) {
			return;
		}

		self.config = payload;

		if (self.isInvalidConfig()) {
			return;
		}

		self.scheduleUpdates();

		self.started = true;
	},

	updateStats: function () {
		const self = this;

		var url11 = `http://apps.titsa.com/apps/apps_sae_llegadas_parada.asp?IdApp=${self.config.IdApp}&idParada=${self.config.idParada}`;

		request.get({
			url: url11,
			//json: true,
			headers: { 'User-Agent': 'request' }
		}, (err, res, data) => {
			if (err) {
				console.log('Error:', err);
			} else if (res.statusCode !== 200) {
				console.log('Status:', res.statusCode);
			} else {
				parseString(data, { trim: true, explicitArray: false, ignoreAttrs: true }, function (err, xml_parseado) {
					//self.stats = xml_parseado.llegadas.llegada
					self.llegadas1 = xml_parseado.llegadas.llegada

					// llegadas1.forEach(element => {
					// 	Object.assign(self.stats, {
					// 		codigoParada: element.codigoParada,
					// 		denominacion: element.denominacion,
					// 		destinoLinea: element.destinoLinea,
					// 		hora: element.hora,
					// 		idTrayecto: element.idTrayecto,
					// 		linea: element.linea,
					// 		minutosParaLlegar: element.minutosParaLlegar
					// 	});
					// });

					

				});

				self.sendSocketNotification('STATS', self.llegadas1);
			}

		});


	},


	isInvalidConfig: function() {
		const self = this;

		let missingField = REQUIRED_FIELDS.find((field) => {
			return !self.config[field];
		});

		if (missingField) {
			self.sendSocketNotification(
				'ERROR',
				`<i>Confg.${missingField}</i> is required for module: ${self.name}.`
			);
		}

		return !!missingField;
	},

	scheduleUpdates() {
		const self = this;

		self.updateStats();
		setInterval(function() {
			self.updateStats();
		}, self.config.updateInterval);
	},
});
