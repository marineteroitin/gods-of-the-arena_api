/*
    This route allow to create a fight

    You need to provide:
     - the id of the corresponding proposition (id_proposition)
     - 2 participants object (id_gladiator, id_weapon ), weapon can be null
     - an animal id list (can be an empty array)
 */

const ParticipantService = require('../../../services/participantService');
const FightService = require('../../../services/fightService');
const PropositionService = require('../../../services/propositionService');


module.exports = async (request, response) => {
    try {

        let {id_proposition, gladiator1, gladiator2, animals} = request.body;

        if (!animals) {
            animals = []; // case there is no animals
        }

        /* creation of the fight */
        const fight = await FightService.createFight(id_proposition, gladiator1, gladiator2, animals);

        /* creation of the participants */
        const participants = [];

        participants.push(await ParticipantService.createParticipant(fight.id_fight, gladiator1.id_gladiator, gladiator1.id_weapon));
        participants.push(await ParticipantService.createParticipant(fight.id_fight, gladiator2.id_gladiator, gladiator2.id_weapon));

        for (let animal of animals) {
            participants.push(await ParticipantService.createParticipant(fight.id_fight, animal, null));
        }

        /* Delete the proposition.
        I guess we don't keep the history of all the proposals to avoid overloading the DB
         */

        await PropositionService.deleteProposition(id_proposition);

        return response.status(201).json({fight, participants});


    } catch (err) {
        console.error(err);
        return response.status(400).json({ status: 400, message: err });
    }
}
