document.getElementById("input_field").value = my_input;
solve_both();


function solve_both(){
    solve_1();
    solve_2();
}

function solve_1(){
    var lines = document.getElementById("input_field").value.split('\n');
    let matcher = /[0-9]/g
    let results = []
    for (let line of lines){
        let digits = line.match(matcher)
        if (digits.length == 1) {
            results.push(digits[0] + digits[0]);
        }
        else{
            results.push(digits[0] + digits.slice(-1)[0])
        }
    }
    const answer = results.reduce(
        (accumulator, currentValue) => accumulator + parseInt(currentValue),
        0,
      );
    document.getElementById("output_field_1").value = results.join('\n');
    document.getElementById("answer_1").innerHTML = answer;
}

function solve_2(){
    var lines = document.getElementById("input_field").value.split('\n');
    let matcher = /([0-9])|(one|two|three|four|five|six|seven|eight|nine)/g
    let results = []
    for (let line of lines){
        let matches = line.match(matcher)
        // start with the first one
        let first = matches[0]
        let last = matches.slice(-1)[0] 
        if (first !== NaN){
            results.push(maybeInt);
        }
        else{
            results.push()
        }

        
    }
    const answer = results.reduce(
        (accumulator, currentValue) => accumulator + parseInt(currentValue),
        0,
      );
    document.getElementById("output_field_2").value = results.join('\n');
    document.getElementById("answer_2").innerHTML = answer;
}

function parseString(input){
    let char_code = ((input.charCodeAt(0)) ^ (input.charCodeAt(1)))
    return ( 1*(char_code === 1 )) +
    ( 2*(char_code === 3 )) +
    ( 3*(char_code === 28)) +
    ( 4*(char_code === 9 )) +
    ( 5*(char_code === 15)) +
    ( 6*(char_code === 26)) +
    ( 7*(char_code === 22)) +
    ( 8*(char_code === 12)) +
    ( 9*(char_code === 7 ))
}