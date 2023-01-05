class Game {
    constructor(ctx) {
        this.ctx = ctx

        this.interval = null
        this.intervalTime = null
        this.bg = new Background(ctx)
        this.bgEnd = new BackgroundEnd(ctx)
        this.sh = new Shape(ctx)        
        this.enemies = []    
        this.enemyEnd = new EnemyEnd(ctx)   
        this.obstacles = new Obstacles(ctx)
         
        this.tick = 60 * 4
        this.tickEnemy = 3
        this.tickObstacle = 60 * 4
        this.points = 0        
        this.segundos = 0
        this.cont = 0
        
        
        this.audio = new Audio("/sound/sounGame CleytonRX - Battle RPG Theme.mp3")
        this.audioDearEnemy = new Audio("/sound/sound dear enemy.mp3")
        this.audioGameOver = new Audio ("/sound/game_over.mp3")
        this.audioYouWin = new Audio ("/sound/you_win.mp3")
        this.audioEnemyEnd = new Audio ("/sound/soundEnemyEnd.mp3")
        


    }

    start() {
        this.stop()
        this.audio.play()
        this.initListeners()
        

        this.interval = setInterval(() => {
            this.clear()
            this.draw()

                if (this.points < this.tickEnemy) {
                    this.checkCollisions()
                    this.checkEnemyDead()
                    this.addEnemies()
                    
                }            
                
                if (this.points === this.tickEnemy) {
                    this.checkCollisionsEnemyEnd()  
                    this.checkEnemyEndDead()  
                    this.checkShapeDead()    

                }
                 
            this.move()
                       
            

        }, 1000 / 60)


        this.intervalTime = setInterval(() => {
           this.actualizarTiempo()

         }, 1000 / 1)

         

    } 

    stop() {
        clearInterval(this.interval)
        clearInterval(this.intervalTime)

    }


    gameOver() {
        this.audio.pause()
        this.audioEnemyEnd.pause()
        this.audioGameOver.play()
        this.ctx.font = "40px Comic Sans MS";
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "red"
        this.ctx.fillText(
            "GAME OVER",
            this.ctx.canvas.width / 2,
            this.ctx.canvas.height / 2
         );
         this.ctx.fillStyle = "yellow"
         this.ctx.font = "30px Comic Sans MS"
         this.ctx.fillText(
            "Restart press R",
            this.ctx.canvas.width / 2,
            this.ctx.canvas.height / 1.5
         );
        this.stop()       
        
        
    }

    youWin() {
        this.audio.pause()
        this.audioDearEnemy.pause()
        this.audioEnemyEnd.pause()
        this.audioYouWin.play()
        this.ctx.font = "60px Comic Sans MS";
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "white";
        this.ctx.fillText(
            "YOU WIN",
            this.ctx.canvas.width / 2,
            this.ctx.canvas.height / 2
         );
         this.ctx.font = "40px Comic Sans MS";
         this.ctx.fillStyle = "yellow"
         this.ctx.fillText(
            "Restart press R",
            this.ctx.canvas.width / 2,
            this.ctx.canvas.height / 1.5
         ); 
        this.stop()


    }



    clear() {
        this.ctx.clearRect(
            0,
            0,
            this.ctx.canvas.width,
            this.ctx.canvas.height,
        )

    }

    draw() {
        this.bg.draw()
        this.sh.draw()
        if (this.segundos > 1) {
            this.obstacles.draw()
        }
        
        
        if (this.points < this.tickEnemy) {
            this.enemies.forEach(e => e.draw())
            
            
        }  
        
        if (this.points === this.tickEnemy) {
            this.audio.pause()
            this.audioEnemyEnd.play()
            this.bgEnd.draw()
            this.sh.draw()
            this.enemyEnd.draw()       
                            
                            
        }                            
        
        
    }

    move() {
        this.bg.move()
        this.bgEnd.move()
        this.sh.move()
        this.enemies.forEach(e => e.move())
        this.obstacles.move()
        if (this.points === this.tickEnemy) {
            this.enemyEnd.move()             
                      
        }
               

    }

    addEnemies() {
        this.tick--

        if (this.tick <= 0) {
            this.tick = 100 + Math.random() * 40
            this.enemies.push(new Enemies(this.ctx))
                        
            
        }
        
    }


    addObstacles() {
        this.tick--

        if (this.tick <= 0) {
            this.tick = 100 + Math.random() * 40
            this.obstacles.push(new Obstacles(this.ctx))
                        
            
        }
        
    }


    initListeners() {
        document.onkeydown = (e) => {
           this.sh.onKeyDown(e.keyCode) 
                   
        }
    
        document.onkeyup = (e) => {
            this.sh.onKeyUp(e.keyCode)
            
        }
    }

    checkCollisions(){
        const s = this.sh

        this.enemies.forEach(e => {
            const colY = (e.y + e.h) >= s.y && e.y <= (s.y + s.h)
            const colX = (s.x + s.w) >= e.x && (e.x + e.w) >= s.x

            if (colY && colX) {
                this.gameOver()
            }
        })
    }

   

    checkEnemyDead() {
        
        this.sh.bullets.forEach(bullet => {
            this.enemies.forEach(enemy => {
                const colX = bullet.x < enemy.x + enemy.w && bullet.x + bullet.w > enemy.x
                const colY = bullet.y < enemy.y + enemy.h && bullet.h + bullet.y > enemy.y 
                if ( colX && colY && !bullet.used) {
                    bullet.used = true                            
                    this.enemies.splice(enemy, 1)  
                    this.sh.bullets.splice(bullet, 1)                                                                  
                    this.audioDearEnemy.play()
                    this.points ++  
                    document.getElementById("points").innerHTML = this.points 
                                       

                           /* if(this.points === 2) {
                                this.youWin()

                            }*/
                    
                }
            })
        })
    }

    checkCollisionsEnemyEnd(){
        const s = this.sh
        const enemyEnd = this.enemyEnd
        
        const colY = (enemyEnd.y + enemyEnd.h) >= s.y && enemyEnd.y <= (s.y + s.h)
        const colX = (s.x + s.w) >= enemyEnd.x && (enemyEnd.x + enemyEnd.w) >= s.x

          if (colY && colX) {
            this.gameOver()
          }

        
    }

    checkEnemyEndDead() {
        this.sh.bullets.forEach(bullet => {
            const enemyEnd = this.enemyEnd
            const colX = bullet.x < enemyEnd.x + enemyEnd.w && bullet.x + bullet.w > enemyEnd.x
            const colY = bullet.y < enemyEnd.y + enemyEnd.h && bullet.h + bullet.y > enemyEnd.y 
                if ( colX && colY && !bullet.used) {                      
                    bullet.used = true
                    this.sh.bullets.splice(bullet, 1)
                    this.audioDearEnemy.play()                                       
                    this.cont++    
                    
                    if ( this.cont === 2) {
                        this.youWin() 
                    }            
                             

                }           

                
        })

        
    }

    checkShapeDead() {
        
        this.enemyEnd.bullets.forEach(bullet => {
          const sh = this.sh  
            
                const colX = bullet.x < sh.x + sh.w && bullet.x + bullet.w > sh.x
                const colY = bullet.y < sh.y + sh.h && bullet.h + bullet.y > sh.y 
                if ( colX && colY) {
                    this.gameOver()
                           
                    
                }
            
        })
    }


    actualizarTiempo() {
        document.getElementById("time").innerHTML = this.segundos
        this.segundos += 1
    }

    
}