const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");
document.addEventListener("keydown",direction);
/*
Co do pobrania punktów do bazy, podejrzewam, że najlepiej wziąć je
z draw() (gdy sprawdzamy, czy jest koniec gry)
 */

/*
Co do playAgain, na razie gra automatycznie się playAgainuje po 5 sekundach od końca gry,
przycisk mimo najszczerszych chęci mnie pokonał na razie
 */

// tworzenie planszy
const box = 32;

// tworzenie snake'a
let snake = [];
snake[0] = {
    x : 9 * box,
    y : 10 * box
};

//zmienna z punktami
let score = 0;

// wczytanie planszy i jabłka
const ground = new Image();
ground.src = "img/ground.png";
const foodImg = new Image();
foodImg.src = "img/food.png";

// pojawienie sie jabłka
let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// szybkość snake'a -> 120 ms
let game = setInterval(draw,120);

// kontrolowanie snake'a
let d;
function direction(event){
    let key = event.keyCode;
    if( key === 37 && d !== "RIGHT"){
        d = "LEFT";
    }else if(key === 38 && d !== "DOWN"){
        d = "UP";
    }else if(key === 39 && d !== "LEFT"){
        d = "RIGHT";
    }else if(key === 40 && d !== "UP"){
        d = "DOWN";
    }
}

// sprawdzenie czy nastąpiła kolizja
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x === array[i].x && head.y === array[i].y){
            return true;
        }
    }
    return false;
}

// rysujemy plansze i snake'a
function draw(){
    
    ctx.drawImage(ground,0,0);

    //miejsce na punkty
    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score,2*box,1.6*box);

    for( let i = 0; i < snake.length ; i++){
		ctx.fillStyle = "black";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "#a1e451";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    ctx.drawImage(foodImg, food.x, food.y);
    
    // zachowujemy początkową pozycję głowy
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // patrzymy, w którą stronę ma głowa pójść
    if( d === "LEFT") snakeX -= box;
    if( d === "UP") snakeY -= box;
    if( d === "RIGHT") snakeX += box;
    if( d === "DOWN") snakeY += box;
    
    // jeśli głowa trafi na jabłko
    if(snakeX === food.x && snakeY === food.y){
		// podnosimy liczbę jabłek
        score++;
		//nowa pozycja jabłka
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
    }else{
        snake.pop();
    }
    
    //dodajemy nową głowę
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    //sprawdzamy czy jest koniec gry -> czy uderzylismy w sciane albo w ogon
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
        //tutaj pewnie najlepiej pobrać punkty

        //tu bierzemy playAgain po 5 sekundach
        setTimeout(playAgain, 5000);

    }
    snake.unshift(newHead);

}

// Obsługa działania nowej gry
function playAgain() {
    // Czyszczenie wszystkich koniecznych zmiennych/funkcji
    score = 0;
    snake = [];
    snake[0] = {
        x : 9 * box,
        y : 10 * box
    };
    game = setInterval(draw,120);
}
