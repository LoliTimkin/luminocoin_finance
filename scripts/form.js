const regex = /^(\S+)@([a-z0-9-]+)(\.)([a-z]{2,4})(\.?)([a-z]{0,4})+$/
const regexName = /^[А-Я][а-я]+\s*$/


const name = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const passwordSubmit = document.getElementById("password-submit");
const agreement = document.getElementById("agreement");
let isValid = true

name.addEventListener('blur', validateName);
email.addEventListener('blur', validateEmail);
password.addEventListener('blur', validatePassword);
passwordSubmit.addEventListener('blur', validatePasswordSubmit);
agreement.addEventListener('blur', validateAgreement);

function validateName() {
    if (!name.value || !name.value.match(regexName)) {
        name.style.borderColor = 'red';
        isValid = false;
    } else {
        name.removeAttribute('style');
        isValid = true;
    }
}

function validateEmail() {
    if (!email.value || !email.value.match(regex)) {
        email.style.borderColor = 'red';
        isValid = false;
    } else {
        email.removeAttribute('style');
        isValid = true;
    }
}

function validatePasswordSubmit() {
    if (passwordSubmit.value !== password) {
        passwordSubmit.style.borderColor = 'red';
        isValid = false;
    } else {
        passwordSubmit.removeAttribute('style');
        isValid = true;
    }
}
function validatePassword() {
    if (!password.value) {
        password.style.borderColor = 'red';
        isValid = false;
    } else {
        password.removeAttribute('style');
        isValid = true;
    }
}

function validateAgreement() {
    if (!agreement.checked) {
        agreement.style.borderColor = 'red';
        isValid = false;
    } else {
        agreement.removeAttribute('style');
        isValid = true;
    }
}
