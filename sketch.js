//variáveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 15;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeX = 6;
let velocidadeY = 6;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let comprimentoRaquete = 10;
let alturaRaquete = 90;

//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

//placar do jogo
let pontos = 0;
let pontosOponente = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  marcaponto();
  background(0);
  mostrarBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostrarRaquete(xRaquete, yRaquete);
  mostrarRaquete(xRaqueteOponente, yRaqueteOponente)
  movimentoRaquete();
  colisaoRaqueteBiblioteca(xRaquete, yRaquete);
  colisaoRaqueteBiblioteca(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  incluiPlacar();
}

function mostrarBolinha(){
  circle(xBolinha,yBolinha,diametro); 
}

function movimentaBolinha(){
  xBolinha += velocidadeX;
  yBolinha += velocidadeY;
}

function verificaColisaoBorda(){
  if (xBolinha + raio > width ||
      xBolinha - raio < 0){
    velocidadeX *= -1;
  }
  if (yBolinha + raio > height ||
      yBolinha - raio < 0){
    velocidadeY *= -1;
  }
}

function mostrarRaquete(x, y){
    rect(x, y, comprimentoRaquete, 
       alturaRaquete);
}

function movimentoRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function colisaoRaqueteBiblioteca(x, y){
  colidiu =
  collideRectCircle(x, y, comprimentoRaquete, 
                    alturaRaquete, xBolinha, yBolinha, raio);
  if (colidiu){
    velocidadeX *= -1
    raquetada.play();
  }
}

function movimentaRaqueteOponente(){
  if (keyIsDown(87)){
    yRaqueteOponente -= 10;
  }
  if (keyIsDown(83)){
    yRaqueteOponente += 10;
  }
}

function incluiPlacar(){
  stroke(255)
  textAlign(CENTER)
  textSize(16);
  fill(color(290, 30, 30));
  rect(130, 10, 40 ,20);
  fill(255);
  text(pontos, 150, 26);
  fill(color(290, 30, 30));
  rect(430, 10, 40 ,20);
  fill(255);
  text(pontosOponente, 450, 26);
}

function marcaponto(){
  if (xBolinha > 590){
    pontos += 1;
    ponto.play();
  }
  if (xBolinha < 10){
    pontosOponente += 1;
    ponto.play();
  }
}
