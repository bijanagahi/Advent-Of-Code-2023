let INPUT_FIELD = document.getElementById("input_field");
INPUT_FIELD.value = test_input;
let DATA = document.getElementById("input_field").value.split('\n')
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
let s_button;
let grid = [];
let prev_step;
let current_step;
let is_paused = false;

// For the actual problem
let valid_parts = [];
let part_builder = '';
let is_valid = false;

function setup() {
    // Set up the p5 elements
    var canvas = createCanvas(600, 400);
    canvas.parent("canvas");
    let p = createP('Slide the bar below to see the algorithm work');
    p.parent("canvas")
    
    progress_slider = createSlider(0,DATA.length * DATA[0].length,0);
    progress_slider.parent("canvas")
    progress_slider.size(width);
    progress_slider.input(check_slider)

    p_button = createButton('Pause');
    p_button.mouseClicked(pause_animation);
    p_button.parent("canvas");

    s_button = createButton('Step');
    s_button.mouseClicked(() => progress_slider.value(progress_slider.value()+1));
    s_button.parent("canvas")

    r_button = createButton('Reset');
    r_button.mouseClicked(reset);
    r_button.parent("canvas")
   

    // Set up our variables
    ROWS = DATA.length;
    COLS = DATA[0].length; // Assuming a rectangular input
    GRID_HEIGHT = 0.75 * height // 75% of the height
    GRID_WIDTH = GRID_HEIGHT;
    SIDE_SIZE = GRID_WIDTH/ROWS;
    OFFSET_Y = height * 0.125
    OFFSET_Y = height * 0.125
    OFFSET_X = width * 0.35
    prev_step = -1;
    current_step = 0;

    // Initialize the grid
    grid = init_grid();

    // frameRate(10);
}
  
function draw() {
    // only update the animation every 10 frames.
    // At the default of 60fps, this is ~6 steps per second
    if(!is_paused && frameCount%10 !=0){
        return
    }
    background("#0dcaf0")
    
    // Increment the step counter - this should update the simulation
    if (!is_paused) {
        progress_slider.value(progress_slider.value()+1)
    }
    current_step = progress_slider.value();
    let current_coord = idx_to_coord(current_step);
    let neighbors = get_neighbors(current_coord);
    if(current_step != prev_step){
        if(current_step==(DATA.length * DATA[0].length)){
            console.log(valid_parts)
            reset();
            return
        }
        let current_value = grid[current_coord[0]][current_coord[1]].value
        // Let's get all the neighbors
        
        // Now let's focus on the current cell.
        // If it's a number, we should append it to our parts builder.
        // If it's not, we should either finish off the part we have, or just move on
        if(!isNaN(current_value)){ // it's a number
            part_builder+=current_value;
            // Do any of the neighbors have a symbol?
            is_valid |= neighbors.some((n) =>{
                let value = grid[n[0]][n[1]].value
                return (isNaN(parseInt(value)) && value!='.')
            })
        }
        else { // Not a number
            if(!part_builder == ''){
                // finalize this part
                if (is_valid) {
                    console.log(part_builder)
                    valid_parts.push(part_builder);
                }
                part_builder = '' // reset the builder
                is_valid = false;
            }
        }
    }
    
    
    update_text();
    grid[current_coord[0]][current_coord[1]].color = color('green')
    for (let n of neighbors){
        grid[n[0]][n[1]].color = color('yellow');
    }


    for(let r of grid){
       for(let c of r){
            c.draw();
       }
    }
    prev_step = current_step;
}

function solve_1(step){

}

// returns a list of coordinates of valid neighbors
function get_neighbors(coord){
    let y = coord[0];
    let x = coord[1];
    let i = [-1,0,1];
    let j = [-1,0,1];
    let valid_neighbors = []
    for (let ix of i){
        new_y = y+ix;
        if (new_y < 0 || new_y >= ROWS) continue;
        for (let jx of j){
            new_x = x+jx;
            if(jx == 0 && ix == 0) continue; // skip itself
            if (new_x < 0 || new_x >= COLS) continue;
            valid_neighbors.push([new_y, new_x])
        }
    }
    return valid_neighbors;
}

function init_grid(){
    let idx = 0;
    let grid = [];
    for (let y=0;y<DATA.length;y++){
        let grid_row = [] ;
        for (let x=0;x<DATA[y].length;x++){
            let c = new Cell(idx++, x*(GRID_WIDTH/COLS)+OFFSET_X,y*(GRID_HEIGHT/ROWS)+OFFSET_Y,DATA[y][x]);
            grid_row.push(c);
        }
        grid.push(grid_row)
    }
    return grid;
}

function update_text(){
    let text_start_y = height/6;
    let text_spacing = 60;
    let i=0;
    push();
    textAlign(LEFT, CENTER);
    textSize(17);
    let coords = idx_to_coord(progress_slider.value())
    text(`Looking at location: [${coords[0]},${coords[1]}]`, 15, text_start_y+(text_spacing*i++))
    text(`Value at location: ${grid[coords[0]][coords[1]].value}`, 15, text_start_y+(text_spacing*i++))
    textSize(20);
    text(`Part so far: '${part_builder}'`, 15, text_start_y+(text_spacing*i++))
    text(`Is Valid?: ${is_valid?'Yes!':'Not yet...'}`, 15, text_start_y+(text_spacing*i++))
    pop();
}

function coord_to_idx(x,y){
    return (x*y)+x
}

function idx_to_coord(idx){
    let y = floor(idx/ROWS);
    let x = idx%COLS
    return [y,x]
}

class Cell {
    constructor(idx_,x_, y_, value_) {
        this.idx = idx_;
        this.x = x_;
        this.y = y_;
        this.value = value_;
        this.color = color('white');
    }

    draw(){
        push();
        fill(this.color); // set to this cell's fill color
        square(this.x, this.y,SIDE_SIZE);
        fill(0) // set back to black for text
        textAlign(CENTER, CENTER);
        text(this.value, this.x+SIDE_SIZE/2, this.y+SIDE_SIZE/2)
        pop();
        this.color = color('white') // reset color after rendering
    }
}

class Grid {

}

function pause_animation(){
    if(!is_paused){
        p_button.html("Unpause");
        is_paused = true;
    }
    else {
        is_paused = false;
        p_button.html("Pause")
    }
}

function check_slider(){
    // prevent it from going backwards
    if (progress_slider.value() < current_step) progress_slider.value(current_step)
}

function reset(){
    progress_slider.value(0);
    current_step = 0;
    prev_step = -1;
    part_builder = ''
    valid_parts = []
    is_valid = false
}

function step() {
    // bypass the pause check

}