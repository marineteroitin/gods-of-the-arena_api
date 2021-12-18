/*
    This route allow to create a propositon with two type of gladiator and an optional animal
 */

const PropositionController = require('../../../controllers/propositionController');


module.exports = async (request, response) => {
    try {

        let { gladiatorType1, gladiatorType2, animal } = request.body;

        /* Check inputs */
        if(!animal){
            animal = false //default value;
        }

        if(!gladiatorType1 || !gladiatorType2){
            return response.status(400).json({ error: "You have to give 2 types of gladiators" });
        } else {
            /*
            Create the proposition
             */
            const proposition = await PropositionController.createProposition(gladiatorType1, gladiatorType2, animal)
            return response.status(201).json({proposition})
        }

    } catch (err) {
        return response.status(500).json({
            error: "Impossible to create this proposition.", err
        })
    }
}
