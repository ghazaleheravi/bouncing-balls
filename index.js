const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

let score = 0 ;

function random(min, max) {
  return (Math.floor(Math.random()*(max-min) + min + 1));  
}

function Shape(x, y, newX, newY, exists) {
  this.x = x;
  this.y = y;
  this.newX = newX;
  this.newY = newY;
  this.exists = exists;
}

function Balls(x, y, newX, newY, exists, radius, color) {
  Shape.call(this, x, y, newX, newY, exists);
  this.radius = radius;
  this.color = color;
}

Balls.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
}

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

Balls.prototype.collisionD = function() {
  let dx = 0;
  let dy = 0;
  let distance = 0;
  for(let k = 0; k<=25; k++){
    if(this !== balls[k] && balls[k].exists == true){
      dx = this.x - balls[k].x; 
      dy = this.y - balls[k].y;
      distance = Math.sqrt(dx*dx + dy*dy);
      if(distance <= this.radius + balls[k].radius){
        this.color = balls[k].color = `rgba(${random(0,255)},${random(0,255)},${random(0,255)},0.7)`;
      }
    }
  }
}
     
function EvilCircle(x,y,newX,newY,exists,radius) {
  Shape.call(this,x,y,newX,newY,exists); 
  this.radius = radius; 
}

EvilCircle.prototype = Object.create(Balls.prototype);
Object.defineProperty(EvilCircle.prototype, 'constructor',{
  value : EvilCircle,
});

EvilCircle.prototype.checkBounds = function() {
  if(this.x - this.radius <= 0) {
    this.x += 20;
  }
  if(this.x + this.radius >= width){
    this.x -= 20 ;
  }
  if(this.y + this.radius >= height){
    this.y -= 20;  
  }
  if(this.y - this.radius <= 0){
    this.y += 20; 
  }
}

EvilCircle.prototype.controls = function() {
  let _this = this;
  window.onkeydown = function(e) {
  switch(e.code){
  case 'KeyW':
   _this.y -= _this.newY;
    break;
  case 'KeyA':
    _this.x -= _this.newX;
    break;
  case 'KeyS':
    _this.y += _this.newY;
    break;
  case 'KeyD': 
    _this.x += _this.newY;
    break; 
    }
  }; 
}

EvilCircle.prototype.collisionDetect = function() {
  let dx = 0;
  let dy = 0;
  let distance = 0 ;
  for(let k = 0; k<=25; k++){
    if(balls[k].exists == true){  
      dx = this.x - balls[k].x; 
      dy = this.y - balls[k].y;
      distance = Math.sqrt(dx*dx + dy*dy);
      if(distance <= 20){
        balls[k].exists = false;
        score ++;
        if (score === 26) {
          window.alert('YOU WON!')
        }
      }
    }
  }
}

const balls = [];
for(let i = 0; i<=25; i++){
  let ball = new Balls(
    random(0,width),
    random(0,height),
    random(-5,5),
    random(-5,5),
    true,
    random(15,20),
    `rgba(${random(0,255)},${random(0,255)},${random(0,255)},0.7)`
   );  

balls.push(ball);
}

const evil = new EvilCircle(
  random(0,width),
  random(0,height),
  random(5,15),
  random(5,15),
  true,
  20,
);

evil.controls();

function loop (){
  ctx.clearRect(0,0,width,height);  
  for(let j = 0; j<=25; j++){ 
    if(balls[j].exists == true){   
      balls[j].draw();
      ctx.fill();
      balls[j].move();
      balls[j].collisionD();
    }
  }
  evil.draw();
  ctx.stroke();
  ctx.strokeStyle = 'red';
  ctx.lineWidth = 16;
  evil.checkBounds();
  evil.collisionDetect();

  ctx.font = '25px serif';
  ctx.fillText(`Ball count: ${score} `, 20 , 30);

  requestAnimationFrame(loop);
} 

loop();