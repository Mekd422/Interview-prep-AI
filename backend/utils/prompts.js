const questionAnswerPrompt = (role, experience, topicsToFocus, numberOfQuestions) =>(
    `
    you are an AI trained to generate technical interview questions and answers.

    task:
    - Role: ${role}
    - Candidate Experience: ${experience} years
    - Focus Topics: ${topicsToFocus}
    - Write ${numberOfQuestions} interview questions.
    - For each question, generate a detailed but beginner-friendly answer.
    - If the answer needs a code example, add a small code block inside.
    - Keep formatting very lean.
    - Return a pure JSON array like:
    [ 
    {
    "question": "Question here?",
    "answer": "Answer here."
    },
    Important: Do NOT add any extra text. Only return valid JSON.
    ]`)

const conceptExplainPrompt = (question)=>
    `
    You are an AI trained to generate explanations for a given interview question.

    Task:
    - Explain the following interview question and its concept in depth as if you're teaching a beginner developer
    - Question: "${question}"
    - After the explanation, provide a short and clear title that summarizes the concept for the article or page header.
    - If the explanation includes a code example, provide a small code block.
    - Keep the formatting very clean and clear.
    - Return teh result as a valid JSON object in the following format:
    {
    "title": "short title here?",
    "explanation": "explanation here."
    }

    Important: Do NOT add any extra text outside the JSON format. Only return valid JSON.
    `
;

module.exports = {questionAnswerPrompt, conceptExplainPrompt};