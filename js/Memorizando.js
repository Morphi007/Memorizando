//arry de numero que seran aleatorio

let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => {
	return Math.random() - 0.5;
});
// funcion principal

let tarjetaDestapadas = 0;
let acierto = 0;

let tarjeta1 = null,
	tarjeta2 = null,
	primerResultado = null,
	segundoResultado = null,
	movimiento = null,
	temporizador = false,
	tiempo = 30,
	tiempoInicial = 30,
	tiempoRegresivo = null;

//mostrar movimiento
let mostrarMovimiento = document.getElementById('movimiento');
//acierto
let mostrarAcierto = document.getElementById('acierto');
//contador
let MostrarTiempo = document.getElementById('tiempo');

//tiempo regresivo y bloquear tarjeta
function contarTiempo() {
	tiempoRegresivo = setInterval(() => {
		tiempo--;
		MostrarTiempo.innerHTML = `Tiempo ${tiempo} segundo`;
		if (tiempo == 0) {
			clearInterval(tiempoRegresivo);
			bloquearTarjeta();
		}
	}, 1000);
}

function bloquearTarjeta() {
	for (let i = 0; i <= 15; i++) {
		let tarjetaBloqueada = document.getElementById(i);
		tarjetaBloqueada.innerHTML = numeros[i];
		tarjetaBloqueada.disabled = true;
	}
}

const destapar = (id) => {
	if (temporizador == false) {
		contarTiempo();
		temporizador = true;
	}

	tarjetaDestapadas++;

	if (tarjetaDestapadas == 1) {
		// Mostrar numeros del
		tarjeta1 = document.getElementById(id);
		primerResultado = numeros[id];
		tarjeta1.innerHTML = primerResultado;
		//desabilitar primer boton

		tarjeta1.disabled = true;
	} else if (tarjetaDestapadas == 2) {
		//mostrar segundo numeros
		tarjeta2 = document.getElementById(id);
		segundoResultado = numeros[id];
		tarjeta2.innerHTML = segundoResultado;
		tarjeta2.disabled = true;

		movimiento++;
		mostrarMovimiento.innerHTML = `Intendos: ${movimiento} `;

		if (primerResultado == segundoResultado) {
			//encerar contador destapados
			tarjetaDestapadas = 0;
			acierto++;
			mostrarAcierto.innerHTML = `Aciertos ${acierto} `;

			if (acierto == 8) {
				clearInterval(tiempoRegresivo);
				mostrarMovimiento.innerHTML = `Intendos: ${movimiento}😼 `;
				MostrarTiempo.innerHTML = `Genial solo demoraste ${
					tiempoInicial - tiempo
				} segundo`;
			}
		} else {
			//mostrar momentaneamente
			setTimeout(() => {
				tarjeta1.innerHTML = ' ';
				tarjeta2.innerHTML = ' ';
				tarjeta1.disabled = false;
				tarjeta2.disabled = false;
				tarjetaDestapadas = 0;
			}, 800);
		}
	}
};
