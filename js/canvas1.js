let canvas = document.getElementById('main');
    let width = canvas.width = innerWidth;
    let height = canvas.height = innerHeight- 48;
    let ctx = canvas.getContext('2d');
    let pixelRatio = (window.devicePixelRatio >1)? 2:1;
        
        let x = Math.random() * width;
        let y = Math.random() * height;
        let velX = 3;
        let velY = 3;
        let maxRadii = 1200;
        const COLORS = [
            {r:212, g:175, b:55},
            {r:255, g:215, b:0},
            {r:184, g:142, b:28},
            {r:255, g:255, b:255},
            {r:30,  g:30,  b:30},
            {r:101, g:83,  b:10}
        ];
window.addEventListener('resize',()=>{
                        canvas.height= innerHeight-48;
                        canvas.width = innerWidth;
                        });
        let colorC =0;
        function random(min, max) {
            const num = Math.floor(Math.random() * (max - min + 1)) + min;
            return num;
          } 
        function Circle(x,y,Velx,Vely,radius,rgb){
            this.X= x;
            this.Y= y;
            this.VelX = Velx;
            this.VelY = Vely;
            this.Radius= radius;
            this.RGB = rgb;
        }
        Circle.prototype.draw = function(){
            ctx.beginPath();
            
            const g = ctx.createRadialGradient(
                this.X,
                this.Y,
                this.Radius * 0.01,
                this.X,
                this.Y,
                this.Radius
            );
            let rgb = this.RGB;
            g.addColorStop(0.1,`rgba(${rgb.r},${rgb.g},${rgb.b},1)`);
            g.addColorStop(1,`rgba(${rgb.r},${rgb.g},${rgb.b},0)`);
            ctx.fillStyle = g;
            ctx.arc(this.X,this.Y,this.Radius,0,Math.PI * 2,false);
            ctx.fill();
        }
        Circle.prototype.Move = function(){
            if(this.X >= width || this.X <= 0 ){
                this.VelX = -this.VelX;
            } 
            if(this.Y >= height || this.Y  <= 0){
                this.VelY = -this.VelY;
            } 
            this.X += this.VelX;
            this.Y += this.VelY;   
        }
        let circles = [];
        for(let i=0;i<40;i++){
            let circOjb = new Circle(random(maxRadii,width-maxRadii),random(maxRadii,height-maxRadii),
            Math.floor(Math.random() * 5+1)-3,
            Math.floor(Math.random() * 5+1)-3,
            300,
            COLORS[colorC]);
            if(++colorC >= COLORS.length) colorC =0;
            circles.push(circOjb);
        }
        
        function animation(){
            requestAnimationFrame(animation);
            ctx.clearRect(0,0,width,height);
            circles.forEach(function(circObj){
                circObj.Move();
                circObj.draw();
            });
        }
        animation();
