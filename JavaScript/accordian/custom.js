

// var output = document.querySelector('.html').parentNode
// var output = document.querySelector('.faqItem').parentElement

// var output = document.querySelector('.faqItem').childNodes
// var output = document.querySelector('.faq').children

// var output = document.querySelector('.faq').firstElementChild
// var output = document.querySelector('.faq').lastElementChild

// var output = document.querySelector('.faqItem').nextElementSibling
// var output = document.querySelector('.faqItem').previousElementSibling


var allDivs = document.querySelectorAll('.faqQUEST');

allDivs.forEach((value, index) => {

    value.addEventListener('click', (e) => {

        value.nextElementSibling.classList.toggle('addANS');
        
        if(value.lastElementChild.innerText == '-'){
            value.lastElementChild.innerText = '+';
        } else {
            value.lastElementChild.innerText = '-';
        }

        allDivs.forEach((element, i) => {
            // if(value != element){
            //     console.log(element);
            // }

            if(index != i){
                element.nextElementSibling.classList.remove('addANS');
                element.lastElementChild.innerText = '+';
                console.log(i);
            }
        }); 
    })
    
})