/* El objeto Juego sera el encargado del control de todo el resto de los Objetos
existentes.
Le dara ordenes al Dibujante para que dibuje entidades en la pantalla. Cargara
el mapa, chequeara colisiones entre los objetos y actualizara sus movimientos
y ataques. Gran parte de su implementacion esta hecha, pero hay espacios con el
texto COMPLETAR que deben completarse segun lo indique la consigna.

El objeto Juego contiene mucho codigo. Tomate tu tiempo para leerlo tranquilo
y entender que es lo que hace en cada una de sus partes. */

var Juego = {
  // Aca se configura el tamanio del canvas del juego
  anchoCanvas: 961,
  altoCanvas: 577,
  jugador: Jugador,
  vidasInicial: Jugador.vidas,
  // Indica si el jugador gano
  ganador: false,
  inicio: true,

  obstaculosCarretera: [
    /*Aca se van a agregar los obstaculos visibles. Tenemos una valla horizontal
        de ejemplo, pero podras agregar muchos mas. */
    //Vallas Horizontales
    new Obstaculo("imagenes/valla_horizontal.png", 70, 430, 30, 15, 0.5),
    new Obstaculo("imagenes/valla_horizontal.png", 100, 430, 30, 15, 0.5),
    new Obstaculo("imagenes/valla_horizontal.png", 130, 430, 30, 15, 0.5),
    new Obstaculo("imagenes/valla_horizontal.png", 160, 430, 30, 15, 0.5),
    new Obstaculo("imagenes/valla_horizontal.png", 790, 160, 30, 15, 0.5),
    new Obstaculo("imagenes/valla_horizontal.png", 830, 220, 30, 15, 0.5),
	new Obstaculo("imagenes/valla_horizontal.png", 790, 300, 30, 15, 0.5),
	new Obstaculo("imagenes/valla_horizontal.png", 500, 380, 30, 15, 0.5),
	new Obstaculo("imagenes/valla_horizontal.png", 850, 360, 30, 15, 0.5),

    //Vallas verticales
	new Obstaculo("imagenes/valla_vertical.png", 235, 460, 15, 30, 0.5),
	new Obstaculo("imagenes/valla_vertical.png", 400, 470, 15, 30, 0.5),
    //Baches
    new Obstaculo("imagenes/bache.png", 400, 440, 20, 20, 0.3),
    new Obstaculo("imagenes/bache.png", 470, 470, 20, 20, 0.3),
    new Obstaculo("imagenes/bache.png", 470, 390, 20, 20, 0.3),

    new Obstaculo("imagenes/bache.png", 340, 120, 20, 20, 0.3),
    new Obstaculo("imagenes/bache.png", 430, 80, 20, 20, 0.3),
    new Obstaculo("imagenes/bache.png", 550, 100, 20, 20, 0.3)
  ],
  /* Estos son los bordes con los que se puede chocar, por ejemplo, la vereda.
     Ya estan ubicados en sus lugares correspondientes. Ya aparecen en el mapa, ya
     que son invisibles. No tenes que preocuparte por ellos.*/
  bordes: [
    // // Bordes
    new Obstaculo("", 0, 5, 961, 18, 0),
    new Obstaculo("", 0, 559, 961, 18, 0),
    new Obstaculo("", 0, 5, 18, 572, 0),
    new Obstaculo("", 943, 5, 18, 572, 0),
    // Veredas
    new Obstaculo("", 18, 23, 51, 536, 0),
    new Obstaculo("", 69, 507, 690, 52, 0),
    new Obstaculo("", 587, 147, 173, 360, 0),
    new Obstaculo("", 346, 147, 241, 52, 0),
    new Obstaculo("", 196, 267, 263, 112, 0),
    new Obstaculo("", 196, 23, 83, 244, 0),
    new Obstaculo("", 279, 23, 664, 56, 0),
    new Obstaculo("", 887, 79, 56, 480, 0)
  ],
  // Los enemigos se agregaran en este arreglo.
  enemigos: [
    //1er grupo de zombies caminantes
    new ZombieCaminante("imagenes/zombie1.png", 100, 100, 10, 10, 1, {
      desdeX: 70,
      hastaX: 200,
      desdeY: 100,
      hastaY: 200
    }),
    new ZombieCaminante("imagenes/zombie2.png", 70, 200, 10, 10, 0.9, {
      desdeX: 70,
      hastaX: 200,
      desdeY: 100,
      hastaY: 200
    }),
    new ZombieCaminante("imagenes/zombie3.png", 110, 150, 10, 10, 0.75, {
      desdeX: 70,
      hastaX: 200,
      desdeY: 100,
      hastaY: 200
    }),
    new ZombieCaminante("imagenes/zombie3.png", 115, 155, 10, 10, 0.5, {
      desdeX: 70,
      hastaX: 200,
      desdeY: 100,
      hastaY: 200
    }),
    new ZombieCaminante("imagenes/zombie4.png", 100, 140, 10, 10, 0.25, {
      desdeX: 70,
      hastaX: 200,
      desdeY: 100,
      hastaY: 200
    }),

    //2do grupo de Zombies Caminates
    new ZombieCaminante("imagenes/zombie1.png", 470, 190, 10, 10, 1, {
      desdeX: 280,
      hastaX: 550,
      desdeY: 190,
      hastaY: 250
    }),
    new ZombieCaminante("imagenes/zombie2.png", 500, 250, 10, 10, 0.9, {
      desdeX: 280,
      hastaX: 550,
      desdeY: 190,
      hastaY: 250
    }),
    new ZombieCaminante("imagenes/zombie3.png", 520, 200, 10, 10, 0.75, {
      desdeX: 280,
      hastaX: 550,
      desdeY: 190,
      hastaY: 250
    }),
    new ZombieCaminante("imagenes/zombie3.png", 480, 195, 10, 10, 0.5, {
      desdeX: 280,
      hastaX: 550,
      desdeY: 190,
      hastaY: 250
    }),
    new ZombieCaminante("imagenes/zombie4.png", 550, 200, 10, 10, 0.25, {
      desdeX: 280,
      hastaX: 550,
      desdeY: 190,
      hastaY: 250
    }),
    new ZombieCaminante("imagenes/zombie1.png", 289, 250, 10, 10, 1, {
      desdeX: 280,
      hastaX: 550,
      desdeY: 190,
      hastaY: 250
    }),
    new ZombieCaminante("imagenes/zombie2.png", 300, 300, 10, 10, 0.9, {
      desdeX: 280,
      hastaX: 550,
      desdeY: 190,
      hastaY: 250
    }),
    new ZombieCaminante("imagenes/zombie3.png", 320, 270, 10, 10, 0.75, {
      desdeX: 280,
      hastaX: 550,
      desdeY: 190,
      hastaY: 250
    }),
    new ZombieCaminante("imagenes/zombie3.png", 400, 270, 10, 10, 0.5, {
      desdeX: 280,
      hastaX: 550,
      desdeY: 190,
      hastaY: 250
    }),
    new ZombieCaminante("imagenes/zombie4.png", 350, 200, 10, 10, 0.25, {
      desdeX: 280,
      hastaX: 550,
      desdeY: 190,
      hastaY: 250
	}),

	
	new ZombieCaminante("imagenes/zombie1.png", 770, 200, 10, 10, 1, {
		desdeX: 760,
		hastaX: 880,
		desdeY: 80,
		hastaY: 360
	  }),new ZombieCaminante("imagenes/zombie2.png", 800, 250, 10, 10, 0.25, {
		desdeX: 760,
		hastaX: 880,
		desdeY: 80,
		hastaY: 360
	  }),new ZombieCaminante("imagenes/zombie3.png", 850, 350, 10, 10, 0.25, {
		desdeX: 760,
		hastaX: 880,
		desdeY: 80,
		hastaY: 360
	  }),new ZombieCaminante("imagenes/zombie4.png", 780, 300, 10, 10, 0.5, {
		desdeX: 760,
		hastaX: 880,
		desdeY: 80,
		hastaY: 360
	  }),new ZombieCaminante("imagenes/zombie1.png", 780, 350, 10, 10, 0.25, {
		desdeX: 760,
		hastaX: 880,
		desdeY: 80,
		hastaY: 360
	  }),

    //zombies en trenes
    new ZombieConductor(
      "imagenes/tren_horizontal.png",
      0,
      325,
      80,
      30,
      6,
      { desdeX: 0, hastaX: 961, desdeY: 325, hastaY: 325 },
      "h"
    ),
    new ZombieConductor(
      "imagenes/tren_vertical.png",
      644,
      0,
      30,
      90,
      6,
      { desdeX: 326, hastaX: 326, desdeY: 0, hastaY: 572 },
      "v"
    ),
    new ZombieConductor(
      "imagenes/tren_vertical.png",
      675,
      572,
      30,
      90,
      -6,
      { desdeX: 350, hastaX: 350, desdeY: 0, hastaY: 572 },
      "v"
	),
	new ZombieConductor(
		"imagenes/auto_verde_derecha.png",
		70,
		70,
		30,
		15,
		2,
		{ desdeX: 70, hastaX: 160, desdeY: 70, hastaY: 70 },
		"h"
	  ),
	  new ZombieConductor(
		"imagenes/auto_verde_derecha.png",
		70,
		390,
		30,
		15,
		2,
		{ desdeX: 70, hastaX: 430, desdeY: 390, hastaY: 390 },
		"h"
	  ),
	  new ZombieConductor(
		"imagenes/auto_verde_derecha.png",
		850,
		480,
		30,
		15,
		1,
		{ desdeX: 770, hastaX: 850, desdeY: 480, hastaY: 480 },
		"h"
	  ),
	  new ZombieConductor(
		"imagenes/auto_verde_derecha.png",
		770,
		410,
		30,
		15,
		1,
		{ desdeX: 770, hastaX: 850, desdeY: 410, hastaY: 410 },
		"h"
	  ),
  ]
};

