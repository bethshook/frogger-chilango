window.onload = function() {
    
//canvas
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


//constants
var interval;
var frames = 0;
var images = {
    xolo: './images/xolo3.png',
    bg: './images/cdmx4.png',
    car: './images/taxi.png',
    truck: './images/truck.png',
    cyclist: './images/cyclist.png',
    trajinera: './images/trajinera.png',
    axolotl: './images/axolotl.png'
}
var sound = new Audio();
sound.src = './audio/tamales.mp3';
sound.loop = true;
var taxis = [];
var trucks = [];
var tamaleros = [];
var trajineras = [];
var axolotls = [];
var lives = 3;

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
        ctx.font = "28px Courier";
        ctx.fillStyle = 'black';
        var playerScore = Math.floor(frames / 60);
        ctx.fillText("Press 'Esc' to reset", 320,canvas.height-30);
        ctx.fillStyle = 'red';
        ctx.font = "40px Mexcellent-Regular";
        ctx.fillText("Player Score: " + playerScore, 360,300);
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = "gray";
        ctx.fillRect(this.x, this.y, canvas.width, canvas.height);

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
        ctx.fillStyle = "#fe3f80";
        ctx.font = '30px Courier';
        ctx.fillText("Time: " + Math.floor(frames / 60), 30, 60 )
    }
}
  
class Xolo{
  constructor(){
      this.x = canvas.width / 2;
      this.y = canvas.height - 62;
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
        if (this.y >= 192) this.y -=64;
    }

    goDown(){
        if (this.y < canvas.height - 64) this.y += 64;
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
        this.x-=4;
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
        this.width = 80;
        this.height = 80;
        this.image = new Image();
        this.image.src = img;
        this.image.onload = function(){
            this.draw();
        }.bind(this);
  
    }
    
      draw(){
        this.x+=1;
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
        this.x-=1;
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height);
      }
  }

//instances
var board = new Board();
var xolo = new Xolo();

//main functions
function update(){
    frames++;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    board.draw();
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
  }
  
  function start(){
    interval = setInterval(update, 1000/60);
    sound.play();
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
    if(!(frames%120===0) ) return;
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
    if(!(frames%140===0) ) return;
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
    if(!(frames%190===0) ) return;
    var trajinera = new Trajinera(-64, canvas.height - 330, images.trajinera);
    trajineras.push(trajinera);
}

function drawTrajineras(){
    trajineras.forEach(function(trajinera){
        trajinera.draw();
    })
}

function generateAxolotls(){
    if(!(frames%120===0) ) return;
    var axolotl = new Axolotl(canvas.width, canvas.height - 364, images.axolotl);
    axolotls.push(axolotl);
}

function drawAxolotls(){
    axolotls.forEach(function(axolotl){
        axolotl.draw();
    })
}

function xoloDies(){
    clearInterval(interval);
    interval = undefined;
    sound.pause();
    sound.currentTime = 0;
    lives--;
    restart();
    if (lives===0) {
        board.gameOver();
    }
}

function restart(){
    if(interval) return;
    pipes = [];
    frames = 0;
    flappy.x = 100;
    flappy.y = 100;
    start();
}

  
//event listeners

start();

addEventListener('keydown', function(e){
    switch(e.keyCode){      
        case 39:
        // if(xolo.x === canvas.width - xolo.width) return;
            xolo.goRight();
            break;
        case 37:
            // if(xolo.x === 0) return;
            xolo.goLeft();
            break;
        case 38:
            xolo.goUp();
            // start();
            break;
        case 40:
            xolo.goDown();
            break;
    }

})  

}//end