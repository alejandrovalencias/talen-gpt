require('dotenv').config();
const axios = require('axios');

const { insertApi, run } = require('./util');
const urlApi = `${process.env.URL_API_CRUD}/users`;
const prompt = `create array of 3 objects javascript with the next keys all of them inside "", "name","email" and "image_path", everyone has to have a value inside "", don't add something more, give me only the object, don't print or declare variable, image_path has to be max-length 3 charaters, email has to be a short email`;

const runUser = async () => {
    try {
        const datosChatGpt = await run(prompt);
        if (datosChatGpt != 'undefined') {
            console.log(':::::::::::::::::::::: Inicio insert users ::::::::::::::::::::::');
            const resultInsertApi = await Promise.all(datosChatGpt.map(data =>
                axios.post(urlApi, data)
            ));

            const usersId = resultInsertApi.map(c => {
                const { data: { id } } = c;
                return id;
            });
            return usersId;
        }
        return [];
    } catch (e) {
        throw { mensaje: 'Error con la respuesta de chat gpt generando inserts sobre users', e };
    }
}

module.exports = runUser;





