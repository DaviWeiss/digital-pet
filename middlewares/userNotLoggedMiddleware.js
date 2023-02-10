const {jwtKey} = require("../config/secrets");
const jwt = require("jsonwebtoken")

function userNotLoggedMiddleware(req, res, next){
    const { token } = req.cookies;
    let lastPath = req.get('Referrer');
    if(lastPath.includes('planos')){
        let { id } = req.params;
        savePlanId(id, req, res);
    }
    try {
        const decoded = jwt.verify(token, jwtKey);
        if(decoded){
            next();
        }       
    }catch(error){
        if(!lastPath.includes('usuario')){
            if(lastPath.includes('planos')){
                let { id } = req.params;
                savePlanId(id, req, res);
            }    
            res.redirect("/usuario/login");
        }
        return res.redirect("login");
    }    
}

function savePlanId(id, req, res){
    res.cookie("planID", id);
}

module.exports = userNotLoggedMiddleware;