// mensaje de instrucciones...
function introduccion() {
  alert('Bienvenido a las aventuras de robotin\nInstrucciones:\nGuia a robotin a cruzar el otro extremo pero ten cuidado hay minas en el terreno.\nInfo: El terreno es un tablero con 6 filas y 6 columnas enumeradas del 0 al 5. Robotin empieza en la cuadrícula fila:0 - columna:0 y su meta final se encuentra en fila:5 - columna:5.\nEn el modo de dificultad puedes elegir el número de minas que tendrá el terreno. Buena Suerte!')
}

// menu de opciones...
function menu() {
let cad =
  "-----------------------------------------\n\t\t\tMenu de opciones\n1) Elegir dificultad\n2) Jugar\n3) Salir\n-----------------------------------------\nElija una opción: ";
return validarIntervalo(1, 3, cad);
}

// validar intervalo...
function validarIntervalo(izq, der, mensaje) {
let op = parseInt(prompt(mensaje));
while (op < izq || op > der) {
  alert("Error... se pidió un valor entre " + izq + " y " + der);
  op = parseInt(prompt(mensaje));
}
return op;
}

//validar botón...
function validarBoton(mensaje) {
let letra;
let letrasPermitidas = "wasd";
do {
  letra = prompt(mensaje);
  if (letrasPermitidas.indexOf(letra.toLowerCase()) == -1) {
    alert("Letra inválida... Ingrese nuevamente...");
  }
} while (letrasPermitidas.indexOf(letra.toLowerCase()) == -1);
return letra;
}

// definir la opcion 1...
function modoDeJuego() {
let cadMinas;
let menuDificultad = "1) Fácil\n2) Medio\n3) Dificil\nElija una opción: ";
let opDificultad = validarIntervalo(1, 3, menuDificultad);
switch (opDificultad) {
  case 1:
    cadMinas = "05,22,23,32,33,50";
    break;
  case 2:
    cadMinas = "01,13,14,22,30,44,50,51,52,54";
    break;
  case 3:
    cadMinas = "01,03,04,05,11,21,23,25,31,33,43,44,50,51,53,54";
    break;
}
return cadMinas;
}

// definir la opción 2...
function juego(dificultad) {
// posicion inicial del robot...
let robotPosFila = 0;
let robotPosColumna = 0;

// posicion de la meta final...
let metaPosFila = 5;
let metaPosColumna = 5;

// posición de las minas...
let minasPosiciones = dificultad;

// inicializar bandera de llegada...
let alcanzoMeta = false;

// inicializar bandera para chequear si una mina fue pisada...
let explotoMina = false;

// ciclo del juego...
while (true) {
  // pedir al usuario un movimiento...
  let boton = validarBoton(
    "Presione una tecla para mover a Robotin (W-A-S-D):"
  );

  // posicionar a robotin...
  if (boton.toLowerCase() == "w") {
    if (robotPosFila == 0) {
      alert(
        "Llegaste al límite superior... No podés realizar ese movimiento"
      );
    } else {
      robotPosFila -= 1;
    }
  } else if (boton.toLowerCase() == "s") {
    if (robotPosFila == 5) {
      alert(
        "Llegaste al límite inferior... no podés realizar ese movimiento"
      );
    } else {
      robotPosFila += 1;
    }
  } else if (boton.toLowerCase() == "a") {
    if (robotPosColumna == 0) {
      alert(
        "Llegaste al límite izquierdo... No podés realizar ese movimiento"
      );
    } else {
      robotPosColumna -= 1;
    }
  } else if (boton.toLowerCase() == "d") {
    if (robotPosColumna == 5) {
      alert("Llegaste al límite derecho... No podés realizar ese movimiento");
    } else {
      robotPosColumna += 1;
    }
  }

  // verificar si robotin pisó una mina...
  for (let posMina = 0; posMina < minasPosiciones.length; posMina += 3) {
    let minaPosFila = parseInt(minasPosiciones.charAt(posMina));
    let minaPosColumna = parseInt(minasPosiciones.charAt(posMina + 1));
    if (robotPosFila == minaPosFila && robotPosColumna == minaPosColumna) {
      explotoMina = true;
      break;
    }
  }

  // salir del ciclo y avisar que robotin piso una mina...
  if (explotoMina) {
    alert("BOOM!!! Robotin exploto en mil pedazos! Juego terminado.");
    break;
  }

  // salir del ciclo y avisar que robotin llegó a la final...
  if (robotPosFila == metaPosFila && robotPosColumna == metaPosColumna) {
    alcanzoMeta = true;
    break;
  }

  // mensaje de la posicion actual...
  alert(
    "Robotin se encuentra en el casillero" +
      "\nFila: " + robotPosFila + " - " + "Columna: " + robotPosColumna);
}

// estado final del jugador...
if (alcanzoMeta) {
  alert("Ganaste!!! Robotin llegó a su meta en una sola pieza");
}
}

// script principal...
function main() {
// inicio y carga de datos...
let dificultad;
let op;
let opcionUnoActivada = false;


// procesos y resultados...
introduccion()
do {
  op = menu();
  
  if (op == 1) {
    dificultad = modoDeJuego();
    opcionUnoActivada = true;
  } else if (op == 3) {
    alert("Gracias por jugar! Hasta pronto!");
  } else if (!opcionUnoActivada) {
    alert("Seleccione un modo de dificultad primero!");
  } else if (op == 2) {
    juego(dificultad);
  }
} while (op != 3);
}

// ejecutar script principal...
main();
