from fastapi import FastAPI
from board import evaluate_startup

app = FastAPI()

@app.post("/evaluate")
def evaluate(data: dict):

    return evaluate_startup(data)