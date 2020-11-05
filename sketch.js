const field_width = 600;

let pumpkin_list = [];

let sprPumpkin;

// The draw function (aka our game loop) just needs to do current_scene() to
// perform the update the correct scene. The setup function will point this to
// the right starting place!
let current_scene = function () { /* do nothing */ };

function preload() {
    sprPumpkin = loadImage('pumpkin.png');
}

function setup() {
    // Setup the canvas
    let canvw = min(windowWidth, windowHeight);
    createCanvas(canvw, canvw);

    frameRate(30);

    my_setup();
}

function windowResized() {
    let canvw = min(windowWidth, windowHeight);
    createCanvas(canvw, canvw);
}

// Because the p5 folks said I should not call setup after the game starts...
function my_setup() {
    current_scene = title_scene;

    // Probably a good amount
    pumpkin_list = new Array(64);
    generate_pumpkin_list();
}

function generate_pumpkin_list() {
    // ok, so here is the catch:
    // using new Array(len) will actually cause the length
    // to be set properly!
    for (let i = 0; i < pumpkin_list.length; ++i)
        pumpkin_list[i] = floor(random(3));
}

function draw() {
    // ***** Paint background *****
    background(100);

    // ***** Viewport Black-Magic *****
    scale();
    scale(width / field_width);

    current_scene();
}

function title_scene() {
    //
}

function keyPressed() {
}
