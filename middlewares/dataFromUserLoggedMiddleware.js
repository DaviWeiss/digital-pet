function dataFromUserLoggedMiddleware(req, res, next){
    if(req.session.userLogged != undefined){
        res.locals.user = req.session.userLogged;
    }else {
        res.locals.user = "empty";
    }
    next();
}

module.exports = dataFromUserLoggedMiddleware;