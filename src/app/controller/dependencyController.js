const { redirect } = require("express/lib/response")
const Dependencies = require("../model/dependencyModel")

module.exports = {

    list: function (req, res) {
        Dependencies.get(req.con,
            function (err, rows) {
                if (err) console.error(err)
                console.table(rows)
                res.render("dependencies", { dependencies: rows })
            })
    },

    create: function (req, res) {
        console.log(req.body)
        Dependencies.create(req.con, req.body.dependency_name,
            function (err, rows) {
                if (err) console.error(err)
                console.table(rows)
                res.redirect("/dependencies")
            })
    },

    edit: function (req, res) {
        const id = req.params.id
        const name = req.body;

        Dependencies.update(req.con,
            id,
            name,
            function (err, rows) {
                console.table(rows)
                res.redirect("/dependencies")
            })
    },

    delete: function (req, res) {
        console.log(req.params)
        Dependencies.delete(req.con, req.params.id,
            function (err, rows) {
                console.table(rows)
                res.redirect("/dependencies")
            })
    }
}
