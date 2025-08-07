from fastapi import FastAPI

app = FastAPI()



@app.get("/")
def read_root():
    return {"message": "Hello, FastAPI!"}

@app.post("/q")
def questions():
    return


