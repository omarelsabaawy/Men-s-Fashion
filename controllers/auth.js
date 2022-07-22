const User = require('../models/auth');
const bcrypt = require('bcryptjs');

exports.postNewUser = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const number = req.body.number;
    const password = req.body.username;
    User.findOne({ email: email })
        .then(userDoc => {
            if (userDoc) {
                return res.redirect('/CreateAccount');
            }
            return bcrypt
                .hash(password, 12)
                .then(hashedPassword => {
                    const user = new User({
                        email: email,
                        username: username,
                        number: number,
                        password: hashedPassword,
                        cart: { items: [] }
                    });
                    return user.save();
                })
                .then(result => {
                    res.redirect('/signIn');
                });
        })
        .catch(err => {
            console.log(err);
        });
};