
//Variables
document.getElementById("advertencia-nombre").style.display = 'none';
document.getElementById("advertencia-apellido").style.display = 'none';
document.getElementById("advertencia-email").style.display = 'none';
document.getElementById("advertencia-cantidad").style.display = 'none';

let cantidadTickets = document.getElementById("cantidad");
let costoTotal = document.getElementById("costoTotal");
let selecTipoAsistente = document.getElementById("categoria");
var selectedOption = selecTipoAsistente.options[selecTipoAsistente.selectedIndex];
let cantidad = "";
var lengthNombre = 0;
var lengthApellido = 0;
costoTotal.innerHTML = "-";


const precio = 200;


function seleccionTipoAsistente(tipoAsistente) {
    selecTipoAsistente.value = tipoAsistente;
    calculoCostoTicket(tipoAsistente, (this.cantidadTickets === undefined ? 0 : this.cantidadTickets));
}

//Verifica que el nombre sea válido
document.getElementById('nombre').addEventListener('keydown', event => {
    if (!`${event.key}`.match((/^[A-Za-záéíóúÁÉÍÓÚ]+$/)) && `${event.code}` !== "Backspace") {
        event.preventDefault();
        return false;
    } else if (`${event.code}` === "Backspace") {
        lengthNombre -= 1;

    } else if (`${event.code}` !== "Tab") {

        lengthNombre += 1;
    }

    if (lengthNombre < 3) {
        document.getElementById("advertencia-nombre").style.display = 'block';
    } else {
        document.getElementById("advertencia-nombre").style.display = 'none';
        
    }

});

//Verifica que el apellido sea válido
document.getElementById('apellido').addEventListener('keydown', event => {
    if (!`${event.key}`.match((/^[A-Za-záéíóúÁÉÍÓÚ]+$/)) && `${event.code}` !== "Backspace") {
        event.preventDefault();
        return false;
    } else if (`${event.code}` === "Backspace") {
        lengthApellido -= 1;

    } else if (`${event.code}` !== "Tab"){

        lengthApellido += 1;
    }

    if (lengthApellido < 3) {
        document.getElementById("advertencia-apellido").style.display = 'block';
    } else {
        document.getElementById("advertencia-apellido").style.display = 'none';
    }

});

//validación de email
function emailValido(){
                
    // Get our input reference.
    var emailField = document.getElementById('email');

    // Define our regular expression.
    var validEmail =  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    // Using test we can check if the text match the pattern
    if( validEmail.test(emailField.value) ){
        document.getElementById("advertencia-email").style.display = 'none';
        
        return true;
    } else {
        document.getElementById("advertencia-email").style.display = 'block';
       
        return false;
    }
}

document.getElementById("email").addEventListener('keypress',
function(){
emailValido()
}
);


//Calculo dependiendo del asistente
function calculoCostoTicket(selectedOption, cantidadTickets) {
  
    if (cantidadTickets < 1) {
        document.getElementById("advertencia-cantidad").style.display = 'block';
        costoTotal.innerHTML = "-";
    }
    else {
        document.getElementById("advertencia-cantidad").style.display = 'none';

        if (selectedOption === "estudiante") {

            costoTotal.innerHTML = (precio - (precio * 0.8)) * (Number(cantidadTickets));

        }

        else if (selectedOption === "trainee") {
            costoTotalTickets = (precio - (precio * 0.5)) * (Number(cantidadTickets));
            costoTotal.innerHTML = costoTotalTickets;
        }

        else if (selectedOption === "junior") {
            costoTotalTickets = (precio - (precio * 0.15)) * (Number(cantidadTickets));
            costoTotal.innerHTML = costoTotalTickets;
        } else {
            costoTotalTickets = precio * (Number(cantidadTickets));
            costoTotal.innerHTML = costoTotalTickets;
        }
    }

}



//Cambio del tipo de asistente
selecTipoAsistente.addEventListener('change',

    function () {

        this.selectedOption = this.options[selecTipoAsistente.selectedIndex];

        this.cantidadTickets = document.getElementById('cantidad');

        calculoCostoTicket(this.selectedOption.value, this.cantidadTickets.value);
    }

);




//Cambio de la cantidad de tickets
document.getElementById('cantidad').addEventListener('keydown', event => {
    if (!`${event.target.value}${event.key}`.match(/^[0-9]{0,5}$/) && `${event.code}` !== "Backspace") {

        event.preventDefault();
        return false;
    }

    if (`${event.code}` === "Backspace") {
        cantidad = cantidad.substring(0, cantidad.length - 1);
    } else {
        cantidad = `${event.target.value}${event.key}`;
    }


    if (cantidad.length > 0) {
        this.cantidadTickets = Number(cantidad);


    } else {
        this.cantidadTickets = 0;
    }


    this.selectedOption = selecTipoAsistente.options[selecTipoAsistente.selectedIndex];
    calculoCostoTicket(this.selectedOption.value, this.cantidadTickets);


});

function restaurarCosto() {
    costoTotal.innerHTML = "-";
}

//Verificacion del form con Boton Resumen
document.getElementById('buttonResumen').onclick = function(){
   
    invalid = false;
    invalid = !emailValido();
    
   
    if (lengthNombre < 3){
        document.getElementById("advertencia-nombre").style.display = 'block';
        invalid = true;
    } 

    if (lengthApellido < 3){
        document.getElementById("advertencia-apellido").style.display = 'block';
        invalid = true;
    }

    if (cantidad <= 0){
        document.getElementById("advertencia-cantidad").style.display = 'block';
        invalid = true;
    }

    if (!invalid){
    Swal.fire({
        title: 'Confirmación de envio',
        text: "¿Confirma el envío del formulario?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmo'
      }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById("form-Compra").reset();
            costoTotal.innerHTML = "-";
          Swal.fire(
            'Confirmado',
            'Formulario enviado con éxito',
            'success'
          )
          
        }
      })
    };
};






