const Categories = require("../model/categoryModel")
const Dependencies = require("../model/dependencyModel")

module.exports = {
    list: function (req, res) {
        Categories.getAll(req.con,
            function (err, rows) {
                if (err) console.error(err)
                let categories = rows

                Dependencies.get(req.con, (err, rows) => {
                    if (err) console.error(err)
                    let dependencies = rows.map(row => row.dependency_name)

                    res.render("categories", { categories: categories, dependencies: dependencies })
                })
            }
        )
    },

    create: function (req, res) {
        let fkDependency
        categoryName = req.body.category_name
        dependencyName = req.body.dependency_name

        Dependencies.get(req.con, (err, rows) => {
            if (err) console.error(err)
            fkDependency = rows.filter(dependency => {
                return dependency.dependency_name == req.body.dependency_name
            }).map(dependency => dependency.id_dependency)

            Categories.create(req.con, fkDependency, categoryName, (err, rows) => {
                if (err) console.error(err)
                res.redirect("/categories")
            })
        })

    },

    edit: function (req, res) {
        console.log(req.body.category_name)
        const id = req.params.id
        const name = req.body.category_name;

        console.log(name)

        Categories.update(req.con, id, name, function (err, rows) {
            console.table(rows)
            res.redirect("/categories")
        })
    },

    delete: function (req, res) {
        Categories.delete(req.con, req.params.id,
            function (err, rows) {
                if (err) console.error(err)
                res.redirect("/categories")
            })
    },

    getByDependency: function (req, res) {
        Categories.getByDependency(req.con, req.params.fk, (err, rows) => {
            if (err) console.error(err)

            res.render("indexCategories", { categories: rows, fkDependency: req.params.fk })
        } )
    }
}
