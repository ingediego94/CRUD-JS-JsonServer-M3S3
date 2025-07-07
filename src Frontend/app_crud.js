
// https://www.youtube.com/watch?v=8yIcHqTG7bU&ab_channel=InformáticaDP
// https://www.youtube.com/watch?v=kH4UbdlBZHs&ab_channel=InformáticaDP
// https://www.youtube.com/watch?v=tcPLunlJCtY&ab_channel=InformáticaDP


// API's url:
const direction = 'http://localhost:3301/productos';

const contenedor = document.querySelector('tbody');
let resultados = '';

const modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'));
const formArticulo = document.querySelector('form');
const id = document.getElementById('id'); ///revisar¡
const producto = document.getElementById('producto');
const precio = document.getElementById('precio');
const stock = document.getElementById('stock');
let opcion = '';

// to show adding new product window. & clean fields
btnCrear.addEventListener('click', ()=>{
    id.value = ''
    producto.value = ''         // cleaning every field
    precio.value = ''
    stock.value = ''
    modalArticulo.show()
    opcion = 'crear'
})



// -------------------------------------------
// GET:     To see registers

async function getData(){
    try{
        const response = await fetch( direction );

        if(!response.ok) {
            throw new Error(`Error en la solicitud de datos ${response.status}`);
        }

        const dataObj = await response.json();
        
        dataObj.forEach(articulo => {
            
            resultados += `
                            <tr>
                                <td>${articulo.id}</td>
                                <td>${articulo.producto}</td>
                                <td>${articulo.precio}</td>
                                <td>${articulo.stock}</td>
                                <td class="text-center"><a class="btnEditar btn btn-primary">Editar</a> <a class="btnBorrar btn btn-danger">Borrar</a></td>
                            <tr>
        `
        });
        contenedor.innerHTML = resultados;

    } catch(error){
        console.error("Se presentó un error al obtener los datos: " , error);
    }
    
}

// Mandatory to see the whole database
getData()



// -----------------------------------------
// POST:    To Create new registers

async function postData(producto) {

        // To validate before to send
    if (!validateData(producto)) {
        console.log("❌ Producto inválido. No se enviará al servidor.");
        return; // exit the application if the data is incorrect
    }

        // Creating new registers
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
    if ( !producto.id || !producto.producto || typeof producto.precio !== "number" || !producto.stock ) {
        console.log("Se presentó un fallo.");
        return false;
    }
    return true;
}




// -----------------------------------------
// PUT:     To Update an specific register.

async function updateData(productoActualizado) {

    //  To validate before to send
    if (!validateData(productoActualizado)) {
        console.log("❌ Producto inválido. No se enviará al servidor.");
        return; // exit the application if the data is incorrect
    }

        // Updating a register.

    try {
        const response = await fetch(`${direction}/${idForm}`, {
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
// DELETE:      To delete an specific register.

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



// ------------------------------------------------------------------------

// To add functionality to each bottom (Edit and Erase)
const on = (element, event, selector, handler)=>{
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode;
    const id_code = fila.firstElementChild.innerHTML;
    console.log(id_code);
    
    alertify.confirm("¿Desea borrar el registro seleccionado?",
    function(){
        deleteData(id_code);    // Calling to deleteData() to DELETE the element selected         
        alertify.success('Realizado con éxito.');
    },
    function(){
        alertify.error('Operacion cancelada.');
    });
})


// --------------------------------------
// Logic to catch data from Html document.
let idForm = 0;


on(document, 'click', '.btnEditar', e => {
    //console.log('EDITADO');
    const fila = e.target.parentNode.parentNode;
    // console.log(fila);
    idForm = fila.children[0].innerHTML;         // another way to capture first element
    //console.log(idForm);
    const productoForm = fila.children[1].innerHTML;
    // console.log(productoForm);
    const precioForm = fila.children[2].innerHTML;
    // console.log(precioForm);
    const stockForm = fila.children[3].innerHTML;
    //console.log(stockForm);
    // console.log(`ID: ${idForm} - PRODUCTO: ${productoForm} - PRECIO: ${precioForm} - STOCK: ${stockForm}`);
    
    // To modify database
    id.value = idForm;
    producto.value = productoForm;
    precio.value = precioForm;
    stock.value = stockForm;
    
    opcion = 'editar';
    modalArticulo.show();

})


formArticulo.addEventListener('submit', (e)=>{
    e.preventDefault();

    let newProduct = {
        id: id.value,
        producto: producto.value,
        precio: parseFloat(precio.value),
        stock: parseInt(stock.value)
    };


    // It validates if the choice was to Create or to Edit an register.

    if(opcion == 'crear'){
        postData(newProduct);
    }
    if (opcion == 'editar'){
        // console.log("OPCION EDITAR");
        updateData(newProduct);
    }

    modalArticulo.hide();
})