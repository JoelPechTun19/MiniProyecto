
let pestañas = [];


let pestañasSeleccionadoIndex = null;


document.addEventListener('DOMContentLoaded', function() {
    
    const pestañasStorage = localStorage.getItem('pestañas');
    if (pestañasStorage) {
        pestañas = JSON.parse(pestañasStorage);
        actualizarListaPestañas();
    }
});


function agregarPestañas(event) {
    event.preventDefault();

    const Marca = document.getElementById('Marca').value;
    const Color = document.getElementById('Color').value;

    const nuevaPestañas = { Marca, Color };
    pestañas.push(nuevaPestañas);

    
    actualizarListaPestañas();

    
    guardarPestañas();

    
    document.getElementById('agregarPestañasForm').reset();
}


function actualizarListaPestañas() {
    const listaPestañas = document.getElementById('listaPestañas');
    listaPestañas.innerHTML = '';

    pestañas.forEach((pestaña, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="producto-card">
                <div class="producto-info">
                    <h3>${pestaña.Marca}</h3>
                    <p>${pestaña.Color}</p>
                </div>
                <div class="producto-botones">
                    <button onclick="editarPestañas(${index})">Editar</button>
                    <button onclick="eliminarPestañas(${index})">Eliminar</button>
                </div>
            </div>
        `;
        listaPestañas.appendChild(listItem);
    });
}


function guardarPestañas() {
    localStorage.setItem('pestañas', JSON.stringify(pestañas));
}


function editarPestañas(index) {
    
    pestañasSeleccionadoIndex = index;

    
    const pestañasSeleccionado = pestañas[index];

    
    document.getElementById('MarcaEditar').value = pestañasSeleccionado.Marca;
    document.getElementById('ColorEditar').value = pestañasSeleccionado.Color;

    
    document.getElementById('modalEditarPestañas').style.display = 'block';
}


function guardarCambiosPestañas() {
    
    const Marca = document.getElementById('MarcaEditar').value;
    const Color = document.getElementById('ColorEditar').value;

    
    const pestañasSeleccionado = pestañas[pestañasSeleccionadoIndex];
    pestañasSeleccionado.Marca = Marca;
    pestañasSeleccionado.Color = Color;

    
    actualizarListaPestañas();

    
    guardarPestañas();

    
    cerrarModalEditarPestañas();
}


function eliminarPestañas(index) {
    
    pestañasSeleccionadoIndex = index;

    
    document.getElementById('modalConfirmacionEliminarPestañas').style.display = 'block';

    
    document.getElementById('confirmarEliminarPestañas').addEventListener('click', confirmarEliminarPestañas);
}


function confirmarEliminarPestañas() {
    
    pestañas.splice(pestañasSeleccionadoIndex, 1);

    
    actualizarListaPestañas();

    
    guardarPestañas();

    
    cerrarModalConfirmacionEliminarPestañas();

    
    pestañasSeleccionadoIndex = null;
}


function cerrarModalEditarPestañas() {
    document.getElementById('modalEditarPestañas').style.display = 'none';
}


function cerrarModalConfirmacionEliminarPestañas() {
    document.getElementById('modalConfirmacionEliminarPestañas').style.display = 'none';
}

document.getElementById('agregarPestañasForm').addEventListener('submit', agregarPestañas);