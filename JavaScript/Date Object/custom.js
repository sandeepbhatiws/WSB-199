

// var currentDate = new Date();

// console.log('Current Date - ', currentDate);
// console.log('Year - ', currentDate.getFullYear());
// console.log('Month - ', currentDate.getMonth() + 1);
// console.log('Date - ', currentDate.getDate());
// console.log('Total Time - ', currentDate.getTime());
// console.log('Day - ', currentDate.getDay());

var currentDate = new Date();
var newDate = '17 feb 2026';
var newDate = new Date(newDate);


var difference = currentDate - newDate;

console.log(currentDate)
console.log(newDate)

var days = Math.floor(difference/1000/60/60/24);
var hours = Math.floor(difference/1000/60/60 % 24);
var minutes = Math.floor(difference/1000/60 % 60);


console.log('Days - ',days);
console.log('Hours - ',hours);
console.log('Minutes - ',minutes);