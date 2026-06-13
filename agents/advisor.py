from ai_client import ask_model

def advise(startup, reports):

    prompt = f"""
You are a Startup Strategy Advisor.

Startup:

{startup}

Board Reports:

{reports}

Give 5 practical recommendations.

Return ONLY JSON:

{{
  "recommendations":[
    "recommendation 1",
    "recommendation 2",
    "recommendation 3",
    "recommendation 4",
    "recommendation 5"
  ]
}}
"""

    response = ask_model(
        "anthropic/claude-sonnet-4",
        prompt
    )

    return response