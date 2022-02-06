const Dependencies = require("../model/dependencyModel")

module.exports = {

    list: function (req, res) {
        Dependencies.get(req.con, function (err, rows) {
            console.log(rows)
            res.render("index", { title: "Listado" })
        })
    },

    create: function (req, res) {
        console.log(req.body)
        Dependencies.create(req.con, req.body.dependency_name, function (err, rows) {
            if(err) console.error(err)

            console.table(rows)
            res.render("index", { title: "Creado" })
        })
    },

    store: function (req, res) {
        Dependencies.get(req.con, function (err, rows) {
            console.log(rows)
            res.render("index", { title: "Listado" })
        })
    },

    edit: function (req, res) {
        Dependencies.get(req.con, function (err, rows) {
            console.log(rows)
            res.render("index", { title: "Listado" })
        })
    },

    update: function (req, res) {
        Dependencies.get(req.con, function (err, rows) {
            console.log(rows)
            res.render("index", { title: "Listado" })
        })
    },

    destroy: function (req, res) {
        Dependencies.get(req.con, function (err, rows) {
            console.log(rows)
            res.render("index", { title: "Listado" })
        })
    }
}
