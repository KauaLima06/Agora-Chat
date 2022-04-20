const userOrEmailInput = document.querySelector('#userName');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#pass');
const confirmPassInput = document.querySelector('#confirm__pass');
const signForm = document.querySelector('#signForm');
const passDontMatchError = document.querySelector('.passDontMatch');
const passTooShort = document.querySelector('.passTooShort');

const errorMsg = document.querySelectorAll('.error');
signForm.addEventListener('submit', e => {
    // Checking for empty fields
    let htmlEl = [userOrEmailInput, emailInput, passwordInput, confirmPassInput];

    for(let pos in htmlEl){
        if(htmlEl[pos].value === ''){
            e.preventDefault();
            errorMsg[pos].classList.add('show');
            setTimeout(() => {
                errorMsg[pos].classList.remove('show');
            }, 3000);
        }
    }
    // Checking to see if passwords match
    if(passwordInput.value !== confirmPassInput.value && confirmPassInput.value !== ''){
        e.preventDefault()
        passDontMatchError.style.display = 'inline';
        setTimeout(() => {
            passDontMatchError.style.display = 'none';
        }, 3000);
    }else {
        if(passwordInput.value.length < 8 && passwordInput.value !== ''){
            e.preventDefault();

            passTooShort.classList.add('show');
            setTimeout(() => {
                passTooShort.classList.remove('show');
            }, 3000);

            return;
        }
    }
});