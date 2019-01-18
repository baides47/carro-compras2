//Variables
const carrito = document.getElementById('carrito');
const cursos  = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito', 'tbody'); 



//Listeners
cargarEventListeners();
//Dispara cuando se presiona agregar al carrito
function cargarEventListeners(){
        //Agregar curso al darle click
        cursos.addEventListener('click', comprarCurso);
        //Eliminar Curso
        carrito.addEventListener('click', eliminarCurso);   

};



//Funciones
//Funcion que añade cursos al carrito
function comprarCurso(e){
    e.preventDefault();
    //Delegation para agregar carritoaa
    if(e.target.classList.contains('agregar-carrito')){
        const curso = e.target.parentElement.parentElement;
        //Enviamos el curso seleccionado para tomar sus datos
        leerDatosCurso(curso); 
    }
}
//Leer los datos del curso
function leerDatosCurso(curso){
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio, span').textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }
    insertarCarrito(infoCurso);
}
//Creamos los datos a insertar en el carrito a aprtir de la funcion leerDatosCurso
function insertarCarrito(curso){
    const row = document.createElement('tr');
    row.innerHTML = `<td><img src="${curso.imagen}" width="100" /></td>
                     <td>${curso.titulo}</td>
                     <td>${curso.precio}</td>
                     <td><a href="#" class="borrar-curso" data-id="${curso.id}">X</a></td>
    `;
    listaCursos.appendChild(row);
}

//Elimina el curso del carrito en el DOM
function eliminarCurso(e){
    e.preventDefault();
    let curso;
    if(e.target.classList.contains('borrar-curso')){
        //hacemos doble parentelement para llegar a la etiqueta que nos interesa eliminar que es la tr
        e.target.parentElement.parentElement.remove();
    }
}