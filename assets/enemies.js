class Enemies {
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

        this.img = new Image()
        this.img.src = '/images/enemy2.png'
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
        this.y += this.vy
    }   

    isVisible() {
        return this.x + this.w >= this.x <= this.ctx.canvas.width
    }
}