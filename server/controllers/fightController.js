/*
    Fight controller handle all actions with weapon database object
 */

const db = require('../config/db');

/*
    Create a fight
 */

const createFight = async () => {
    try {
        const { rows } = await db.query('INSERT INTO "fight" ("date_fight") VALUES (NOW()) RETURNING *')
        return rows[0];

    } catch (error) {
        throw error;
    }
}

module.exports = {
    createFight
}