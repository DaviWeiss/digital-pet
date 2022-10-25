window.addEventListener('load', ()=>{
    const form  = document.querySelector('form');

    form.addEventListener('submit',  (event)=>{
        event.preventDefault();
        validityEmail();
        validityName();
        validityLastName();
        validityPassword();
    })
})

function validityEmail(){
    const email = document.getElementById('email');
    const errosEmail = document.getElementById('errors-email');
    const rejexEmail = /\S+@\S+\.\S+/;

    if(email.value == ""){
        email.style.border = "1px solid red";
        errosEmail.style.display = "unset";
        errosEmail.innerText = "O e-mail não pode ser vazio";
    }else if(!rejexEmail.test(email.value)){
        email.style.border = "1px solid red";
        errosEmail.style.display = "unset";
        errosEmail.innerText = "O e-mail inserido é inválido";
    }else {
        email.style.border = "none";
        errosEmail.style.display = "none";
        errosEmail.innerText = "";
        return true;
    }
    return false;
}

function validityName(){
    const name = document.getElementById('name');
    const errosName = document.getElementById('errors-name');

    if(name.value == ""){
        name.style.border = "1px solid red";
        errosName.style.display = "unset";
        errosName.innerText = "O nome não pode ser vazio";
    }else if(name.value.length < 3){
        name.style.border = "1px solid red";
        errosName.style.display = "unset";
        errosName.innerText = "Por favor, informe um nome válido";
    }else {
        name.style.border = "none";
        errosName.style.display = "none";
        errosName.innerText = "";
        return true;
    }
    return false;
}

function validityLastName(){
    const lastName = document.getElementById('lastName');
    const errosLastName = document.getElementById('errors-lastName');

    if(lastName.value == ""){
        lastName.style.border = "1px solid red";
        errosLastName.style.display = "unset";
        errosLastName.innerText = "O sobrenome não pode ser vazio";
    }else if(lastName.value.length < 3){
        lastName.style.border = "1px solid red";
        errosLastName.style.display = "unset";
        errosLastName.innerText = "Por favor, informe um sobrenome válido";
    }else {
        lastName.style.border = "none";
        errosLastName.style.display = "none";
        errosLastName.innerText = "";
        return true;
    }
    return false;
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
        errosConfirmPassword.style.display = "unset";
    }else if(confirmPassword.value != password.value){
        confirmPassword.style.border = "1px solid red";
        errosConfirmPassword.innerText = "As senhas precisam ser iguais";
        errosConfirmPassword.style.display = "unset";
    }else {
        confirmPassword.style.border = "none";
        errosConfirmPassword.innerText = "";
        errosConfirmPassword.style.display = "none";
    }
}