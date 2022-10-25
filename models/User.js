const fs = require("fs");

function User(name, endName, cpf, cel, password){
    this.name = name;
    this.endName = endName;
    this.cpf = cpf;
    this.cel = cel;
    this.password = password;
}

function getUsers(){
    const userList = JSON.parse(fs.readFileSync("database/user.json", "utf-8"));
    return userList.map(
        user =>
        new User
        (
            user.name,
            user.endName,
            user.cpf,
            user.cel,
            user.password
        )
    )
}

function createUser(name, endName, cpf, cel, password){
    const newUser = new User(name, endName, cpf, cel, password);
    const userList = getUsers();
    console.log(newUser)
    userList.push(newUser);
    fs.writeFileSync("database/user.json", JSON.stringify(userList));
}

module.exports = {
    getUsers,
    createUser
}