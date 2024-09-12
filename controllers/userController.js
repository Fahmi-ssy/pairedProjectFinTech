const  { User } = require('../models')

class userController{

    static loginForm(req,res){
        res.render('auth-page/login-Form')
    }

    static registerForm(req,res){
        res.render('auth-page/register-form')
    }

    static postRegisterForm(req,res){

        const { name, password, role } = req.body
        User.create({name, password, role})
        .then(newUser =>{
            res.redirect('/login')
        })
        .catch(err => res.send(err))
    }

}
module.exports= userController

