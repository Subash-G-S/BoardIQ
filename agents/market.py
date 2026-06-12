from ai_client import ask_model
import json
from config import MARKET_MODEL

def analyze(startup_idea):

    prompt = f"""
You are a senior Venture Capital Market Analyst.

Analyze this startup idea:

{startup_idea}

Evaluate:

1. Market Demand (1-10)
2. Competition (1-10)
3. Moat / Defensibility (1-10)
4. Differentiation (1-10)

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
        MARKET_MODEL,
        prompt
    )
    agent_result = json.loads(response)

    report = {
        "agent": "Market Analyst",
        **agent_result
    }

    log = f"Market Analyst: {response}"

    return report, log