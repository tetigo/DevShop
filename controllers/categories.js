const categori = require('../models/category')
const product = require('../models/product')

const getCategory = db => async(req, res)=>{
    // const products = await db('products').select('*')
    // .where('id', function(){
    //     this.select('products_has_categories.products_id')
    //     .from('products_has_categories')
    //     .whereRaw('products_has_categories.products_id = products.id')
    //     .where('categories_id', req.params.id)
    // })
    
    //mais facil
    // const ligacao = await db('products_has_categories').where({categories_id: req.params.id})
    // const pro_id = ligacao.map(e=>e.products_id)
    // const produtos = await db('products').whereIn('id', pro_id)
    // res.send(produtos)

    //outra versao melhor
    // console.log(req.params.slug)
    // const categories = await db('categories').select('*')
    // const categoriesWithSlug = categories.map(category => {
    //     const newCategory = {...category, slug: slugify(category.category)  }
    //     return newCategory
    // })

    //nao precisa mais pois está em "res.locals"
    // const categoriesWithSlug = await categori.getCategories(db)()
    
    // const products = await db('products')
    //     .join('products_has_categories', 'products.id', '=', 'products_has_categories.products_id')
    //     .where('products_has_categories.categories_id', req.params.id)
    
    const productsWithSlug = await product.getProductsByCategoryId(db)(req.params.id)
    
    // const category = await db('categories').select('*')
    //     .where('id', req.params.id)
    //     .first()
    const category = await categori.getCategoryById(db)(req.params.id)

    res.render('category', {
        products: productsWithSlug, 
        //nao precisa mais pois está em "res.locals"
        // categories: categoriesWithSlug,
        category
    })
}

module.exports = {
    getCategory,
}