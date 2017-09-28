var canvas;

let tileList =[]
let mineTiles = []
let scl
let rows = 20
let mineCount = rows*2

function setup() {
    canvas = createCanvas(800, 800);
    canvas.parent('container')
    background(255)
    createGrid()
    pickLocation(mineCount)

    noLoop()
}

function mousePressed(){
    if (mouseX > width || mouseX < 0 || mouseY > height || mouseY < 0) {return}
    let mousePos = {}
    mousePos.x = Math.floor(mouseX/scl)
    mousePos.y = Math.floor(mouseY/scl)
    console.log(`mouse grid pos: x : ${mousePos.x}, y : ${mousePos.y}`)
    for (var i = 0; i < mineTiles.length; i++) {
        var element = mineTiles[i];
        if(element.x == mousePos.x && element.y == mousePos.y){
            gameOver();
            return
        } 
    }
    let rev = mousePos.x + (mousePos.y * rows)
    flipTile(rev)
}

function createGrid() {
    stroke(0)
    scl = height / rows

    for (let i = 0; i < rows + 1; i++) {
        line(0, i * scl, width, i * scl)
        line(i * scl, 0, i * scl, height)        
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < rows; j++) {
            tileList.push({x:j,y:i,mine:false,flipped:false})
        }
    }
}

function pickLocation(mines){
    let coordinates
    for(let i = 0; i < mines; i++){
        let tile = Math.floor(random(tileList.length))
        tileList[tile].mine = true
        mineTiles.push(tileList[tile])
    }
    // showMines()
    for (var i = 0; i < tileList.length; i++) {
        checkNeighbors(tileList[i])
    }
}

function showMines(){
    noStroke()
    fill("red")
    for (var i = 0; i < mineTiles.length; i++) {
        var element = mineTiles[i];
        ellipse(element.x*scl + scl/2, element.y*scl + scl/2, 10)
    }
    
}

function checkNeighbors(input){
    let rev = input.x + (input.y * rows)
    let tile = tileList[rev]
    tile.neighbors = 0
    if (tile.x != 0){
        if (tileList[rev - 1].mine) {
            tile.neighbors++
        }
    }
    if (tile.x != 0 && tile.y != 0) {
        if (tileList[rev - (1 + rows)].mine) {
            tile.neighbors++
        }
    }
    if (tile.y != 0){
        if (tileList[rev - rows].mine){
            tile.neighbors++
        }
    }
    if (tile.x != rows-1 && tile.y != 0){
        if(tileList[(rev - rows) + 1].mine) {
            tile.neighbors++
        }
    }
    if (tile.x != rows-1){
        if (tileList[rev + 1].mine) {
            tile.neighbors++
        }
    }
    if (tile.x != rows-1 && tile.y != rows-1){
        if(tileList[(rev + rows) + 1].mine) {
            tile.neighbors++
        }
    }
    if (tile.y != rows-1){
        if (tileList[rev + rows].mine){
            tile.neighbors++
        }
    }
    if (tile.x != 0 && tile.y != rows-1){
        if(tileList[(rev + rows) - 1].mine) {
            tile.neighbors++
        }
    }
    tileList[rev].neighbors = tile.neighbors
}

function gameOver() {
    showMines();
    if(confirm("Game Over!\nRestart?")) {
        restart();
    } else {
        document.getElementById("restartbutton").hidden = false
    }
}
function restart() {
    document.getElementById("restartbutton").hidden = true
    clear();
    background(255);
    grid = [];
    createGrid();
    mineTiles = [];
    pickLocation(mineCount);
}

function flipTile(rev){
    if (tileList[rev].flipped){return}
    fill(0,0,0)
    textAlign(CENTER);
    text(tileList[rev].neighbors,tileList[rev].x*scl + scl/2, tileList[rev].y*scl + scl/1.75)
    tileList[rev].flipped = true
    if(tileList[rev].neighbors < 1){
        console.log("flood")
        if (tileList[rev].x != 0) {
            if (!tileList[rev - 1].flipped){
                flipTile(rev - 1)
            }
        }
        if (tileList[rev].x != rows) {
            if (!tileList[rev + 1].flipped){
                flipTile(rev + 1)
            }
        }
        if (tileList[rev].y != 0) {
            if (!tileList[rev - rows].flipped){
                flipTile(rev - rows)
            }
        }
        if (tileList[rev].y != rows) {
            if (!tileList[rev + rows].flipped){
                flipTile(rev + rows)
            }
        }
    }
}

