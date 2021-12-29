/*
    This route allow to get all propositions
 */

const PropositionService = require('../../../services/propositionService');


module.exports = async (request, response) => {
    try {
        /* Get propositions */
        const propositions = await PropositionService.getAllPropositions();

        /* Check if it is empty */
        if (propositions.length < 1) {
            return response.status(204).json({error: "There is no proposition."})
        }

        return response.status(200).json({propositions});


    } catch (err) {
        console.error(err);
        return response.status(500).json({
            error: "Impossible to get all the propositions."
        })
    }
}