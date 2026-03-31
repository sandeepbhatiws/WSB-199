
const userData = []

function displayUser(){
    var data = '';

    userData.forEach((v,i) => {
        console.log(v);
        data += `<tr>
                <td>${i+1}</td>
                <td>${v.name}</td>
                <td>${v.email}</td>
                <td>${v.mobile_number}</td>
            </tr>`;
    })

    document.getElementById('user_data').innerHTML = data;
}

displayUser();


document.getElementById('form_handler').addEventListener('submit', (event) => {
    event.preventDefault();

    var data = {
        name : event.target.name.value,
        email : event.target.email.value,
        mobile_number : event.target.mobile_number.value,
    };

    userData.unshift(data);
    displayUser()

    // event.target.name.value = '';
    // event.target.email.value = '';
    // event.target.mobile_number.value = '';

    event.target.reset();
});

localStorage.setItem('user_name', 'Sandeep Bhati');

console.log(localStorage.getItem('user_name'));