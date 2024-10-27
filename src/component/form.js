/*const regex = /^(\S+)@([a-z0-9-]+)(\.)([a-z]{2,4})(\.?)([a-z]{0,4})+$/
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
}*/

export class Form {
    constructor(page) {
        this.processElement = null;
        this.page = page;

/*        const accessToken = localStorage.getItem(Auth.accessTokenKey);
        if (accessToken) {
            location.href = '#/choice';
            return;
        }*/

        this.fields = [
            {
                name: 'email',
                id: 'email',
                element: null,
                regex: /^(\S+)@([a-z0-9-]+)(\.)([a-z]{2,4})(\.?)([a-z]{0,4})+$/,
                valid: false,
            },
            {
                name: 'password',
                id: 'password',
                element: null,
                regex: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                valid: false,
            },
        ];

        if (this.page === "signup") {
            this.fields.unshift(
                {
                    name: 'name',
                    id: 'name',
                    element: null,
                    regex: /^[А-Я][а-я]+\s*$/,
                    valid: false,
                }
            )
        }
        const that = this;
        this.fields.forEach(item => {
            item.element = document.getElementById(item.id);
            item.element.onchange = function () {
                that.validateField.call(that, item, this);
            }
        })
        this.processElement = document.getElementById('process');
        this.processElement.onclick = function () {
            that.processForm();
        }

/*        if (this.page === 'signup') {
            this.agreeElement = document.getElementById('agree')
            this.agreeElement.onchange = function () {
                that.validateForm();
            }
        }*/

    }

    validateField(field, element) {
        if (!element.value || !element.value.match(field.regex)) {
            element.style.borderColor = 'red';
            field.valid = false;
        } else {
            element.parentNode.removeAttribute('style');
            field.valid = true;
        }
        this.validateForm();
    }

    validateForm() {
        const validForm = this.fields.every(item => item.valid);
        //const isValid = this.agreeElement ? this.agreeElement.checked && validForm : validForm;
        if (validForm) {
            this.processElement.removeAttribute('disabled');
        } else {
            this.processElement.setAttribute('disabled', 'disabled');
        }
        return validForm;
    }
}

