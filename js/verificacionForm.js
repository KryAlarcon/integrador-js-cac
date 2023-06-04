
//Cantidad y costo

let cantidadTickets = document.getElementById("cantidad");
let costoTotal = document.getElementById("costoTotal");
let selecTipoAsistente = document.getElementById("categoria");
var selectedOption = selecTipoAsistente.options[selecTipoAsistente.selectedIndex];
let cantidad = "";
costoTotal.innerHTML = "-";


const precio = 200;

//Calculo dependiendo del asistente
function calculoCostoTicket(selectedOption, cantidadTickets){
    

    if (selectedOption === "estudiante"){
    
        costoTotal.innerHTML = (precio-(precio*0.8))*(Number(cantidadTickets));
       
    }

    else if (selectedOption === "trainee"){
        costoTotalTickets = (precio-(precio*0.5))*(Number(cantidadTickets));
        costoTotal.innerHTML = costoTotalTickets;
    }

    else if (selectedOption === "junior"){
        costoTotalTickets = (precio-(precio*0.15))*(Number(cantidadTickets));
        costoTotal.innerHTML = costoTotalTickets;
    }

}



//Cambio del tipo de asistente
selecTipoAsistente.addEventListener('change',
  
    function(){

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

    if (`${event.code}` === "Backspace"){
        cantidad = cantidad.substring(0, cantidad.length - 1);
    } else {
        cantidad = `${event.target.value}${event.key}`;
    }


    if (cantidad.length > 0){
        this.cantidadTickets = Number(cantidad);
      

    } else {
        this.cantidadTickets = 0;
    }

    
    this.selectedOption = selecTipoAsistente.options[selecTipoAsistente.selectedIndex];
    calculoCostoTicket(this.selectedOption.value, this.cantidadTickets );
      
    
});

function restaurarCosto(){
    costoTotal.innerHTML = "-";
}





