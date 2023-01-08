class EnemyShoot {
    constructor(ctx) {
        this.ctx = ctx

        this.x = Math.random() * this.ctx.canvas.width
        this.y = 0
        this.w = 75
        this.h = 100
        this.vx = 0
        this.vy = 2
        this.ax = 0
        this.ay = 0
        this.bullets = []
        this.tick = 10 * 4

        this.img = new Image()
        this.img.src = '/images/ship7.png'
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
            this.tick = 100 + Math.random() * 100
            this.shootEnemy() 
            this.audioShoot.play()        
            //this.enemies.push(new Enemies(this.ctx))
                                    
        }

    }

    move() {          
        this.y += this.vy
        this.bullets.forEach(b => b.move())
    }   

    isVisible() {
        return this.x + this.w >= this.x <= this.ctx.canvas.width
    }
}