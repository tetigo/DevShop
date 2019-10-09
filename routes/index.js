const catRouter = require('./categories')
const prodRouter = require('./products')
const homeRouter = require('./home')

const init = db => {
    const router = require('express').Router()
    //para ligar aplicacao no router usa-se 
    //middleware -> app.use
    // app.get('/', home.getIndex)
    //agora exportou para arq proprio nome mudou para router
    
    // versao SEM endpoint
    // router.use(homeRouter(db))
    // router.use(catRouter(db))
    // router.use(prodRouter(db))
    // return router

    // versao COM endpoint
    router.use('/'         , homeRouter(db))
    router.use('/categoria', catRouter(db))
    router.use('/produto'  , prodRouter(db))
    return router

    
}

module.exports = init

