const product = require('../models/product')

const getProduct = db => async(req,res)=>{
    // const categoriesWithSlug = await categori.getCategories(db)()
    const productWithSlug = await product.getProductById(db)(req.params.id)
    console.log(productWithSlug)
    res.render('product-detail', {
        //nao precisa mais pois está em "res.locals"
        // categories: categoriesWithSlug,
        product: productWithSlug, 
    })
}

module.exports = {
    getProduct,
}
