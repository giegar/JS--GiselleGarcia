class libro {
    constructor(cod, nombre, genero, autor, precio, foto, cant) {
        this.cod = cod;
        this.nombre = nombre;
        this.genero = genero;
        this.autor = autor;
        this.precio = precio;
        this.foto = foto;
        this.cant = 1;
    }
};

const libro1 = new libro(1, "Fuego y Sangre", "Fantasía", "George R R Martin", 10500, "img/img_no_encontrada.png");
const libro2 = new libro(2, "Choque de reyes", "Fantasía", "George R R Martin", 10800, "img/img_no_encontrada.png");
const libro3 = new libro(3, "La tía Cosima", "Novelas", "Florencia Bonelli", 6000, "img/img_no_encontrada.png");
const libro4 = new libro(4, "El hechizo del agua", "Novelas", "Florencia Bonelli", 8000, "img/img_no_encontrada.png");
const libro5 = new libro(5, "Las venas abiertas de América Latina", "Historia", "Eduardo Galeano", 5000, "img/img_no_encontrada.png");
const libro6 = new libro(6, "Sobrenatural", "Autoayuda", "Joe Dispenza", 3000, "img/img_no_encontrada.png");
const libro7 = new libro(7, "La revolucion de la glucosa", "Salud", "Jessie Inchausp", 3500, "img/img_no_encontrada.png");
const libro8 = new libro(8, "El lobo queria festejar su cumpleaños", "Infantil", "Editorial Auzou", 2500, "img/img_no_encontrada.png");

const arrayBiblioteca = [libro1, libro2, libro3, libro4, libro5, libro6, libro7, libro8];

let carritoCompras = [];

const contenedorLibros = document.getElementById("contenedorLibros");
const verLibros = () => {
    arrayBiblioteca.forEach(libro =>{
        const divLibros = document.createElement("div");
        divLibros.className = "cards";
        divLibros.innerHTML= `
                        <img class= "imgcards" src="${libro.foto}" alt="${libro.nombre}, ${libro.autor}">
                        <h3>${libro.nombre}</h3>
                        <p>${libro.autor}</p>
                        <p>${libro.genero}</p>
                        <p>$${libro.precio}</p>
                        <button class="botonEstilo botonProducto" id="agregar_${libro.cod}">Agregar al carrito</button>
                    `;
        contenedorLibros.appendChild(divLibros);

        const botonComprar = document.getElementById(`agregar_${libro.cod}`);
        botonComprar.addEventListener("click", () =>{
            agregarCarrito(libro.cod);
            mostrarCarrito();
        })
    })
};
verLibros();

const agregarCarrito = (cod) => {
    const libroCarrito = carritoCompras.find(libro => libro.cod === cod);
    if(libroCarrito) {
        libroCarrito.cant++;
    }
    else {
        const libroElegido = arrayBiblioteca.find(libro => libro.cod === cod);
        carritoCompras.push(libroElegido);
    }
    localStorage.setItem("carrito", JSON.stringify(carritoCompras))
};    

const divCarrito = document.getElementById("divCarrito");
const verCarrito = document.getElementById("verCarrito");
const mostrarCarrito = () => {
    divCarrito.innerHTML="";
    carritoCompras.forEach(libro =>{
        const carrito = document.createElement("div");
        carrito.className = "cardsCarrito";
        carrito.innerHTML= `
                        <img class= "imgcarrito" src="${libro.foto}" alt="${libro.nombre}, ${libro.autor}">
                        <div class="alinearContenido">
                            <div class="alinearInfo">
                                <p>$${libro.precio}</p>
                                <p>X ${libro.cant}</p>
                            </div>
                            <div class="alinearBotones">
                                <button class="botonEstilo botonCarrito" id="sumar_${libro.cod}"><img src="img/AddPlus.svg"></button>
                                <button class="botonEstilo botonCarrito" id="restar_${libro.cod}"><img src="img/SubtractMinusRemove.svg"></button>
                                <button class="botonEstilo botonCarrito" id="eliminar_${libro.cod}"><img src="img/XCloseDelete.svg"></button>
                            </div>
                        </div>
                    `;
        divCarrito.appendChild(carrito);  
        
        const botonEliminar = document.getElementById(`eliminar_${libro.cod}`);
        botonEliminar.addEventListener("click", () =>{
            eliminarCarrito(libro.cod);
        })
        const botonRestar = document.getElementById(`restar_${libro.cod}`);
        botonRestar.addEventListener("click", () =>{
            restarLibro(libro.cod);
        })
        const botonSumar = document.getElementById(`sumar_${libro.cod}`);
        botonSumar.addEventListener("click", () =>{
            sumarLibro(libro.cod);
        })
    })
    total();
};

const eliminarCarrito = (cod) => {
    const libroEnCarrito = carritoCompras.find(libro => libro.cod === cod);
    const indicLibro = carritoCompras.indexOf(libroEnCarrito);
    carritoCompras.splice(indicLibro, 1);
    mostrarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carritoCompras))
};
const restarLibro = (cod) => {
    const libroMenos = carritoCompras.find(libro => libro.cod === cod);
    if(libroMenos.cant === 1){
        eliminarCarrito(libroMenos);
        mostrarCarrito();
    }
    else{
        libroMenos.cant--;
        mostrarCarrito()
    }
    localStorage.setItem("carrito", JSON.stringify(carritoCompras))
};
const sumarLibro = (cod) => {
    const libroMas = carritoCompras.find(libro => libro.cod === cod);
        libroMas.cant++;
        mostrarCarrito();
        localStorage.setItem("carrito", JSON.stringify(carritoCompras))
};

const totalCarrito = document.getElementById("totalCarrito");

const total = () => {
    let compra = 0;
    carritoCompras.forEach(libro => 
        compra = compra + libro.precio * libro.cant
    );
    totalCarrito.innerHTML = `${compra}`;
};

const limpiarCarrito = document.getElementById("limpiarCarrito");

limpiarCarrito.addEventListener("click", () =>{
    carritoLimpio();
    mostrarCarrito();
})

const carritoLimpio = () => {
    carritoCompras = [];
    localStorage.removeItem("carrito");
}

if(localStorage.getItem("carrito")){
    carritoCompras = JSON.parse(localStorage.getItem("carrito"))
};
mostrarCarrito();