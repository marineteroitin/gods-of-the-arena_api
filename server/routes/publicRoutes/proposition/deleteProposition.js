/*
    This route allow to delete a proposition according a given id
 */

const PropositionController = require('../../../controllers/propositionController');

module.exports = async (request,response) => {
    try {
        const  id_proposition  = request.params.id;

        /* Check input */
        if(!id_proposition){
            return response.status(400).json({ error: "You need to provide the id of the proposition." });
        } else {
            /* delete the propositon */
            const deletedProposition = await PropositionController.deleteProposition(id_proposition);
            return response.status(200).json({message: "Proposition "+ deletedProposition.id_proposition +" deleted."});
        }
    } catch (err) {
        return response.status(500).json({
            error: "Impossible to delete this proposition.", err
        })
    }
}