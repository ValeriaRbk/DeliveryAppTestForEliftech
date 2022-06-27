const shopContr = require('../controllers/ShopController')

module.exports.sortShop = (req, res, next) =>{
    try{
        if(req.body.shop == 'all'){
            next()
        }else{
        }

    }catch(e){
        console.log(e)
    }
}