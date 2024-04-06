require('dotenv').config();
const {insertApi} = require('./util');

const urlApi = `${process.env.URL_API_CRUD}/challenges`;
let prompt = `create array of 3 objects javascript about challenges with the next keys all of them inside ""
, "title","description","difficulty" and "user_id" everyone has to have a value inside ""
, don't add something more, give me only the object, don't print or declare variable, difficulty has to be a number`;

const run = async (listId) => {
    try {
        const text = `${prompt} , user_id has to be a number between these: ${listId.join(',')}`;
        await insertApi({ text, urlApi });
    } catch (e) {
        run(listId);
    }
}

module.exports = run;




