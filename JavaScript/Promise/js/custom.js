// new Promise((accept, reject) => {
//     const data = fetch('https://dummyjson.com/products');
//     // reject(data);
//     accept(data);
// })
// .then((result) => {
//     new Promise((complete) => {
//         complete(result.json());
//     })
//     .then((result) => {
//         console.log(result);
//     })
// })
// .catch(() => {
//     console.log('Promise rejected');
// })


async function displayData(){
    const data = await fetch('https://dummyjson.com/products');
    var result = await data.json();
    console.log(result);
}

displayData();