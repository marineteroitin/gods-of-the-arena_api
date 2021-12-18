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

/*
    Get all propositions
 */

const getAllPropositions = async () => {
    try {
        const {rows} = await db.query('SELECT * FROM "proposition"')
        return rows;
    } catch (error) {
        throw error;
    }
}

/*
    delete a proposition according to a given id
 */


const deleteProposition = async (id_proposition) => {
    try{
        const {rows} = await db.query('DELETE FROM "proposition" WHERE "id_proposition" = $1 RETURNING *', [id_proposition])
        return rows[0];

    } catch (error) {
        throw error;
    }
}

module.exports = {
    createProposition,
    getAllPropositions,
    deleteProposition
}