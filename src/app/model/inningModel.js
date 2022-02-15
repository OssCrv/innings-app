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

    getByDependency: function (con, fk, callback) {
        con.query(`
        SELECT *
        FROM innings
            JOIN dependencies
            ON innings.fk_dependency = dependencies.id_dependency
        WHERE innings.fk_dependency = 1?;`,
            [fk],
            callback)
    },

    getByDependencyAndCategory: function (con, fk_dependency, fk_category, callback) {
        con.query(`
        SELECT *
        FROM innings
            JOIN categories
            ON innings.fk_category = categories.id_category
            JOIN dependencies
            ON innings.fk_dependency = dependencies.id_dependency
        WHERE innings.fk_dependency = ? AND innings.fk_category = ?;`,
            [fk_dependency, fk_category],
            callback)
    },


    getById: function (con, id, callback) {
        con.query(`SELECT * FROM innings WHERE id_inning=${id}`, callback)
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

    create: function (con, inning, callback) {
        con.query(`
            INSERT INTO innings(document, inning, fk_dependency, fk_category) 
            VALUES (${inning.document}, ${inning.inning}, ${inning.fk_dependency}, ${inning.fk_category})`,
            callback
        )
    },

    deactivePastInnings: function (con, callback) {
        con.query(`UPDATE innings SET active=0 WHERE DAY(date_creation)<DAY(CURDATE()) AND ACTIVE;`,
            callback)
    },

    getActivesOfDay: function (con, callback) {
        con.query(`SELECT * FROM innings WHERE DAY(date_creation)>=DAY(CURDATE()) AND ACTIVE ORDER BY inning DESC;`,
            callback)
    },

    getInningsofDay: function (con, inning, callback) {
        con.query(`SELECT * FROM innings WHERE DAY(date_creation)>=DAY(CURDATE()) ORDER BY inning DESC;`,
            callback)
    },

    getActivesOfDayByCategory: function (con, fk, callback) {
        con.query(`SELECT * FROM innings WHERE DAY(date_creation)>=DAY(CURDATE()) AND ACTIVE AND fk_category = ${fk} ORDER BY inning DESC;`,
            callback)
    }

}