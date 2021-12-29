/*
    This route allow to get all gladiators that belong to a given gladiator type.
 */

const GladiatorService = require('../../../services/gladiatorService');

module.exports = async (request, response) => {
    try {
        const id_gladiatorType = request.params.id;

        /* Get gladiator's */
        const gladiators = await GladiatorService.getAllGladiatorsByType(id_gladiatorType);

        /* Check if it is empty */
        if (gladiators.length < 1) {
            return response.status(204).json({error: "There is no gladiator corresponding to this type."})
        }
        return response.status(200).json({gladiators});


    } catch (err) {
        console.error(err);
        return response.status(500).json({
            error: "Impossible to get gladiators of this type."
        })
    }
}