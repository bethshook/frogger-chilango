window.onload = function() {
    
//canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


//constants
var interval;
var frames = 0;
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
var taxis = [];
var trucks = [];
var tamaleros = [];
var trajineras = [];
var axolotls = [];
var lives = 4;
var score = 0;
var wins = 0;
var player = 1;

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
        ctx.font = "120px Mexcellent-Regular";
        ctx.fillStyle = 'white';
        ctx.fillText("Game Over", 230,230);
        ctx.font = "18px Courier";
        ctx.fillStyle = 'black';
        ctx.fillText("Press 'Esc' to play again", 370,canvas.height-30);
        ctx.fillStyle = 'red';
        ctx.font = "40px Mexcellent-Regular";
        var time = Math.floor(frames / 60);
        if (player === 1) {
            var playerOneScore = score - time;
            ctx.fillText("Player One Score: " + playerOneScore, 315,300);
        } else {
            var playerTwoScore = score - time;
            ctx.fillText("Player Two Score: " + playerTwoScore, 315,300);
            if (playerOneScore > playerTwoScore){
                ctx.fillText("Player One Wins!", 340,365);
            } else {
                ctx.fillText("Player Two Wins!", 340,365);
            }
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
        ctx.font = '22px Courier';
        ctx.fillText("Score: " + score, 30, 25)
        ctx.fillText("Time: " + Math.floor(frames / 60), 30, 50)
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
        this.x-=2;
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
        this.x-=5;
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
        this.x+=3;
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
var onTrajinera = false;
var onAxolotl = false;

// var life = new XoloHead(160,12,images.head)

//main functions
function update(){
    frames++;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    board.draw();
    chinampaOne.draw();
    chinampaTwo.draw();
    chinampaThree.draw();
    drawLives();
    generateTrajineras();
    drawTrajineras();
    generateAxolotls();
    drawAxolotls();
    xolo.draw();
    generateTaxis();
    drawTaxis();
    generateTrucks();
    drawTrucks();
    generateTamaleros();
    drawTamaleros();
    checkIfWon();
    if (checkIfDrowning()) xoloDies();
    if (wins === 1) {
        xoloWinOne.draw()
    };
    if (wins === 2) {
        xoloWinOne.draw(); xoloWinTwo.draw()
    };
    if (wins === 3) {
        xoloWinOne.draw(); xoloWinTwo.draw(); xoloWinThree.draw();
    }
    if ((xolo.x < 0) || (xolo.x > canvas.width - 64)) {
        xoloDies();
    }
    
}
  
  function start(){
    if(interval) return; //what does this do
    interval = setInterval(update, 1000/60);
  }

//aux functions

function generateTaxis(){
    if(!(frames%110===0) ) return;
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
    var num = Math.floor(Math.random() * 50 + 110 )
    if(!(frames%num===0) ) return;
    var truck = new Truck(canvas.width, canvas.height - 192, images.truck);
    trucks.push(truck);
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
    var num = Math.floor(Math.random() * 20 + 140 )
    if(!(frames%num===0) ) return;
    var tamalero = new Bike(-64, canvas.height - 256, images.cyclist);
    tamaleros.push(tamalero);
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
    var num = Math.floor(Math.random() * 30 + 140 )
    if(!(frames%num===0) ) return;
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
    if(!(frames%170===0) ) return;
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
        console.log(onTrajinera,onAxolotl,inWater);
        return !onTrajinera && !onAxolotl && inWater;
}

//tft when on trajinera - correct!
//tft when hops into water - incorrect! no longer on traji
//tff when back on grass - incorrect! no longer on traji

function xoloDies(){
    clearInterval(interval);
    sound.pause();
    interval = undefined;
    sound.currentTime = 0;
    ctx.fillStyle = "#fe3f80";
    ctx.font = '80px Mexcellent-Regular';
    ctx.fillText("x", xolo.x + 16, xolo.y+64);
    lives--;
    if (lives===0) {
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
        console.log(wins);
        score+=50;
        clearInterval(interval);
        sound.pause();
        interval = undefined;
        sound.currentTime = 0;
        setTimeout(function(){
            wins++;
            if (wins === 3) {
                sound.play();
                youWon();
            } else {
            restart();
        }
        }, 1000);
  }
}

function youWon(){
    
    ctx.font = "120px Mexcellent-Regular";
        ctx.fillStyle = 'white';
        ctx.fillText("you won!", 280,230);
        ctx.font = "18px Courier";
        ctx.fillStyle = 'black';
        ctx.fillText("Press 'Esc' to play again", 370,canvas.height-30);
        ctx.fillStyle = 'red';
        ctx.font = "40px Mexcellent-Regular";
        var time = Math.floor(frames / 60);
        if (player === 1) {
            var playerOneScore = score - time;
            ctx.fillText("Player One Score: " + playerOneScore, 315,300);
        } else {
            var playerTwoScore = score - time;
            ctx.fillText("Player Two Score: " + playerTwoScore, 315,300);
            if (playerOneScore > playerTwoScore){
                ctx.fillText("Player One Wins!", 340,365);
            } else {
                ctx.fillText("Player Two Wins!", 340,365);
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
    xolo.x = canvas.width / 2;
    xolo.y = canvas.height - 62;
    start();
}

  
//event listeners

start();

addEventListener('keydown', function(e){
    switch(e.keyCode){      
        case 39:
        // if(xolo.x === canvas.width - xolo.width) return;
            xolo.goRight();
            if (onAxolotl) onAxolotl = false;
            if (onTrajinera) {
                xolo.x+=64;
                onTrajinera = false;
            }
            break;
        case 37:
            // if(xolo.x === 0) return;
            xolo.goLeft();
            if (onTrajinera) onTrajinera = false;
            if (onAxolotl) {
                xolo.x-=64;
                onAxolotl = false;
            }
            break;
        case 38:
        if (xolo.y > 64 || xolo.x >= chinampaOne.x) {
            xolo.goUp();
            if (onTrajinera) onTrajinera = false;
            if (onAxolotl) {
                onAxolotl = false;
            }
            }
            // if (!onAxolotl) xoloDies();
            break;
        case 40:
            xolo.goDown();
            if (onTrajinera) onTrajinera = false;
            if (onAxolotl) onAxolotl = false;
            break;
        case 27:
            lives = 4;
            score = 0;
            wins = 0;
            if (player === 1) {
                player++;
            } else {
                player--;
            }
            restart();
            break;
    }

})  

}//end