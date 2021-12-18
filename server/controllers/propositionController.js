/*
    Proposition controller handle all action with proposition database object
 */

const db = require('../config/db');

/*
    Create a proposition
 */

const createProposition = async (gladiatorType1, gladiatorType2, animal) => {
    try {
        const { rows } = await db.query('INSERT INTO "proposition" ("gladiatorType1", "gladiatorType2", "animal") VALUES ($1, $2, $3) RETURNING *', [gladiatorType1, gladiatorType2, animal])
        return rows[0];

    } catch (error) {
        throw error;
    }
}

module.exports = {
    createProposition
}