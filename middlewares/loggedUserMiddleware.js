const {jwtKey} = require("../config/secrets");
const jwt = require("jsonwebtoken")

function loggedUserMiddleware(req, res, next){
    const { token } = req.cookies;
    
    if(token){
        try{
            const decoded = jwt.verify(token, jwtKey);
            return res.redirect("/usuario/minha-conta");
        }
        catch(error){
            return res.redirect("usuario/login")
        }
    }

    next()
}

module.exports = loggedUserMiddleware;