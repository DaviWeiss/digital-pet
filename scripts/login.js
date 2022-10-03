window.addEventListener('load', ()=>{
    const formLogin = document.querySelector('form');
    const inputEmail = document.getElementById('email');
    const inputPassword = document.getElementById('password');
    const errorsEmail = document.getElementById('errors-email');
    const errosPassword = document.getElementById('errors-password');


    formLogin.addEventListener('submit', (event) => {
        event.preventDefault();
        if(inputEmail.value == ""){
            inputEmail.style.border = "1px solid red";
            errorsEmail.innerText = "O campo de e-mail não pode estar vazio";
        }
        if(inputPassword.value.length < 8){
            inputPassword.style.border = "1px solid red";
            errosPassword.innerText = "O campo de senha não pode ter menos de 8 caracteres";
        }
    })
})


