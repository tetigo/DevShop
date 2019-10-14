const bcrypt = require('bcryptjs')

const generatePassHash = passwd => {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(passwd, salt)
    return hash
}

const initialUser = db => async(id) =>{
    const count = await db('users').count('id as total').first()
    
    if(count.total === 0){
        // criar um admin inicial
        const user = {
            name:'Admin',
            email: 'admin@email.com',
            passwd: generatePassHash('admin123'),
            email_checked: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            roles: 'admin, financial, customer',
        }
        await db('users').insert(user)
    }
    console.log(count.total)
    console.log(count)
}

const createUser = db => async(name, email, senha) => {
    const user = {
        name: name,
        email: email,
        passwd: generatePassHash(senha),
        email_checked: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        roles: 'financial',
    }
    await db('users').insert(user)
}

const login = db => async(email, passwd) =>{
    const user = await db('users').select('*').where('email', email)
    
    if(user.length === 0){
        throw new Error('Invalid Email.')
    }

    console.log(bcrypt.compareSync(passwd,user[0].passwd))

    if (!bcrypt.compareSync(passwd,user[0].passwd)) {
        throw new Error('Invalid Password.')
    }

    return user[0]
}


module.exports = {
    initialUser,
    login,
    createUser,
}

