/*
    Gladiator's type controller handle all action with gladiatorType database object
 */

const db = require('../config/db');


/*
    Get all different types of gladiators from Animal.
 */
const getAllGladiatorType = async () => {
    try {
        const {rows} = await db.query('SELECT * FROM "gladiatorType" WHERE "name_gladiatorType" != \'Animal\'')
        return rows;

    } catch (error) {
        throw error;
    }
}

module.exports = {
        getAllGladiatorType
}

