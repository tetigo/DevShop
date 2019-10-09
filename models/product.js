const {slugify} = require('../util')

const getProductsByCategoryId = db => async(id) => {
    const products = await db('products')
    .join('products_has_categories', 'products.id', '=', 'products_has_categories.products_id')
    .where('products_has_categories.categories_id', id)

    const products2 = products.map((produ)=>{
        return {...produ, slug: slugify(produ.name)}
    })
    return products2
}

const getProductById = db => async(id) => {
    const product = await db('products')
    .where('id', id).first()
    const withSlug = {
        ...product,
        slug: slugify(product.name)
    }
    return withSlug
}

const getProducts = db => async() =>{
    const products = await db('products').select('*')
    const productsWithSlug = products.map((produ) => {
        withSlug = {
            ...produ,
            slug: slugify(produ.name)
        }
        return withSlug
    })
    return productsWithSlug
}

module.exports = {
    getProductsByCategoryId,
    getProductById,
    getProducts,
}