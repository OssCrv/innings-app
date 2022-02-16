const Innings = require("../model/InningModel")

module.exports = {
    list: function (req, res) {
        Innings.getActivesOfDay(req.con,
            function (err, rows) {
                if (err) console.error(err)
                console.table(rows)

                if (rows.length == 0) return res.render("innings", { innings: [] })
                return res.render("innings", { innings: rows })
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
        console.log(req.body.Inning_name)
        const id = req.params.id
        const name = req.body.Inning_name;

        console.log(name)

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

            res.render("indexInnings", { Innings: rows, fkDependency: req.params.fk })
        })
    },

    arrive: function (req, res) {
        //console.log(req.params) //=>{ fkDependency: '1', fkCategory: '1' }
        res.render("arrive", { fkDependency: req.params.fkDependency, fkCategory: req.params.fkCategory });
    },

    getInning: function (req, res) {

        let inningNumber = 0;
        let inning = {};

        inning.fk_dependency = req.params.fkDependency
        inning.fk_category = req.params.fkCategory
        inning.document = req.body.document;

        Innings.getActivesOfDayByCategory(req.con, inning.fk_category, (err, rows) => {
            if (err) console.error(err)
            console.log(rows)

            if (rows.length != 0) inningNumber = rows[0].inning
            console.log(inningNumber)
            inning.inning = inningNumber + 1

            Innings.create(req.con, inning, (err, rows) => {
                if (err) console.error(err)
                console.table(rows)
                res.render("getInning", { inning: inning }); //Redirect a categories/fk
            })
        })
    }
}