/* Se cargan los recursos de las imagenes, para tener un facil acceso
a ellos. No hace falta comprender esta parte. Pero si queres agregar tus propies
imagenes tendras que poner su ruta en la lista para que pueda ser precargada como
todas las demas. */
Juego.iniciarRecursos = function() {
  //define flag de inicio para mostrar Mensaje1.png y mensaje2.png al inicio del juego

  Resources.load([
    "imagenes/mapa.png",
    "imagenes/mensaje_gameover.png",
    "imagenes/Mensaje1.png",
    "imagenes/Splash.png",
    "imagenes/bache.png",
    "imagenes/tren_horizontal.png",
    "imagenes/tren_vertical.png",
    "imagenes/valla_horizontal.png",
    "imagenes/valla_vertical.png",
    "imagenes/zombie1.png",
    "imagenes/zombie2.png",
    "imagenes/zombie3.png",
    "imagenes/zombie4.png",
    "imagenes/auto_rojo_abajo.png",
    "imagenes/auto_rojo_arriba.png",
    "imagenes/auto_rojo_derecha.png",
    "imagenes/auto_rojo_izquierda.png",
    "imagenes/auto_verde_abajo.png",
    "imagenes/auto_verde_derecha.png"
  ]);
  Resources.onReady(this.comenzar.bind(Juego));
};

