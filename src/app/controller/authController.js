const bcryptjs = require("bcryptjs");
const auth = require('../model/authModel')

module.exports = {

    login: function (req, res) {
        res.render('login');
    },

    auth: async function (req, res) {
        console.log(req.body)
        const { user, pass } = req.body;
        auth.getByUsername(req.con, user,
            (err, result) => {
                if (err) console.error(err)
                console.log(result);

                if (result.length === 0 || !(bcryptjs.compare(pass, result[0].pass))) {
                    res.render('login');
                } else {
                    req.session.loggedIn = true;
                    req.session.name = result[0].first_name;
                    console.log(req.session)
                    res.redirect('/dependencies');
                }
            })
    },

    toRegister: function (req, res) {
        res.render('register');
        
    },
    
    register: function (req, res) {

        console.log(req.body)

        res.render('login');

    }

}
