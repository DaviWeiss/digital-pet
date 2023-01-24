const {jwtKey} = require("../config/secrets");
const jwt = require("jsonwebtoken")

function notLoggedUserMiddleware(req, res, next){
    const { token } = req.cookies;
    
    if(!token){
        return res.redirect("/usuario/login");
    }
    try {
        const decoded = jwt.verify(token, jwtKey);
    } catch (error) {
        res.clearCookie('token');
        return res.redirect("/usuario/login");
    }                

    next()
}

module.exports = notLoggedUserMiddleware;