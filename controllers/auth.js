const user = require('../models/user')

const login = db => async(req, res) => {
    try{
        const userFromDB = await user.login(db)(req.body.email, req.body.passwd)
        req.session.user = userFromDB
        // res.send(req.session.user)
        res.redirect('/')
    }catch(err){
        req.session.destroy()
        console.log(err)
        res.send(''+err)
    }
}

const logout = (req, res)=>{
    req.session.destroy(()=>{
        console.log('Sessão Desconectada Com Sucesso!')
    })
    res.redirect('/')
}

module.exports = {
    login,
    logout,
}