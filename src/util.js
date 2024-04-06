require('dotenv').config();
const axios = require('axios');
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.CHAT_GPT_API_KEY
});

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

const execute = async (text) => {
    const response = await generate(text);
    console.log('**************** execute util *******************');
    console.log(text);
    console.log(response);
    console.log('**************** execute util *******************');
    const jresponse = JSON.parse(response);
    return jresponse;
};

const run = async (text) => {
    // for (let i = 0; i < process.env.MAX_LOOP; i++) {
    let result = await execute(text);
    console.log(':::::::::::::::::::: run util ::::::::::::::');
    console.log(text);
    console.log(result);
    console.log(':::::::::::::::::::: run util ::::::::::::::');
    // }
    return result;
}

const insertApi = async ({ text, urlApi }) => {
    const datosChatGpt = await run(text);
    return await Promise.all(datosChatGpt.map(data =>
        axios.post(urlApi, data)
    ));
}

module.exports = { insertApi, run };
