window.addEventListener('load', ()=>{
    const formLogin = document.querySelector('form');
    const inputEmail = document.getElementById('email');
    const inputPassword = document.getElementById('password');
    const errorsEmail = document.getElementById('errors-email');
    const errosPassword = document.getElementById('errors-password');
    const rejexEmail = /\S+@\S+\.\S+/;


    formLogin.addEventListener('submit', (event) => {
        event.preventDefault();
        if(inputEmail.value == ""){
            inputEmail.style.border = "1px solid red";
            errorsEmail.innerText = "O campo de e-mail não pode estar vazio";
        } else if(!rejexEmail.test(inputEmail.value)){
            email.style.border = "1px solid red";
            errosEmail.style.display = "unset";
            errosEmail.innerText = "O e-mail inserido é inválido";
        }else{
            inputEmail.style.border = "unset";
            errorsEmail.innerText = "";
        }
        if(inputPassword.value == ""){
            inputPassword.style.border = "1px solid red";
            errosPassword.innerText = "O campo de senha não pode ser vazio";
        }else{
            inputPassword.style.border = "unset";
            errosPassword.innerText = "";
        }
    })
})


