const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports.getSolution = async (text) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "user", content: "You are a database expert." },
      {
        role: "user",
        content: "You need generate only query and return for me. Dont explain for it or return another.",
      },
      {
        role: "assistant",
        content: "OK, I will try my best. I will return for you only a query.",
      },
      {
        role: "user",
        content: text,
      },
    ],
    temperature: 0.7,
    max_tokens: 2048,
    top_p: 1,
  });
  // console.log(response.choices[0].message);
  return response.choices[0].message.content.trim();
};
