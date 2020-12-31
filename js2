const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

function random(min, max){
  return (Math.floor(Math.random()*(max-min) + min + 1));  
}
/* class of Shape:   Balls and EvilCircle inherited from Shape ---------*/
function Shape(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
}

Shape.prototype.draw = function(){
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);

}
      /*-----------------------------------------------------*/
function Balls(x, y,newX, newY, radius,color) {
  Shape.call(this,x,y,radius,color);
  this.newX = newX;
  this.newY = newY;
}
Balls.prototype = Object.create(Shape.prototype);
Balls.prototype.constructor = Balls;

Balls.prototype.move = function() {
  if(this.x - this.radius <= 0) {
    this.newX = -this.newX;
  }
  if(this.x + this.radius >= width){
    this.newX = -this.newX;
  }
  if(this.y + this.radius >= height){
    this.newY = -this.newY;  
  }
  if(this.y - this.radius <= 0){
    this.newY = -this.newY;  
  }
  
  this.x += this.newX;
  this.y += this.newY;
}


     /*--------------------------------------------------------*/
function EvilCircle(x,y,radius) {
  Shape.call(this,x,y,radius);  
}

EvilCircle.prototype = Object.create(Shape.prototype);
Object.defineProperty(EvilCircle.prototype, 'constructor',{
   value : EvilCircle,
});




  /* here we make object instances from Balls----------------------*/
const arrayOfBalls = [];
for(let i = 0; i<=25; i++){
  let ball = new Balls(
    random(0,width),
    random(0,height),
    random(-5,5),
    random(-5,5),
    random(15,20),
    `rgb(${random(0,255)},${random(0,255)},${random(0,255)})`
   );  
  
   arrayOfBalls.push(ball);
}

   /* just need 1 object instance form Evilcircle-----------    */
   const evil = new EvilCircle(
       random(0,width),
       random(0,height),
       20
   );


  /* this makes our animation work -----------------------------------*/
function loop (){
  ctx.clearRect(0,0,width,height); 
  for(let j = 0; j<=25; j++){  
    arrayOfBalls[j].draw();
    ctx.fill();
    arrayOfBalls[j].move(); 
  }
  evil.draw();
  ctx.stroke();
  ctx.strokeStyle = 'red';
  requestAnimationFrame(loop);
}

loop();

  /*--------------------------------------------------------*/
window.addEventListener('keydown', function(e){
  switch(e.code){
    case 'KeyW':
      evil.y--;
      break;
    case 'KeyA':
      evil.x--;
      break;
    case 'KeyS':
      evil.y++;
      break;
    case 'KeyD': 
      evil.x++;
      break; 
}
});
