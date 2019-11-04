const init = db =>{
    const router = require('express').Router()
    const categori = require('../../controllers/categories')(db)
    
    // router.get('/', (req, res)=>{
    //     res.send('okokok')
    // })
    router.get('/', categori.adminGetCategories(db))

    router.get('/editar/:id', categori.adminUpdateCategory(db))
    router.post('/editar/:id', categori.adminUpdateCategory(db))
    router.get('/excluir/:id', categori.adminRemoveCategory(db))
    router.get('/:id/:slug', categori.getCategory)
    // router.use('/', categori.getCategory(db))
    // router.get('/', (req, res)=>{
        //     res.send('ok')
        // })
    
    router.get('/nova', categori.adminCreateCategory(db))
    router.post('/nova', categori.adminCreateCategory(db))
    

    return router
}



module.exports = init



