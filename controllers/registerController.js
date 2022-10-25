const UserModel = require("../models/User");

function renderRegisterView(req, res, next) {
	const userList = UserModel.getUsers();
	res.render('register');
}

function createUser(req, res){
	const { name, lastName, CPF, celular, password} = req.body;
	UserModel.createUser(name, lastName, CPF, celular, password);
	return res.redirect("/");
}

module.exports = {
	renderRegisterView,
	createUser
}