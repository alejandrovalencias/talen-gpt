const users = require('./users');
const companies = require('./companies');
const challenges = require('./challenges');
const programs = require('./programs');

const seed = async ({ query }) => {
    let responseApi = {};
    const { com = 1, cha = 1, pro = 1 } = query;
    try {
        // Se genera y inserta sobre la tabla users 
        const usersId = await users();

        if (!Array.isArray(usersId) || usersId.length == 0) {
            return 'No se insertaron registros sobre tabla users';
        }
        //Se guardan los id los inserts sobre la tabla users
        responseApi.users = usersId;

        if (com == 1) {
            //Se insertan las companies
            const companiesId = await companies(usersId);
            //Se guardan los id los inserts sobre la tabla users
            responseApi.companies = companiesId;
        }

        if (cha == 1) {
            //Se insertan las challenges
            const challengesId = await challenges(usersId);
            //Se guardan los id los inserts sobre la tabla users
            responseApi.challenges = challengesId;
        }

        if (pro == 1) {
            //Se insertan las challenges
            const programsId = await programs(usersId);
            //Se guardan los id los inserts sobre la tabla users
            responseApi.programs = programsId;
        }

        return responseApi;
    } catch (e) {
        return { inserts: responseApi, mensaje: 'Error generando los datos', e };
    }
}
// seed();
module.exports = seed;