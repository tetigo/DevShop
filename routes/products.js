const init = db => {
    const router = require('express').Router()
    const produto = require('../controllers/products')

    // subi de nivel rota principal
    // router.get('/produto/:id/:slug', produto.getProduct(db))
    router.get('/:id/:slug', produto.getProduct(db))
    return router
}

module.exports = init


