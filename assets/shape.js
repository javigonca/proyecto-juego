class Shape {
    constructor(ctx) {
        this.ctx = ctx

        this.x = 400
        this.y = 600
        this.w = 120
        this.h = 75
        this.vx = 0
        this.vy = 0
        this.ax = 0
        this.ay = 0
        this.tick = 0
        this.tickAnimate = 0
        
        
        this.img = new Image()
        this.img.src = '/images/shape sprite.png'
        this.img.frames = 5
        this.img.framesIndex = 2
        this.bullets = []
        this.audio = new Audio("/sound/sound shoot.mp3")


    }

    shoot() {
      const x = this.x + this.w / 3
      const y = this.y      
      const bullet = new Bullet(this.ctx, x, y)
      this.bullets.push(bullet)

      
    }

    explode() {
      this.img.src  = "/images/explosion1.png"
      this.img.onload = () => {
        this.ctx.drawImage(
          this.img, 
          this.img.framesIndex * this.img.width / this.img.frames,
          0,
          this.img.width / this.img.frames,
          this.img.height,
          this.x,
          this.y,
          this.w,
          this.h
        )        
           
      }  
      
      //this.animate()
        
    }

    animate() {
      this.tickAnimate++
  
      if (this.tickAnimate > 5) {
        this.tickAnimate = 0
        this.img.frameIndex++
  
        if (this.img.frameIndex > this.img.frames - 1) {
          this.img.frameIndex = 0
        }  
      }
    }


    draw() {
      // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        /*this.ctx.strokeStyle = 'red'      
        this.ctx.strokeRect(this.x, this.y, this.w, this.y)*/
        this.ctx.drawImage(
          this.img, 
          this.img.framesIndex * this.img.width / this.img.frames,
          0,
          this.img.width / this.img.frames,
          this.img.height,
          this.x,
          this.y,
          this.w,
          this.h
        )

          
        this.bullets.forEach(b => b.draw())



      }
      

      

      

    move() {
        this.x += this.vx
        this.y += this.vy

        if (this.x < 0) {
          this.x = 0
          this.vx = 0
        } else if (this.x + this.w >  this.ctx.canvas.width) {
          this.x = this.ctx.canvas.width - this.w
          this.vx = 0
        } else if (this.y < 0) {
          this.y = 0
          this.vy = 0
        } else if (this.y + this.h >  this.ctx.canvas.height) {
          this.y = this.ctx.canvas.height - this.h
          this.vy = 0
        }

        this.bullets.forEach(b => b.move())

        

    }

    onKeyDown(key) {
        switch(key) {
          case RIGHT:            
            this.img.frames = 5
            this.img.framesIndex = 4            
            this.vx = 5            
            break;
          case LEFT:
            this.img.frames = 5
            this.img.framesIndex = 0  
            this.vx = -5
            break;
          case UP:
            this.vy = -5
            break;
          case DOWN:
            this.vy = 5
            break;
          case SPACE:
            this.shoot()
            this.audio.play()
            break; 
          case r:
            location.reload()
            break;   
          case e:
            this.stop()
            break;   
          
        }
        return key;
    }   

   onKeyUp(key) {
      switch(key) {
         case RIGHT:
         case LEFT:
         case UP:
         case DOWN:     
          this.img.frames = 5
          this.img.framesIndex = 2       
          this.vx = 0
          this.vy = 0
         break;
       } 
   }   

   //{} []

   collide(el) {
    const collideX = el.x + el.w > this.x && el.x < this.x + this.w 
    const collideY = el.y < this.y + this.h && el.y + el.h > this.y 
    return collideX && collideY
   }
}