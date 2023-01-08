class ObstacleTwo {
    constructor(ctx) {
        this.ctx = ctx

        this.x = Math.random() * this.ctx.canvas.width
        this.y = Math.random() * this.ctx.canvas.height
        this.w = 75
        this.h = 70
        this.vx = 2
        this.vy = 1
        this.ax = 0
        this.ay = 0.2

        this.img = new Image()
        this.img.src = '/images/asteroideTwo.png'
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
            this.vy = 1
          } else if (this.y + this.h >  this.ctx.canvas.height) {
            this.y = this.ctx.canvas.height - this.h
            this.vy = -1
          }
    }   

    isVisible() {
        return this.x + this.w >= this.x <= this.ctx.canvas.width
    }
}