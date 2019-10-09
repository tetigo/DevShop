const {slugify} = require('../util')

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

module.exports = {
    getCategoryById,
    getCategories,
}