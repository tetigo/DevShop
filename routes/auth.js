const init = db => {
    const router = require('express').Router()
    const auth = require('../controllers/auth')
    router.post('/', auth.login(db))
    return router
}

module.exports = init


