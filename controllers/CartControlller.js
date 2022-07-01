const session = require('express-session');
const Item = require('../models/Item')
const Order = require('../models/Order')


class CartController{
    
    async RenderCart(req, res){
        try{
            let readyList = [];

            let totalPrice = 0;

            for(let key in session.items){
                const item = await Item.findById(key)
                const readyItem = itemConverter(item, session.items[key])
                totalPrice += readyItem.price * readyItem.count
                readyList.push(readyItem);
            }

            console.log("readyList")
            console.log(readyList)
            session.orderItems = readyList
            session.totalPrice = totalPrice
            
            return res.render('cart', {layout: 'index', itemList: readyList, totalPrice: totalPrice});
        }catch(e){
            console.log(e)
        }
    }

    async CreateOrder(req, res){
        try{
            const { name, surname, email, phone, address, note } = req.body;


            const order = new Order({
                firstname: name,
                lastname: surname,
                email: email,
                phone: phone,
                address: address,
                note: note,
                listOfProducts: session.orderItems,
                totalPrice: session.totalPrice
            })

            await order.save();
            
            session.orderItems = []
            session.totalPrice = 0
            session.items = {}

            return res.render('cart', {layout: 'index', itemList: session.orderItems, totalPrice: session.totalPrice});
        }catch(e){
            console.log(e)
        }
    }

    async addItem(req, res){
        try{
            for(let key in session.items){
                if(key === req.body.id){
                    session.items[key]++
                }
            }

            return res.redirect('/cart');

        }catch(e){
            console.log(e)
        }
    }

    async deleteItem(req, res){
        try{
            
            for(let key in session.items){
                if(key === req.body.id){
                    if(session.items[key] == 1){
                        delete session.items[key]
                    }else{
                        session.items[key]--
                    }
                }
            }

            return res.redirect('/cart');

        }catch(e){
            console.log(e)
        }
    }
}

function itemConverter(i, count){
    let item = {}
    item.name = i.name
    item.img = i.img
    item._id = i._id
    item.shop = i.shop
    item.price = i.price
    item.count = count
    item.sum = item.price * item.count

    return item;
}

module.exports = new CartController();