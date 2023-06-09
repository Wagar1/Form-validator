const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//Show input error
const showError = (input, message) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

//Check email is valid
const checkEmail = input => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(emailRegex.test(input.value)){
        showSuccess(input);
    }else{
        showError(input, 'Email is not valid');
    }
}

//Show success outline
const showSuccess = (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

//Check required fields
const checkRequired = inputArr => {
    inputArr.forEach(input => {
        if(input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        }else {
            showSuccess(input);
        }
    });
}

//Check input length
const checkLength = (input, min, max) => {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)}, must be at least ${min} characters`);
    }else if(input.value.length > max) {
        showError(input, `${getFieldName(input)}, must be less than ${max} characters`);
    }else {
        showSuccess(input);
    }
}

//Check passwords match
const checkPasswordsMatch = (input1, input2) => {
    if(input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
    }
}

//Get field name
const getFieldName = input => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Event listeners
form.addEventListener('submit', e => {
    e.preventDefault();

   checkRequired([username, email, password, password2]);
   checkLength(username, 3, 15);
   checkLength(password, 6, 25);
   checkEmail(email);
   checkPasswordsMatch(password, password2);
});