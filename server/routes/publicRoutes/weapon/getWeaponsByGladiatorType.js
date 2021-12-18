/*
    This route allow to get all the weapons that can be used by a given type of gladiator.
 */

const WeaponController = require('../../../controllers/weaponController');

module.exports = async (request, response) => {
    try{
        const  id_gladiatorType  = request.params.id;

        /* Check params */
        if(!id_gladiatorType){
            return response.status(400).json({ error: "You need to provide the id of the gladiatorType." });

        } else {

            /* Get weapons */
            const weapons = await WeaponController.getWeaponsByGladiatorType(id_gladiatorType);

            /* Check if it is empty */
            if (weapons.length < 1) {
                return response.status(204).json({error: "The is no weapons that can be used by this type of gladiator."})
            } else {
                return response.status(200).json({weapons});
            }
        }
    } catch (err) {
        return response.status(500).json({
            error: "Impossible to get weapons that can be used by this type of gladiator.", err
        })
    }
}