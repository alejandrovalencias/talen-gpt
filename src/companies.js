require('dotenv').config();
const axios = require('axios');

const { insertApi } = require('./util');
const urlApi = `${process.env.URL_API_CRUD}/companies`;

let prompt = `create array of 3 objects javascript with the next keys all of them inside ""
, "name","image_path","location","industry" and "user_id" everyone has to have a value inside ""
, don't add something more, give me only the object, don't print or declare variable
, imagen_path has to be max-length 7 charaters, name please give me a name of companies`;

const run = async (listId) => {
    try {
        const text = `${prompt} , user_id has to be a number between these:${listId.join(',')}`;
        const response = await insertApi({ text, urlApi });
        const companiesList = response.map(c => {
            const { data: { id } } = c;
            return id;
        });
        if (companiesList === undefined || companiesList === 'undefined') {
            console.log('******************************************');
            console.log('No se insertaron las companies');
            console.log('******************************************');
            return;
        }
    } catch (e) {
        run(listId);
    }
}

module.exports = run;




