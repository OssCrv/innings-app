module.exports = {
    getAll: function (con, callback) {
        con.query(`
        SELECT id_category, category_name, dependency_name, id_dependency 
        FROM categories
            JOIN dependencies
            ON categories.fk_dependency = dependencies.id_dependency;`,
            callback)
    },

    getById: function (con, id, callback) {
        con.query(`SELECT * FROM categories WHERE id_category=${id}`, callback)
    },

    create: function (con, fk_dependency, category_name, callback) {
        con.query(`
            INSERT INTO categories(category_name, fk_dependency) 
            VALUES ("${category_name}", ${fk_dependency})`,
            callback
        )
    },

    update: function (con, id, category_name, callback) {
        con.query(`
        UPDATE categories 
        SET category_name=?
        WHERE id_category=?;
        `, [category_name, id], callback)
    },

    delete: function (con, id, callback) {
        con.query(`DELETE FROM categories WHERE id_category=${id}`, callback)
    },

    getByDependency: function (con, fk, callback) {
        con.query(`SELECT * FROM categories WHERE fk_dependency=${fk};`, callback)
    }
}