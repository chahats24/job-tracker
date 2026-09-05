const Groq = require('groq-sdk');

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const generateQuestions = async (req, res) => {
  const { company, role } = req.body;

  try {
    const completion = await groq.chat.completions.create({
      model: 'openai/gpt-oss-20b',
      messages: [
        {
          role: 'user',
          content: `Generate exactly 9 interview questions for a ${role} position at ${company}.
          Return ONLY a valid JSON object in this exact format with no extra text:
          {
            "technical": ["question1", "question2", "question3"],
            "behavioral": ["question1", "question2", "question3"],
            "hr": ["question1", "question2", "question3"]
          }`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = completion.choices[0].message.content;
    const questions = JSON.parse(content);
    res.status(200).json(questions);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { generateQuestions };