const field_width = 600;

// Obtained from pumpkin.png
const DIR_DOWN  = 0;
const DIR_RIGHT = 1;
const DIR_LEFT  = 2;
const DIR_UP    = 3;

let pumpkin_list = [];
let counter = 0;

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

    counter = 0;
}

function generate_pumpkin_list() {
    // ok, so here is the catch:
    // using new Array(len) will actually cause the length
    // to be set properly!
    for (let i = 0; i < pumpkin_list.length; ++i)
        pumpkin_list[i] = floor(random(4));
}

function draw() {
    // ***** Paint background *****
    background(255);

    // ***** Viewport Black-Magic *****
    scale();
    scale(width / field_width);

    current_scene();
}

function title_scene() {
    let acc = field_width - 100;
    for (let i = pumpkin_list.length - 1; i >= 0; --i) {
        // predecrement since lowest row is reserved for
        // LEFT, DOWN, UP, RIGHT buttons
        if ((acc -= 100) < 0)
            break; // out of screen, pointless to draw

        let row = pumpkin_list[i];

        let placement = 0;
        switch (row) {
            case DIR_LEFT:
                placement = 100;
                break;
            case DIR_DOWN:
                placement = 200;
                break;
            case DIR_UP:
                placement = 300;
                break;
            case DIR_RIGHT:
                placement = 400;
                break;
        }

        // + 1 on sprite starting y cuz some have bad cutoffs
        image(sprPumpkin, placement, acc, 100, 100, counter / 4 * 32, row * 32 + 1, 32, 32);
    }

    // animation black magic
    if (++counter % 12 == 0)
        counter = 0;
}

function keyPressed() {
}
