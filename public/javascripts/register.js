const btnBack = document.querySelector('.btn-go-back');
const form = document.querySelector('form');
const btnSubmit = document.querySelector('button[type="submit"]');

btnSubmit.disabled = true;

let errors = [];

//Inputs
const email = document.getElementById('email');
const name = document.getElementById('name');
const lastName = document.getElementById('lastName');
const cpf = document.getElementById('CPF');
const celular = document.getElementById('celular');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

//Box que irão os erros
const errosEmail = document.getElementById('errors-email');
const errosName = document.getElementById('errors-name');
const errosLastName = document.getElementById('errors-lastName');
const errosCPF = document.getElementById('errors-CPF');
const errosCel = document.getElementById('errors-celular');
const errosPassword = document.getElementById('errors-password');   
const errosConfirmPassword = document.getElementById('errors-confirmPassword');

//Rejex
const rejexEmail = /\S+@\S+\.\S+/;
const rejexCpf = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!"'%$*&@#])[0-9a-zA-Z!"'%$*&@#]{8,}$/; 

//Event Email
email.addEventListener('input', ()=>{
    if(email.value == ""){
        email.style.border = "1px solid red";
        errosEmail.style.display = "unset";
        errosEmail.innerText = "O e-mail não pode ser vazio";
        errors[0] = 1;
    }else if(!rejexEmail.test(email.value)){
        email.style.border = "1px solid red";
        errosEmail.style.display = "unset";
        errosEmail.innerText = "O e-mail inserido é inválido";
        errors[0] = 1;
    }else {
        email.style.border = "none";
        errosEmail.style.display = "none";
        errosEmail.innerText = "";
        errors[0] = 0;
    }
    submitForm(errors);
})

name.addEventListener('input', ()=>{
    if(name.value == ""){
        name.style.border = "1px solid red";
        errosName.style.display = "unset";
        errosName.innerText = "O nome não pode ser vazio";
        errors[1] = 1;
    }else if(name.value.length < 3){
        name.style.border = "1px solid red";
        errosName.style.display = "unset";
        errosName.innerText = "Por favor, informe um nome válido";
        errors[1] = 1;
    }else {
        name.style.border = "none";
        errosName.style.display = "none";
        errosName.innerText = "";
        errors[1] = 0;
    }
    submitForm(errors);
})

lastName.addEventListener('input', ()=>{
    if(lastName.value == ""){
        lastName.style.border = "1px solid red";
        errosLastName.style.display = "unset";
        errosLastName.innerText = "O sobrenome não pode ser vazio";
        errors[2] = 1;
    }else if(lastName.value.length < 3){
        lastName.style.border = "1px solid red";
        errosLastName.style.display = "unset";
        errosLastName.innerText = "Por favor, informe um sobrenome válido";
        errors[2] = 1;
    }else {
        lastName.style.border = "none";
        errosLastName.style.display = "none";
        errosLastName.innerText = "";
        errors[2] = 0;
    }
    submitForm(errors);
})

cpf.addEventListener('input', ()=>{
    if(cpf.value == ""){
        cpf.style.border = "1px solid red";
        errosCPF.style.display = "unset";
        errosCPF.innerText = "O CPF não pode ser vazio";
        errors[3] = 1;
    }else if(!rejexCpf.test(cpf.value)){
        cpf.style.border = "1px solid red";
        errosCPF.style.display = "unset";
        errosCPF.innerText = "O CPF inserido é inválido";
        errors[3] = 1;
    }else {
        cpf.style.border = "none";
        errosCPF.style.display = "none";
        errosCPF.innerText = "";
        errors[3] = 0;
    }
    submitForm(errors);
})

celular.addEventListener('input', ()=>{
    if(celular.value == ""){
        celular.style.border = "1px solid red";
        errosCel.style.display = "unset";
        errosCel.innerText = "O celular não pode ser vazio";
        errors[4] = 1;
    }else {
        celular.style.border = "none";
        errosCel.style.display = "none";
        errosCel.innerText = "";
        errors[4] = 0;
    }
    submitForm(errors);
})

password.addEventListener('input', ()=>{
    if(!regexPassword.test(password.value)){
        password.style.border = "1px solid red";
        errosPassword.style.display = "block";
        errors[5] = 1;
    }else {
        password.style.border = "none";
        errosPassword.style.display = "none";
        errors[5] = 0;
    }
    submitForm(errors);
})

confirmPassword.addEventListener('input', ()=>{
    if(confirmPassword.value == ""){
        confirmPassword.style.border = "1px solid red";
        errosConfirmPassword.style.display = "unset";
        errosConfirmPassword.innerText = "O campo de confirmação de senha não pode ser vazio";
        errors[6] = 1;
    }else if(confirmPassword.value != password.value){
        confirmPassword.style.border = "1px solid red";
        errosConfirmPassword.style.display = "unset";
        errosConfirmPassword.innerText = "As senhas precisam ser iguais";      
        errors[6] = 1;
    }else {
        confirmPassword.style.border = "none";
        errosConfirmPassword.style.display = "none";
        errosConfirmPassword.innerText = "";
        errors[6] = 0;
    }  
    submitForm(errors);
})

btnBack.addEventListener('click', ()=>{
    location.href ="/usuario/login";
})

function submitForm(errors){
    let hasErrors = false;
    if(!(errors.indexOf(1) < 0)){
        hasErrors = true;
    }
    if
    (
        email.value == "" 
        || name.value == "" 
        || lastName.value == "" 
        || cpf.value == "" 
        || celular.value == "" 
        || password.value == "" 
        || confirmPassword.value == ""
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