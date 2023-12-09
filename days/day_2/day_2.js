const MAX_COUNTS = {
    'r':12,
    'g':13,
    'b':14
}

input_field = document.getElementById("input_field");
input_field.value = my_input;
solve_both();

function solve_both(){
    solve_1();
    solve_2();
}

function solve_1(){
    var lines = document.getElementById("input_field").value.split('\n');
    let cube_count_matcher = /([0-9]+ [rgb])/g
    let results = 0
    let display = []
    for (let line of lines){
        let game_id = parseInt(line.split(':')[0].split(' ')[1])
        let cube_counts = line.split(':')[1].match(cube_count_matcher);
        let valid_game = cube_counts.every((count_and_color) => {
            let parts = count_and_color.split(' ')
            let count = parseInt(parts[0])
            let color = parts[1]
            return MAX_COUNTS[color] >= count
        })
        results += valid_game ? game_id:0;
        display.push(`Game ${game_id} is ${valid_game?' ':'NOT '}valid`);
    }
    
    document.getElementById("output_field_1").value = display.join('\n');
    document.getElementById("answer_1").innerHTML = results;
    // console.log(`Length of part 1: ${results.length}`)
}

function solve_2(){
    var lines = document.getElementById("input_field").value.split('\n');
    let cube_count_matcher = /([0-9]+ [rgb])/g
    let results = 0
    let display = []
    for (let line of lines){
        let game_id = parseInt(line.split(':')[0].split(' ')[1])
        let cube_counts = line.split(':')[1].match(cube_count_matcher);
        let mapper = {'r':0,'g':0,'b':0}
        let post_mapper = cube_counts.forEach((count_and_color) => {
            let parts = count_and_color.split(' ')
            let count = parseInt(parts[0])
            let color = parts[1]
            if (mapper[color] < count){
                mapper[color] = count;
            }
        })
        let power = Object.values(mapper).reduce(
            (accumulator, currentValue) => accumulator * currentValue,
        1);
        results += power;
        display.push(`Game ${game_id} has power: ${power}`);
    }
    
    document.getElementById("output_field_2").value = display.join('\n');
    document.getElementById("answer_2").innerHTML = results;
}
