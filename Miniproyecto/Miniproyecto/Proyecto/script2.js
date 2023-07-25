
let labiales = [];


document.addEventListener('DOMContentLoaded', function() {
    
    const labialesStorage = localStorage.getItem('labiales');
    if (labialesStorage) {
        labiales = JSON.parse(labialesStorage);
        actualizarListaLabiales();
    }
});


function guardarLabiales() {
    localStorage.setItem('labiales', JSON.stringify(labiales));
}


function agregarLabial(event) {
    event.preventDefault();

    const Marca = document.getElementById('Marca').value;
    const tono = document.getElementById('tono').value;

    const nuevoLabial = { Marca, tono};
    labiales.push(nuevoLabial);

    
    actualizarListaLabiales();

    
    guardarLabiales();

    
    document.getElementById('agregarlabial').reset();
}


function actualizarListaLabiales() {
    const listaLabiales = document.getElementById('listaLabiales');
    listaLabiales.innerHTML = '';

    labiales.forEach((labial, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${labial.Marca}</strong> - ${labial.tono}
            <button onclick="eliminarLabiales(${index})">Eliminar</button> <button onclick="editarLabiales(${index})">Editar</button>`;
        listaLabiales.appendChild(listItem);
    });
}


function editarLabiales(index) {
    const labial = labiales[index];
    const MarcaInput = document.getElementById('MarcaEditar');
    const tonoInput = document.getElementById('tonoEditar');

    MarcaInput.value = labial.Marca;
    tonoInput.value = labial.tono;



    document.getElementById('modalEditarLabial').style.display = 'block';

    
    document.getElementById('formularioEditarLabial').setAttribute('data-index', index);
}


function guardarCambiosLabial() {
    const index = document.getElementById('formularioEditarLabial').getAttribute('data-index');
    const labial = labiales[index];

    labial.Marca = document.getElementById('MarcaEditar').value;
    labial.tono = document.getElementById('tonoEditar').value;

    
    actualizarListaLabiales();

    
    guardarLabiales();

    
    cerrarModalEditarLabial();
}


function eliminarLabiales(index) {
    labiales.splice(index, 1);

    
    actualizarListaLabiales();

    
    guardarLabiales();
}


function cerrarModalEditarLabial() {
    
    document.getElementById('modalEditarLabial').style.display = 'none';
}


document.getElementById('agregarlabial').addEventListener('submit', agregarLabial);