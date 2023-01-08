class Game {
    constructor(ctx) {
        this.ctx = ctx

        this.interval = null
        this.intervalTime = null
        this.bg = new Background(ctx)
        this.bgEnd = new BackgroundEnd(ctx)
        this.bgUpLevel = new BackgroundUpLevel(ctx)
        this.sh = new Shape(ctx)        
        this.enemies = []    
        this.enemyEnd = new EnemyEnd(ctx)  
        this.enemyShoot = [] 
        //this.enemyShootCheck = new EnemyShoot(ctx)
        this.obstacles = new Obstacles(ctx)
        this.obstacleTwo = new ObstacleTwo(ctx)
        
        this.tick = 60 * 4
        this.tickEnemy = 3
        this.tickObstacle = 60 * 4
        this.points = 0        
        this.segundos = 0
        this.cont = 0
        this.lifeGame = 3
        
        
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
           // this.clear()
           // this.draw()

                if (this.segundos < 11) {
                    this.clear()
                    this.draw()
                    this.move()
                    this.checkCollisions()
                    this.checkEnemyDead()
                    this.addEnemies()                                          
                }       
                
                if (this.segundos > 10 && this.segundos < 21) {  
                    this.clear()
                    this.draw()
                    this.move()                 
                    this.addEnemyShoot()
                    this.checkCollisionsEnemyShoot()
                    this.checkEnemyShootDead()
                    this.checkLevel2()
                }            
                
                if (this.segundos > 20) {
                    this.clear()
                    this.draw()
                    this.move()
                    this.checkCollisionsEnemyEnd()  
                    this.checkEnemyEndDead()  
                    this.checkShapeDead()    
                }
          //  this.move()
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
            this.sh.explode()    
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

    life () {
        this.lifeGame --
        if (this.lifeGame === 0) {
            this.gameOver()
        }
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

        if (this.segundos < 11) {
            this.bg.draw()

            if(this.segundos < 2) {
                this.ctx.font = "60px Comic Sans MS";
                this.ctx.textAlign = "center";
                this.ctx.fillStyle = "white";
                this.ctx.fillText(
                    "LEVEL 1",
                    this.ctx.canvas.width / 2,
                    this.ctx.canvas.height / 2
                );

            }
                        
            this.sh.draw()
            this.enemies.forEach(e => e.draw())                    
        }  
        
        
        if (this.segundos > 10 && this.segundos < 21) {
            this.bgUpLevel.draw()

            if(this.segundos > 10 && this.segundos < 13) {
                this.ctx.font = "60px Comic Sans MS";
                this.ctx.textAlign = "center";
                this.ctx.fillStyle = "white";
                this.ctx.fillText(
                    "LEVEL 2",
                    this.ctx.canvas.width / 2,
                    this.ctx.canvas.height / 2
                );

            }
            this.sh.draw()
            this.obstacles.draw()
            this.obstacleTwo.draw()
            this.enemyShoot.forEach(e => e.draw())
        }        
        
        
        if (this.segundos > 20) {
            this.audio.pause()
            this.audioEnemyEnd.play()
            this.bgEnd.draw()

            if(this.segundos > 20 && this.segundos < 23) {
                this.ctx.font = "60px Comic Sans MS";
                this.ctx.textAlign = "center";
                this.ctx.fillStyle = "white";
                this.ctx.fillText(
                    "LEVEL 3",
                    this.ctx.canvas.width / 2,
                    this.ctx.canvas.height / 2
                );
            }

            this.sh.draw()
            this.enemyEnd.draw()                                                      
        }                                         
    }

    move() {
        this.bg.move()
        this.bgEnd.move()
        this.bgUpLevel.move()
        this.sh.move()
        this.enemies.forEach(e => e.move())
        this.obstacles.move()
        this.obstacleTwo.move()
        this.enemyShoot.forEach(e => e.move())        
        this.enemyEnd.move()                   
    }

    addEnemies() {
        this.tick--

        if (this.tick <= 0) {
            this.tick = 100 + Math.random() * 40
            this.enemies.push(new Enemies(this.ctx))                                    
        }        
    }


    addEnemyShoot() {
        this.tick--
        if (this.tick <= 0) {
            this.tick = 100 + Math.random() * 40
            this.enemyShoot.push(new EnemyShoot(this.ctx))                                   
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

    checkCollisionsEnemyShoot(){
        const s = this.sh

        this.enemyShoot.forEach(e => {
            const colY = (e.y + e.h) >= s.y && e.y <= (s.y + s.h)
            const colX = (s.x + s.w) >= e.x && (e.x + e.w) >= s.x
            if (colY && colX) {                  
                this.gameOver()                    
            }
        })
    }

    checkEnemyShootDead() {
        
        this.sh.bullets.forEach(bullet => {
            this.enemyShoot.forEach(enemy => {
                const colX = bullet.x < enemy.x + enemy.w && bullet.x + bullet.w > enemy.x
                const colY = bullet.y < enemy.y + enemy.h && bullet.h + bullet.y > enemy.y 
                if ( colX && colY && !bullet.used) {
                    bullet.used = true                        
                    this.enemyShoot = this.enemyShoot.filter(e => e !== enemy)
                    this.sh.bullets = this.sh.bullets.filter(e => e !== bullet)                                                                 
                    this.audioDearEnemy.play()
                    this.points ++  
                    document.getElementById("points").innerText = this.points                       
                }
            })
        })
    }

   checkLevel2() {
    for (let enemy of this.enemyShoot) {
        //const hit = enemy.bullets.some(bullet => this.sh.collide(bullet))    
        for (let bullet of enemy.bullets) {
            if (this.sh.collide(bullet)) {
                this.gameOver()
            }
        }
    }
    
   }

    checkEnemyDead() {        
        this.sh.bullets.forEach(bullet => {
            this.enemies.forEach(enemy => {
                const colX = bullet.x < enemy.x + enemy.w && bullet.x + bullet.w > enemy.x
                const colY = bullet.y < enemy.y + enemy.h && bullet.h + bullet.y > enemy.y 
                if ( colX && colY && !bullet.used) {
                    bullet.used = true                        
                    this.enemies = this.enemies.filter(e => e !== enemy)
                    this.sh.bullets = this.sh.bullets.filter(e => e !== bullet)                                                                 
                    this.audioDearEnemy.play()
                    this.points ++  
                    document.getElementById("points").innerHTML = this.points                                   
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
                    this.sh.bullets = this.sh.bullets.filter(e => e !== bullet)
                    this.audioDearEnemy.play()                                       
                    this.cont++    
                    
                    if ( this.cont === 3) {
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