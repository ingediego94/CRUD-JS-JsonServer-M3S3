
async function getData(){
    try{
        const response = await fetch('http://localhost:3301/productos');

        if(!response.ok) {
            throw new Error(`Error en la solicitud de datos ${response.status}`);
        }

        const dataObj = await response.json();
        
        for(data of dataObj){
            console.log(`id: ${data.id}`);
            console.log(`nombre: ${data.nombre}`);
            console.log(`precio: ${data.precio}`);
            console.log();
            
        }

    } catch{
        console.error("Se presentó un error al obtener los datos: " , error);
    }
    
}

getData();