# MMM-TITSA-Bus
MagicMirror² Module (https://github.com/MichMich/MagicMirror/) para TITSA bus. Este modulo muestra la información de las guaguas de TITSA a partir de una parada especificada. 

![Alt text](/screenshots/MMM-TITSA-Bus.jpg?raw=true "Screenshot")

## Instalación

1. Navegar hasta la carpeta "module" de MagicMirror y ejecutar <code>git clone https://github.com/joseska/MMM-TITSA-Bus.git</code>. Navegar hasta la nueva carpeta.
2. Ejecutar: <code>npm install</code>


## Usar el modulo MMM-TITSA-Bus

para usar el modulo debes añadir este codigo en el archivo `config/config.js`:
````javascript
modules: [
    {
		module: 'MMM-TITSA-Bus',
		position: 'bottom_left',
		header: 'TITSA',  // This is optional
		config: {
			idParada: '4044',
			IdApp: '36xxxxdb44067cxxxxxxca61dxxxxxxx'
		}
	},

]
````

## Opciones de Configuración

| Option           | Description
|----------------- |-----------
| `idParada`       | *Required* - El numero de parada que quieres mostrar. (http://titsa.com/index.php/tus-guaguas/lineas-y-horarios/linea-011).
| `IdApp   `       | *Required* - ID necesario para utilizar la API de TITSA. (http://www.tenerifedata.com/dataset/titsa-informacion-sobre-sistema-de-transporte).
| `updateInterval` | *Optional* - Cada cuanto tiempo se actualiza la información. <br><br>**Tipo:** `int`(milisegundos) <br>Por Defecto: 60000 ms (1 minuto).
| `animationSpeed` | *Optional* - Velocidad de la animacion de la actualización. <br><br>**Tipo:** `int`(milisegundos) <br>Por Defecto: 2000 ms (2 segundos).

## Dependencias
- [Request] - instalado via `npm install`
- [xml2js] - instalado via `npm install`

![Alt text](/screenshots/MMM-TITSA-Bus2.jpg?raw=true "Screenshot 2")

