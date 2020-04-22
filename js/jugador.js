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

	mover: function(movX, movY){
		
		if (movX<0 && movY==0){ //Izquierda
			this.x+=movX;
			this.y+=movY;
			this.sprite="imagenes/auto_rojo_izquierda.png";
			this.ancho=30;
			this.alto=15;
			console.log(`x: ${this.x} - y:${this.y}`);

		}else if(movX>0 && movY==0){ //Derecha
			this.x+=movX;
			this.y+=movY;
			this.sprite="imagenes/auto_rojo_derecha.png";
			this.ancho=30;
			this.alto=15;
			console.log(`x: ${this.x} - y:${this.y}`);
		
		}else if(movX==0 && movY<0){ //arriba
			this.x+=movX;
			this.y+=movY;
			this.sprite="imagenes/auto_rojo_arriba.png";
			this.ancho=15;
			this.alto=30;
			console.log(`x: ${this.x} - y:${this.y}`);
		
		}else if(movX==0 && movY>0){ //abajo
			this.x+=movX;
			this.y+=movY;
			this.sprite="imagenes/auto_rojo_abajo.png";
			this.ancho=15;
			this.alto=30;
			console.log(`x: ${this.x} - y:${this.y}`);
		
		}else { //Cualquier otra tecla no hace nada
			this.x=this.x;
			this.y=this.y;
			this.sprite=this.sprite;
			this.ancho=this.ancho;
			this.alto=this.alto;
		}
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
