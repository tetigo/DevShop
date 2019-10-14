const init = db => {

    const express = require('express')
    const app = express()

    const path = require('path')

    //como o arquivo a ser importado se chama index
    //nao precisa colocar o nome dele aqui no require
    // const routes = require('./routes/index')
    const routes = require('./routes')
    const categori = require('./models/category')

    const bodyParser = require('body-parser')
    const session = require('express-session')

    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json({extended: true}))

    app.use(session({
        secret: "DevShopTigo",
        name: 'sessionIDTigo'
    }))

    app.use(express.static(path.join(__dirname, 'public')))
    app.set('view engine', 'ejs')
    app.set('views', path.join(__dirname, 'views'))



    //middleware
    //tudo que a gente chama passa por ele
    //chamada toda vez que fizer request no express
    //se nao usar rota, é aplicado para tudo, toda vez
    //se usar rota, vai ser usado somente ao chamar essa rota
    app.use(async(req,res,next)=>{
        console.log('passou aki')
        const categoriesWithSlug = await categori.getCategories(db)()
        const {user} = req.session
        console.log('user--->>',user)
        console.log(req.hostname)
        //setando variavel locals de response
        //podemos criar qualquer variavel pra passar pra frente
        //ao usar view engine, locals vai estar disponivel na view
        res.locals = {
            //ao fazer isso, vai estar disponivel na view onde usar essa variavel categories
            //nao precisa mais chamar nas rotas onde era necessario. Nao tem perigo de esquecer
            categories: categoriesWithSlug,
            //agora na view header.ejs mudamos categories.forEach por locals.categories.forEach
            user,
        }
        //aki decide se vai prosseguir ou nao
        // res.send('fim.... nao vai prosseguir')
        next()
    })

    //para ligar aplicacao no router usa-se 
    //middleware -> app.use
    // app.get('/', home.getIndex)
    // app.use(homeRouter(db))
    // app.use(catRouter(db))
    // app.use(prodRouter(db))

    //agregar todas as rotas em funcao unica
    app.use(routes(db))

    return app
}

module.exports = init


