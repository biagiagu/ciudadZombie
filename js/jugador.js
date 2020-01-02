/* El objeto jugador es un objeto literal que se encuentra incompleto.
 Solo tiene asignadas algunas de sus propiedades y ningun metodo */
var Jugador = {
  /* el sprite contiene la ruta de la imagen
  */
  sprite: 'imagenes/auto_rojo_abajo.png',
  x: 130,
  y: 160,
  ancho: 15,
  alto: 30,
  velocidad: 10,
  vidas: 10,
  // Hay que agregar lo que falte al jugador: movimientos, perdida de vidas,
  // y todo lo que haga falta para que cumpla con sus responsabilidades
  mover: function(x, y, sprite, ancho, alto){

    this.x+=x;
    this.y+=y;
    this.sprite=sprite;
    this.ancho=ancho;
    this.alto=alto;
    console.log(`x: ${this.x} - y:${this.y}`);

  },

  //PerderVidas evalua el daño inflingido por los ostaculos y enemigos y, resta las vidas necesarias hasta llegar a cero
  perderVidas: function(cantVidas){
    if(cantVidas>=this.vidas){
      this.vidas=0;
      console.log(`Vidas: ${this.vidas}.-`);
    }else{
      this.vidas-=cantVidas;
      console.log(`Vidas: ${this.vidas}.-`);
    }
  }
}
