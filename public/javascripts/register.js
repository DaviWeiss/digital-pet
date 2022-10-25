window.addEventListener('load', ()=>{
    const btnBack = document.querySelector('.btn-go-back');
    const form  = document.querySelector('form');

    form.addEventListener('submit',  (event)=>{
        validityEmail();
        validityNameAndLastName();
        validityCPF();
        validityCellPhone();
        validityPassword();
    })

    btnBack.addEventListener('click', ()=>{
        location.href ="/login";
    })
})

function validityEmail(){
    const email = document.getElementById('email');
    const errosEmail = document.getElementById('errors-email');
    const rejexEmail = /\S+@\S+\.\S+/;

    if(email.value == ""){
        email.style.border = "1px solid red";
        errosEmail.innerText = "O campo e-mail não pode ser vazio";
    }else if(!rejexEmail.test(email.value)){
        email.style.border = "1px solid red";
        errosEmail.innerText = "O e-mail inserido é inválido";
    }else {
        email.style.border = "none";
        errosEmail.innerText = "";
    }
}

function validityNameAndLastName(){
    const name = document.getElementById('name');
    const lastName = document.getElementById('lastName');

    const errosName = document.getElementById('errors-name');
    const errosLastName = document.getElementById('errors-lastName');

    if(name.value == ""){
        name.style.border = "1px solid red";
        errosName.innerText = "O campo nome não pode ser vazio";
    }else if(name.value.length < 3){
        name.style.border = "1px solid red";
        errosName.innerText = "Por favor, informe um nome válido";
    }else {
        name.style.border = "none";
        errosName.innerText = "";
    }

    if(lastName.value == ""){
        lastName.style.border = "1px solid red";
        errosLastName.innerText = "O campo sobrenome não pode ser vazio";
    }else if(lastName.value.length < 3){
        lastName.style.border = "1px solid red";
        errosLastName.innerText = "Por favor, informe um sobrenome válido";
    }else {
        lastName.style.border = "none";
        errosLastName.innerText = "";
    }
}

function validityCPF(){
    const cpf = document.getElementById('CPF');
    const errosCPF = document.getElementById('errors-CPF');
    const rejexCpf = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
    
    if(cpf.value == ""){
        cpf.style.border = "1px solid red";
        errosCPF.style.display = "unset";
        errosCPF.innerText = "O campo CPF não pode ser vazio";
    }else if(!rejexCpf.test(cpf.value)){
        cpf.style.border = "1px solid red";
        errosCPF.style.display = "unset";
        errosCPF.innerText = "O CPF inserido é inválido";
    }else {
        cpf.style.border = "none";
        errosCPF.style.display = "none";
        errosCPF.innerText = "";
    }
}

function validityCellPhone(){
    const celular = document.getElementById('celular');
    const errosCel = document.getElementById('errors-celular');

    if(celular.value == ""){
        celular.style.border = "1px solid red";
        errosCel.innerText = "O campo celular não pode ser vazio";
    }else {
        celular.style.border = "none";
        errosCel.innerText = "";
    }
}

function validityPassword(){
    const password = document.getElementById('password');
    const errosPassword = document.getElementById('errors-password');
    const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/; 
    
    if(!regexPassword.test(password.value)){
        password.style.border = "1px solid red";
        errosPassword.style.display = "block";
    }else {
        password.style.border = "none";
        errosPassword.style.display = "none";
    }

    const confirmPassword = document.getElementById('confirm-password');
    const errosConfirmPassword = document.getElementById('errors-confirm-password');

    if(confirmPassword.value == ""){
        confirmPassword.style.border = "1px solid red";
        errosConfirmPassword.innerText = "O campo de confirmação de senha não pode ser vazio";
    }else if(confirmPassword.value != password.value){
        confirmPassword.style.border = "1px solid red";
        errosConfirmPassword.innerText = "As senhas precisam ser iguais";
    }else {
        confirmPassword.style.border = "none";
        errosConfirmPassword.innerText = "";
    }
}