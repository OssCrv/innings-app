const Innings = require("../model/InningModel")

module.exports = {
    list: function (req, res) {
        Innings.getActivesOfDay(req.con,
            function (err, rows) {
                if (err) console.error(err)
                console.table(rows)

                if (rows.length == 0) return res.render("innings", { innings: [] })
                return res.render("innings", {
                    innings: rows,
                    activeSession: {
                        loggedIn: req.session.loggedIn,
                        name: req.session.name
                    }
                })
            }
        )
    },

    create: function (req, res) {
        let fkDependency
        InningName = req.body.Inning_name
        dependencyName = req.body.dependency_name

        Dependencies.get(req.con, (err, rows) => {
            if (err) console.error(err)
            fkDependency = rows.filter(dependency => {
                return dependency.dependency_name == req.body.dependency_name
            }).map(dependency => dependency.id_dependency)

            Innings.create(req.con, fkDependency, InningName, (err, rows) => {
                if (err) console.error(err)
                res.redirect("/Innings")
            })
        })

    },

    edit: function (req, res) {
        const id = req.params.id
        const name = req.body.Inning_name;


        Innings.update(req.con, id, name, function (err, rows) {
            console.table(rows)
            res.redirect("/Innings")
        })
    },

    delete: function (req, res) {
        Innings.delete(req.con, req.params.id,
            function (err, rows) {
                if (err) console.error(err)
                res.redirect("/Innings")
            })
    },

    getByDependency: function (req, res) {
        Innings.getByDependency(req.con, req.params.fk, (err, rows) => {
            if (err) console.error(err)

            res.render("indexInnings", {
                Innings: rows, fkDependency: req.params.fk, activeSession: {
                    loggedIn: req.session.loggedIn,
                    name: req.session.name
                }
            })
        })
    },

    arrive: function (req, res) {
        res.render("arrive", {
            fkDependency: req.params.fkDependency, fkCategory: req.params.fkCategory, activeSession: {
                loggedIn: req.session.loggedIn,
                name: req.session.name
            }
        });
    },

    getInning: function (req, res) {

        let inningNumber = 0;
        let inning = {};

        inning.fk_dependency = req.params.fkDependency
        inning.fk_category = req.params.fkCategory
        inning.document = req.body.document;

        Innings.getActivesOfDayByCategory(req.con, inning.fk_category, (err, rows) => {
            if (err) console.error(err)

            if (rows.length != 0) {
                inningNumber = rows[0].inning
                inning.dependency_name =  rows[0].dependency_name
                inning.category_name =  rows[0].category_name
            }
            inning.inning = inningNumber + 1

            Innings.create(req.con, inning, (err, rows) => {
                if (err) console.error(err)
                console.table(rows)
                res.render("getInning", {
                    inning: inning, activeSession: {
                        loggedIn: req.session.loggedIn,
                        name: req.session.name
                    }
                }); //Redirect a categories/fk
            })
        })
    }
}
