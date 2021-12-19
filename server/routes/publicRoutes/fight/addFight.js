/*
    This route allow to create a fight

    You need to provide:
     - the id of the corresponding proposition (id_proposition)
     - 2 participants object (id_gladiator, id_weapon ), weapon can be null
     - an animal id list (can be an empty array)
 */

const ParticipantController = require('../../../controllers/participantController');
const FightController = require('../../../controllers/fightController');
const PropositionController = require('../../../controllers/propositionController');
const GladiatorController = require('../../../controllers/gladiatorController');
const WeaponController = require('../../../controllers/weaponController');


module.exports = async (request, response) => {
    try {

        let {id_proposition, gladiator1, gladiator2, animals} = request.body;

        /* check we have the id of the corresponding proposition */
        if (!id_proposition) {
            return response.status(400).json({error: "You need to provide the id of the corresponding proposition to create a fight"});
        } else {

            /* Get the corresponding proposition */
            const proposition = await PropositionController.getPropositionById(id_proposition);

            /* check gladiators conditions */
            if (gladiatorConditions(gladiator1, gladiator2, proposition, response)) {
                /* check animals conditions*/
                if (animalConditions(animals, proposition, response)) {

                    /* creation of the fight */
                    const fight = await FightController.createFight();

                    /* creation of the participants */
                    const participants = [];

                    participants.push(await ParticipantController.createParticipant(fight.id_fight, gladiator1.id_gladiator, gladiator1.id_weapon));
                    participants.push(await ParticipantController.createParticipant(fight.id_fight, gladiator2.id_gladiator, gladiator2.id_weapon));

                    for (let animal of animals) {
                        participants.push(await ParticipantController.createParticipant(fight.id_fight, animal, null));
                    }

                    /* Delete the proposition.
                    I guess we don't keep the history of all the proposals to avoid overloading the DB
                     */

                    await PropositionController.deleteProposition(id_proposition);

                    return response.status(201).json({fight, participants});

                }
            }

        }


    } catch (err) {
        return response.status(500).json({
            error: "Impossible to create this fight.", err
        })
    }
}

const gladiatorConditions = async (participant1, participant2, proposition, response) => {
    /* check if we have 2 gladiators */
    if (!participant1 || !participant2) {
        return response.status(400).json({error: "You need to provide 2 gladiators"});
    } else {
        /* participants must correspond to the requested types */

        /* get the gladiators*/
        const gladiator1 = await GladiatorController.getGladiatorById(participant1.id_gladiator);
        const gladiator2 = await GladiatorController.getGladiatorById(participant2.id_gladiator);


        if (!(proposition.gladiatorType1 === gladiator1.id_gladiatorType && proposition.gladiatorType2 === gladiator2.id_gladiatorType)
            && !(proposition.gladiatorType1 === gladiator2.id_gladiatorType && proposition.gladiatorType2 === gladiator1.id_gladiatorType)
        ) {
            return response.status(400).json({error: "Participants must correspond to the requested types in the proposition"});
        } else {
            /* check the weapon conditions */
            return (weaponConditions(participant1, gladiator1, response) && weaponConditions(participant2, gladiator2, response));
        }
    }
}


const weaponConditions = async (participant, gladiator, response) => {

    if (!gladiator.customization) {
        participant.id_weapon = null // he is not allowed to have a customized weapon
        return true;
    } else {
        if (!participant.id_weapon) { // case missing weapon
            return response.status(400).json({error: "You need to provide the weapon's id for the gladiator: " + participant.id_gladiator});
        } else {
            /* check if this gladiator can use the chosen weapon */
            const weapons = await WeaponController.getIdWeaponsByGladiatorType(gladiator.id_gladiatorType);
            console.log(weapons);

            for (const w of weapons) {
                if (w.id_weapon === participant.id_weapon) {
                    return true;
                }
            }

            return response.status(400).json({error: "The gladiator " + participant.id_gladiator + " is not allowed to use the weapon " + participant.id_weapon + "."});

        }
    }
}

const animalConditions = (animal, proposition, response) => {
    if (!proposition.animal && animal.length > 0) {
        return response.status(400).json({error: "This proposal did not require animals"});
    } else {
        if (proposition.animal && animal.length > 5) {
            return response.status(400).json({error: "You can't choose more than 5 animals."});
        } else {
            return true;
        }
    }
}
