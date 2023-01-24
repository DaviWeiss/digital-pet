const { create } = require("domain");
const fs = require("fs");
const fileName = "database/users.json";

const User = {
    getUsers: function() {
        return userList = JSON.parse(fs.readFileSync(fileName, "utf-8"));
    },

    getUserById: function(id) {
        let userList = this.getUsers();
        let userFound = userList.find(user => user.id === id);
        return userFound;
    },

    getUserByField: function(field, value){
        let userList = this.getUsers();
        let userFound = userList.find(user => user[field] === value);
        return userFound;
    },

    generateId: function(){
        let userList = this.getUsers();
        let lastUser = userList.pop();

        if (lastUser){
            return lastUser.id + 1;
        }

        return 1;
    },

    createUser: function(data){
        let userList = this.getUsers();
        let newUser = {
            id: this.generateId(),
            ...data
        }

        userList.push(newUser);

        fs.writeFileSync(fileName, JSON.stringify(userList, null, ' '));
    },

    editUser: function(id, newData){
        let userList = this.getUsers();
        let userIndex = userList.findIndex(user => user.id === id);
        let userFound = userList.find(user => user.id === id);
        userList[userIndex] = 
        {
            id:userFound.id,
            CPF: userFound.CPF,
            ...newData
        };
        
        fs.writeFileSync(fileName, JSON.stringify(userList, null, ' '));
    },

    deleteUser: function(id){
        let userList = this.getUsers();
        let newUserList = userList.filter(user => user.id != id);
        fs.writeFileSync(fileName, JSON.stringify(newUserList, null, ' '));
    }
}

module.exports = User;
