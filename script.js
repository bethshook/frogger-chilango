window.onload = function() {
    
//canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

//constants
var interval;
var frames = 0;
var framesCounterTruck = 21;
var framesCounterTamal = 21;
var images = {
    xolo: './images/xolo3.png',
    bg: './images/cdmx-clean.png',
    car: './images/taxi.png',
    truck: './images/truck.png',
    cyclist: './images/cyclist2.png',
    trajinera: './images/trajinera.png',
    axolotl: './images/axolotl.png',
    chinampa: './images/chinampa.png',
    head: './images/xolo-head.png'
}
var sound = new Audio();
sound.src = './audio/tamales.mp3';
sound.loop = true;
var organ = new Audio();
organ.src = './audio/organ.mp3';
organ.loop = true;
var taxis = [];
var trucks = [];
var tamaleros = [];
var trajineras = [];
var axolotls = [];
var lives = 4;
var score = 0;
var player = 1;
var totalTime = 0;
var currentTime = 0;
var onTrajinera = false;
var onAxolotl = false;
var onChinampaOne = false;
var onChinampaTwo = false;
var onChinampaThree = false;
var playerOneScore;

//classes
class Board{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.width = canvas.width;
        this.height = canvas.height;
        this.color = '#a9a9a9'
        this.image = new Image();
        this.image.src = images.bg;
        this.image.onload = function(){
            this.draw();
        }.bind(this)
    }
  
    gameOver(){
        console.log(player)
        onChinampaOne = false;
        onChinampaTwo = false;
        onChinampaThree = false;
        ctx.font = "120px Mexcellent-Regular";
        ctx.fillStyle = 'white';
        ctx.fillText("Game Over", 230,230);
        ctx.font = "18px Courier";
        ctx.fillStyle = 'black';
        ctx.fillText("Press 'Esc' to play again", 370,canvas.height-30);
        ctx.fillStyle = 'red';
        ctx.font = "40px Mexcellent-Regular";
        if (player == 1) {
            playerOneScore = score - totalTime;
            ctx.fillText("Player One Score: " + playerOneScore, 315,300);
            totalTime = 0;
        } else {
            var playerTwoScore = score - totalTime;
            ctx.fillText("Player Two Score: " + playerTwoScore, 315,300);
            if (playerOneScore > playerTwoScore){
                ctx.fillText("Player One Wins!", 355,365);
            } else if (playerTwoScore > playerOneScore) {
                ctx.fillText("Player Two Wins!", 355,365);
            } else {
                ctx.fillText("It's a tie!", 355,365);
            }
            totalTime = 0;

        }
        
    }
  
    draw(){
        ctx.fillRect = this.color;
        ctx.drawImage(this.image, this.x,this.y,this.width,this.height);
        ctx.beginPath();
        ctx.strokeStyle = 'yellow';
        ctx.lineWidth = '8';
        ctx.setLineDash([15, 20]);
        ctx.moveTo(0,canvas.height - 128);
        ctx.lineTo(canvas.width,canvas.height - 128);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.setLineDash([15, 20]);
        ctx.moveTo(0,canvas.height - 192);
        ctx.lineTo(canvas.width,canvas.height - 192);
        ctx.closePath();
        ctx.stroke();
        ctx.fillStyle = "black";
        ctx.font = '20px Avenir';
        ctx.fillText("Score: " + score, 30, 25)
        ctx.fillText("Time: " + currentTime, 30, 50)
    }
}
  
class Xolo{
  constructor(x,y){
      this.x = x;
      this.y = y;
      this.width = 62;
      this.height = 62;
      this.image = new Image();
      this.image.src = images.xolo;
      this.image.onload = function(){
          this.draw();
      }.bind(this);

  }

  isTouching(item){
      return  (this.x < item.x + item.width) &&
              (this.x + this.width > item.x) &&
              (this.y < item.y + item.height) &&
              (this.y + this.height > item.y);
    }
  

    draw(){
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
    }

    goLeft(){
        if (this.x >= this.width) this.x -=64;
    }
  
    goRight(){
        if (this.x < canvas.width - 64) this.x +=64;
    }

    goUp(){
        if (this.y >= 0) this.y -=64;
        score += 10;
    }

    goDown(){
        if (this.y < canvas.height - 64) this.y += 64;
        score -= 10;
    }

}

