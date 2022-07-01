const session = require('express-session');
const Item = require('../models/Item')
const Shop = require('../models/Shop')


class ShopController{
    async RenderShopPage(req, res){
        try{
            const itemList = await Item.find({});
            const shopList = await Shop.find({});
            const readyItemList = itemListConverter(itemList);
            const readyShopList = shopListConverter(shopList);
            

            return res.render('shop', {layout: 'index', itemList: readyItemList, shopList: readyShopList })
        }catch(e){
            console.log(e);
        }
    }

    async addToCart(req, res){
        try{
            let products = []
            let count = {};

            for(let key in session.items){
                for(let i = 0; i < session.items[key]; i++){
                    products.push(key)
                }
            }
            products.push(req.body.id);
            
            for (let item of products) {
                if (count[item] === undefined) {
                    count[item] = 1;
                } else {
                    count[item]++;
                }
            }

            session.items = count
            
            console.log("Count")
            console.log(count)
            console.log("Products")
            console.log(products)
            console.log("Sessions items")
            console.log(session.items)

            return res.redirect('/')
        }catch(e){
            console.log(e)
        }
    }

    async RenderSomeShop(req, res){
        try{
            const thisShop = await Shop.findById(req.body.shop)
            const shops = await Shop.find({});
            const shopItems = await Item.find({shop: thisShop._id })
            const readyItemsList = itemListConverter(shopItems);
            const readyShops = shopListConverter(shops);
            console.log(thisShop)
            console.log(shopItems)
            
            return res.render('shop', {layout: 'index', itemList: readyItemsList, shopList: readyShops })
        }catch(e){
            console.log(e)
        }
    }

}

module.exports = new ShopController();

function itemListConverter(itemList){
    let list = []

    itemList.forEach(i => {
        let item = {}
        item.name = i.name
        item.img = i.img
        item._id = i._id
        item.shop = i.shop,
        item.price = i.price

        list.push(item);
    });
    return list;
}

function shopListConverter(shopList){
    let list = [];

    shopList.forEach(s => {
        let shop = {}
        shop.name = s.name
        shop._id = s._id
        
        list.push(shop);
    });
    return list;
}
