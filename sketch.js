const field_width = 600;

// Obtained from pumpkin.png
const DIR_DOWN  = 0;
const DIR_RIGHT = 1;
const DIR_LEFT  = 2;
const DIR_UP    = 3;

let pumpkin_list = [];
let counter = 0;

let sprPumpkin;
let sprArrowDown;
let sprArrowLeft;
let sprArrowRight;
let sprArrowUp;

// The draw function (aka our game loop) just needs to do current_scene() to
// perform the update the correct scene. The setup function will point this to
// the right starting place!
let current_scene = function () { /* do nothing */ };

function preload() {
    sprPumpkin    = loadImage('pumpkin.png');
    sprArrowDown  = loadImage('arrowDown.png');
    sprArrowLeft  = loadImage('arrowLeft.png');
    sprArrowRight = loadImage('arrowRight.png');
    sprArrowUp    = loadImage('arrowUp.png');
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
    // Probably a good amount
    pumpkin_list = new Array(64);
    generate_pumpkin_list();

    counter = 0;

    // Switch scene last!
    current_scene = title_scene;
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
    // Draw them pumpkins
    let acc = field_width;
    for (let i = pumpkin_list.length - 1; i >= 0; --i) {
        if ((acc -= 100) <= 0)
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
        image(sprPumpkin, placement, acc - 100, 100, 100, floor(counter / 4) * 32, row * 32 + 1, 32, 32);
    }

    // Draw the arrow keys
    image(sprArrowLeft, 100, field_width - 100, 100, 100);
    image(sprArrowDown, 200, field_width - 100, 100, 100);
    image(sprArrowUp, 300, field_width - 100, 100, 100);
    image(sprArrowRight, 400, field_width - 100, 100, 100);

    // animation black magic
    if (++counter % 12 == 0)
        counter = 0;
}

function keyPressed() {
    // supports wasd, vim's hjkl and standard arrow keys
    if (current_scene === current_scene) {
        let matchingDir = -1;
        switch (keyCode) {
        case 72: // h
        case 65: // a
        case LEFT_ARROW:
            matchingDir = DIR_LEFT;
            break;
        case 74: // j
        case 83: // s
        case DOWN_ARROW:
            matchingDir = DIR_DOWN;
            break;
        case 75: // k
        case 87: // w
        case UP_ARROW:
            matchingDir = DIR_UP;
            break;
        case 76: // l
        case 68: // d
        case RIGHT_ARROW:
            matchingDir = DIR_RIGHT;
            break;
        }

        if (matchingDir !== -1 && pumpkin_list.length > 0)
            if (pumpkin_list[pumpkin_list.length - 1] === matchingDir)
                pumpkin_list.pop();
    }

    return false;
}

