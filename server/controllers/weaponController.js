/*
    Weapon's controller handle all action with weapon database object
 */

const db = require('../config/db');

/*
    Get all the weapons that can be used by a given type of gladiator.
 */

const getWeaponsByGladiatorType = async (id_gladiatorType) => {
    try {
        const {rows} = await db.query('SELECT * FROM "weapon" WHERE "id_gladiatorType" = $1', [id_gladiatorType])
        return rows;

    } catch (error) {
        throw error;
    }
}

module.exports = {
    getWeaponsByGladiatorType
}