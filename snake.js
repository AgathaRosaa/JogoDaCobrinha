let canvas= document.getElementById('snake');
//Sempre que usar o canvas, devemos capturar o contexto gráfico da mesma
let context= canvas.getContext("2d"); 
let box= 32;
let snake=[];
snake[0]={
    x: 8 *box,
    y: 8* box
}

//Vai começar pela direita
let direction= "right";

//Cria ordem aleatória para exibir a comida no box
let food={
    x:Math.floor(Math.random() *15 +1) *box,
    y:Math.floor(Math.random() * 15 +1) *box

}

//Vai criar o boc, onde o jogo vai acontecer
function createBg(){
    context.fillStyle= "lightgreen" //define o estilo usado ao preencher formas
    //Desenha um retângulo
    //0 - valor da coordernada x para o ponto inicial do retângulo
    //0 - valor da coordenada y para o ponto inicial do retângulo
    //16*box - a largura do retângulo
    //16*box - a altura do retângulo
    context.fillRect(0,0,16*box,16*box);
}

//Cria a cobrinha
function createSnake(){
    for(let i=0; i<snake.length;i++){
     context.fillStyle="green";
     context.fillRect(snake[i].x, snake[i].y, box,box)
    }
}

//Cria a forma da comida
function drawFood(){
    context.fillStyle="red";
    context.fillRect(food.x, food.y, box, box)
}

//Quando pressionar uma tecla, chama a função update que vai verificar qual foi a tecla pressionada
document.addEventListener('keydown', update);

//Verifica qual foi a tecla pressionada e dá uma direção de acordo com a tecla pressioanada
function update(ev){
    if(ev.keyCode == 37 && direction != "right") direction= "left";
    if(ev.keyCode == 38 && direction != "down") direction= "up";
    if(ev.keyCode == 39 && direction != "left") direction= "right";
    if(ev.keyCode == 40 && direction != "up") direction= "down";
}

//Função de inicio do jogo
function start(){
    //Vai fazer com que a cobrinha sai da box e volte
    if(snake[0].x>15 *box && direction=="right") snake[0].x=0;
    if(snake[0].x<0  && direction=="left") snake[0].x=16 *box;
    if(snake[0].y>15 *box && direction=="down") snake[0].y=0;
    if(snake[0].y<0  && direction=="up") snake[0].y=16*box;

    //Condição do game over, vai verificar se a cabeça da snake não bate no corpo
    for(let i=1; i<snake.length;i++){
        if(snake[0].x==snake[i].x && snake[0].y == snake[i].y){
            clearInterval(game)
            alert("Game Over!")
        }
    }

    createBg();
    createSnake();
    drawFood();

    let snakeX= snake[0].x;
    let snakeY= snake[0].y;

    if(direction=="right") snakeX +=box;
    if(direction=="left") snakeX -=box;
    if(direction=="up") snakeY -=box;
    if(direction=="down") snakeY+=box;
    
//Se não pegar a comida vai continuar apenas andando
    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }
    //Se pegar a comida, a comida vai aparecer em um novo loval da box 
    else {food.x = Math.floor(Math.random()*15+1) * box; 
        food.y= Math.floor(Math.random()*15+1) *box
    }

    let newHead={
        x:snakeX,
        y:snakeY
    }

    //Vai fazer a snake andar de acordo com a direction
    snake.unshift(newHead);


}

//Chama a função start por um tempo
let game= setInterval(start, 100);
