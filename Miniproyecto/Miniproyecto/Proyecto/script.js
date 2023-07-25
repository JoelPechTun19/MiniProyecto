
let usuarios = [];

let usuarioSeleccionadoIndex = null;


document.addEventListener('DOMContentLoaded', function() {

    const usuariosStorage = localStorage.getItem('usuarios');
    if (usuariosStorage) {
        usuarios = JSON.parse(usuariosStorage);
        actualizarListaUsuarios();
    }
});


function agregarUsuario(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;

    const nuevoUsuario = { nombre, correo, contrasena };
    usuarios.push(nuevoUsuario);


    actualizarListaUsuarios();


    guardarUsuarios();


    document.getElementById('registroUsuarioForm').reset();
}


function actualizarListaUsuarios() {
    const listaUsuarios = document.getElementById('listaUsuarios');
    listaUsuarios.innerHTML = '';

    usuarios.forEach((usuario, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${usuario.nombre}</strong> - ${usuario.correo} <button onclick="editarUsuario(${index})">Editar</button> <button onclick="eliminarUsuario(${index})">Eliminar</button>`;
        listaUsuarios.appendChild(listItem);
    });
}


function guardarUsuarios() {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}


function editarUsuario(index) {
    
    usuarioSeleccionadoIndex = index;

    
    const usuarioSeleccionado = usuarios[index];

    
    document.getElementById('nombreEditar').value = usuarioSeleccionado.nombre;
    document.getElementById('correoEditar').value = usuarioSeleccionado.correo;
    document.getElementById('contrasenaEditar').value = usuarioSeleccionado.contrasena;

    
    document.getElementById('modalEditarUsuario').style.display = 'block';
}


function guardarCambiosUsuario() {
    
    const nombre = document.getElementById('nombreEditar').value;
    const correo = document.getElementById('correoEditar').value;
    const contrasena = document.getElementById('contrasenaEditar').value;

    const usuarioSeleccionado = usuarios[usuarioSeleccionadoIndex];
    usuarioSeleccionado.nombre = nombre;
    usuarioSeleccionado.correo = correo;
    usuarioSeleccionado.contrasena = contrasena;

    
    actualizarListaUsuarios();

    
    guardarUsuarios();

    
    cerrarModalEditarUsuario();
}


function eliminarUsuario(index) {
    
    usuarioSeleccionadoIndex = index;

    
    document.getElementById('modalConfirmacionEliminarUsuario').style.display = 'block';

    
    document.getElementById('confirmarEliminarUsuario').addEventListener('click', confirmarEliminarUsuario);
}


function confirmarEliminarUsuario() {
    
    usuarios.splice(usuarioSeleccionadoIndex, 1);

    
    actualizarListaUsuarios();

    
    guardarUsuarios();

    
    cerrarModalConfirmacionEliminarUsuario();

    
    usuarioSeleccionadoIndex = null;
}


function cerrarModalEditarUsuario() {
    document.getElementById('modalEditarUsuario').style.display = 'none';
}


function cerrarModalConfirmacionEliminarUsuario() {
    document.getElementById('modalConfirmacionEliminarUsuario').style.display = 'none';
}

document.getElementById('registroUsuarioForm').addEventListener('submit', agregarUsuario);