
let sombras = [];


let sombrasSeleccionadoIndex = null;


document.addEventListener('DOMContentLoaded', function() {
    
    const sombrasStorage = localStorage.getItem('sombras');
    if (sombrasStorage) {
        sombras = JSON.parse(sombrasStorage);
        actualizarListaSombras();
    }
});


function agregarSombras(sombra) {
    sombra.preventDefault();

    const Marca = document.getElementById('Marca').value;
    const Tono = document.getElementById('Tono').value;

    const nuevaSombras = { Marca, Tono };
    sombras.push(nuevaSombras);

    
    actualizarListaSombras();

    
    guardarSombras();

    
    document.getElementById('agregarSombrasForm').reset();
}


function actualizarListaSombras() {
    const listaSombras = document.getElementById('listaSombras');
    listaSombras.innerHTML = '';

    sombras.forEach((sombras, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div class="producto-card">
                <div class="producto-info">
                    <h3>${sombras.Marca}</h3>
                    <p>${sombras.Tono}</p>
                </div>
                <div class="producto-botones">
                    <button onclick="editarSombras(${index})">Editar</button>
                    <button onclick="eliminarSombras(${index})">Eliminar</button>
                </div>
            </div>
        `;
        listaSombras.appendChild(listItem);
    });
}


function guardarSombras() {
    localStorage.setItem('sombras', JSON.stringify(sombras));
}


function editarSombras(index) {
    
    sombrasSeleccionadoIndex = index;

    
    const sombrasSeleccionado = sombras[index];

    
    document.getElementById('MarcaEditar').value = sombrasSeleccionado.Marca;
    document.getElementById('TonoEditar').value = sombrasSeleccionado.Tono;

    
    document.getElementById('modalEditarSombras').style.display = 'block';
}


function guardarCambiosSombras() {
    
    const Marca = document.getElementById('MarcaEditar').value;
    const Tono = document.getElementById('TonoEditar').value;

    
    const sombrasSeleccionado = sombras[sombrasSeleccionadoIndex];
    sombrasSeleccionado.Marca = Marca;
    sombrasSeleccionado.Tono = Tono;

    
    actualizarListaSombras();

    
    guardarSombras();

    
    cerrarModalEditarSombras();
}


function eliminarSombras(index) {
    
    sombrasSeleccionadoIndex = index;

    
    document.getElementById('modalConfirmacionEliminarSombras').style.display = 'block';

    
    document.getElementById('confirmarEliminarSombras').addEventListener('click', confirmarEliminarSombras);
}


function confirmarEliminarSombras() {
    
    sombras.splice(sombrasSeleccionadoIndex, 1);

    
    actualizarListaSombras();

    
    guardarSombras();

    
    cerrarModalConfirmacionEliminarSombras();

    
    sombrasSeleccionadoIndex = null;
}


function cerrarModalEditarSombras() {
    document.getElementById('modalEditarSombras').style.display = 'none';
}


function cerrarModalConfirmacionEliminarSombras() {
    document.getElementById('modalConfirmacionEliminarSombras').style.display = 'none';
}

document.getElementById('agregarSombrasForm').addEventListener('submit', agregarSombras);