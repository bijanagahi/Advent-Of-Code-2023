/**
 * Store information required to render a step (frame) of animation.
 * 
 * This will be precomputed before the animation starts so the user can scrub between steps without needing to calculate or maintain state
 * We need to render text and the grid. The grid can render itself but the text will be unique per frame.
 */
class Frame {
    // Variables needed to render text
    coordinates;
    valueText;
    partBuilderText;
    isValid;
    // The grid itself
    grid;
    // Internal variables
    idx; // Frame number
    constructor(idx) {
        this.idx = idx;
    }

    render_text() {
        let text_start_y = height / 6;
        let text_spacing = 60;
        let x_offset = 15
        let i = 0;
        push();
        textAlign(LEFT, CENTER);
        textSize(17);
        let coords = idx_to_coord(progress_slider.value());
        text(`Looking at location: [${this.coordinates[0]},${this.coordinates[1]}]`, x_offset, text_start_y + (text_spacing * i++));
        text(`Value at location: ${grid[this.coordinates[0]][this.coordinates[1]].value}`, x_offset, text_start_y + (text_spacing * i++));
        textSize(20);
        text(`Part so far: '${this.partBuilderText}'`, x_offset, text_start_y + (text_spacing * i++));
        text(`Is Valid?: ${this.isValid ? 'Yes!' : 'Not yet...'}`, x_offset, text_start_y + (text_spacing * i++));
        pop();
    }
}

class Cell {
    constructor(idx_, x_, y_, value_) {
        this.idx = idx_;
        this.x = x_;
        this.y = y_;
        this.value = value_;
        this.color = color('white');
    }

    draw() {
        push();
        fill(this.color); // set to this cell's fill color
        square(this.x, this.y, SIDE_SIZE);
        fill(0); // set back to black for text
        textAlign(CENTER, CENTER);
        text(this.value, this.x + SIDE_SIZE / 2, this.y + SIDE_SIZE / 2);
        pop();
        this.color = color('white'); // reset color after rendering
    }
}