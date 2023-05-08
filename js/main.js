// constructores

function Seguro(marca, year, tipo) {
  this.marca = marca;
  this.year = year;
  this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function () {
  /*
   1 = Americano 1.15 
   2 = Asiatico 1.05 
   3 = Europeo 1.35 
   */
  // console.log(this.marca);

  let cantidad;
  const base = 2000;

  switch (this.marca) {
    case "1":
      cantidad = base * 1.15;
      break;
    case "2":
      cantidad = base * 1.05;
      break;
    case "3":
      cantidad = base * 1.35;
      break;

    default:
      break;
  }

  //leer el año

  const diferencia = new Date().getFullYear() - this.year;

  // Cada año que la diferencia es mayor, el costo va a reducir un 3%

  cantidad -= (diferencia * 3 * cantidad) / 100;

  /*
  Si el seguro es basico se multiplica por un 30% mas
  Si el seguro es comp´leto se multiplica por un 50% mas
  */

  if (this.tipo ==='basico') {
    cantidad *= 1.30;
  } else {
    cantidad *= 1.50;
  }
  return cantidad;

};

function UI() {}

UI.prototype.llenarOpciones = () => {
  const min = new Date().getFullYear(),
    max = min + 10;

  const selectYear = document.getElementById("year");

  for (let i = min; i < max; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    selectYear.appendChild(option);
  }

  UI.prototype.mostrarMensaje = (mensaje, tipo) => {
    const div = document.createElement("div");
    div.classList.add("alert", "w-100", "card__alert");
    div.role = "alert";

    if (tipo == "error") {
      div.classList.add("card__alert--danger");
    } else {
      div.classList.add("card__alert--success");
    }
    div.textContent = mensaje;

    //Insertar en el HTML
    const formulario = document.getElementById("cotizarseguro");
    formulario.appendChild(div);

    setTimeout(() => {
      div.remove();
    }, 3000);
  };
};

UI.prototype.mostrarResultado = (total,seguro ) =>{

  //Crear el resultado

  const { marca, year,tipo} = seguro;
  let textoMarca ;

  switch (marca) {
    case '1':
      textoMarca = 'Apolo 18';
      break;
    case '2':
      textoMarca = 'Apolo 19';
      break;
    case '3':
      textoMarca = 'Apolo 20';
      break;
  
    default:
      break;
  }

  const div = document.createElement("div");
  div.classList.add('card__boleto','position-relative');

  div.innerHTML = `

  <h4 class="header fw-bolder"> Boleto Cotizado </h4>
  <div class="d-flex gap-2 fs-6 fw-bold ">
    <p class="font-bold"> ${textoMarca} /</p>
    <p class="font-bold"> ${year}</p>
  </div>
  
  <span class="fw-bolder position-absolute top-0 end-0 m-2 badge rounded-pill text-bg-primary"> ${tipo}</span>
  <p class="font-bold text-end text-info"> Precio: $ ${total}</p>

  `;
   
  const resultadoDiv = document.getElementById('resultado');
  


  // Mostrar el spinner 
  const spinner = document.getElementById('cargando');
  spinner.style.display = 'block';

  setTimeout(() => {
    spinner.style.display = 'none'; // Se borra el spinner 
    resultadoDiv.appendChild(div);// y se muestra el resultado
  }, 3000);

}

// instanciar UI

const ui = new UI();
// console.log(ui);

document.addEventListener("DOMContentLoaded", () => {
  ui.llenarOpciones(); //llena el select con los items
});

eventListeners();

function eventListeners() {
  const formulario = document.getElementById("cotizarseguro");
  formulario.addEventListener("submit", cotizarSeguro);
}

function cotizarSeguro(e) {

  e.preventDefault();

  // Leer la marca seleccionada

  const marca = document.getElementById("marca").value;

  // Leer la año seleccionada

  const year = document.getElementById("year").value;
  // Leer la año seleccionada

  const tipo = document.querySelector('input[name="tipo"]:checked').value;

  if (marca === "" || year === "" || tipo === "") {
    ui.mostrarMensaje("Todos los campos son obligatorios", "error");
    return;
  }
  ui.mostrarMensaje("Cotizando...", "exito");

  // Ocultar las cotizaciones previas'

  const resultados = document.querySelector('#resultado div');

  if (resultados != null) {
    resultados.remove();
  }


  // Instanciar el seguro
  const seguro = new Seguro(marca, year, tipo);
  const total = seguro.cotizarSeguro();
  // seguro.cotizarSeguro();

  // Instanciar el prototype que va a cotizar 

  ui.mostrarResultado(total, seguro); //

  
  // console.log(seguro);
}
