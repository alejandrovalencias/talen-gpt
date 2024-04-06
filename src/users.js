require('dotenv').config();
const axios = require('axios');

const { insertApi } = require('./util');
const urlApi = `${process.env.URL_API_CRUD}/users`;
const prompt = `create array of 3 objects javascript with the next keys all of them inside "", "name","email" and "image_path", everyone has to have a value inside "", don't add something more, give me only the object, don't print or declare variable, image_path has to be max-length 3 charaters, email has to be a short email`;

const runUser = async () => {
    try {
        const responses = await insertApi({ text: prompt, urlApi });
        const listId = responses.map(c => {
            const { data: { id } } = c;
            return id;
        });
        console.log('????????????????????????????????');
        console.log(listId);
        console.log('????????????????????????????????');
        return listId;
    } catch (e) {
        runUser();
    }
}

module.exports = runUser;





