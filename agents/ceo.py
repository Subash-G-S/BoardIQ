from ai_client import ask_model
from config import CEO_MODEL
import json

def decide(reports):

    combined_reports = ""

    for report in reports:
        combined_reports += (
            f"{report['agent']}:\n"
            f"Score: {report['score']}\n"
            f"Vote: {report['vote']}\n"
            f"Confidence: {report['confidence']}\n"
            f"Reason: {report['reason']}\n\n"
        )

    prompt = f"""
You are the Chairperson of an AI Investment Board.

You have received reports from:

- Market Analyst
- Finance Analyst
- Technical Architect
- Risk Officer

Your job is NOT to count votes.

Your job is to weigh:

- Market attractiveness
- Financial viability
- Technical feasibility
- Risk exposure

Analyst Reports:

{combined_reports}

Return ONLY valid JSON.

{{
    "decision": "APPROVED or REJECTED",
    "confidence": 0,
    "investment_score": 0,
    "key_strengths": [
        "strength"
    ],
    "key_risks": [
        "risk"
    ],
    "reason": "max 75 words"
}}

Do not use markdown.
Return only JSON.
"""

    response = ask_model(
        CEO_MODEL,
        prompt
    )
    
    try:

        decision = json.loads(response)

    except Exception:

        decision = {
            "decision": "ERROR",
            "confidence": 0,
            "investment_score": 0,
            "reason": "Could not parse CEO response"
        }


    log = f"Investment Chair: {response}"

    return decision, log