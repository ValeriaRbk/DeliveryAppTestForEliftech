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
            session.items.push(req.body.id)

            return res.redirect('/')
        }catch(e){
            console.log(e)
        }
    }

    async RenderSomeShop(req, res){
        try{
            console.log(req.body.shop)
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
