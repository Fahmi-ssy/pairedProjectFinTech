
const  { User } = require('../models')

const bcrypt = require('bcryptjs')

class userController{

    static loginForm(req,res){
        const { error } = req.query
        res.render('auth-page/login-Form', { error })
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
    static postLogin(req,res){
        const { name , password } = req.body
        User.findOne({where: { name }})
        .then( user =>{
            if (user) {
                const isValidPassword = bcrypt.compareSync(password, user.password)
                if (isValidPassword) {
                    return res.redirect('/')
                }else{
                    const error = 'invalid password'
                    return res.redirect(`/login?error=${error}`)
                }
            }else{
                const error = 'invalid password'
                return res.redirect(`/login?error=${error}`)
            }

        })
        .catch(err => res.send(err))

    }

}
module.exports= userController

