import os
import json
from fastapi import FastAPI, HTTPException, Request, Body
from pydantic import BaseModel
from openai import OpenAI
from dotenv import load_dotenv
import re
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

def get_openrouter_client():
    return OpenAI(
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
    client = get_openrouter_client()
    if not data.rawText.strip():
        raise HTTPException(status_code=400, detail="No lesson text provided.")

    prompt = (
        f"You are an AI quiz generator. "
        f"Your task is to create exactly {data.num_questions} questions strictly based ONLY on the lesson text. "
        f"Do NOT create questions from the rules below — they are formatting instructions, not lesson content.\n\n"

        f"Target language: {data.language}\n"
        f"Difficulty level: {data.difficulty} (all questions must match this level)\n"
        f"Question type: {data.question_type}\n\n"

        "=== QUIZ GENERATION RULES (DO NOT TREAT AS LESSON CONTENT) ===\n"
        "1. Every question must include the following fields:\n"
        "   - 'type' (matching the requested question type)\n"
        "   - 'question' (the actual question text)\n"
        "   - 'topic' (lesson topic)\n"
        "   - 'language' (same as requested language)\n"
        "   - 'difficulty' (same as requested difficulty)\n"
        "   - 'answer' (correct answer)\n"
        "   - 'explanation' (short justification)\n\n"

        "2. If the question has context (people, places, survey, dataset scenario), include a 'story' field.\n"
        "   - The 'story' must ONLY contain the background context, not the actual question.\n"

        "3. If the question uses or implies a dataset (numbers, percentages, categories, survey results, comparisons), you MUST include 'tabletype' and 'table'.\n"
        "   - 'tabletype' must be one of: \"Table\", \"Pie\", \"Bar\", \"Line\".\n\n"

        "⚠️ SPECIAL MATH RULE ⚠️\n"
        "- If the LESSON is about charts (Pie Graph, Bar Graph, Line Graph):\n"
        "  → ALL questions must be about constructing, interpreting, or analyzing the given chart data.\n"
        "  → Do NOT create general reading comprehension questions.\n"
        "  → Always focus on numbers, percentages, categories, angles, or steps in graph construction.\n"
        "  → NEVER use 'tabletype: Table' for chart lessons. Always output the correct chart type: 'Pie', 'Bar', or 'Line'.\n\n"

        "=== TABLE RULES ===\n"
        "- If 'tabletype' is \"Table\":\n"
        "  \"table\": {\n"
        "    \"head\": [\"Column1\", \"Column2\"],\n"
        "    \"body\": [[\"Row1Col1\", \"Row1Col2\"], [\"Row2Col1\", \"Row2Col2\"]]\n"
        "  }\n\n"

        "=== PIE RULES ===\n"
        "- If 'tabletype' is \"Pie\":\n"
        "  \"table\": {\n"
        "    \"PieChart\": {\n"
        "      \"series\": [10, 20],\n"
        "      \"options\": {\n"
        "        \"labels\": [\"Category A\", \"Category B\"],\n"
        "        \"colors\": [\"#FF5252\", \"#4CAF50\"],\n"
        "        \"legend\": {\"position\": \"right\"}\n"
        "      }\n"
        "    }\n"
        "  }\n\n"

        "=== BAR RULES ===\n"
        "- If 'tabletype' is \"Bar\":\n"
        "  \"table\": {\n"
        "    \"BarChart\": {\n"
        "      \"series\": [{\"name\": \"Score\", \"data\": [44, 55, 41]}],\n"
        "      \"options\": {\n"
        "        \"xaxis\": {\"categories\": [\"Math\", \"Science\", \"English\"]}\n"
        "      }\n"
        "    }\n"
        "  }\n\n"

        "=== LINE RULES ===\n"
        "- If 'tabletype' is \"Line\":\n"
        "  \"table\": {\n"
        "    \"LineChart\": {\n"
        "      \"series\": [{\"name\": \"Progress\", \"data\": [10, 20, 35, 50]}],\n"
        "      \"options\": {\n"
        "        \"xaxis\": {\"categories\": [\"Week 1\", \"Week 2\", \"Week 3\", \"Week 4\"]}\n"
        "      }\n"
        "    }\n"
        "  }\n\n"

        "4. If no dataset is referenced, omit 'tabletype' and 'table'.\n"
        "5. If 'type' is multiple-choice:\n"
        "   - You MUST include an 'options' array in the format [\"A. ...\", \"B. ...\", \"C. ...\", \"D. ...\"].\n"
        "   - The 'answer' must exactly match one of the options including the letter.\n"
        "6. For short-answer: the 'answer' must be only a single word or name (no full sentences).\n"
        "7. For true-false: the 'answer' must be strictly 'true' or 'false' (not yes/no).\n"
        "8. Do NOT add units or extra words in 'answer'. Example: use \"90\", not \"90°\"; use \"Basketball\", not \"Basketball sport\".\n"
        "9. The 'explanation' must briefly justify the answer.\n\n"

        "=== STRICT FORMAT RULES ===\n"
        "- Entire output must be a valid JSON array only.\n"
        "- Do not output explanations outside JSON.\n"
        "- Start with '[' and end with ']'.\n"
        "- If nothing can be generated, output [].\n"
        "- If 'type' is multiple-choice and options are missing, the output is invalid. Always include options in this case.\n\n"

        f"=== LESSON TEXT (ONLY USE THIS FOR CONTENT) ===\n"
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
async def get_Dlesson(payload: dict = Body(...)):
    """
    Return the title and summary of a lesson.
    """
    client = get_openrouter_client()
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

def safe_load_json(s: str):
    """Safely parse JSON even if there is extra text."""
    try:
        return json.loads(s)
    except json.JSONDecodeError:
        match = re.search(r'\{.*\}', s, re.DOTALL)
        if match:
            return json.loads(match.group())
        raise

def escape_html_for_json(html: str) -> str:
    """Escape HTML to be JSON-safe."""
    return html.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')

@app.post("/dlesson")
async def get_lesson(payload: dict = Body(...)):
    """
    Return the title, summary, HTML version, and content flag of a lesson.
    """
    client = get_openrouter_client()
    lesson = payload.get("lesson", "")
    if not lesson.strip():
        raise HTTPException(status_code=400, detail="No lesson text provided.")

    prompt = f"""
    You are an educational AI. Analyze the following lesson text and return a JSON object with:

    - "title": concise title (max 15 words)
    - "gradeLevel": appropriate grade level (e.g., "Grade 5", "Grade 6")
    - "summary": clear summary (3–5 sentences)
    - "htmlLesson": the lesson converted into HTML, preserving paragraphs (<p>), headings (<h2>/<h3>), lists (<ul>/<li>), breaks line (<br>), and formatting. Use <br> tags instead of \\n for line breaks.
    - "content": boolean, false if lesson is empty or has no useful content, true otherwise

    Return valid JSON only. Escape quotes and backslashes for JSON safety. Do not use \\n characters, use <br> tags for line breaks instead.

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

        raw_json = response.choices[0].message.content.strip()

        # Remove control characters
        raw_json = re.sub(r'[\x00-\x1f]', '', raw_json)

        parsed = safe_load_json(raw_json)

        # Ensure HTML is JSON-safe
        if "htmlLesson" in parsed:
            parsed["htmlLesson"] = escape_html_for_json(parsed["htmlLesson"])

        return parsed

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
