/*
    Participant service handle all actions with participant database object
 */

const db = require('../config/db');

/*
    Create a participant
 */

const createParticipant = async (id_fight, id_gladiator, id_weapon) => {
    try {
        const { rows } = await db.query('INSERT INTO "participant" ("id_fight", "id_gladiator", "id_weapon") VALUES ($1, $2, $3) RETURNING *', [id_fight, id_gladiator, id_weapon])
        return rows[0];

    } catch (error) {
        throw error;
    }
}

module.exports = {
    createParticipant
}