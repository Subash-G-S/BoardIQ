from ai_client import ask_model
import json
from config import FINANCE_MODEL

def analyze(startup_idea, market_report):

    prompt = f"""
You are a Venture Capital Finance Analyst.

Analyze this startup idea:

{startup_idea}

Market Analyst Report:

Score: {market_report['score']}
Vote: {market_report['vote']}
Confidence: {market_report['confidence']}

Reason:
{market_report['reason']}
Consider the market report while making your decision.

Evaluate:

1. Revenue Potential (1-10)
2. Pricing Power (1-10)
3. Scalability (1-10)
4. Customer Acquisition Difficulty (1-10)

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
        FINANCE_MODEL,
        prompt
    )
    agent_result = json.loads(response)

    report = {
        "agent": "Finance Analyst",
        **agent_result
    }

    log = f"Finance Analyst: {response}"

    return report, log