module.exports = {
    getAll: function (con, callback) {
        con.query(`
        SELECT id_inning, document, inning, active, date_creation, category_name, dependency_name 
        FROM innings
            JOIN categories
            ON innings.fk_category = categories.id_category
            JOIN dependencies
            ON innings.fk_dependency = dependencies.id_dependency;`,
            callback)
    },

    getById: function (con, id, callback) {
        con.query(`SELECT * FROM innings WHERE id_inning=${id}`, callback)
    },

    create: function (con, inning, callback) {
        con.query(`
            INSERT INTO innings(document, inning, fk_dependency, fk_category) 
            VALUES (${inning.document}, ${inning.inning}, ${inning.fk_dependency}, ${inning.fk_category})`,
            callback
        )
    },

    delete: function (con, id, callback) {
        con.query(`DELETE FROM categories WHERE id_category=${id}`, callback)
    },

    deactivate: function (con, id, callback) {
        con.query(`
        UPDATE innings 
        SET active=0
        WHERE id_category=${id};`, callback)
    },
    
    activate: function (con, id, callback) {
        con.query(`
        UPDATE innings 
        SET active=1
        WHERE id_category=${id};`, callback)
    },
}