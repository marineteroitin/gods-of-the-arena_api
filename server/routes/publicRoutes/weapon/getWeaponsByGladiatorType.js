/*
    This route allow to get all the weapons that can be used by a given type of gladiator.
 */

const WeaponService = require('../../../services/weaponService');

module.exports = async (request, response) => {
    try {
        const id_gladiatorType = request.params.id;


        /* Get weapons */
        const weapons = await WeaponService.getWeaponsByGladiatorType(id_gladiatorType);

        /* Check if it is empty */
        if (weapons.length < 1) {
            return response.status(204).json({error: "The is no weapons that can be used by this type of gladiator."})
        }
        return response.status(200).json({weapons});


    } catch (err) {
        console.error(err);
        return response.status(500).json({
            error: "Impossible to get weapons that can be used by this type of gladiator."
        })
    }
}