// Agrega los bordes de las veredas a los obstaculos de la carretera
Juego.obstaculos = function() {
  return this.obstaculosCarretera.concat(this.bordes);
};

Juego.comenzar = function() {
  // Inicializar el canvas del juego
  Dibujante.inicializarCanvas(this.anchoCanvas, this.altoCanvas);
  /* El bucle principal del juego se llamara continuamente para actualizar
    los movimientos y el pintado de la pantalla. Sera el encargado de calcular los
    ataques, colisiones, etc*/
  this.buclePrincipal();
};

Juego.buclePrincipal = function() {
  // Con update se actualiza la logica del juego, tanto ataques como movimientos
  this.update();
  // Funcion que dibuja por cada fotograma a los objetos en pantalla.
  this.dibujar();

  // Esto es una forma de llamar a la funcion Juego.buclePrincipal() repetidas veces
  window.requestAnimationFrame(this.buclePrincipal.bind(this));
};

Juego.update = function() {
  if (!this.inicio) {
    this.calcularAtaques();
    this.moverEnemigos();
  }
};

// Captura las teclas y si coincide con alguna de las flechas tiene que
// hacer que el jugador principal se mueva
Juego.capturarMovimiento = function(tecla) {
  var movX = 0;
  var movY = 0;
  var velocidad = this.jugador.velocidad;
  

  //El movimiento esta determinado por la velocidad del jugador
  if (tecla == "izq") {
    movX = -velocidad;
    
  } else if (tecla == "arriba") {
    movY = -velocidad;
    
  } else if (tecla == "der") {
    movX = velocidad;
    
  } else if (tecla == "abajo") {
    movY = velocidad;
    
  }


  // Si se puede mover hacia esa posicion hay que hacer efectivo este movimiento
  if (this.chequearColisiones(this.jugador.x + movX, this.jugador.y + movY)) {
    /* Aca tiene que estar la logica para mover al jugador invocando alguno
        de sus metodos  */

	/* COMPLETAR */
	this.jugador.mover(movX, movY);
  }
};

