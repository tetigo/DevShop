
const init = db => {
    const catRouter = require('./categories')
    const router = require('express').Router()

    //autorização
    // router.use((req, res, next)=>{
    //     if(req.session.user){
    //         if(req.session.user.roles.indexOf('admin') < 0){
    //             return res.redirect('/')
    //         }else{
    //             return next()
    //         }
    //     }else{
    //         return res.redirect('/login')
    //     }
    // })

    router.use('/categorias', catRouter(db))
    router.get('/', (req,res)=> res.render('admin/index'))

    return router
}

module.exports = init

