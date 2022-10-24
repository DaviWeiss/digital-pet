const buttonFormData = document.getElementById('button-form-data');
const buttonFormEnd = document.getElementById('button-form-end');
const formEnd = document.getElementById('box-form-end');
const formPay = document.getElementById('box-form-pay');
const formCard = document.getElementById('form-card');
const cep = document.getElementById('cep');
const bairro = document.getElementById('bairro');
const end = document.getElementById('end');

buttonFormData.addEventListener('click', ()=>{
    validityEmail();
    validityName();
    validityLastName();
    validityCPF();
    validityCellPhone();
    if(validityEmail() && validityName() && validityLastName() && validityCPF() && validityCellPhone()){
        formEnd.classList.add('show-form-end');
    }
});

buttonFormEnd.addEventListener('click', ()=>{
    validityCep();
    validityBairro();
    validityEnd();
    validityNum();
    if(validityCep() && validityBairro() && validityEnd() && validityNum()){
        formPay.classList.add('show-form-pay');
    }
});

formCard.addEventListener('submit', (event)=>{
    event.preventDefault();
    validityCardName()
    validityCardNum()
    validityCardValid()
    validityCardCvv()
    validityCardCpf()
    validityCardBirDate()
    validityCardCel()
    if(validityCardName() && validityCardNum() && validityCardValid() && validityCardCvv() && validityCardCpf() && validityCardBirDate() && validityCardCel()){
        window.location.href = "/final";
    }
})

cep.addEventListener('blur', ()=>{
    searchCep(cep.value);
});

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

function validityCPF(){
    const cpf = document.getElementById('cpf');
    const errosCPF = document.getElementById('errors-cpf');
    const rejexCpf = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
    
    if(cpf.value == ""){
        cpf.style.border = "1px solid red";
        errosCPF.style.display = "unset";
        errosCPF.innerText = "O CPF não pode ser vazio";
    }else if(!rejexCpf.test(cpf.value)){
        cpf.style.border = "1px solid red";
        errosCPF.style.display = "unset";
        errosCPF.innerText = "O CPF inserido é inválido";
    }else {
        cpf.style.border = "none";
        errosCPF.style.display = "none";
        errosCPF.innerText = "";
        return true;
    }
    return false;
}

function validityCellPhone(){
    const celular = document.getElementById('cel');
    const errosCel = document.getElementById('errors-cel');
    const rejexCel = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/

    if(celular.value == ""){
        celular.style.border = "1px solid red";
        errosCel.style.display = "unset";
        errosCel.innerText = "O celular não pode ser vazio";
    }else if(!rejexCel.test(celular.value)){
        celular.style.border = "1px solid red";
        errosCel.style.display = "unset";
        errosCel.innerText = "O celular inserido é inválido";
    }else {
        celular.style.border = "none";
        errosCel.style.display = "none";
        errosCel.innerText = "";
        return true;
    }

    return false;
}

function validityCep(){
    const errosCep = document.getElementById('errors-cep');
    const rejexCep = /^[0-9]{5}[-]?[0-9]{3}$/;

    if(cep.value == ""){
        cep.style.border = "1px solid red";
        errosCep.style.display = "unset";
        errosCep.innerText = "O CEP inserido não pode ser vazio";
    }else if(!rejexCep.test(cep.value)){
        cep.style.border = "1px solid red";
        errosCep.style.display = "unset";
        errosCep.innerText = "O CEP inserido inserido é inválido";
    }else {
        cep.style.border = "none";
        errosCep.style.display = "none";
        errosCep.innerText = "";
        return true;
    }
    return false;
}

function validityBairro(){
    const errosBairro = document.getElementById('errors-bairro');

    if(bairro.value == ""){
        bairro.style.border = "1px solid red";
        errosBairro.style.display = "unset";
        errosBairro.innerText = "O bairro inserido não pode ser vazio";
    }else {
        bairro.style.border = "none";
        errosBairro.style.display = "none";
        errosBairro.innerText = "";
        return true;
    }
    return false;
}

function validityEnd(){
    const errosEnd = document.getElementById('errors-end');

    if(end.value == ""){
        end.style.border = "1px solid red";
        errosEnd.style.display = "unset";
        errosEnd.innerText = "O endereço inserido não pode ser vazio";
    }else {
        end.style.border = "none";
        errosEnd.style.display = "none";
        errosEnd.innerText = "";
        return true;
    }
    return false;
}

function validityNum(){
    const num = document.getElementById('num');
    const errosNum = document.getElementById('errors-num');

    if(num.value == ""){
        num.style.border = "1px solid red";
        errosNum.style.display = "unset";
        errosNum.innerText = "O número do endereço não pode ser vazio";
    }else {
        num.style.border = "none";
        errosNum.style.display = "none";
        errosNum.innerText = "";
        return true;
    }
    return false;
}

