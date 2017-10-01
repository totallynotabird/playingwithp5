var canvas;
var flags = 0;
var correctFlags = 0;
var gameOverState = false

let tileList = []
let mineTiles = []
let graceClick = true
let scl
let rows = 20
let mineCount = 0.2 * rows * rows



function setup() {
    canvas = createCanvas(800, 800);
    canvas.parent('container')
    background(255)
    createGrid()
    pickLocation(mineCount)

    noLoop()
}

function mousePressed(){
    if(gameOverState){return}
    if (mouseX > width || mouseX < 0 || mouseY > height || mouseY < 0) {return}
    let mousePos = {}
    mousePos.x = Math.floor(mouseX/scl)
    mousePos.y = Math.floor(mouseY/scl)
    let rev = mousePos.x + (mousePos.y * rows)
    console.log(`mouse grid pos: x : ${mousePos.x}, y : ${mousePos.y}`)
    for (var i = 0; i < mineTiles.length; i++) {
        var element = mineTiles[i];
        if(element.x == mousePos.x && element.y == mousePos.y){
            if(graceClick){
                removeMine(i, rev)
                graceClick = false
                for (var i = 0; i < tileList.length; i++) {
                    checkNeighbors(tileList[i])
                }
            } else {
            gameOver();
            return
            }
        } 
    }
    if (graceClick){
        graceClick = false
        for (var i = 0; i < tileList.length; i++) {
            checkNeighbors(tileList[i])
        }
    }
    flipTile(rev)
}

function keyPressed(){
    if(gameOverState){return}
    if(keyCode === 32){
        toggleFlag(mouseX, mouseY)
    }

    return false
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
            tileList.push({x:j,y:i,mine:false,flipped:false,flagged:false,rev:j + i * rows})
        }
    }
}

function findTile(x, y) {
    x = Math.floor(x/scl)
    y = Math.floor(y/scl)
    return tileList[x + (y * rows)]
}

function pickLocation(mines){
    for(let i = 0; i < mines; i++){
        let tile = Math.floor(random(tileList.length))
        if(!tileList[tile].mine) {
            tileList[tile].mine = true
            mineTiles.push(tileList[tile])
        }        
    }
    // showMines()
    if(mineTiles.length != mineCount){
        pickLocation(mineCount-mineTiles.length)
    }
}

function showMines(){
    noStroke()
    fill("red")
    for (var i = 0; i < mineTiles.length; i++) {
        var element = mineTiles[i];
        ellipse(element.x*scl + scl/2, element.y*scl + scl/2, 10)
    }
    stroke(0)
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
    gameOverState = true
    showMines();
    if(confirm("Game Over!\nRestart?")) {
        restart();
    } else {
        document.getElementById("restartbutton").hidden = false
    }
}

function winner(){
    gameOverState = true
    if(confirm("You win!\nRestart?")) {
        restart()
    } else {
        document.getElementById("restartbutton").hidden = false
    }
}

function restart() {
    flags = 0
    correctFlags = 0
    graceClick = true
    document.getElementById("restartbutton").hidden = true
    clear();
    background(255);
    tileList = [];
    createGrid();
    mineTiles = [];
    pickLocation(mineCount);
    gameOverState = false
}

function flipTile(rev){
    if (tileList[rev].flipped){return}
    fill(200,200,200)
    rect(tileList[rev].x*scl,tileList[rev].y*scl,scl,scl)
    fill(0,0,0)
    textAlign(CENTER);
    text(tileList[rev].neighbors,tileList[rev].x*scl + scl/2, tileList[rev].y*scl + scl/1.75)
    if(tileList[rev].flipped){return}
    tileList[rev].flipped = true

    //floodfill
    if(tileList[rev].neighbors < 1){
        console.log("flood")
        if (tileList[rev].x != 0) {
            if (!tileList[rev - 1].flipped){
                flipTile(rev - 1)
            }
            if (tileList[rev].y != 0) {
                if (!tileList[rev - (rows + 1)].flipped){
                    flipTile(rev - (rows + 1))
                }
            }
            if (tileList[rev].y != rows - 1) {
                if (!tileList[rev + (rows - 1)].flipped){
                    flipTile(rev + (rows - 1))
                }
            }
        }
        if (tileList[rev].x != rows - 1) {
            if (!tileList[rev + 1].flipped){
                flipTile(rev + 1)
            }
            if (tileList[rev].y != 0) {
                if (!tileList[rev - (rows - 1)].flipped){
                    flipTile(rev - (rows - 1))
                }
            }
            if (tileList[rev].y != rows - 1) {
                if (!tileList[rev + (rows + 1)].flipped){
                    flipTile(rev + (rows + 1))
                }
            }
        }
        if (tileList[rev].y != 0) {
            if (!tileList[rev - rows].flipped){
                flipTile(rev - rows)
            }
        }
        if (tileList[rev].y != rows - 1) {
            if (!tileList[rev + rows].flipped){
                flipTile(rev + rows)
            }
        }
    }
}

function toggleFlag(x, y){
    if (mouseX > width || mouseX < 0 || mouseY > height || mouseY < 0) {return}
    let tileData = findTile(x,y)
    let tileRev = tileData.x + (tileData.y * rows)

    if(tileList[tileRev].flipped){return}
    if (tileList[tileRev].flagged) {
        tileList[tileRev].flagged = false
        removeFlag(tileData.x , tileData.y)
        flags--
        if(tileData.mine){
            correctFlags--
        }
    } else {        
        tileList[tileRev].flagged = true
        drawFlag(tileData.x , tileData.y)
        flags++
        if(tileData.mine){
            correctFlags++
            if (correctFlags === mineTiles.length && correctFlags === flags){
                winner()
            }
        }
    }

}

function drawFlag(x, y){
    fill("red")
    rect(x * scl, y * scl, scl, scl)
}

function removeFlag(x,y) {
    fill(255)
    rect(x * scl, y * scl, scl, scl)
}

function removeMine(mineTilesEntry,rev){
    mineTiles.splice(mineTilesEntry, 1)
    tileList[rev].mine = false
}

