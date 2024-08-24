const { OpenAI } = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

module.exports.getSolution = async (text) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content:
          "You are a database expert. Based on the provided database structure, user query, and database type, generate an SQL query specific to that database type. Respond only with the SQL query, without any formatting or explanation.",
      },
      {
        role: "user",
        content: text,
      },
    ],
    temperature: 0.0,
    max_tokens: 500,
    top_p: 1.0,
  });

  return response.choices[0].message.content.trim();
};
