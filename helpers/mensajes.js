const { resolve } = require('path');

require('colors');


const mostrarMenu = () =>{

    return new Promise (resolve => {
        console.clear();
        console.log('========================='.rainbow);
        console.log(' seleccione  una opcion '.blue);
        console.log('=========================\n'.rainbow);
        
        console.log(`${'1.'.blue} Crear tarea`);
        console.log(`${'2.'.blue} Listar tareas`);
        console.log(`${'3.'.blue} Listar tareas completadas`);
        console.log(`${'4.'.blue} Listar tareas pendientes`);
        console.log(`${'5.'.blue} Completar tarea(s)`);
        console.log(`${'6.'.blue} Borrar tarea`);
        console.log(`${'0.'.blue} Salir \n`);
    
            const readline = require('readline').createInterface({
                    input: process.stdin,
                    output: process.stdout
            });
    
            readline.question('seleccione una opcion:  ', (opt) => {
                readline.close();
                resolve(opt);
            })
    });
    }

    return new Promise (resolve => {
        const pausa = () => {
            const readline = require('readline').createInterface({
                input: process.stdin,
                output: process.stdout
            });
    
            readline.question(`\n Presione ${ 'ENTER'.red } para continuar \n`, (opt) => {
                readline.close();
                resolve();
            })
        }
    });

    


module.exports = {
    mostrarMenu,
    pausa
}
