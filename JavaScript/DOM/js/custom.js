
// // // Read Data
// // var output = document.getElementById('row2').innerText;

// // // Change Data
// // document.getElementById('output').innerText = output;

// // var output = document.getElementsByClassName('row');

// var output = document.getElementsByTagName('div');

// console.log(output[0].innerHTML);

// var output = document.getElementsByClassName('outer');
// output = output[0];

// console.log(output.innerHTML);

// document.getElementById('output').innerHTML = output.innerHTML;

var output = document.querySelector('#row').innerText;
var output = document.querySelector('.row').innerText;
var output = document.querySelector('div').innerText;

var output = document.querySelectorAll('#row');
var output = document.querySelectorAll('.row');
var output = document.querySelectorAll('div');

console.log(output);