class XoloHead{
    constructor(x,y,img){
        this.x = x; 
        this.y = y; 
        this.width = 30;
        this.height = 30;
        this.image = new Image();
        this.image.src = img;
        this.image.onload = function(){
            this.draw();
        }.bind(this);
  
    }
      draw(){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
      }
  }

class Car{
    constructor(x,y,img){
        this.x = x; 
        this.y = y; 
        this.width = 64;
        this.height = 64;
        this.image = new Image();
        this.image.src = img;
        this.image.onload = function(){
            this.draw();
        }.bind(this);
  
    }
    
      draw(){
        this.x-=4;
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
      }
  }


  class Truck{
    constructor(x,y,img){
        this.x = x; 
        this.y = y; 
        this.width = 64;
        this.height = 64;
        this.image = new Image();
        this.image.src = img;
        this.image.onload = function(){
            this.draw();
        }.bind(this);
  
    }
  
      draw(){
        this.x-=3;
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
      }
  }

  class Bike{
    constructor(x,y,img){
        this.x = x; 
        this.y = y; 
        this.width = 64;
        this.height = 64;
        this.image = new Image();
        this.image.src = img;
        this.image.onload = function(){
            this.draw();
        }.bind(this);
  
    }
  
      draw(){
        this.x+=2;
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
      }
  }

  class Trajinera{
    constructor(x,y,img){
        this.x = x; 
        this.y = y; 
        this.width = 64;
        this.height = 64;
        this.image = new Image();
        this.image.src = img;
        this.image.onload = function(){
            this.draw();
        }.bind(this);
  
    }
    
      draw(){
        this.x+=4;
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
      }
  }

  class Axolotl{
    constructor(x,y,img){
        this.x = x; 
        this.y = y; 
        this.width = 64;
        this.height = 64;
        this.image = new Image();
        this.image.src = img;
        this.image.onload = function(){
            this.draw();
        }.bind(this);
  
    }
  
      draw(){
        this.x-=3;
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
      }
  }

  class Chinampa{
    constructor(x,y,img){
        this.x = x; 
        this.y = y; 
        this.width = 64;
        this.height = 64;
        this.image = new Image();
        this.image.src = img;
        this.image.onload = function(){
            this.draw();
        }.bind(this);
  
    }
  
      draw(){
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
      }
  }

//instances
var board = new Board();
var xolo = new Xolo(canvas.width / 2,canvas.height - 62);
var chinampaOne = new Chinampa(canvas.width - 576, 0, images.chinampa);
var chinampaTwo = new Chinampa(canvas.width - 384, 0, images.chinampa);
var chinampaThree = new Chinampa(canvas.width - 192, 0, images.chinampa);
var xoloWinOne = new Xolo(chinampaOne.x,chinampaOne.y);
var xoloWinTwo = new Xolo(chinampaTwo.x,chinampaTwo.y);
var xoloWinThree = new Xolo(chinampaThree.x,chinampaThree.y);
var car1 = new Car(canvas.width/4, canvas.height - 128, images.car);
var car2 = new Car(canvas.width/2, canvas.height - 128, images.car);
var car3 = new Car(canvas.width * 3/4, canvas.height - 128, images.car);
var truck1 = new Truck(canvas.width/2, canvas.height - 192, images.truck);
var truck2 = new Truck(canvas.width/5, canvas.height - 192, images.truck);
var truck3 = new Truck(canvas.width * 2/3, canvas.height - 192, images.truck);
var bike1 = new Bike(canvas.width/3, canvas.height - 256, images.cyclist);
var bike2 = new Bike(canvas.width * 3/4, canvas.height - 256, images.cyclist);
var bike3 = new Bike(0, canvas.height - 256, images.cyclist);

// var life = new XoloHead(160,12,images.head)

