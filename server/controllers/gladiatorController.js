/*
    Gladiator's controller handle all actions with gladiator database object
 */

const db = require('../config/db');

/*
    Get all gladiators that belong to a given gladiator type.
 */
const getAllGladiatorsByType = async (id_gladiatorType) => {
    try {
        const {rows} = await db.query('SELECT * FROM "gladiator" WHERE "id_gladiatorType" = $1', [id_gladiatorType])
        return rows;

    } catch (error) {
        throw error;
    }
}

const getGladiatorById = async (id_gladiator) => {
    try {
        const {rows} = await db.query('SELECT * FROM "gladiator" WHERE "id_gladiator" = $1', [id_gladiator])
        return rows[0];

    } catch (error) {
        throw error;
    }
}


module.exports = {
    getAllGladiatorsByType,
    getGladiatorById
}