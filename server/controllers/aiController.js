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
          content: `Generate interview questions for a ${role} position at ${company}.
For each category generate exactly 5 Easy, 5 Medium, 5 Hard questions.
Each question must have: question text, detailed answer, and difficulty level.

Return ONLY this JSON, no extra text, no markdown:
{
  "technical": [
    {"question": "q1", "answer": "a1", "difficulty": "Easy"},
    {"question": "q2", "answer": "a2", "difficulty": "Easy"},
    {"question": "q3", "answer": "a3", "difficulty": "Easy"},
    {"question": "q4", "answer": "a4", "difficulty": "Easy"},
    {"question": "q5", "answer": "a5", "difficulty": "Easy"},
    {"question": "q6", "answer": "a6", "difficulty": "Medium"},
    {"question": "q7", "answer": "a7", "difficulty": "Medium"},
    {"question": "q8", "answer": "a8", "difficulty": "Medium"},
    {"question": "q9", "answer": "a9", "difficulty": "Medium"},
    {"question": "q10", "answer": "a10", "difficulty": "Medium"},
    {"question": "q11", "answer": "a11", "difficulty": "Hard"},
    {"question": "q12", "answer": "a12", "difficulty": "Hard"},
    {"question": "q13", "answer": "a13", "difficulty": "Hard"},
    {"question": "q14", "answer": "a14", "difficulty": "Hard"},
    {"question": "q15", "answer": "a15", "difficulty": "Hard"}
  ],
  "behavioral": [
    {"question": "q1", "answer": "a1", "difficulty": "Easy"},
    {"question": "q2", "answer": "a2", "difficulty": "Easy"},
    {"question": "q3", "answer": "a3", "difficulty": "Easy"},
    {"question": "q4", "answer": "a4", "difficulty": "Easy"},
    {"question": "q5", "answer": "a5", "difficulty": "Easy"},
    {"question": "q6", "answer": "a6", "difficulty": "Medium"},
    {"question": "q7", "answer": "a7", "difficulty": "Medium"},
    {"question": "q8", "answer": "a8", "difficulty": "Medium"},
    {"question": "q9", "answer": "a9", "difficulty": "Medium"},
    {"question": "q10", "answer": "a10", "difficulty": "Medium"},
    {"question": "q11", "answer": "a11", "difficulty": "Hard"},
    {"question": "q12", "answer": "a12", "difficulty": "Hard"},
    {"question": "q13", "answer": "a13", "difficulty": "Hard"},
    {"question": "q14", "answer": "a14", "difficulty": "Hard"},
    {"question": "q15", "answer": "a15", "difficulty": "Hard"}
  ],
  "hr": [
    {"question": "q1", "answer": "a1", "difficulty": "Easy"},
    {"question": "q2", "answer": "a2", "difficulty": "Easy"},
    {"question": "q3", "answer": "a3", "difficulty": "Easy"},
    {"question": "q4", "answer": "a4", "difficulty": "Easy"},
    {"question": "q5", "answer": "a5", "difficulty": "Easy"},
    {"question": "q6", "answer": "a6", "difficulty": "Medium"},
    {"question": "q7", "answer": "a7", "difficulty": "Medium"},
    {"question": "q8", "answer": "a8", "difficulty": "Medium"},
    {"question": "q9", "answer": "a9", "difficulty": "Medium"},
    {"question": "q10", "answer": "a10", "difficulty": "Medium"},
    {"question": "q11", "answer": "a11", "difficulty": "Hard"},
    {"question": "q12", "answer": "a12", "difficulty": "Hard"},
    {"question": "q13", "answer": "a13", "difficulty": "Hard"},
    {"question": "q14", "answer": "a14", "difficulty": "Hard"},
    {"question": "q15", "answer": "a15", "difficulty": "Hard"}
  ],
  "coding": [
    {"question": "q1", "answer": "a1", "difficulty": "Easy"},
    {"question": "q2", "answer": "a2", "difficulty": "Easy"},
    {"question": "q3", "answer": "a3", "difficulty": "Easy"},
    {"question": "q4", "answer": "a4", "difficulty": "Easy"},
    {"question": "q5", "answer": "a5", "difficulty": "Easy"},
    {"question": "q6", "answer": "a6", "difficulty": "Medium"},
    {"question": "q7", "answer": "a7", "difficulty": "Medium"},
    {"question": "q8", "answer": "a8", "difficulty": "Medium"},
    {"question": "q9", "answer": "a9", "difficulty": "Medium"},
    {"question": "q10", "answer": "a10", "difficulty": "Medium"},
    {"question": "q11", "answer": "a11", "difficulty": "Hard"},
    {"question": "q12", "answer": "a12", "difficulty": "Hard"},
    {"question": "q13", "answer": "a13", "difficulty": "Hard"},
    {"question": "q14", "answer": "a14", "difficulty": "Hard"},
    {"question": "q15", "answer": "a15", "difficulty": "Hard"}
  ]
}`
        }
      ],
      temperature: 0.7,
      max_tokens: 8000,
    });

    const content = completion.choices[0].message.content;
    const cleanContent = content.replace(/```json|```/g, '').trim();
    const questions = JSON.parse(cleanContent);
    res.status(200).json(questions);

  } catch (err) {
    console.log('AI Error:', err.message);
    res.status(400).json({ error: err.message });
  }
};

module.exports = { generateQuestions };