//main functions
function update(){
    currentTime = Math.floor(frames / 60);
    frames++;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    board.draw();
    if (onChinampaOne) xoloWinOne.draw();
    if (onChinampaTwo) xoloWinTwo.draw();
    if (onChinampaThree) xoloWinThree.draw();
    chinampaOne.draw();
    chinampaTwo.draw();
    chinampaThree.draw();
    car1.draw();
    car2.draw();
    car3.draw();
    truck1.draw();
    truck2.draw();
    truck3.draw();
    bike1.draw();
    bike2.draw();
    bike3.draw();
    generateTrajineras();
    generateAxolotls();
    generateTaxis();
    generateTrucks();
    generateTamaleros();
    drawLives();
    drawTrajineras();
    drawAxolotls();
    xolo.draw();
    drawTaxis();
    drawTrucks();
    drawTamaleros();
    checkIfWon();
    if (checkIfDrowning()) xoloDies();
    if (xolo.isTouching(chinampaOne)) {
        onChinampaOne = true;
    };
    if (xolo.isTouching(chinampaTwo)) {
        onChinampaTwo = true;
    };
    if (xolo.isTouching(chinampaThree)) {
        onChinampaThree = true;
    }
    if ((xolo.x < 0) || (xolo.x > canvas.width - 64)) {
        xoloDies();
    }
    if (xolo.isTouching(car1) || xolo.isTouching(car2) || xolo.isTouching(car3) || xolo.isTouching(truck1) || xolo.isTouching(truck2) || xolo.isTouching(truck3) || xolo.isTouching(bike1) || xolo.isTouching(bike2) || xolo.isTouching(bike3)) xoloDies();
    
}
  
  function start(){
    if(interval) return; //what does this do
    interval = setInterval(update, 1000/60);
    generateTrajineras();
    generateAxolotls();
    generateTaxis();
    generateTrucks();
    generateTamaleros(); //added these to this function to get them started early
  }

//aux functions

function generateTaxis(){
    if(!(frames%90===0) ) return;
    var taxi = new Car(canvas.width, canvas.height - 128, images.car);
    taxis.push(taxi);
}

function drawTaxis(){
    taxis.forEach(function(taxi){
        taxi.draw();
        if(xolo.isTouching(taxi)){
            xoloDies();
        }
    })
}

function generateTrucks(){
    var num = Math.floor(Math.random() * 140)
    var f = frames - framesCounterTruck; 
    if ( f < 60 ) {
        return;
    }
    if(frames % num === 0){
        var truck = new Truck(canvas.width - 32, canvas.height - 192, images.truck);
        trucks.push(truck);
        framesCounterTruck = frames;
    }
    return;
    //if(!(frames%(20 + num)) ===0) ) return;
}

function drawTrucks(){
    trucks.forEach(function(truck){
        truck.draw();
        if(xolo.isTouching(truck)){
            xoloDies();
        }
    })
}

function generateTamaleros(){
    var num = Math.floor(Math.random() * 240)
    var f = frames - framesCounterTamal; 
    if ( f < 140 ) {
        return;
    }
    if(frames % num === 0){
        var tamalero = new Bike(-64, canvas.height - 256, images.cyclist);
        tamaleros.push(tamalero);
        framesCounterTamal = frames;
    }
    return;
}

function drawTamaleros(){
    tamaleros.forEach(function(tamalero){
        tamalero.draw();
        if(xolo.isTouching(tamalero)){
            xoloDies();
        }
    })
}

function generateTrajineras(){
    if(!(frames%110===0) ) return;
    var trajinera = new Trajinera(-64, 128, images.trajinera);
    trajineras.push(trajinera);
}

function drawTrajineras(){
    trajineras.forEach(function(trajinera){
        trajinera.draw();
        if(xolo.isTouching(trajinera)){
            xoloHopsOn(trajinera);
            onTrajinera = true;
        }
    })
}

function generateAxolotls(){
    if(!(frames%60===0) ) return;
    var axolotl = new Axolotl(canvas.width, 64, images.axolotl);
    axolotls.push(axolotl);
}

function drawAxolotls(){
    axolotls.forEach(function(axolotl){
        axolotl.draw();
        if(xolo.isTouching(axolotl)){
            xoloHopsOn(axolotl);
            onAxolotl = true;
        }
    })
}

function xoloHopsOn(item){
    xolo.x = item.x;
    xolo.y = item.y;
}

function drawLives(){
    var x = 190;
    for (i=0; i<lives; i++) {
        var life = new XoloHead(x,18,images.head);
        life.draw();
        x+=40;
    }
}

function checkIfDrowning(){
        var inWater = (xolo.y <= 130) && (xolo.y >= 64);
        // console.log(onTrajinera,onAxolotl,inWater);
        return !onTrajinera && !onAxolotl && inWater;
}

//tft when on trajinera - correct!
//tft when hops into water - incorrect! no longer on traji
//tff when back on grass - incorrect! no longer on traji