Juego.dibujar = function() {
  // Borrar el fotograma actual
  Dibujante.borrarAreaDeJuego();
  //Se pinta la imagen de fondo segun el estado del juego
  this.dibujarFondo();

  /* Aca hay que agregar la logica para poder dibujar al jugador principal
    utilizando al dibujante y los metodos que nos brinda.
    "Dibujante dibuja al jugador" */

  if (!this.inicio) {
    if (!this.terminoJuego()) {
      if (!this.ganoJuego()) {
        /* Completar */
        Dibujante.dibujarEntidad(this.jugador);

        // Se recorren los obstaculos de la carretera pintandolos
        this.obstaculosCarretera.forEach(function(obstaculo) {
          Dibujante.dibujarEntidad(obstaculo);
        });

        // Se recorren los enemigos pintandolos
        this.enemigos.forEach(function(enemigo) {
          /* Completar */
          Dibujante.dibujarEntidad(enemigo);
        });

        // El dibujante dibuja las vidas del jugador
        var tamanio = this.anchoCanvas / this.vidasInicial;
        Dibujante.dibujarRectangulo("white", 0, 0, this.anchoCanvas, 8);
        for (var i = 0; i < this.jugador.vidas; i++) {
          var x = tamanio * i;
          Dibujante.dibujarRectangulo("red", x, 0, tamanio, 8);
        }

        // dibujamos la llegada con una bandera a cuadros
        //   Dibujante.dibujarRectangulo("yellow", 760, 500, 130, 30);
        for (let i = 0; i <= 12; i++) {
          for (let j = 0; j < 3; j++) {
            if (i % 2 != 0) {
              if (j % 2 == 0) {
                Dibujante.dibujarRectangulo(
                  "white",
                  760 + i * 10,
                  500 + j * 10,
                  10,
                  10
                );
              }
            }
            if (i % 2 == 0) {
              if (j % 2 != 0) {
                Dibujante.dibujarRectangulo(
                  "white",
                  760 + i * 10,
                  500 + j * 10,
                  10,
                  10
                );
              }
            }
          }
        }
      }
    }
  }
};

/* Recorre los enemigos haciendo que se muevan. De la misma forma que hicimos
un recorrido por los enemigos para dibujarlos en pantalla ahora habra que hacer
una funcionalidad similar pero para que se muevan.*/
Juego.moverEnemigos = function() {
  /* COMPLETAR */
  this.enemigos.forEach(enemigo => {
    enemigo.mover();
  });
};

