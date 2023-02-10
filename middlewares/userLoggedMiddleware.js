const {jwtKey} = require("../config/secrets");
const jwt = require("jsonwebtoken")

function userLoggedMiddleware(req, res, next){
    const { token } = req.cookies;
    try {
        const decoded = jwt.verify(token, jwtKey);
        if(decoded && req.session.userLogged != undefined){
            return res.redirect("minha-conta");
        }else{
            next();
        }
    } catch (error) {
        next();
    };
}

module.exports = userLoggedMiddleware;