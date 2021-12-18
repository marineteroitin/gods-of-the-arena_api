/*
    Gladiator's controller handle all action with gladiator database object
 */

const db = require('../config/db');

/*
    Get all gladiators that belong to a given gladiator type.
 */
const getAllGladiators = async (id_gladiatorType) => {
    try {
        const {rows} = await db.query('SELECT * FROM "gladiator" WHERE "id_gladiatorType" = $1', [id_gladiatorType])
        return rows;

    } catch (error) {
        throw error;
    }
}

module.exports = {
    getAllGladiators
}