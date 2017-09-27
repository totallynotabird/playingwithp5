let x = 0
let y = window.innerHeight
let scale = 75
let direction

function setup() {
    createCanvas(window.innerWidth - 5, window.innerHeight - 5);
    background(0);
    stroke(255)
    pickColor();
    pickDirection();
}

function draw(){
    if (direction == "up"){
        moveUp()
    } else if ( direction == "down"){
        moveDown()
    } else if (direction == "left"){
        moveLeft()
    } else {
        moveRight()
    }
}

function pickColor(){
    let colors = ["red", "green", "blue", "magenta", "yellow", "cyan"]
    return random(colors)
}


function moveDown() {
    drawLine()
    x += scale
    if (x >= window.innerWidth){
        y += scale
        x = 0
        if (y >= window.innerHeight){
            stroke(pickColor())
            pickDirection()
        }
    }
}

function moveUp(){
    drawLine()
    x -= scale
    if (x <= 0){
        y -= scale
        x = window.innerWidth
        if (y <= -scale){
            stroke(pickColor())
            pickDirection()
        }
    }
}

function moveLeft(){
    drawLine()
    y -= scale
    if (y <= 0){
        x -= scale
        y = window.innerHeight
        if (x <= - scale){
            stroke(pickColor())
            pickDirection()
        }
    }
}

function moveRight(){
    drawLine()
    y += scale
    if (y >= window.innerHeight){
        x += scale
        y = 0
        if (x >= window.innerWidth){
            stroke(pickColor())
            pickDirection()
        }
    }
}

function drawLine() {
    if(random(1)<0.5) {
        line(x, y, x + scale, y + scale);
    } else {
        line(x + scale, y, x, y + scale);
    }
}

function pickDirection(){
    let directions = ["up", "down", "left", "right"]
    direction =  random(directions)
    console.log(direction)
    if (direction == "up"||direction == "left"){
        y = Math.ceil((scale/window.innerHeight))*window.innerHeight
        x = Math.ceil((scale/window.innerWidth))*window.innerWidth
    } else {
        y = 0
        x = 0
    }
}