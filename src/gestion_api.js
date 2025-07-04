
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

getData();

// -----------------------------------------
// POST:

async function postData(producto) {
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

// Ejemplo de uso:
// postData({ id: "6", nombre: "Silla gamer", precio: 540 });


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

// Ejemplo de uso:
// updateData("2", { nombre: "Mouse inalámbrico", precio: 35 });


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

// Ejemplo de uso:
// deleteData("3");









