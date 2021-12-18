/*
    This route allow to get all gladiators that belong to a given gladiator type.
 */

const GladiatorController = require('../../../controllers/gladiatorController');

module.exports = async (request, response) => {
    try{
        const  id_gladiatorType  = request.params.id;

        /* Check params */
        if(!id_gladiatorType){
            return response.status(400).json({ error: "You need to provide the id of the gladiatorType." });

        } else {

            /* Get gladiator's */
            const gladiatorType = await GladiatorController.getAllGladiatorsByType(id_gladiatorType);

            /* Check if it is empty */
            if (gladiatorType.length < 1) {
                return response.status(204).json({error: "The is no gladiator corresponding to this type."})
            } else {
                return response.status(200).json({gladiatorType});
            }
        }
    } catch (err) {
        return response.status(500).json({
            error: "Impossible to get gladiators of this type.", err
        })
    }
}