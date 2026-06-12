from ai_client import ask_model
from config import TECHNICAL_MODEL
import json
def analyze(startup_idea, market_report, finance_report):

    prompt = f"""
You are a Technical Architect.

Analyze:

{startup_idea}
Market Analyst Report:
Score: {market_report['score']}
Vote: {market_report['vote']}
Reason: {market_report['reason']}
Finance Analyst Report :
Score: {finance_report['score']}
Vote: {finance_report['vote']}
Reason: {finance_report['reason']}

Considering the market and financial concerns above,
evaluate whether the startup is technically achievable
and whether technology can solve the identified problems.

Evaluate objectively.

Consider both strengths and weaknesses.

Do not assume success.
Do not assume failure.

Provide balanced reasoning.
Strong startups should receive APPROVE.

Weak startups should receive REJECT.

Do not default to either outcome.

Return ONLY valid JSON.

{{
  "score": 0-10,
  "vote": "APPROVE or REJECT",
  "confidence": 0-100,
  "reason": "max 50 words"
}}
Do not use markdown.


Reason:
Maximum 50 words.
"""

    response = ask_model(
        TECHNICAL_MODEL,
        prompt
    )
    agent_result = json.loads(response)

    report = {
        "agent": "Technical Architect",
        **agent_result
    }

    log = f"Technical Architect: {response}"

    return report, log