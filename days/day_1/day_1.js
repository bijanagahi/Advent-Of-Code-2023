
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
    document.getElementById("output_field").value = results.join('\n');
    document.getElementById("answer_1").innerHTML = answer;
}

function solve_2(){
    var lines = document.getElementById("input_field").value.split('\n');
    let matcher = /([0-9])|(one|two|three|four|five|six|seven|eight|nine)/g
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
    document.getElementById("output_field").value = results.join('\n');
    document.getElementById("answer_1").innerHTML = answer;
}