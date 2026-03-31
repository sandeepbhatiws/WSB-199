

function displayName(){
    console.log('Hello');
}

// // setTimeout(displayName, 5000);

// setTimeout(() => {
//     console.log('Welcome')
// }, 5000);

var output = '';

function setTime(){
    output = setTimeout(() => {
        console.log('Welcome')
    }, 2000)
}

function clearTime(){
    clearTimeout(output)
}


// setInterval(() => {
//     console.log('Welcome')
// }, 1000);

var counter = 1;
var output = '';

function setCount(){
    output = setInterval(() => {
        console.log(counter);
        counter++;
    }, 1000)

}

function stopCount(){
    clearInterval(output);
}

function resetCount(){
    clearInterval(output);
    counter = 1;
}