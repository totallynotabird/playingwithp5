let x = 0
let y = 0
let spacing = window.innerWidth/20

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    background(0);
    stroke(255)
}

function draw(){
    if (random(1) < 0.5){
        line(x,y,x + spacing,y + spacing)
    } else {
        line(x + spacing, y, x, y + spacing)
    }
    
    x = x + spacing

    if(x > width){
        x = 0
        y= y + spacing
    }

    if(y > height){
        y = 0
        stroke(colorPick())
    }
}

function colorPick(){
    let input = random(3)
    if (input < 1){
        return "red"
    } else if( input < 2){
        return "blue" 
    } else if(input < 3){
        return "green"
    }
}