/*
    This route allow to delete a proposition according a given id
 */

const PropositionService = require('../../../services/propositionService');

module.exports = async (request, response) => {
    try {
        const id_proposition = request.params.id;

        /* delete the propositon */
        const deletedProposition = await PropositionService.deleteProposition(id_proposition);
        return response.status(200).json({message: "Proposition " + deletedProposition.id_proposition + " deleted."});

    } catch (err) {
        console.error(err);
        return response.status(500).json({
            error: "Impossible to delete this proposition."
        })
    }
}