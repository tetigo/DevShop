

const getIndex = async(req,res)=>{
    // const categoriesWithSlug = await categori.getCategories(db)()
    res.render('home', {
        //nao precisa mais pois está em "res.locals"
        // categories: categoriesWithSlug
    })
}

module.exports = {
    getIndex,
}