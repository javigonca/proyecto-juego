class BulletEnemy {
    constructor(ctx, x, y) {
        this.ctx = ctx

        this.x = x
        this.y = y
        this.w = 25
        this.h = 50
        this.vx = 0
        this.vy = +10
        this.ax = 0
        this.ay = 0

        this.img = new Image()
        this.img.src = '/images/bullet  02.png'
    }

    draw() {
        //this.ctx.fillStyle = 'orange'
        //this.ctx.fillRect(this.x, this.y, this.w, this.h)  
        this.ctx.drawImage(
          this.img, 
          this.x,
          this.y,
          this.w,
          this.h
        )   

      }
    
      move() {
        
        this.vx += this.ax
        this.vy += this.ay
        this.x += this.vx
        this.y += this.vy        
    
        
      }

}