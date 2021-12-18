/*
    This route allow to get all propositions
 */

const PropositionController = require('../../../controllers/propositionController');


module.exports = async (request,response) => {
    try {
        /* Get propositions */
        const propositions = await PropositionController.getAllPropositions();

        /* Check if it is empty */
        if(propositions.length < 1) {
            return response.status(204).json({error: "There is no proposition."})
        } else {
            return response.status(200).json({propositions});
        }
    } catch (err) {
        return response.status(500).json({
            error: "Impossible to get all the propositions.", err
        })
    }
}