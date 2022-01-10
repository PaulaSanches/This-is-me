const canvas = document.getElementById('gamecanvas');
const ctx = canvas.getContext('2d');

window.addEventListener("keydown", event => {
    doKeyDown(event);
})

function Movevillain(x, y) {
    var bImgVillain = document.getElementById("villain");	
    bImgVillain.style.opacity = '1';
    bImgVillain.style.top = y + 'px';			
    bImgVillain.style.left = x + 'px';		    
}

function DrawMounds(x,y,moundRadius) {    
    ctx.beginPath();
    ctx.arc(x,y,moundRadius,0,1*Math.PI,true);   
    ctx.fillStyle ='rgb(167,116,58)'
    ctx.fill();
}

function doKeyDown(event){
	switch(event.keyCode) {
		case 37:
        case 65: { // Left Arrow
            if (villain.x > 0){
    	        villain.x = villain.x - 10;
		        Movevillain(villain.x,villain.y);
            }
			break;
		}
		case 38:
        case 87: { // Up Arrow	
            if (villain.y > 0){
                villain.y = villain.y - 10;
			    Movevillain(villain.x, villain.y);
            }
			break;
		}
		case 39:
        case 68: { // Right Arrow            
            if (villain.x < canvas.width){
			    villain.x = villain.x + 10;
                Movevillain(villain.x, villain.y);
            }
			break;
		}
		case 40:
        case 83: { // Down Arrow
            if (villain.y < canvas.height){				
                villain.y = villain.y + 10;
			    Movevillain(villain.x, villain.y);
            }
			break;
		}
	}
    collisionDetect();
}

//game objects
const villain = {
    x:50,
    y:50,
    speed: 256 
};

const worm = {};
let wormsCaught = 0;
let totalTime = 60;
let timeToUpdate = 58;
let timeToIncreaseRadius = 55;

//Canvas Reset
const reset = function () {
    console.log("reset");
    ctx.clearRect(0,0,canvas.width,canvas.height);

    villain.x = 50; //canvas.width / 2;
    villain.y = 50; //canvas.height / 2;

    circleRadius = 20;

    createNewMounds(circleRadius);
}

const createNewMounds = function (moundRadius) {
        console.log("createNewMounds");
    
        //Random rounds on the screen
        worm.x = Math.floor(Math.random() * canvas.width);
        worm.y = Math.floor(Math.random() * canvas.height);
        
        DrawMounds(worm.x , worm.y, moundRadius);
}


const UpdateCanvas = function () {

    if (timeLeft == timeToUpdate){
        console.log("UpdateCanvas");
        ctx.clearRect(0,0,canvas.width,canvas.height);

        //Random rounds on the screen
        worm.x = Math.floor(Math.random() * canvas.width);
        worm.y = Math.floor(Math.random() * canvas.height);

        DrawMounds(worm.x,worm.y,circleRadius);
        timeToUpdate -= 2;
    }
}

const collisionDetect = function () {
    console.log("collisionDetect");
   
    //The collision of characteres 
    if (
        villain.x <= (worm.x + circleRadius)
        && worm.x <= (villain.x + 50)
        && villain.y <= (worm.y + circleRadius)
        && worm.y <= (villain.y + 50)
    ) {        
        console.log("true");   
        ++wormsCaught;
        playSoundCatchSuccess();   
        reset();         
    }          
}

const updateTimeLeft = function (time) {    
    document.getElementById('scoretime').innerHTML = "Score: " +wormsCaught + " Time Left: " + time;
}

const playSoundCatchSuccess = function () {
    //TODO: play sound
}

//Loop
const main = function () {
       
    const delta = Date.now() - startTime;   

    //updatePos();
    timeLeft = Math.floor(totalTime - (delta % (1000 * 60)) / 1000);

    //reduce the speed of update 0,5 sec
    UpdateCanvas();
      
    if (timeLeft == 0){
        //TODO: Finish the game
    }
    
    updateTimeLeft(timeLeft);    

    //Executa o mais rapido possivel
    requestAnimationFrame(main);
}

//Suport 
const w = window;
const requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame;

//start time
let startTime = Date.now(); 

reset();
main();
