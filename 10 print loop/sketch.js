let x 
let y 
let scale 
let direction

function setup() {
    createCanvas(window.innerWidth - 5, window.innerHeight - 5);
    background(0, 0);
    stroke(255)
    setScale();
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
    if (x <= -scale){
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
    if (y <= -scale){
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
    if(random(1)>0.7){return}
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
        y = Math.ceil((window.innerHeight/scale))*scale
        x = Math.ceil((window.innerWidth/scale))*scale
    } else {
        y = 0
        x = 0
    }
}

function setScale(){
    let urlTest = (window.location.href.match(/\?scale=(\d+)/))
    
    if (urlTest){
        scale = window.innerWidth/urlTest[1]
        return
    }

    if (window.innerWidth/35 > window.innerHeight/35){
        scale = window.innerWidth/35
    } else {
        scale = window.innerHeight/35
    }
}