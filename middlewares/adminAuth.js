function adminAuth(req,res,next){
    if (req.session.user != undefined) {
        next()
    }else{
        res.redirect("/login")
    }
}

// Este middleware que vai verificar se o usuário está logado como admin

module.exports = adminAuth