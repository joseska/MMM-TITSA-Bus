const request = require('request');
var util = require('util');
var parseString = require('xml2js').parseString;

var IdApp = "36484f7db44067cad85372bca61d976d";
var idParada = "9151";

var url11 = `http://apps.titsa.com/apps/apps_sae_llegadas_parada.asp?IdApp=${IdApp}&idParada=${idParada}`;

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

            //console.log(xml_parseado.llegadas.llegada[0].codigoParada);

            var llegadas1 = xml_parseado.llegadas.llegada

            llegadas1.forEach(element => {
                console.log(element.linea);
            });

            
                
        });

        //self.sendSocketNotification('STATS', self.stats);


    }

});