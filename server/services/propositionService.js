/*
    Proposition service handle all actions with proposition database object
 */

const db = require('../config/db');

/*
    Create a proposition
 */

const createProposition = async (gladiatorType1, gladiatorType2, animal) => {
    try {

        /* Check inputs */
        if (!animal) {
            animal = false //default value;
        }

        if (!gladiatorType1 || !gladiatorType2) {
            throw "You have to give 2 types of gladiators";
        }

        const {rows} = await db.query('INSERT INTO "proposition" ("gladiatorType1", "gladiatorType2", "animal") VALUES ($1, $2, $3) RETURNING *', [gladiatorType1, gladiatorType2, animal])
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
        const {rows} = await db.query('SELECT id_proposition, animal,"proposition"."gladiatorType1", type1."name_gladiatorType" as name_gladiatortype1, "proposition"."gladiatorType2", type2."name_gladiatorType" as name_gladiatortype2 FROM "proposition" INNER JOIN "gladiatorType" as type1 ON "proposition"."gladiatorType1" = type1."id_gladiatorType" INNER JOIN "gladiatorType" as type2 ON  "proposition"."gladiatorType2" =  type2."id_gladiatorType"')
        return rows;
    } catch (error) {
        throw error;
    }
}

/*
    Get proposition by id
 */

const getPropositionById = async (id_proposition) => {
    try {
        const {rows} = await db.query('SELECT * FROM "proposition" WHERE "id_proposition" = $1', [id_proposition])
        return rows[0];
    } catch (error) {
        throw error;
    }
}

/*
    delete a proposition according to a given id
 */

const deleteProposition = async (id_proposition) => {
    try {
        const {rows} = await db.query('DELETE FROM "proposition" WHERE "id_proposition" = $1 RETURNING *', [id_proposition])
        return rows[0];

    } catch (error) {
        throw error;
    }
}

module.exports = {
    createProposition,
    getAllPropositions,
    getPropositionById,
    deleteProposition
}