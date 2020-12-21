    const canvas = document.querySelector('#bouncingBalls');
    let ctx = canvas.getContext('2d');
         
    let canvasW = canvas.width = window.innerWidth ;
    let canvasH = canvas.height = window.innerHeight;

    function randomb(min, max){
      return Math.floor(Math.random()*(max-min)+min+1);
    }

    let directions = [[1,0],[1,1],[1,1],[1,-1],[0,-1],[0,1],[-1,1],[-1,1],[-1,0],[-1,-1],[-1,-1]];
    let randomDirct = directions [randomb(0,7)];
    
    
    function Ball(x, y, newX, newY) {
      this.x = x;
      this.y = y;
      this.newX = newX;
      this.newY = newY;
    }

    Ball.prototype.draw = function() {
        ctx.beginPath();
        ctx.fillStyle = 'purple';
        ctx.arc(this.x, this.y, 20, 0, Math.PI*2);
        ctx.fill(); 
        if((this.x + 20)>0 && (this.x + 20)<canvasW){
          this.x += this.newX; 
        }else{
          this.newX *= -1;
          this.x += this.newX;  
        }
        if ((this.y + 20)>0 && (this.y + 20)<canvasH){
          this.y += this.newY;
        }else{
          this.newY *= -1;
          this.y += this.newY;
        }
      }
    
    let balls = [];
    for(let j = 0; j<=20; j++){
      let ball = new Ball(randomb(20,canvasW-20), randomb(20,canvasH-20),directions[randomb(0,7)][0],directions[randomb(0,7)][1]);
      balls.push(ball);
    }

    function animationLoop(){
      ctx.clearRect(0,0,canvasW,canvasH); 
      for(let k = 0; k<=20; k++){ 
      balls[k].draw(); 
    }
      requestAnimationFrame(animationLoop);
    }
    
    animationLoop();
    
 
