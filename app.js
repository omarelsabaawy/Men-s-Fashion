const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const path = require('path');

const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');
const homeRoutes = require('./routes/home');

app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join('public')));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/admin', adminRoutes.routes);
// app.use('/shop', shopRoutes.routes);
app.use(homeRoutes.routes);
app.use((req, res, next) => {
    res.status(404).render('404');
});

// mongoConnect(() => {
//     app.listen(8000);
// });

mongoose
    .connect(
        'mongodb+srv://LinkedItems:mS2uLLYXJzmlCUGD@cluster0.o1vgy.mongodb.net/shop?retryWrites=true'
    )
    .then(result => {
        console.log('Connected!');
        app.listen(8000);
    }).catch(err => {
        console.log(err);
    });