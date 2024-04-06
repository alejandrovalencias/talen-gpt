require('dotenv').config();
const axios = require('axios');
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.CHAT_GPT_API_KEY
});

// Se pide a chat gpt que cree los objetos de las entidades
const generate = async (text) => {
    const prompt = text;
    const completion = await openai.completions.create({
        model: process.env.CHAT_GPT_MODEL,
        prompt,
        max_tokens: 250,
    }, {
        endpoint: process.env.CHAT_GPT_ENDPOINT,
    });
    return completion.choices[0].text.trim();
};

// Se ejecuta la api de chat gpt y se retorna el json del objecto a insertar de la entidad
const run = async (text) => {
    try {
        const response = await generate(text);
        console.log('**************** execute util *******************');
        console.log(text);
        console.log(response);
        console.log('**************** execute util *******************');
        const jresponse = JSON.parse(response);
        return jresponse;
    } catch (e) {
        console.log('.................. util 31 ...........');
        console.log(e);
        console.log('......................................');
        execute(text);
    }
};

// const run = async (text) => {
//     let result = await execute(text);
//     console.log(':::::::::::::::::::: run util ::::::::::::::');
//     console.log(text);
//     console.log(result);
//     console.log(':::::::::::::::::::: run util ::::::::::::::');
//     if (result !== undefined) {
//         return result;
//     }
//     run(text);
// }

// Se obtiene la respuesta de chat gpt y se consume la api en laravel de las entidades
const insertApi = async ({ text, urlApi }) => {
    try {
        const datosChatGpt = await run(text);
        if (datosChatGpt !== undefined) {
            console.log(' ------------------------------- insertApi --------------------------');
            console.log(datosChatGpt);
            console.log(' ------------------------------- insertApi --------------------------');
            return await Promise.all(datosChatGpt.map(data =>
                axios.post(urlApi, data)
            ));
        }
        insertApi({ text, urlApi });
    } catch (e) {
        insertApi({ text, urlApi });
    }
}

module.exports = { insertApi, run };
