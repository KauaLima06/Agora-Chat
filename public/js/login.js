const userOrEmail = document.querySelector('#login__userOrEmail');
const password = document.querySelector('#login__pass');
const loginForm = document.querySelector('#loginForm');
const errorMsg = document.querySelectorAll('.error');
const passTooShort = document.querySelector('.passTooShort');

loginForm.addEventListener('submit', e => {
    let htmlEl = [userOrEmail, password];

    for(let pos in htmlEl){
        if(htmlEl[pos].value === ''){
            e.preventDefault();
            errorMsg[pos].classList.add('show');
            setTimeout(() => {
                errorMsg[pos].classList.remove('show');
            }, 3000);
        }
    }

    if(password.value.length < 8 && password.value !== ''){
        e.preventDefault();
        passTooShort.classList.add('show');
        setTimeout(() => {
            passTooShort.classList.remove('show');
        }, 3000);
    }
});