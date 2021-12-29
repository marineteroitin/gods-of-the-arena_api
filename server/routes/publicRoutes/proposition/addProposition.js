/*
    This route allow to create a propositon with two type of gladiator and an optional animal.
    - You have to give the id of two types of gladiators (gladiatorType1, gladiatorType2).
    - Animal is a boolean, false by default.
 */

const PropositionService = require('../../../services/propositionService');


module.exports = async (request, response) => {
    try {

        let {gladiatorType1, gladiatorType2, animal} = request.body;

        /* Create the proposition */
        const proposition = await PropositionService.createProposition(gladiatorType1, gladiatorType2, animal)
        return response.status(201).json({proposition})


    } catch (err) {
        console.error(err);
        return response.status(500).json({
            error: "Impossible to create this proposition.", err
        })
    }
}
