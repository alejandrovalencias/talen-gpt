require('dotenv').config();
const axios = require('axios');

const { run } = require('./util');
const urlApi = `${process.env.URL_API_CRUD}/companies`;

let prompt = `create array of 3 objects javascript with the next keys all of them inside ""
, "name","image_path","location","industry" and "user_id" everyone has to have a value inside ""
, don't add something more, give me only the object, don't print or declare variable
, imagen_path has to be max-length 7 charaters, name please give me a name of companies`;

const runCompanies = async (listId) => {
    try {
        const text = `${prompt} , user_id has to be a number between these:${listId.join(',')}`;
        const datosChatGpt = await run(text);
        if (datosChatGpt != 'undefined') {
            console.log(':::::::::::::::::::::: Inicio insert companies ::::::::::::::::::::::');
            const resultInsertApi = await Promise.all(datosChatGpt.map(data =>
                axios.post(urlApi, data)
            ));

            const companiesId = resultInsertApi.map(c => {
                const { data: { id } } = c;
                return id;
            });
            return companiesId;
        }
        return [];
    } catch (e) {
        throw { mensaje: 'Error con la respuesta de chat gpt generando inserts de companies', e };
    }
}

module.exports = runCompanies;




