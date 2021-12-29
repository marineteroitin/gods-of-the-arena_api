/*
    This route allow to get all fights of the day
 */

const FightService = require('../../../services/fightService');


module.exports = async (request, response) => {
    try{
        /*
        Get today's fights with all information concerning the participants.
         */
        const fights = await FightService.getTodaysFights();

        /* Check if it's empty */
        if(fights.length < 1){
            return response.status(204).json({error: "There is no fight today."})
        }

        return response.status(200).json({fights});

    } catch(err) {
        console.error(err);
        return response.status(500).json({
            error: "Impossible to get today's fights."
        })
    }
}