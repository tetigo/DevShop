const {slugify} = require('../util')
const util = require('../util')

const Joi = require('@hapi/joi')

const createSchema = Joi.object().keys({
    category: Joi.string().min(5).max(245).required(),
    description: Joi.string().min(5).required()
})

const getCategoryById = db => async(id) => {
    const category = await db('categories').select('*')
    .where('id', id)
    .first()
    return category
}

const getCategories = db => async() => {
    const categories = await db('categories').select('*')
    const categoriesWithSlug = categories.map(category => {
        const newCategory = {...category, slug: slugify(category.category)  }
        return newCategory
    })
    return categoriesWithSlug
}

const createCategory = db => async(category) =>{
    
    //não declarar o try.catch faz a excessão subir, 
    // vai para o controller e o mesmo deve tratar ou deixar subir
    // try { 
        const value = await util.validate(category, createSchema)
        await db('categories').insert(value)
        return true
    // } catch (error) {
    //     console.log(error)
    //     throw error        
    // }
}

const updateCategory = db => async(id, category)=>{
    const value = await util.validate(category, createSchema)
    await db('categories').where({id}).update(value)
    return true
}

const removeCategory = db => async(id)=>{
    await db('categories').where({id: id}).del()
    return true
}

module.exports = {
    getCategoryById,
    getCategories,
    createCategory,
    removeCategory,
    updateCategory,
}