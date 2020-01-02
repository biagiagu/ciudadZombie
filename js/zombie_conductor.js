/* Para insipirarte para la implementacion del ZombieConductor podes usar
al ZombieCaminante de ejemplo. Tene en cuenta que tendra algunas diferencias.
Por ejemplo, la cantidad parametros que recibe su constructor. En ZombieConductor
no son exactamente los mismos parametros que en el objeto Enemigo, a diferencia
del ZombieCaminante que eran los mismos. */

var ZombieConductor = function(
  sprite,
  x,
  y,
  ancho,
  alto,
  velocidad,
  rangoMov,
  direccion /*, parametro/s extra de ZombieConductor*/
) {
  /* Completar constructor a partir de Enemigo */
  //Enemigo.call(/* ... */); trae la herencia del objeto Enemigo
  /* No olvidar agregar la/s propiedad/es unicas de ZombieConductor necesarias */
  Enemigo.call(this, sprite, x, y, ancho, alto, velocidad, rangoMov);
  this.direccion = direccion;
};

/* Completar creacion del constructor ZombieConductor */
ZombieConductor.prototype = Object.create(Enemigo.prototype);
ZombieConductor.prototype.constructor = ZombieConductor;

/* Completar metodos para el movimiento y el ataque */
ZombieConductor.prototype.mover = function() {
  /* Los movimientos del conductor dependen del parametro dirección, indicando H un movimiento horizontal de limite a limite e Y un movimiento vertical de limite a limite
  Esto hasta llegar a sus limites, donde se invierte su direccion horizontal */
  if (this.direccion == "h") {
    this.x += this.velocidad;
  } else {
    //Sino, hace otro movimiento
    this.y += this.velocidad;
  }

  /* En esta parte lo que hacemos es invertir la direccion horizontal si
  toca uno de sus limites, modificando su velocidad. Si multiplicamos por -1 la
  velocidad lo que estamos haciendo es invertir su direccion.*/
  if (
    this.direccion == "h" &&
    (this.x < this.rangoMov.desdeX || this.x > this.rangoMov.hastaX)
  ) {
    this.velocidad *= -1;
  }
  if (
    this.direccion == "v" &&
    (this.y < this.rangoMov.desdeY || this.y > this.rangoMov.hastaY)
  ) {
    this.velocidad *= -1;
  }
  // Si sobrepasa el rangoY, lo manda al centro entre ambos rangos
  // if (this.y < this.rangoMov.desdeY || this.y > this.rangoMov.hastaY) {
  //   this.y =
  //     this.rangoMov.desdeY + (this.rangoMov.hastaY - this.rangoMov.desdeY) / 2;
  // }
};

/* El ataque lo toma de su prototipo Enemigo que ya implementa un metodo atacar
haciendole perder 1 vida al jugador. Si se quiere modificar el valor de ataque
del zombie caminante habra que reimplementar este metodo desde el objeto ZombieCaminante*/

ZombieConductor.prototype.atacar = function(jugador) {
  jugador.perderVidas(jugador.vidas);
};
