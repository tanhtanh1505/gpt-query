const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

module.exports.getSolution = async (text) => {
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: text,
    max_tokens: 2048,
  });
  return completion.data.choices[0].text.trim();
};