function xoloDies(){
    clearInterval(interval);
    sound.pause();
    organ.pause();
    interval = undefined;
    sound.currentTime = 0;
    ctx.fillStyle = "#fe3f80";
    ctx.font = '80px Mexcellent-Regular';
    ctx.fillText("x", xolo.x + 16, xolo.y+64);
    lives--;
    totalTime += currentTime;
    if (lives===0) {
        organ.pause();
        sound.play();
        board.gameOver();
    } else {
        setTimeout(function(){
            restart();
        }, 1000);
    }
}

function checkIfWon(){
    if (xolo.isTouching(chinampaOne) || xolo.isTouching(chinampaTwo) || xolo.isTouching(chinampaThree)) {
        score+=50;
        clearInterval(interval);
        sound.pause();
        organ.pause();
        interval = undefined;
        sound.currentTime = 0;
        setTimeout(function(){
            if (onChinampaOne && onChinampaTwo && onChinampaThree) {
                totalTime += currentTime;
                sound.play();
                youWon();
            } else {
            totalTime += currentTime;
            restart();
        }
        }, 1000);
  }
}

function youWon(){
    ctx.font = "120px Mexcellent-Regular";
        onChinampaOne = false;
        onChinampaTwo = false;
        onChinampaThree = false;
        ctx.fillStyle = 'white';
        ctx.fillText("you won!", 280,230);
        ctx.font = "18px Courier";
        ctx.fillStyle = 'black';
        ctx.fillText("Press 'Esc' to play again", 370,canvas.height-30);
        ctx.fillStyle = 'red';
        ctx.font = "40px Mexcellent-Regular";
        if (player === 1) {
            totalTime += currentTime;
            playerOneScore = score - totalTime;
            ctx.fillText("Player One Score: " + playerOneScore, 315,300);
        } else {
            totalTime += currentTime;
            var playerTwoScore = score - totalTime;
            ctx.fillText("Player Two Score: " + playerTwoScore, 315,300);
            if (playerOneScore > playerTwoScore){
                ctx.fillText("Player One Wins!", 355,365);
            } else if (playerTwoScore > playerOneScore) {
                ctx.fillText("Player Two Wins!", 355,365);
            } else {
                ctx.fillText("It's a tie!", 355,365);
            }
        }
}

function restart(){
    if(interval) return;
    taxis = [];
    trucks = [];
    tamaleros = [];
    trajineras = [];
    axolotls = [];
    frames = 0;
    framesCounterTamal = 21;
    framesCounterTruck = 21;
    xolo.x = canvas.width / 2;
    xolo.y = canvas.height - 62;
    car1.x = canvas.width/4;
    car2.x = canvas.width/2;
    car3.x = canvas.width * 3/4;
    truck1.x = canvas.width/2;
    truck2.x = canvas.width/5;
    truck3.x = canvas.width * 2/3;
    bike1.x = canvas.width/3;
    bike2.x = canvas.width * 3/4; 
    bike3.x = 0;   

    start();
}

  
//event listeners

start();

addEventListener('keydown', function(e){
    organ.play();
    switch(e.keyCode){      
        case 39:
            xolo.goRight();
            if (onAxolotl) onAxolotl = false;
            if (onTrajinera) {
                xolo.x+=64;
                onTrajinera = false;
            }
            break;
        case 37:
            xolo.goLeft();
            if (onTrajinera) onTrajinera = false;
            if (onAxolotl) {
                xolo.x-=64;
                onAxolotl = false;
            }
            break;
        case 38:
        if (xolo.y > 64 || xolo.x >= 436) {
            xolo.goUp();
            if (xolo.y === 0 && xolo.x > 512 && xolo.x < 624) xoloDies();
            if (xolo.y === 0 && xolo.x > 712 && xolo.x < 820) xoloDies();
            if (xolo.y === 0 && xolo.x > 900) xoloDies();
            if (onChinampaOne && xolo.isTouching(chinampaOne)) xoloDies();
            if (onChinampaTwo && xolo.isTouching(chinampaTwo)) xoloDies();
            if (onChinampaThree && xolo.isTouching(chinampaThree)) xoloDies();
            if (onTrajinera) onTrajinera = false;
            if (onAxolotl) {
                onAxolotl = false;
            }
            }
            break;
        case 40:
            xolo.goDown();
            if (onTrajinera) onTrajinera = false;
            if (onAxolotl) onAxolotl = false;
            break;
        case 27:
            lives = 4;
            score = 0;
            if (player === 1) {
                player++;
            } else {
                player--;
            }
            restart();
            sound.pause();
            break;
    }

})  

}//end