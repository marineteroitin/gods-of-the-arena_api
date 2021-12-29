/*
    Gladiator's service handle all actions with gladiator database object
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

/*
   Get all animals
 */
const getAllAnimals = async () => {
    try {
        const {rows} = await db.query('SELECT * FROM "gladiator" WHERE "id_gladiatorType" = (SELECT "id_gladiatorType" FROM "gladiatorType" WHERE "name_gladiatorType" = \'Animal\')')
        return rows;
    } catch (error) {
        throw error;
    }
}


/*
     Get a gladiator according to his id
 */
const getGladiatorById = async (id_gladiator) => {
    try {
        const {rows} = await db.query('SELECT * FROM "gladiator" WHERE "id_gladiator" = $1', [id_gladiator])
        return rows[0];

    } catch (error) {
        throw error;
    }
}

/*
    According to a list of gladiator ids, get the ids of those who are not animals
 */
const getNotAnimalsInList = async (idsList) => {
    try {
        const {rows} = await db.query('SELECT "id_gladiator" FROM "gladiator" WHERE "id_gladiator" = ANY($1::int[]) ' +
            'AND "id_gladiatorType" != (SELECT "id_gladiatorType" FROM "gladiatorType" WHERE "name_gladiatorType" = \'Animal\') ',
            [idsList]);

        const res = [];
        for (const r of rows) {
            res.push(r.id_gladiator)
        }

        return res;
    } catch (error) {
        throw error;
    }
}


module.exports = {
    getAllGladiatorsByType,
    getAllAnimals,
    getGladiatorById,
    getNotAnimalsInList
}