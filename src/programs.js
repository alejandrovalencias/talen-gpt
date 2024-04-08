require('dotenv').config();
const axios = require('axios');
const { run } = require('./util');

const urlApi = `${process.env.URL_API_CRUD}/programs`;
let prompt = `create array of 3 objects javascript about programs with the next keys all of them inside ""
, "title","description","start_date", "end_date" and "user_id" everyone has to have a value inside ""
, don't add something more, give me only the object, don't print or declare variable, start_date and end_date have to be a YYYY-MM-DD`;

const runPrograms = async (listId) => {
    try {
        const text = `${prompt} , user_id has to be a number between these: ${listId.join(',')}`;
        const datosChatGpt = await run(text);
        if (datosChatGpt != 'undefined') {
            console.log(':::::::::::::::::::::: Inicio insert programs ::::::::::::::::::::::');
            const resultInsertApi = await Promise.all(datosChatGpt.map(data =>
                axios.post(urlApi, data)
            ));

            const challengesId = resultInsertApi.map(c => {
                const { data: { id } } = c;
                return id;
            });
            return challengesId;
        }
        return [];
    } catch (e) {
        throw { mensaje: 'Error con la respuesta de chat gpt generando inserts de programs', e };
    }
}

module.exports = runPrograms;




