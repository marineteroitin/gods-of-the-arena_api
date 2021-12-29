/*
    This route allow to get all different types of gladiators from Animal
 */

const GladiatorTypeService = require('../../../services/gladiatorTypeService');

module.exports = async (request, response) => {
    try {
        /* Get gladiator's type */
        const gladiatorType = await GladiatorTypeService.getAllGladiatorType();

        /* Check if it is empty */
        if (gladiatorType.length < 1) {
            return response.status(204).json({error: "The is no gladiator's type."})
        }
        return response.status(200).json({gladiatorType});


    } catch (err) {
        console.error(err);
        return response.status(500).json({
            error: "Impossible to get the different types of gladiators.", err
        })
    }
}