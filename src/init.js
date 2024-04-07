const users = require('./users');
const companies = require('./companies');
const challenges = require('./challenges');

const seed = async () => {
    let responseApi = {};
    try {
        // Se genera y inserta sobre la tabla users 
        const usersId = await users();

        if (!Array.isArray(usersId) || usersId.length == 0) {
            return 'No se insertaron registros sobre tabla users';
        }
        //Se guardan los id los inserts sobre la tabla users
        responseApi.users = usersId;

        //Se insertan las companies
        const companiesId = await companies(usersId);
        //Se guardan los id los inserts sobre la tabla users
        responseApi.companies = companiesId;

        //Se insertan las challenges
        const challengesId = await challenges(usersId);
        //Se guardan los id los inserts sobre la tabla users
        responseApi.challenges = challengesId;

        return responseApi;
    } catch (e) {
        return { inserts: responseApi, mensaje: 'Error generando los datos', e };
    }
}
// seed();
module.exports = seed;