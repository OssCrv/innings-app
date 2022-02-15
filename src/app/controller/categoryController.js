const Categories = require("../model/categoryModel")
const Dependencies = require("../model/dependencyModel")
const Innings = require("../model/inningModel.js")


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
            let data = [];
            let categories = rows;
            rows.forEach(category => {
                let aux = {}
                aux.category = category
                aux.innings = []
                data.push(aux)
            })

            console.table(data)

            Innings.getActivesOfDay(req.con, (err, rows) => {
                if (err) console.error(err)


                rows.forEach(inning => {
                    data.forEach(object => {
                        if (object.category.id_category == inning.fk_category) {
                            object.innings.push(inning)
                        }
                    })
                })

                res.render("indexCategories", {
                    inningsByCategory: data,
                    fkDependency: req.params.fk,
                })
            })
        })
    }
}
