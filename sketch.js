//variáveis da Bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 24;
let raio = diametro / 2 ;

//velocidade da Bolinha
let velocidadeXBolinha = 8;
let velocidadeYBolinha = 8;

//variavéis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variavéis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

//placar do jogo
let meusPontos = 0;
let pontosDoOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;
let pontoOponente;

function preload(){
  trilha = loadSound("Trilha Sonora_Pong_Alura.mp3");
  ponto = loadSound("Ponto_Pong_Alura.mp3");
  raquetada = loadSound("Raquetada_Pong_Alura.mp3");
  pontoOponente = loadSound("PontoDoOponente_Pong_Alura.wav")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
    background(0);
    mostraBolinha();
    movimentaBolinha();
    verificaColisaoBorda();
    mostraRaquete(xRaquete, yRaquete);
    movimentaMinhaRaquete();
    //verificaColisaoRaquete();
    verificaColisaoRaquete(xRaquete, yRaquete);
    mostraRaquete(xRaqueteOponente, yRaqueteOponente);
    movimentaRaqueteOponente();
    verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
    incluiPlacar();
    marcaPonto();
}

function mostraBolinha(){
  circle (xBolinha, yBolinha, diametro)
}

function movimentaBolinha(){
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisaoBorda (){
  if (xBolinha + raio > width ||
     xBolinha - raio < 0){
    velocidadeXBolinha *= -1;
   }
  if (yBolinha + raio > height ||
    yBolinha - raio <0){
    velocidadeYBolinha *= -1;
   }
}

function mostraRaquete(x,y){
   rect(x, y, raqueteComprimento,
        raqueteAltura);
}

function movimentaMinhaRaquete() {
   if (keyIsDown(UP_ARROW)){
     yRaquete -=10;
}
  if (keyIsDown(DOWN_ARROW)){
    yRaquete +=10;
  }
}

function verificaColisaoRaquete() {
  if (xBolinha - raio < xRaquete + raqueteComprimento && yBolinha - raio < yRaquete + raqueteAltura && yBolinha + raio > yRaquete){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaquete(x,y ) {
 colidiu = collideRectCircle(x, y,raqueteComprimento,raqueteAltura,xBolinha,yBolinha,raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
 if (keyIsDown("87")){
     yRaqueteOponente -=10;
}
  if (keyIsDown("83")){
    yRaqueteOponente +=10;
  }
}

function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(238, 130, 238));
  rect(150, 10, 40, 20);
  fill(225);
  text(meusPontos, 170, 26);
  fill(color(238, 130, 238));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosDoOponente, 470, 26)
}

function marcaPonto() {
  if (xBolinha > 590) {
   meusPontos += 1;
  ponto.play();
  }
  if (xBolinha < 10) {
  pontosDoOponente += 1;
  pontoOponente.play();
  }
}
function bolinhaNaoFicaPresa(){
  if (xBolinha - raio < 0){
    xBolinha = 23
  }
}