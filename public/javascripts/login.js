const inputEmail = document.getElementById('email');
const inputPassword = document.getElementById('password');
const errosEmail = document.getElementById('errors-email');
const errosPassword = document.getElementById('errors-password');
const btnSubmit = document.querySelector('button[type="submit"]');

btnSubmit.disabled = true;
let errors = [];

const rejexEmail = /\S+@\S+\.\S+/;

inputEmail.addEventListener('input', ()=> {
    if(inputEmail.value == ""){
        inputEmail.style.border = "1px solid red";
        errosEmail.style.display = "unset";
        errosEmail.innerText = "O e-mail não pode estar vazio";
        errors[0] = 1;
    } else if(!rejexEmail.test(inputEmail.value)){
        inputEmail.style.border = "1px solid red";
        errosEmail.style.display = "unset";
        errosEmail.innerText = "O e-mail inserido é inválido";
        errors[0] = 1;
    }else{
        inputEmail.style.border = "unset";
        errosEmail.style.display = "none";
        errosEmail.innerText = "";
        errors[0] = 0;
    }
    submitForm(errors);
})

inputPassword.addEventListener('input', ()=> {
    if(inputPassword.value == ""){
        inputPassword.style.border = "1px solid red";
        errosPassword.style.display = "unset";
        errosPassword.innerText = "A senha não pode ser vazia";
        errors[1] = 1;
    }else{
        inputPassword.style.border = "unset";
        errosPassword.style.display = "none";
        errosPassword.innerText = "";
        errors[1] = 0;
    }
    submitForm(errors);
})

function submitForm(errors){
    let hasErrors = false;
    if(!(errors.indexOf(1) < 0)){
        hasErrors = true;
    }
    if
    (
        inputEmail.value == "" 
        || inputPassword.value == "" 
        || hasErrors
    )
    {
        btnSubmit.disabled = true;
    }
    else
    {
        btnSubmit.disabled = false;
    }    
}
