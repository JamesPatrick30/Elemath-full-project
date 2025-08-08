from fastapi import FastAPI, Request
import uvicorn
import logging

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

app = FastAPI()

@app.post("/log-object")
async def log_object(request: Request):
    # Parse JSON body efficiently without a predefined schema
    data = await request.json()

    # Log the incoming object
    logging.info(f"Received object: {data}")

    # Respond with confirmation
    return {"status": "ok"}

if __name__ == "__main__":
    # Run the FastAPI server
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
