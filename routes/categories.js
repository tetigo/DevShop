const init = db =>{
    const router = require('express').Router()
    const categori = require('../controllers/categories')(db)
    
    //subi de nivel rota principal
    // router.use('/categoria/:id/:slug', categori.getCategory(db))
    router.use('/:id/:slug', categori.getCategory)
    return router
}



module.exports = init



