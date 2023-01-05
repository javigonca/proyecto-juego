class EnemyEnd {
    constructor(ctx) {
        this.ctx = ctx

        this.x = 50
        this.y = 50
        this.w = 150
        this.h = 150
        this.vx = 2
        this.vy = 2
        this.ax = 0
        this.ay = 0
        this.bullets = []
        this.tick = 50 * 4

        this.img = new Image()
        this.img.src = '/images/enemigo final.jpg'
        this.audioShoot = new Audio("/sound/shootEnemy.mp3")
    }

    shootEnemy() {
        const x = this.x + this.w / 2.8
        const y = this.y + this.h / 3     
        const bullet = new BulletEnemy(this.ctx, x, y)
        this.bullets.push(bullet)
  
        
      }


    draw() {
        //this.ctx.fillStyle = 'orange'
        //this.ctx.fillRect(this.x, this.y, this.w, this.h)    
        this.ctx.strokeStyle = 'red'      
        //this.ctx.strokeRect(this.x, this.y, this.w, this.y)
        this.ctx.drawImage(
            this.img, 
            this.x,
            this.y,
            this.w,
            this.h
          )

          this.bullets.forEach(b => b.draw())
          this.tick--
          if (this.tick <= 0) {
            this.tick = 50 + Math.random() * 40
            this.shootEnemy() 
            this.audioShoot.play()        
            //this.enemies.push(new Enemies(this.ctx))
                                    
        }
          
        
          
    }

    move() {          
        
        this.x += this.vx
        this.y += this.vy


        if (this.x < 0) {
            this.x = 0
            this.vx = 2
          } else if (this.x + this.w >  this.ctx.canvas.width) {
            this.x = this.ctx.canvas.width - this.w
            this.vx = -2
          } else if (this.y < 0) {
            this.y = 0
            this.vy = 2
          } else if (this.y + this.h >  this.ctx.canvas.height) {
            this.y = this.ctx.canvas.height - this.h
            this.vy = -2
          }

        this.bullets.forEach(b => b.move())
    }  




    

   


}    