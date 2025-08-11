import os
import json
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
import logging
# Load environment variables
load_dotenv()

logging.basicConfig(
    level=logging.INFO,  # INFO, DEBUG, WARNING, ERROR
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.StreamHandler()  # You can also add FileHandler here
    ]
)
logger = logging.getLogger(__name__)
# Configure OpenRouter client
client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1"
)

app = FastAPI(
    title="Quiz Generator API",
    description="Generate quizzes from lesson text",
    version="1.0"
)

# Request body schema
class LessonText(BaseModel):
    rawText: str
    num_questions: int = 5
    language: str = "tagalog"
    difficulty: str = "easy"
    question_type: str ="fill-in-the-blank"

@app.post("/generate-quiz")
async def generate_quiz(data: LessonText):
    """
    Accepts raw lesson text and returns generated quiz in structured JSON.
    """
    if not data.rawText.strip():
        raise HTTPException(status_code=400, detail="No lesson text provided.")

    prompt = (
        f"From the following lesson text, generate {data.num_questions} questions. "
        f"Language: {data.language}\n"
        f"Difficulty: {data.difficulty}\n"
        f"Question type: {data.question_type}  # e.g., 'multiple-choice', 'short-answer', 'true-false', 'fill-in-the-blank', 'matching', etc.\n"
        "Follow these strict formatting rules:\n"
        "1. Include a 'type' field for each question that exactly matches the chosen question type.\n"
        "2. If a question contains or implies a scenario with people, places, names, or real-life context "
        "(e.g., 'Mrs. Gonzales spends her monthly income...'), treat it as a 'story-based' question. In that case, "
        "include a 'story' field containing ONLY the background text, without the question itself.\n"
        "3. If a question is math-related and requires solving, make sure it clearly states the problem and shows relevant numbers or equations in the question.\n"
        "4. Every question must have a 'topic' field describing its subject (e.g., 'Math - Percentage', 'Science - Physics', 'Reading - Comprehension').\n"
        "5. For multiple-choice questions, the 'options' field must be an array in this exact format: "
        "[\"A. option text\", \"B. option text\", \"C. option text\", \"D. option text\"].\n"
        "6. For short-answer, true-false, fill-in-the-blank, or other non-multiple-choice questions, omit 'options' "
        "and provide the expected correct answer(s) in the 'answer' field.\n"
        "7. The 'answer' field must contain the correct response (exact text for multiple-choice, expected answer for others).\n"
        "8. The 'explanation' field must briefly explain why the answer is correct.\n\n"
        "STRICT OUTPUT RULES:\n"
        "- Output must be valid JSON only — no markdown, no triple backticks, no explanations, no intro text.\n"
        "- Do NOT say 'Here’s the JSON', 'Sure, here’s...', or anything similar.\n"
        "- The response must start with '[' and end with ']'.\n\n"
        "Output format:\n"
        "[\n"
        "  {\n"
        "    \"type\": \"multiple-choice\" | \"short-answer\" | \"true-false\" | \"fill-in-the-blank\" | \"matching\" | \"essay\",\n"
        "    \"question\": \"...\",\n"
        "    \"story\": \"...\", (optional, only if story-based)\n"
        "    \"topic\": \"...\",\n"
        "    \"language\": \"...\",\n"
        "    \"difficulty\": \"...\",\n"
        "    \"options\": [\"A. ...\", \"B. ...\", \"C. ...\", \"D. ...\"], (only if type is 'multiple-choice')\n"
        "    \"answer\": \"...\",\n"
        "    \"explanation\": \"...\"\n"
        "  }\n"
        "]\n\n"
        f"Lesson text:\n\n{data.rawText}"
    )






    try:
        response = client.chat.completions.create(
            model="deepseek/deepseek-chat-v3-0324:free",
            messages=[
                {"role": "system", "content": "You are an educational AI that creates structured quiz questions."},
                {"role": "user", "content": prompt},
            ],
            temperature=0.7,
        )

        quiz_json = response.choices[0].message.content
        logger.info(f"Received quiz request: {quiz_json}" )
        return {"quiz": quiz_json}

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="AI response was not valid JSON.")
    except Exception as e:
        import traceback
        traceback.print_exc()  # Print full error to terminal
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
