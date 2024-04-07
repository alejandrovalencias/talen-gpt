const users = require('./users');
const companies = require('./companies');
const challenges = require('./challenges');

const seed = async () => {
    // Se insertan los usuarios 
    const listId = await users();

    if (listId.length === 0) {
        console.log('############## Insert users #####################');
        console.log('No se insertaron usuarios');
        console.log('############## Insert users #####################');
        return [];
    }
    // // Se insertan las companies
    // await companies(listId);

    // // // Se insertan las challenges
    // await challenges(listId);
    return listId;
}
// seed();
module.exports = seed;