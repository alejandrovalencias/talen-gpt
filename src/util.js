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
        console.log('**************** run despues de generate util *******************');
        console.log(response);
        console.log('**************** run despues de generate util *******************');

        const result = JSON.parse(response);

        console.log('**************** run despues de JSON util *******************');
        console.log(result);
        console.log('**************** run despues de JSON util *******************');
        return result;
    } catch (e) {
        throw { mensaje: 'Error con la respuesta de chat gpt', e };
    }
};

module.exports = { run };
