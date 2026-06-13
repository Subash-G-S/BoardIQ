from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from board import evaluate_startup
from fastapi.responses import FileResponse

from board import (
    evaluate_startup,
    generate_pdf_report
)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/evaluate")
def evaluate(data: dict):

    return evaluate_startup(data)
@app.post("/generate-pdf")
def generate_pdf(data: dict):


    pdf_file = generate_pdf_report(data)

    return FileResponse(
        pdf_file,
        media_type="application/pdf",
        filename="BoardIQ_Report.pdf"
    )