require('dotenv').config()


require('colors');
const   {  
            inquirerMenu,
            pause,
            leerInput,
            listarLugares
        }
        = require("./helpers/inquirer");
const Busquedas = require('./models/busquedas');

/* console.log('\n MAPBOX_KEY '+ process.env.MAPBOX_KEY+ '\n'); */
const main = async () => {

    const busquedas = new Busquedas();
    
    let opt;

    do {

        opt = await inquirerMenu();
        switch (opt ) {
            case 1:
                //Mostrar mensaje
                const termino = await leerInput('Ciudada: ');
                //Buscar los lugares
                const lugares = await busquedas.ciudad( termino );
                //Seleccionar el lugar
                const idSelec = await listarLugares( lugares );
                const lugarSel = lugares.find ( l => l.id === idSelec );
                /* console.log(lugarSel);
                console.log({ idSelec });  */
                //Clima y geolocalizacion
                const clima = await busquedas.climaDeLugar(lugarSel.lat, lugarSel.lng);
                //mostrar resultados
                console.clear();
                console.log(`\n\t Informacion de la ciudad \n`.bgGreen);    
                console.log('Ciudad: ', `${lugarSel.nombre.green}`);
                console.log('Como esta el clima en la ciudad: ',`${clima.desc.green}`);
                console.log('Latitud: ',lugarSel.lat);
                console.log('Longitud: ',lugarSel.lng);
                console.log('Temperatura: ',clima.temp);
                console.log('Temp Minima: ',clima.min);
                console.log('Temp Maxima: ',clima.max);
                
                break;
            default:
                break;
        }
        if (opt !== 0) await pause();

    } while (opt !== 0);
}

main(); 