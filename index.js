const port = process.env.PORT || 3000

const {print} = require('./util')



// require('knex')({
//     client: 'pg',
//     connection: 'postgres://user:pass@localhost:5432/dbname'
//   })
const db = require('knex')({
    client: 'mysql2',
    connection: 'mysql://root@localhost:3306/devshop'
    // connection: {
    //     host : '127.0.0.1',
    //     user : 'root',
    //     password : '',
    //     database : 'devshop'
    // }
  });


//no knex é possível de visualizar as
//queries sendo feitas no momento, pois
//é ele que gerencia as queries sendo feitas.
//checagem se query correta.
db.on('query', query => {
    print('SQL: ',query.sql)
})


const app = require('./app')(db)

const user = require('./models/user')
user.initialUser(db)()

// cria usuario aleatorio com roles diferentes
// user.createUser(db)('user','user@user.com', '123')


app.listen(port, err => {
    if(err) print('Nao foi possivel iniciar o servidor...')
    else print('DevShop rodando na porta:', port)
})



// db.raw('select 1+1 as result')
//     .then( result => { 
//         print(result[0][0].result)
//         app.listen(port, ()=>{
//             print('Listening on port:', port)
//         })
//     })
//     .catch( err => {
//         print('DB Error:', err.code) 
//         print('Sem DB, Sem App')
//         process.exit(1)
//     })