function validityCardName(){
    const cardName = document.getElementById('card-name');
    const errosCardName = document.getElementById('errors-card-name');

    if(cardName.value == ""){
        cardName.style.border = "1px solid red";
        errosCardName.style.display = "unset";
        errosCardName.innerText = "O nome do cartão não pode ser vazio";
    }else if(cardName.value.length < 3){
        cardName.style.border = "1px solid red";
        errosCardName.style.display = "unset";
        errosCardName.innerText = "Por favor, informe um nome válido";
    }else {
        cardName.style.border = "none";
        errosCardName.style.display = "none";
        errosCardName.innerText = "";
        return true;
    }
    return false;
}

function validityCardNum(){
    const cardNum = document.getElementById('card-num');
    const errosCardNum = document.getElementById('errors-card-num');

    if(cardNum.value == ""){
        cardNum.style.border = "1px solid red";
        errosCardNum.style.display = "unset";
        errosCardNum.innerText = "O número do cartão não pode ser vazio";
    }else {
        cardNum.style.border = "none";
        errosCardNum.style.display = "none";
        errosCardNum.innerText = "";
        return true;
    }
    return false;
}

function validityCardValid(){
    const cardValid = document.getElementById('card-valid');
    const errosCardValid = document.getElementById('errors-card-valid');
    const rejexCardValid = /([0-2][0-9]|3[0-1])\/[0-9]{4}/;
    
    if(cardValid.value == ""){
        cardValid.style.border = "1px solid red";
        errosCardValid.style.display = "unset";
        errosCardValid.innerText = "A data de validade não pode ser vazia";
    }else if(!rejexCardValid.test(cardValid.value)){
        cardValid.style.border = "1px solid red";
        errosCardValid.style.display = "unset";
        errosCardValid.innerText = "A data de validade é inválida";
    }else {
        cardValid.style.border = "none";
        errosCardValid.style.display = "none";
        errosCardValid.innerText = "";
        return true;
    }
    return false;
}

function validityCardCvv(){
    const cvv = document.getElementById('cvv');
    const errosCvv = document.getElementById('errors-cvv');
    
    if(cvv.value == ""){
        cvv.style.border = "1px solid red";
        errosCvv.style.display = "unset";
        errosCvv.innerText = "O CVV não pode ser vazio";
    }else if(cvv.value.length < 3){
        cvv.style.border = "1px solid red";
        errosCvv.style.display = "unset";
        errosCvv.innerText = "O CVV é inválido";
    }else {
        cvv.style.border = "none";
        errosCvv.style.display = "none";
        errosCvv.innerText = "";
        return true;
    }
    return false;
}

function validityCardCpf(){
    const cardCpf = document.getElementById('card-cpf');
    const errosCardCPF = document.getElementById('errors-card-cpf');
    const rejexCardCpf = /([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/;
    
    if(cardCpf.value == ""){
        cardCpf.style.border = "1px solid red";
        errosCardCPF.style.display = "unset";
        errosCardCPF.innerText = "O CPF não pode ser vazio";
    }else if(!rejexCardCpf.test(cardCpf.value)){
        cardCpf.style.border = "1px solid red";
        errosCardCPF.style.display = "unset";
        errosCardCPF.innerText = "O CPF inserido é inválido";
    }else {
        cardCpf.style.border = "none";
        errosCardCPF.style.display = "none";
        errosCardCPF.innerText = "";
        return true;
    }
    return false;
}

function validityCardBirDate(){
    const cardBirDate = document.getElementById('card-bir-date');
    const errosCardBirDate = document.getElementById('errors-card-bir-date');
    const rejexCardBirDate= /([0-2][0-9]|3[0-1])\/(0[0-9]|1[0-2])\/[0-9]{4}/;
    
    if(cardBirDate.value == ""){
        cardBirDate.style.border = "1px solid red";
        errosCardBirDate.style.display = "unset";
        errosCardBirDate.innerText = "A data de nascimento não pode ser vazia";
    }else if(!rejexCardBirDate.test(cardBirDate.value)){
        cardBirDate.style.border = "1px solid red";
        errosCardBirDate.style.display = "unset";
        errosCardBirDate.innerText = "A data de nascimento é inválida";
    }else {
        cardBirDate.style.border = "none";
        errosCardBirDate.style.display = "none";
        errosCardBirDate.innerText = "";
        return true;
    }
    return false;
}

function validityCardCel(){
    const cardCel = document.getElementById('card-cel');
    const errosCardCel = document.getElementById('errors-card-cel');
    const rejexCardCel = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/

    if(cardCel.value == ""){
        cardCel.style.border = "1px solid red";
        errosCardCel.style.display = "unset";
        errosCardCel.innerText = "O celular não pode ser vazio";
    }else if(!rejexCardCel.test(cardCel.value)){
        cardCel.style.border = "1px solid red";
        errosCardCel.style.display = "unset";
        errosCardCel.innerText = "O celular inserido é inválido";
    }else {
        cardCel.style.border = "none";
        errosCardCel.style.display = "none";
        errosCardCel.innerText = "";
        return true;
    }

    return false;
}

async function searchCep(cep){
    const data = await fetch(`https://viacep.com.br/ws/${cep}/json`)
    const response = await data.json();
    bairro.value = response.bairro;
    end.value = response.logradouro;
}