let update_dir={x:0, y:0};
// board=document.getElementsByClassName("board");
let snake_body=[
    {x:5, y:4}
];
let speed=3;
let food={x:10, y:10};
let score=0;
let food_eat=new Audio('food.mp3');
let move_aud=new Audio("move.mp3");
let over_music=new Audio('gameover.mp3');
// let game_aud=new Audio('music.mp3');

let ltime=0;//last paint time
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-ltime)/1000< 1/speed){
        return;
    }
    ltime=ctime;
    gamebody();
}
function collision(snake1){
    //if you hit the wall
    if(snake1[0].x>=18 || snake1[0].x<=0 || snake1[0].y>=18 || snake1[0].y<=0 ){
        return true;
    }
    //if you eat yourself
        for (let i = 1; i < snake_body.length; i++) {
        if(snake1[i].x === snake1[0].x && snake1[i].y === snake1[0].y){
            return true;
        }
    }
    return false;
}
function gamebody(){
    if(collision(snake_body)){
        update_dir={x:0, y:0};
        over_music.play();
        alert("Game Over");
        snake_body=[
            {x:5, y:4}
        ];
        score=0;
        // game_aud.pause();
        s_board.innerHTML="Score:"+ score;
    }
    //updating the body
    if(snake_body[0].x===food.x && snake_body[0].y===food.y)
    {   
        food_eat.play();
        score+=10;
        if(high_val<score){
            high_val=score;
            localStorage.setItem("high_score",JSON.stringify(high_val));
            hscore.innerHTML="HighScore: "+ high_val;
        }
        snake_body.unshift({x: snake_body[0].x+update_dir.x, y: snake_body[0].y+update_dir.y });
        //updating the food position
        food={x:Math.round(1+16*Math.random()),y:Math.round(1+16*Math.random())}
        s_board.innerHTML="Score:"+ score;
    }
    //move the snake
    for(i=snake_body.length-2;i>=0;i--){
        snake_body[i+1] = {...snake_body[i]};
    }
    snake_body[0].x+=update_dir.x;
    snake_body[0].y+=update_dir.y;
    //display body
    board.innerHTML="";
    snake_body.forEach((e,index)=>{
        snake_div=document.createElement("div");
        snake_div.style.gridRowStart=e.y;
        snake_div.style.gridColumnStart=e.x;
        if(index===0){
            snake_div.classList.add("head");
        }
        else{
            snake_div.classList.add("body");
        }
        board.appendChild(snake_div);
    })

    //display food
    food_div=document.createElement('div');
    food_div.style.gridRowStart=food.y;
    food_div.style.gridColumnStart=food.x;
    food_div.classList.add("food");
    board.appendChild(food_div);
}


// game_aud.play();
let high_score=localStorage.getItem("hiscore");
if(high_score===null){
    high_val=0;
    localStorage.setItem("high_score",JSON.stringify(high_val));
}
window.requestAnimationFrame(main);
window.addEventListener("keydown",e=>{
    // console.log(e.key);
    switch(e.key){
        //giving directions to the snake
        case "ArrowDown":
            update_dir.x=0;
            update_dir.y=1;
            move_aud.play();
            break;
        case "ArrowUp":
            update_dir.x=0;
            update_dir.y=-1;
            move_aud.play();
            break;
        case "ArrowRight":
            update_dir.x=1;
            update_dir.y=0;
            move_aud.play();
            break;
        case "ArrowLeft":
            update_dir.x=-1;
            update_dir.y=0;
            move_aud.play();
            break;
        case " ":
            alert("Game Paused, Click to resume");
            break;
        default:
            break;
    }

})