function drawBalls(){  
        const canvas = document.querySelector('canvas');
        const width = canvas.width = window.innerWidth;    
        const height = canvas.height = window.innerHeight;    //double check why is not working when i define it inside the <canvas> 
        let ctx = canvas.getContext('2d');

        for(let i=0; i<=15; i++){
          let x = Math.floor(Math.random() * width);
          let y = Math.floor(Math.random() * height); 
          let radius = 15;
          let startAngle = 0;
          let endAngle = ((Math.PI)/180)*360;
          
          ctx.beginPath();
          ctx.arc(x, y, radius, startAngle, endAngle);
          ctx.fillStyle = 'purple';
          ctx.fill();  
        }
       }

       function animationLoop() {
        drawBalls()   
        requestAnimationFrame(animationLoop);
       }

       animationLoop();


