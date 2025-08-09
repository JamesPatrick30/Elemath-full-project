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
    num_questions: int = 10

@app.post("/generate-quiz")
async def generate_quiz(data: LessonText):
    """
    Accepts raw lesson text and returns generated quiz in structured JSON.
    """
    if not data.rawText.strip():
        raise HTTPException(status_code=400, detail="No lesson text provided.")

    prompt = (
        f"From the following lesson text, generate {data.num_questions} multiple-choice questions. "
        "Follow these strict formatting rules:\n"
        "1. If a question contains or implies a scenario with people, places, names, or real-life context (e.g., 'Mrs. Gonzales spends her monthly income...'), treat it as a 'story-based' question. In that case, include a 'story' field containing ONLY the background text, without the question itself."
        "2. If a question is math-related and requires solving, make sure it clearly states the problem and show relevant numbers or equations in the question.\n"
        "3. Every question must have a 'topic' field describing its subject (e.g., 'Math - Percentage', 'Science - Physics', 'Reading - Comprehension').\n"
        "4. The 'options' field must be an array in this exact format: [\"A. option text\", \"B. option text\", \"C. option text\", \"D. option text\"].\n"
        "5. The 'answer' field must contain the full option text exactly as in 'options' (e.g., \"A. 25%\").\n"
        "6. The 'explanation' field must briefly explain why the answer is correct.\n\n"
        "Output format (strict JSON only):\n"
        "[\n"
        "  {\n"
        "    \"question\": \"...\",\n"
        "    \"story\": \"...\", (optional, only if story-based)\n"
        "    \"topic\": \"...\",\n"
        "    \"options\": [\"A. ...\", \"B. ...\", \"C. ...\", \"D. ...\"],\n"
        "    \"answer\": \"A. ...\",\n"
        "    \"explanation\": \"...\"\n"
        "  }\n"
        "]\n"
        "Do not include any text outside the JSON. No markdown, no extra commentary.\n"
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
