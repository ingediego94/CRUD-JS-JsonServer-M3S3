
// Module 3 Week 3 - CRUD.
// BY: Diego Vallejo Zapata
// Clan Hopper | Riwi



// API's url:
const direction = 'http://localhost:3301/productos';

// -------------------------------------------
// GET:

async function getData(){
    try{
        const response = await fetch( direction );

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



// -----------------------------------------
// POST:

async function postData(producto) {

        // Validar antes de enviar
    if (!validateData(producto)) {
        console.log("❌ Producto inválido. No se enviará al servidor.");
        return; // Salir de la función si los datos son inválidos
    }


    try {
        const response = await fetch(direction, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });

        if (!response.ok) {
            throw new Error(`Error al enviar el producto: ${response.status}`);
        }

        const result = await response.json();
        console.log("Producto agregado:", result);

    } catch (error) {
        console.error("Error al hacer POST:", error);
    }
}


// Function to validate if whole data are correct -- Apply only for Post Method
function validateData(producto){
    if (!producto.nombre || typeof producto.precio !== "number") {
        console.log("Datos del producto no válidos.");
        return false;
    }
    return true;
}



// -----------------------------------------
// PUT:

async function updateData(id, productoActualizado) {
    try {
        const response = await fetch(`${direction}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productoActualizado)
        });

        if (!response.ok) {
            throw new Error(`Error al actualizar el producto: ${response.status}`);
        }

        const result = await response.json();
        console.log("Producto actualizado:", result);
    } catch (error) {
        console.error("Error al hacer PUT:", error);
    }
}




// ----------------------------------------------------
// DELETE
async function deleteData(id) {
    try {
        const response = await fetch(`${direction}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar el producto: ${response.status}`);
        }

        console.log(`Producto con ID ${id} eliminado correctamente.`);
    } catch (error) {
        console.error("Error al hacer DELETE:", error);
    }
}



// -----------------------------------------
// USING ALL THESE METHODS TO MAKE A CRUD:


// Request of query database:
getData();

// Adding a new product:
postData({ id: "4", nombre: "Mesa", precio: 90.1 });
postData({ id: "5", nombre: "Escritorio gamer", precio: 554.3 });

// Update an specific product:
updateData("4", { nombre: "Monitor Apple", precio: 2500 });

// Deleting a product by its Id:
deleteData("2");
