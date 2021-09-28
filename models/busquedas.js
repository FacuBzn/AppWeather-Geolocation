const fs = require('fs');
const axios = require('axios');

class Busquedas{

    historial = []; 
    dbPath = './db/database.json';

    constructor(){
        // todo leer db si existe
        this.leerDB();
    }

    get paramsMapBox(){
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }
    get paramsOpenWeather(){
        return {
            appid: process.env.OPEN_WEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

    get historialCapitalizado(){
        return this.historial.map( lugar => {

            let palabras = lugar.split(' ');
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1) );

            return palabras.join(' ')
        });
    }

    async ciudad( lugar = ''){
        try {
            //peticion http
            const intance = axios.create({              
                baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapBox
            });

            const resp = await intance.get();            
            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],                
            })); 

        } catch (error) {
           return[]; // retornara los lugares 
        }
    }

    async climaDeLugar( lat, lon ){

        try {
            // instance de axios. create() 
            const intance = axios.create({ 
                baseURL:`https://api.openweathermap.org/data/2.5/weather`,
                params: {... this.paramsOpenWeather, lat, lon}
            })
            // respuesta.data
            const respClima = await intance.get();

            const { weather, main }= respClima.data;
            return {
                desc: weather[0].description,
                min:main.temp_min,
                max:main.temp_max,
                temp:main.temp
            }

        } catch (error) {
            console.log(error);
        }
    }

    agregarHistorial( lugar = ''){

        if (this.historial.includes(lugar.toLocaleLowerCase())) {
            return;
        }
        this.historial = this.historial.splice(0,9);

        this.historial.unshift( lugar.toLocaleLowerCase() );
        //grabar en DB
        this.guardarDB();

    }

    guardarDB(){

        const payload = {
            historial: this.historial
        };

        fs.writeFileSync(this.dbPath, JSON.stringify (payload) );
    }

    
    leerDB(){

        if ( !fs.existsSync ( this.dbPath ) ) {
            return ;
        }
        const info = fs.readFileSync( this.dbPath, { encoding: 'utf-8' } );
        const data =  JSON.parse( info );
    
        this.historial = data.historial;
    }
}

module.exports= Busquedas;