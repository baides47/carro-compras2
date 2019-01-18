//Variables
const carrito = document.getElementById('carrito');
const cursos  = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito', 'tbody');
const vaciarCarritBtn = document.getElementById('vaciar-carrito'); 



//Listeners
cargarEventListeners();
//Dispara cuando se presiona agregar al carrito
function cargarEventListeners(){
        //Agregar curso al darle click
        cursos.addEventListener('click', comprarCurso);
        //Eliminar Curso
        carrito.addEventListener('click', eliminarCurso);
        //Vaciar carrito
        vaciarCarritBtn.addEventListener('click', vaciarCarrito);
        //Al cargar el documento mostrar el localstorage
        document.addEventListener('DOMContentLoaded', leerLocalStorage);   

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
    guardarCursoLocalStorage(curso);
}

//Elimina el curso del carrito en el DOM
function eliminarCurso(e){
    e.preventDefault();
    let curso, 
        cursoId;
    
    if(e.target.classList.contains('borrar-curso')){
        //hacemos doble parentelement para llegar a la etiqueta que nos interesa eliminar que es la tr
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');
        //console.log(cursoId);
    }
    eliminarCursoLocalStorage(cursoId);
}

//Funcion que vacia el carrito en el DOM

function vaciarCarrito(e){
    e.preventDefault();
    //forma lenta
    //listaCursos.innerHTML = '';
    //forma rapida y recomendada
    while(listaCursos.firstChild){
        listaCursos.removeChild(listaCursos.firstChild);
    }
    

    //vaciar carrito del localstorage
    vaciarLocalStorage();
    return false;
}

//Almacenar cursos en el carrito al local storage

function guardarCursoLocalStorage(curso){
    let cursos;
    //Tomar el valor de un arreglo con datos en el LS, lleno o vacio
    cursos = obtenerCursosLocalStorage();

    cursos.push(curso);
      localStorage.setItem('cursos', JSON.stringify(cursos) );
}

//Comprobar que haya elementos en el localstorage
function obtenerCursosLocalStorage(){
    let cursosLS;

    //comprobamos si hay informacion en el localstorage
    if(localStorage.getItem('cursos')=== null){
        cursosLS = [];
    }else{
        cursosLS = JSON.parse(localStorage.getItem('cursos') );
    }
    return cursosLS;
}
//imprime los cursos de localstorage en el carrito
function leerLocalStorage(){
    let cursosLS;

    cursosLS = obtenerCursosLocalStorage();
    cursosLS.forEach(function(curso){
        const row = document.createElement('tr');
    row.innerHTML = `<td><img src="${curso.imagen}" width="100" /></td>
                     <td>${curso.titulo}</td>
                     <td>${curso.precio}</td>
                     <td><a href="#" class="borrar-curso" data-id="${curso.id}">X</a></td>
    `;
    listaCursos.appendChild(row);
    });
}


function eliminarCursoLocalStorage(curso){

    let cursosLS;

    cursosLS = obtenerCursosLocalStorage();
    //Iteramos los id del curso eliminado con los del localstorage
    cursosLS. forEach(function(cursoLS, index){
            if(cursoLS.id === curso){
                cursosLS.splice(index, 1);
            }
    });
    localStorage.setItem('cursos', JSON.stringify(cursosLS));
}

function vaciarLocalStorage(){
    let estavacio;
        
     estavacio = obtenerCursosLocalStorage();
        if(estavacio != ''){
        confirm('¿Estas seguro que deseas eliminar el carrito?')
        localStorage.clear();
        }

    
}