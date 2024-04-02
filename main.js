const board = document.getElementById('container')
const nave_Jugador = new Nave_Player(100,300,board)


let arrayEnemigos = []
let arrayEnemigos2 = []
let arrayEnemigos3 = []
let arrayMeteorito = []
let timerNave;
let timerEnemigo;
let timerEnemigo2;
let timerEnemigo3;
let timerMeteorito;
let timerMuerte;
let timerReloj;
let suma = 0;
let resta = 120;
let vidas = 3;

//Sonidos
const sonido_Explosion = document.getElementById("explosion")
const sonido_musica = document.getElementById("musica")
const sonido_colision = document.getElementById("colission")
const sonido_victoria = document.getElementById("victoria")


//botones start reply
let inicio = document.getElementById('start-game')
let boton_inicio = document.querySelector('#start')
let boton_final = document.querySelector('#restart')
let oculto = document.querySelector('ocultar')

//Score , vida y reloj
let points = document.getElementById('puntos')
let reloj = document.getElementById('clock')
let lifes = document.getElementById('lifes')

//game_Over
let gameOver = document.getElementById('game_Over')


//Inicia el game
function startGame(){
    gameOver.innerHTML=""
    musica()
    nave_Jugador.addShip() 
    timerMuerte= setInterval(function() {
        Muerte(); 
    }, 20); 
    timerEnemigo = setInterval(function() {
        crearEnemigos(); 
    }, 1800);
    timerEnemigo2 = setInterval(function() {
        crearEnemigos2(); 
    }, 4300);
    timerEnemigo3 = setInterval(function() {
        crearEnemigos3(); 
    }, 600);
    timerMeteorito = setInterval(function() {
        crearMeteorito(); 
    }, 5300); 
    timerReloj = setInterval(function(){
        cronometro()
    },1000);
}

 //Reloj 
function cronometro(){
    resta -= 1
    reloj.innerHTML = resta
    if(resta <= 100 && resta > 50){
        reloj.style.color = 'orange'
    } else if (resta < 50 ){
        reloj.style.color = 'red'
    } 
    if(resta <=0){ 
        sonido_musica.pause()
        nave_Jugador.isDead = true
        board.removeChild(nave_Jugador.sprite)
        sonido_Explosion.play()
        clearInterval(timerMuerte)
        clearInterval(timerEnemigo)
        clearInterval(timerEnemigo2)
        clearInterval(timerEnemigo3)
        clearInterval(timerMeteorito)
        clearInterval(timerReloj)
        gameOver.innerHTML="Galaxy Saved"
        gameOver.style.color = "yellow"
        sonido_victoria.play()
    }
 }

function Muerte(){
   if(nave_Jugador.isDead === false){
    nave_Jugador.move()
   } else {
    board.removeChild(nave_Jugador.sprite)
    sonido_Explosion.play()
    clearInterval(timerMuerte)
    clearInterval(timerEnemigo)
    clearInterval(timerEnemigo2)
    clearInterval(timerEnemigo3)
    clearInterval(timerMeteorito) 
    clearInterval(timerReloj)
    gameOver.innerHTML="GAME OVER"
    gameOver.style.color = "red"
   }
}


//Sonidos
function reproducirDisparo(){  
    const sonido1 = document.getElementById("sonido_laser") 
    sonido1.play()
    sonido1.playBackRate = 1;
}

//Reproducir Musica
function musica(){
    sonido_musica.volume = 0.3;
    sonido_musica.play()
}


//Crear enemigos en bucle 
function crearEnemigos(){
    let numeroRandom = Math.floor(Math.random() * 9) * 63;
    numeroRandom += 100
    let nave_Enemigo = new Enemigos(900,numeroRandom,board)
    arrayEnemigos.push(nave_Enemigo)
    nave_Enemigo.addEnemy()  
}
function crearEnemigos2(){
    let numeroRandom = Math.floor(Math.random() * 9) * 63;
    numeroRandom += 100
    let nave_Enemigo2 = new Enemigos2(900,numeroRandom,board)
    arrayEnemigos2.push(nave_Enemigo2)
    nave_Enemigo2.addEnemy2()  
}   
function crearEnemigos3(){
    let numeroRandom = Math.floor(Math.random() * 9) * 63;
    numeroRandom += 100
    let nave_Enemigo3 = new Enemigos3(900,numeroRandom,board)
    arrayEnemigos3.push(nave_Enemigo3)
    nave_Enemigo3.addEnemy3()  
} 
function crearMeteorito(){
    let numeroRandom = Math.floor(Math.random() * 9) * 63;
    let numeroRandom2 = Math.floor(Math.random() * 9) * 63;
    numeroRandom += 100
    numeroRandom2 += 100
    let nave_Meteorito = new Meteorito(900,numeroRandom,board)
    let nave_Meteorito2 = new Meteorito(900,numeroRandom2,board)
    arrayMeteorito.push(nave_Meteorito)
    nave_Meteorito.addMeteorito()
    nave_Meteorito2.addMeteorito()
  
}

//Botones start y reply
boton_inicio.addEventListener('click', function(e) {
    inicio.style.display = 'none'
    board.style.display = 'block'
    nave_Jugador.isDead = false
    lifes.innerText = 3
    vidas = 3
    resta = 120
    reloj.innerHTML = 120
    reloj.style.color = "white"
    suma = 0
    points.innerHTML = "000"
    startGame()
})

boton_final.addEventListener('click', function(e) {
    inicio.style.display = 'block'   
    board.style.display = 'none'
    retry.style.display = 'none'    
})
    

//Eventos del teclado para el movimiento del jugador
window.addEventListener('keydown',function(evento){
    if(nave_Jugador.isDead === false){
    switch(evento.key){

        case  'w':
        nave_Jugador.directionY = -1
        break;

        case  's':

        nave_Jugador.directionY = 1
        break;

        case  'a':
        nave_Jugador.directionX = -1
        break;

        case  'd' :
        nave_Jugador.directionX = 1
        break;

        case ' ' :
        reproducirDisparo()
        let bala = new Bala(nave_Jugador.x, nave_Jugador.y, board)
        let bala2 = new Bala(nave_Jugador.x, nave_Jugador.y + 55, board)
        bala2.addBala();
        bala.addBala();
        break;   
 
        default:
         nave_Jugador.directionX = 0 
         nave_Jugador.directionY = 0
    }
    nave_Jugador.move()
    }
})

//Limpia la direccion del enemigo
window.addEventListener('keyup',function(evento){
    this.clearInterval(timerNave)
    nave_Jugador.directionX = 0
    nave_Jugador.directionY = 0
})

 
