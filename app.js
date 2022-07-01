require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./routes/router');
const handlebars = require('express-handlebars')
const mongoose = require('mongoose');

const session = require('express-session');
const MongoStore = require('connect-mongo');

const PORT = process.env.PORT || 3000;


app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 60 * 60 * 24 * 1000 },
    saveUninitialized: true,
    resave: false,
    store: MongoStore.create({
        mongoUrl: process.env.DATABASE_URI,
        collectionName: 'sessions'
    }) 
}))

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(router);


app.set('view engine', 'hbs');
app.set('views', './views');

app.engine(
    'hbs',
    handlebars.engine({ 
        defaultLayout: 'index',
        extname: 'hbs',
        layoutsDir: `${__dirname}/views/layouts`
}))


const start = async() => {
    try{
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        }).then(() => { console.log("mongo connected") })
        app.listen(PORT, ()=>{
            session.items = {};
            console.log(session);
            console.log(`Server start on ${PORT}`);
        })

    } catch (e) {
        console.log(e);
    }
}

start();