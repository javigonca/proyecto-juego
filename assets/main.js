const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

const game = new Game(ctx)
const btn = document.getElementById("start-btn")
const audio = document.getElementById("audio")


btn.onclick = () => {
    const intro = document.getElementById("intro")
    intro.remove()
    canvas.style.display = "block"
    const score = document.getElementById("score")
    score.style.display = "flex"
    game.start()
}
