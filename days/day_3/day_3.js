let INPUT_FIELD = document.getElementById("input_field");
INPUT_FIELD.value = test_input;
let DATA = document.getElementById("input_field").value.split('\n');
const TOTAL_LENGTH = DATA.length * DATA[0].length;
let ANIMATION_SPEED = 1 * 1000; // 1 second per frame
let ROWS;
let COLS;
let GRID_WIDTH;
let GRID_HEIGHT;
let OFFSET_Y;
let OFFSET_X;
let SIDE_SIZE;
let progress_slider;
let p_button;
let r_button;
let sf_button;
let sb_button;
let grid = [];
let prev_step;
let current_step;
let is_paused = false;
let frames = []; // animation frames

// For the actual problem
let valid_parts = [];
let partBuilder = '';
let isValid = false;

function setup() {
    // Set up the p5 elements
    var canvas = createCanvas(600, 400);
    canvas.parent("canvas");
    let p = createP('Slide the bar below to see the algorithm work');
    p.parent("canvas");

    
    progress_slider = createSlider(0, TOTAL_LENGTH-1, 0);
    progress_slider.parent("canvas");
    progress_slider.size(width);
    progress_slider.input(check_slider);
    createElement('br').parent('canvas');

    p_button = createButton('Pause');
    p_button.mouseClicked(pause_animation);
    p_button.parent("canvas");

    sb_button = createButton('Step Backward');
    sb_button.mouseClicked(() => progress_slider.value(progress_slider.value() - 1));
    sb_button.parent("canvas");

    sf_button = createButton('Step Forward');
    sf_button.mouseClicked(() => progress_slider.value(progress_slider.value() + 1));
    sf_button.parent("canvas");


    r_button = createButton('Reset');
    r_button.mouseClicked(reset);
    r_button.parent("canvas");


    // Set up our variables
    ROWS = DATA.length;
    COLS = DATA[0].length; // Assuming a rectangular input
    GRID_HEIGHT = 0.75 * height; // 75% of the height
    GRID_WIDTH = GRID_HEIGHT;
    SIDE_SIZE = GRID_WIDTH / ROWS;
    OFFSET_Y = height * 0.125;
    OFFSET_Y = height * 0.125;
    OFFSET_X = width * 0.35;
    prev_step = -1;
    current_step = 0;

    // Initialize the grid
    grid = init_grid();

    // Precompute the problem here, and cache it as animation frames
    for (let step=0;step<TOTAL_LENGTH;step++){
        let frameBuilder = new Frame(step);
        let coordinates = idx_to_coord(step);
        let neighbors = get_neighbors(coordinates);
        let current_value = grid[coordinates[0]][coordinates[1]].value;

        frameBuilder.coordinates = coordinates;

        if (!isNaN(current_value)) { // it's a number
            partBuilder += current_value;
            // Do any of the neighbors have a symbol?
            isValid |= neighbors.some((n) => {
                let value = grid[n[0]][n[1]].value;
                return (isNaN(parseInt(value)) && value != '.');
            });
            frameBuilder.partBuilderText = partBuilder;
            frameBuilder.isValid = isValid;
        }
        else { // Not a number
            if (partBuilder != '') {
                // finalize this part
                if (isValid) {
                    console.log(partBuilder);
                    valid_parts.push(partBuilder);
                }
                partBuilder = ''; // reset the builder
                isValid = false; // reset the validation check
                frameBuilder.partBuilderText = partBuilder;
                frameBuilder.isValid = isValid;
            }
            frameBuilder.partBuilderText = partBuilder
        }
        frames.push(frameBuilder);
    }
    let sum = valid_parts.reduce(
        (accumulator, currentValue) => accumulator + parseInt(currentValue),
    0);
    console.log(sum) // 4361 too low
    pause_animation();

}

function draw() {
    // only update the animation every 10 frames.
    // At the default of 60fps, this is ~6 steps per second
    if (!is_paused && frameCount % 10 != 0) {
        return;
    }
    background("#0dcaf0");

    // Increment the step counter - this should update the simulation
    if (!is_paused) {
        progress_slider.value(progress_slider.value() + 1);
    }
    current_step = progress_slider.value();
    let current_coord = idx_to_coord(current_step);
    let neighbors = get_neighbors(current_coord);
    if (current_step == (TOTAL_LENGTH)) {
        console.log(valid_parts);
        reset();
        return;
    }

    frames[current_step].render_text();
    // Change color of current cell to green
    grid[current_coord[0]][current_coord[1]].color = color('green');
    // Change color of neighbors to yellow
    for (let n of neighbors) {
        grid[n[0]][n[1]].color = color('yellow');
    }


    for (let r of grid) {
        for (let c of r) {
            c.draw();
        }
    }
    prev_step = current_step;
}

function solve_1(step) {

}

// returns a list of coordinates of valid neighbors
function get_neighbors(coord) {
    let y = coord[0];
    let x = coord[1];
    let i = [-1, 0, 1];
    let j = [-1, 0, 1];
    let valid_neighbors = [];
    for (let ix of i) {
        new_y = y + ix;
        if (new_y < 0 || new_y >= ROWS) continue;
        for (let jx of j) {
            new_x = x + jx;
            if (jx == 0 && ix == 0) continue; // skip itself
            if (new_x < 0 || new_x >= COLS) continue;
            valid_neighbors.push([new_y, new_x]);
        }
    }
    return valid_neighbors;
}

function init_grid() {
    let idx = 0;
    let grid = [];
    for (let y = 0; y < DATA.length; y++) {
        let grid_row = [];
        for (let x = 0; x < DATA[y].length; x++) {
            let c = new Cell(idx++, x * (GRID_WIDTH / COLS) + OFFSET_X, y * (GRID_HEIGHT / ROWS) + OFFSET_Y, DATA[y][x]);
            grid_row.push(c);
        }
        grid.push(grid_row);
    }
    return grid;
}

function coord_to_idx(x, y) {
    return (x * y) + x;
}

function idx_to_coord(idx) {
    let y = floor(idx / ROWS);
    let x = idx % COLS;
    return [y, x];
}

function pause_animation() {
    if (!is_paused) {
        p_button.html("Unpause");
        is_paused = true;
    }
    else {
        is_paused = false;
        p_button.html("Pause");
    }
}

function check_slider() {
    // prevent it from going backwards
    // if (progress_slider.value() < current_step) progress_slider.value(current_step);
}

function reset() {
    progress_slider.value(0);
    current_step = 0;
    prev_step = -1;
    partBuilder = '';
    valid_parts = [];
    isValid = false;
}