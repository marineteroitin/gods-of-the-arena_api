/*
    Fight service handle all actions with weapon database object
 */

const db = require('../config/db');

const PropositionService = require('../services/propositionService');
const GladiatorService = require('../services/gladiatorService');
const WeaponService = require('../services/weaponService');

/*
    Create a fight
 */

const createFight = async (id_proposition, gladiator1, gladiator2, animals) => {
    try {
        /* check we have the id of the corresponding proposition */
        if (!id_proposition) {
            throw ("You need to provide the id of the corresponding proposition to create a fight");
        }

        /* Get the corresponding proposition */
        const proposition = await PropositionService.getPropositionById(id_proposition);

        if (!proposition) {
            throw ("You need to provide an existing proposition.");
        }

        /* check gladiators conditions */
        await gladiatorConditions(gladiator1, gladiator2, proposition)

        /* check animals conditions*/
        await animalConditions(animals, proposition);

        const {rows} = await db.query('INSERT INTO "fight" ("date_fight") VALUES (NOW()) RETURNING *')
        return rows[0];

    } catch (error) {
        throw error;
    }
}

const gladiatorConditions = async (participant1, participant2, proposition) => {

    /* check if we have 2 gladiators */
    if (!participant1 || !participant2) {
        throw ("You need to provide 2 gladiators");
    }

    /* get the gladiators*/
    const gladiator1 = await GladiatorService.getGladiatorById(participant1.id_gladiator);
    const gladiator2 = await GladiatorService.getGladiatorById(participant2.id_gladiator);

    /* participants must correspond to the requested types */
    if (!(proposition.gladiatorType1 === gladiator1.id_gladiatorType
            && proposition.gladiatorType2 === gladiator2.id_gladiatorType)
        && !(proposition.gladiatorType1 === gladiator2.id_gladiatorType
            && proposition.gladiatorType2 === gladiator1.id_gladiatorType)) {
        throw ("Participants must correspond to the requested types in the proposition");
    }

    /* check the weapon conditions */
    try {
        await weaponConditions(participant1, gladiator1);
        await weaponConditions(participant2, gladiator2);
    } catch (err) {
        throw err;
    }
}


const weaponConditions = async (participant, gladiator) => {

    if (!gladiator.customization) {
        participant.id_weapon = null // he is not allowed to have a customized weapon

    } else {

        if (!participant.id_weapon) { // case missing weapon
            throw ("You need to provide the weapon's id for the gladiator: " + participant.id_gladiator);
        }

        /* check if this gladiator can use the chosen weapon */
        const weapons = await WeaponService.getIdWeaponsByGladiatorType(gladiator.id_gladiatorType);

        let index = 0;
        let canUseIt = false;

        while (index < weapons.length && !canUseIt) {
            if (weapons[index] === participant.id_weapon) {
                canUseIt = true;
            }
            index++;
        }

        if (!canUseIt) {
            throw ("The gladiator " + participant.id_gladiator + " is not allowed to use the weapon " + participant.id_weapon + ".");
        }
    }

}

const animalConditions = async (animals, proposition) => {

    if (!proposition.animal && animals.length > 0) {
        throw ("This proposal did not require animals");
    }

    if (proposition.animal && animals.length > 5) {
        throw ("You can't choose more than 5 animals.");
    }

    if (animals.length !== 0) {
        /* check it is a list of animals */
        let notAnimals = await GladiatorService.getNotAnimalsInList(animals);

        if (notAnimals.length > 0) {
            throw ("Gladiators " + notAnimals + " is/are not animal(s).");
        }
    }


}


/*
    Get today's fights with all information concerning the participants.
 */
const getTodaysFights = async () => {
    try {
        const {rows} = await db.query('SELECT fight.id_fight, gladiator.name_gladiator, weapon.name_weapon, "gladiatorType"."name_gladiatorType" FROM "fight" INNER JOIN "participant" ON participant.id_fight = fight.id_fight INNER JOIN "gladiator" ON gladiator.id_gladiator = participant.id_gladiator LEFT JOIN "weapon" ON participant.id_weapon = weapon.id_weapon INNER JOIN "gladiatorType" ON "gladiator"."id_gladiatorType" = "gladiatorType"."id_gladiatorType" WHERE DATE("date_fight") = NOW()::date ORDER BY fight.date_fight ASC')

        /* if there are fights, I group the participants by fight */
        if (rows.length > 1) {
            let init = true;
            let fights = [];
            let currentFight = -1;
            let participants = [];
            rows.map((row, index) => {
                if (init) { //init
                    currentFight = row.id_fight;
                    init = false
                }

                if (row.id_fight !== currentFight) { // next fight

                    // add previous fight to result
                    fights.push({
                        "id_fight": currentFight,
                        "participants": participants
                    })

                    //init variable
                    participants = [];

                    //next fight
                    currentFight = row.id_fight;
                }

                participants.push(
                    {
                        "name_gladiator": row.name_gladiator,
                        "name_weapon": row.name_weapon,
                        "name_gladiatorType": row.name_gladiatorType
                    }
                )

                if(index === rows.length -1){ // end case
                    fights.push({
                        "id_fight": currentFight,
                        "participants": participants
                    })
                }


            })
            return fights;
        }

        return rows;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createFight,
    getTodaysFights
}