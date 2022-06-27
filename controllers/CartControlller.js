const session = require('express-session');
const Item = require('../models/Item')
const Order = require('../models/Order')


class CartController{
    
    async RenderCart(req, res){
        try{
            let count = {};
            for (let item of session.items) {
                if (count[item] === undefined) {
                count[item] = 1;
                } else {
                count[item]++;
                }
            }
            
            let readyList = [];
            let totalPrice = 0;
            for(let key in count){
                const item = await Item.findById(key)
                const readyItem = itemConverter(item, count[key])
                totalPrice += readyItem.price * readyItem.count
                readyList.push(readyItem)
            }
            session.readyItems = readyList
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
                listOfProducts: session.readyItems,
                totalPrice: session.totalPrice
            })

            await order.save();
            
            session.readyItems = []
            session.totalPrice = 0
            session.items = []

            return res.redirect('/')
        }catch(e){
            console.log(e)
        }
    }

    async addItem(req, res){
        try{
            for(let item of session.readyItems){
                if(item._id.toString() === req.body.id){
                    let newCount = item.count + 1
                    let newItem = itemConverter(item, newCount)
                    item.count = newItem.count
                    item.sum = newItem.sum
                    session.totalPrice += item.price
                }
            }

            return res.render('cart', {layout: 'index', itemList: session.readyItems, totalPrice: session.totalPrice});

        }catch(e){
            console.log(e)
        }
    }

    async deleteItem(req, res){
        try{
            for(let item of session.readyItems){
                if(item._id.toString() === req.body.id){
                    if(item.count == 1){
                        session.readyItems.splice(session.readyItems.indexOf(item), 1)
                        session.totalPrice -= item.price
                    }else{
                        let newCount = item.count - 1
                        let newItem = itemConverter(item, newCount)
                        item.count = newItem.count
                        item.sum = newItem.sum
                        session.totalPrice -= item.price
                    }
                }
            }

            return res.render('cart', {layout: 'index', itemList: session.readyItems, totalPrice: session.totalPrice});

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