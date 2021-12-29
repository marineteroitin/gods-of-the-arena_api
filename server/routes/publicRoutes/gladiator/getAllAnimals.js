/*
    This route allow to get the gladiators who are animals
 */

const GladiatorService = require('../../../services/gladiatorService');

module.exports = async (request, response) => {
    try {
        /* Get gladiator's */
        const animals = await GladiatorService.getAllAnimals();

        /* Check if it is empty */
        if (animals.length < 1) {
            return response.status(204).json({error: "There is no animals."})
        }
        return response.status(200).json({animals});

    } catch (err) {
        console.error(err);
        return response.status(500).json({
            error: "Impossible to get gladiators of type Animal."
        })
    }
}