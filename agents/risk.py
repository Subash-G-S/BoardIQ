from ai_client import ask_model
import json
from config import RISK_MODEL
def analyze(startup_idea, market_report, finance_report, technical_report):

    prompt = f"""
You are a Risk Officer.

Analyze:

{startup_idea}

Market Report:
Score: {market_report['score']}
Vote: {market_report['vote']}
Confidence: {market_report['confidence']}
Reason: {market_report['reason']}

Finance Report:
Score: {finance_report['score']}
Vote: {finance_report['vote']}
Confidence: {finance_report['confidence']}
Reason: {finance_report['reason']}

Technical Report:
Score: {technical_report['score']}
Vote: {technical_report['vote']}
Confidence: {technical_report['confidence']}
Reason: {technical_report['reason']}
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
        RISK_MODEL,
        prompt
    )
    agent_result = json.loads(response)

    report = {
        "agent": "Risk Officer",
        **agent_result
    }

    log = f"Risk Officer: {response}"

    return report, log