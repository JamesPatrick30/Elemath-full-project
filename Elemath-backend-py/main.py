import os
import json
from fastapi import FastAPI, HTTPException, Request, Body
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
import logging
from fastapi.responses import JSONResponse
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
# Middleware to check API Key
@app.middleware("http")
async def verify_api_key(request: Request, call_next):
    api_key = request.headers.get("x-api-key")

    if not api_key:
        return JSONResponse(status_code=401, content={"detail": "Missing API Key"})

    if  api_key != os.getenv("API_KEY"):
        return JSONResponse(status_code=401, content={"detail": "Invalid API Key"})

    # Continue request
    response = await call_next(request)
    return response
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
        f"You are an AI quiz generator. "
        f"Your task is to create exactly {data.num_questions} questions strictly based ONLY on the lesson text. "
        f"Do NOT create questions from the rules below — they are formatting instructions, not lesson content.\n\n"

        f"Target language: {data.language}\n"
        f"Difficulty level: {data.difficulty} (all questions must match this level)\n"
        f"Question type: {data.question_type}  # e.g., 'multiple-choice', 'short-answer', 'true-false', 'fill-in-the-blank', 'matching', etc.\n\n"

        "=== QUIZ GENERATION RULES (DO NOT TREAT AS LESSON CONTENT) ===\n"
        "1. Include a 'type' field for each question that exactly matches the chosen question type.\n"
        "2. If a question contains or implies a scenario with people, places, names, or real-life context, "
        "you MUST include a 'story' field. "
        "- 'story' must contain ONLY the background text (the setup/context) without the actual question.\n"
        "3. If a question references or compares data (numbers, categories, percentages, or similar), "
        "you MUST include a 'table' field. "
        "- The 'table' must be structured as **JSON**, not HTML.\n"
        "- Format:\n"
        "  \"table\": {\n"
        "    \"head\": [\"Column1\", \"Column2\", ...],\n"
        "    \"body\": [\n"
        "      [\"Row1Col1\", \"Row1Col2\", ...],\n"
        "      [\"Row2Col1\", \"Row2Col2\", ...]\n"
        "    ]\n"
        "  }\n"
        "- Only include the 'table' field if the question explicitly refers to tabular data; otherwise, omit it.\n"
        "4. Every question must have a 'topic' field describing its subject (e.g., 'Math - Percentage', 'Science - Physics', 'Reading - Comprehension').\n"
        "5. For multiple-choice questions, the 'options' field must be an array in this exact format: "
        "[\"A. option text\", \"B. option text\", \"C. option text\", \"D. option text\"].\n"
        "- The 'answer' field must exactly match the correct choice, including the letter and the option text. "
        "- Example: options: [\"A. 0.11\", \"B. 0.22\", \"C. 0.33\", \"D. 0.44\"] and answer: \"A. 0.11\".\n"
        "6. For short-answer, true-false, fill-in-the-blank, or other non-multiple-choice questions, omit 'options' "
        "and provide the expected correct answer(s) in the 'answer' field.\n"
        "7. The 'answer' field must contain ONLY the raw correct response. "
        "- Do NOT include units, full sentences, or explanatory text. "
        "- Example: use '90' not '90°', use 'Basketball' not 'Basketball dahil ito ang pinakamalaki'.\n"
        "8. The 'explanation' field must briefly explain why the answer is correct.\n"
        "9. If the answer is yes or no, just put 'yes' or 'no' in the answer field without any additional text.\n"
        "10. All questions must strictly match the requested difficulty level.\n\n"

        "=== STRICT FORMAT RULES ===\n"
        "- Every question that refers to or implies a dataset (numbers, categories, percentages, frequencies, survey results, or pie chart breakdowns) MUST include a 'table' field in JSON format, not HTML.\n"
        "- Every scenario-based question (e.g., involving people, time usage, survey situations, etc.) MUST include a 'story' field containing ONLY the background context, not the question.\n"
        "- The 'answer' field must contain ONLY the raw value or term (e.g., \"135\", \"Basketball\", \"37.5\"). Do NOT add words like \"degrees\" or \"percent\". Do NOT use full sentences in 'answer'.\n"
        "- For multiple-choice questions, the 'answer' must exactly copy the correct option as shown in 'options'. Example: 'B. 0.22'.\n"
        "- Conceptual questions must still be written at the requested difficulty level. If the difficulty is 'medium', avoid overly simple recall questions.\n"
        "STRICT OUTPUT RULES:\n"
        "- Your ENTIRE response must be a valid JSON array only.\n"
        "- Do not include any introduction, explanations, or extra text outside the JSON.\n"
        "- The response must start with '[' and end with ']'.\n"
        "- If you cannot generate valid JSON, output an empty array [] instead.\n\n"

        "Here is a sample question JSON object (follow this format exactly):\n"
        "[\n"
        "  {\n"
        "    \"type\": \"short-answer\",\n"
        "    \"question\": \"Ano ang pangunahing layunin ng paggawa ng pie graph batay sa lesson?\",\n"
        "    \"story\": \"...\", (optional)\n"
        "    \"table\": {\n"
        "      \"head\": [\"Category\", \"Value\"],\n"
        "      \"body\": [[\"A\", \"20\"], [\"B\", \"30\"]]\n"
        "    }, (optional)\n"
        "    \"topic\": \"Mathematics - Data Visualization\",\n"
        "    \"language\": \"Filipino\",\n"
        "    \"difficulty\": \"easy\",\n"
        "    \"answer\": \"Upang makaintindi ng porsyento gamit ang graph\",\n"
        "    \"explanation\": \"Ginagamit ang pie graph upang ipakita ang bahagi ng kabuuan sa anyong biswal.\"\n"
        "  }\n"
        "]\n\n"

        "=== LESSON TEXT (ONLY USE THIS FOR CONTENT) ===\n"
        f"{data.rawText}\n"
    )













    try:
        response = client.chat.completions.create(
            model="openai/gpt-5-nano",
            messages=[
                {"role": "system", "content": "You are an educational AI that creates structured quiz questions."},
                {"role": "user", "content": prompt},
            ],
            temperature=0.7,
        )

        if not response.choices or not response.choices[0].message.content:
            raise HTTPException(status_code=500, detail="AI returned no content")

        quiz_json = response.choices[0].message.content
        logger.info(f"Received quiz request: {quiz_json}" )
        return {"quiz": quiz_json}

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="AI response was not valid JSON.")
    except Exception as e:
        import traceback
        traceback.print_exc()  # Print full error to terminal
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")
    
@app.post("/lesson")
async def get_lesson(payload: dict = Body(...)):
    """
    Return the title and summary of a lesson.
    """
    lesson = payload.get("lesson", "")
    if not lesson.strip():
        raise HTTPException(status_code=400, detail="No lesson text provided.")

    prompt = f"""
        You are an AI summarizer. Your task is to analyze the following lesson text
        and return a JSON object that contains:

        - "title": A concise title for the lesson (max 15 words).
        - "summary": A clear summary of the lesson (3–5 sentences).
        - "content": A boolean. Use false if the lesson text is empty or has no useful content,
        otherwise true.

        Make sure the response is **valid JSON only** with no extra text.

        === LESSON TEXT ===
        {lesson}
        """



    try:
        response = client.chat.completions.create(
            model="openai/gpt-5-nano",
            messages=[
                {"role": "system", "content": "You are an educational AI that summarizes lessons."},
                {"role": "user", "content": prompt},
            ],
            temperature=0.7,
        )

        if not response.choices or not response.choices[0].message.content:
            raise HTTPException(status_code=500, detail="AI returned no content")

        summary_json = response.choices[0].message.content
        return {"summary": summary_json}

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="AI response was not valid JSON.")
    except Exception as e:
        import traceback
        traceback.print_exc()
