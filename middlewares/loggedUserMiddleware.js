function loggedUserMiddleware(req, res, next){
    if(req.session.userLogged){
        return res.redirect("/usuario/minha-conta");
    }
    next()
}

module.exports = loggedUserMiddleware;