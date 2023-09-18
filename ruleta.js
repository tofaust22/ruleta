// JavaScript para la funcionalidad de la ruleta
var ruleta = document.getElementById("ruleta");
var girar = document.getElementById("girar");

// Crea una variable para almacenar el intervalo de actualización
var intervalo = null;

function girarRuleta() {
  // Si el intervalo existe, deténlo
  if (intervalo) {
    clearInterval(intervalo);
  }

  var duracion = 5000; // Duración en milisegundos de la rotación (ajusta a tu preferencia)
  var intervaloDuracion = 15; // Intervalo de actualización en milisegundos
  var incrementoAngulo = 10; // Incremento de ángulo en cada actualización (ajusta a tu preferencia)
  var angulo = 0; // Ángulo inicial

  intervalo = setInterval(function() {
    angulo += incrementoAngulo;
    ruleta.style.transform = "rotate(" + angulo + "deg)";
    if (angulo >= 360) {
      angulo = 0;
    }
  }, intervaloDuracion);

  // Detener la rotación después de un tiempo aleatorio dentro del rango de duración
  var tiempoDetener = Math.floor(Math.random() * duracion);
  setTimeout(function() {
    clearInterval(intervalo);
    var numeroCaido = Math.floor(Math.random() * 37); // Calcular un número aleatorio entre 0 y 36
    mostrarResultado(numeroCaido);
  }, tiempoDetener);
}

function mostrarResultado(numero) {
  var color = esRojo(numero) ? "rojo" : "negro";
  if (numero === 0) {
    color = "verde";
  }

  // Declara variables para almacenar las apuestas del usuario
  var numeroApuesta = null;
  var colorApuesta = null;

  // Obtiene las apuestas del usuario
  var numeroApuesta = document.querySelector("input[name='numero']").value;
  var colorApuesta = document.querySelector("input[name='color']:checked").value;

  // Determina si el usuario ganó
  var gano = false;
  if (numeroApuesta === numero && colorApuesta === color) {
    gano = true;
  }

  // Muestra el resultado de la apuesta
  alert("El número que cayó es: " + numero + " " + color + ".");
  if (gano) {
    alert("¡Felicidades! Has ganado.");
  } else {
    alert("Has perdido.");
  }
}

// Inicia la rotación de la ruleta cuando se hace clic en el botón "Girar"
girar.onclick = girarRuleta;

function esRojo(numero) {
  // Define los números rojos en la ruleta europea
  var numerosRojos = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

  // Verifica si el número es rojo
  return numerosRojos.includes(numero);
}

// Agrega campos de entrada para las apuestas del usuario
document.querySelector("form").innerHTML = `
  <input type="number" name="numero" min="1" max="36" />
  <input type="radio" name="color" value="rojo" /> Rojo
  <input type="radio" name="color" value="negro" /> Negro
`;