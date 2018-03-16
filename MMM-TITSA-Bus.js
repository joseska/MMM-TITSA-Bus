/* global Module */

/* Magic Mirror
 * Module: MMM-TITSA-Bus
 *
 * By Jose M. Luis
 * MIT Licensed.
 */

Module.register('MMM-TITSA-Bus', {
	defaults: {
		idParada: '9151',
		IdApp: '',
		warningTime: 15,
		updateInterval: 60 * 1000, // 1 minutos
		animationSpeed: 2 * 1000, // 2 segundos
	},

	requiresVersion: '2.1.0',

	start() {
		const self = this;

		self.loaded = false;
		self.stats = {};
		//self.linea = {};

		self.sendSocketNotification('START', self.config);
		Log.info('Starting module: ' + self.name);
	},

	getDom() {
		const self = this;

		if (self.error) {
			return self.renderError();
		}

		if (!self.loaded) {
			return self.renderLoading();
		}

		return self.renderStats();
	},


	html: {
		colTrend: '<td align="center" class="fa fa-angle-{0}"></td>',
		colVentilationIcon: '<td align="center" class="fa fa-1 fa-refresh {0} xm-icon"></td>',
		colWindowIcon: '<td align="center" class="fa fa-1 fa-star {0} xm-icon"></td>',
		colTitsaIcon: '<td align="center" class="fas fa-bus {0} xm-icon"></td>',
		colLightIcon: '<td align="center" class="fa fa-1 fa-power-off {0} xm-icon"></td>',
		colHeatingIcon: '<td align="center" class="fa fa-fire {0}">',
		row: '<tr>{0}{1}</tr>',
		loading: '<div class="dimmed light xsmall">Conectando al gateway de TITSA...</div>',
	},


	socketNotificationReceived(notification, payload) {
		const self = this;

		switch (notification) {
			case 'STATS':
				self.loaded = true;
				self.stats = payload;	
				//this.data.header = this.data.header + ' - Parada: ' + self.stats[0].denominacion + ' (' + self.stats[0].codigoParada + ')';
				break;
			case 'ERROR':
				self.error = payload;
				break;
		}

		this.updateDom(self.config.animationSpeed);
	},


	renderError() {
		const self = this;

		let wrapper = document.createElement('div');
		wrapper.className = 'dimmed light small';
		wrapper.innerHTML = self.error;
		return wrapper;
	},

	renderLoading() {
		const self = this;

		let wrapper = document.createElement('div');
		wrapper.className = 'dimmed light small';
		wrapper.innerHTML = self.translate('LOADING');

		return wrapper;
	},

	renderStats() {
		const self = this;

		// Si this.data.header contiene el texto "parada:" no hago nada...
		if (this.data.header.indexOf("Parada:") >= 0) { }
		else { this.data.header = this.data.header + ' - Parada: <b>' + self.stats[0].denominacion + ' (' + self.stats[0].codigoParada + '</b>)'; }
		

		let wrapper = document.createElement('table');
		wrapper.className = 'xsmall';
		
		self.stats.forEach(element => {
			if (self.config.warningTime > element.minutosParaLlegar) {
				wrapper.innerHTML += `
					<tr class="near">
						${this.html.colTitsaIcon}
						<td class="linea normal light small">${element.linea} -</td>
						<td class="destino normal light small">${element.destinoLinea} -</td>
						<td class="minutos normal light small">${element.minutosParaLlegar} Min</td>
					</tr>`;
			}
			else { 
				wrapper.innerHTML += `
					<tr>
						${this.html.colTitsaIcon}
						<td class="linea normal light small">${element.linea} -</td>
						<td class="destino normal light small">${element.destinoLinea} -</td>
						<td class="minutos normal light small">${element.minutosParaLlegar} Min</td>
					</tr>`;
			}
		});

		return wrapper;
	},


	getScripts() {
		return [
			'https://use.fontawesome.com/releases/v5.0.6/js/all.js'
		];
	
	},

	getStyles() {
		return [
			'MMM-TITSA-Bus.css'
		];
	},

	getTranslations() {
		return {
			en: 'translations/en.json',
			es: 'translations/es.json'
		};
	},

	

});