/* Recorre los enemigos para ver cual esta colisionando con el jugador
Si colisiona empieza el ataque el zombie, si no, deja de atacar.
Para chequear las colisiones estudiar el metodo posicionValida. Alli
se ven las colisiones con los obstaculos. En este caso sera con los zombies. */
Juego.calcularAtaques = function() {
  this.enemigos.forEach(function(enemigo) {
    if (
      this.intersecan(enemigo, this.jugador, this.jugador.x, this.jugador.y)
    ) {
      /* Si el enemigo colisiona debe empezar su ataque
COMPLETAR */
      enemigo.comenzarAtaque(this.jugador);
    } else {
      /* Sino, debe dejar de atacar
COMPLETAR */
      enemigo.dejarDeAtacar(this.jugador);
    }
  }, this);
};

/* Aca se chequea si el jugador se peude mover a la posicion destino.
 Es decir, que no haya obstaculos que se interpongan. De ser asi, no podra moverse */
Juego.chequearColisiones = function(x, y) {
  var puedeMoverse = true;
  this.obstaculos().forEach(function(obstaculo) {
    if (this.intersecan(obstaculo, this.jugador, x, y)) {
      /*COMPLETAR, obstaculo debe chocar al jugador*/

      puedeMoverse = false;
      obstaculo.chocar(this.jugador);

    }
  }, this);
  return puedeMoverse;
};

/* Este metodo chequea si los elementos 1 y 2 si cruzan en x e y
 x e y representan la coordenada a la cual se quiere mover el jugador*/
Juego.intersecan = function(obstaculo, jugador, x, y) {
  var izquierda1 = obstaculo.x;
  var derecha1 = izquierda1 + obstaculo.ancho;
  var techo1 = obstaculo.y;
  var piso1 = techo1 + obstaculo.alto;
  var izquierda2 = x;
  var derecha2 = izquierda2 + jugador.ancho;
  var techo2 = y;
  var piso2 = y + jugador.alto;

  return (
    piso1 >= techo2 &&
    techo1 <= piso2 &&
    derecha1 >= izquierda2 &&
    izquierda1 <= derecha2
  );
};

Juego.dibujarFondo = function() {
  // Si se termino el juego hay que mostrar el mensaje de game over de fondo
  if (this.terminoJuego()) {
    // Borrar area de juego
    Dibujante.borrarAreaDeJuego();
    // Mostrar imagen de Game Over
    Dibujante.dibujarImagen(
      "imagenes/mensaje_gameover.png",
      0,
      5,
      this.anchoCanvas,
      this.altoCanvas
    );
    //habilita el boton de "Reiniciar" para que el jugador pueda recomenzar el juego
    document.getElementById("reiniciar").style.visibility = "visible";
  } else if (this.ganoJuego()) {
    // Si se gano el juego hay que mostrar el mensaje de ganoJuego de fondo

    // Se dibuja el mensaje de Splash
    Dibujante.dibujarImagen("imagenes/Splash.png", 190, 113, 500, 203);
    //habilita el boton de "Reiniciar" para que el jugador pueda recomenzar el juego
    document.getElementById("reiniciar").style.visibility = "visible";
  } else {
    // si no gano o perdio dibujara la pantalla de inicio o el mapa

    if (this.inicio) {
      Dibujante.dibujarImagen(
        "imagenes/Mensaje1.png",
        0,
        5,
        this.anchoCanvas,
        this.altoCanvas
      );
      setTimeout(() => {
        this.inicio = false;
      }, 5000);
    } else {
      Dibujante.dibujarImagen(
        "imagenes/mapa.png",
        0,
        5,
        this.anchoCanvas,
        this.altoCanvas
      );
    }
  }
};

Juego.terminoJuego = function() {
  // el juego termina si se le acaban las vidas al jugador
  return this.jugador.vidas <= 0;
};

/* Se gana el juego si se sobre pasa cierto altura y */
Juego.ganoJuego = function() {
  return this.jugador.y + this.jugador.alto > 530;
};

Juego.iniciarRecursos();

// Activa las lecturas del teclado al presionar teclas
// Documentacion: https://developer.mozilla.org/es/docs/Web/API/EventTarget/addEventListener
document.addEventListener("keydown", function(e) {
  var allowedKeys = {
    37: "izq",
    38: "arriba",
    39: "der",
    40: "abajo"
  };

  Juego.capturarMovimiento(allowedKeys[e.keyCode]);
});
