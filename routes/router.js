const { Router } = require('express');
const router = Router();
const cartContr = require('../controllers/CartControlller')
const shopContr = require('../controllers/ShopController')
const mid = require('../middleware/sortShop')


router
    .route('/')
    .get( shopContr.RenderShopPage )
    .post( mid.sortShop, shopContr.addToCart )


router
    .route('/cart')
    .get( cartContr.RenderCart )

router.post('/order', cartContr.CreateOrder)
router.post('/add', cartContr.addItem)
router.post('/delete', cartContr.deleteItem)

module.exports = router;