from ai_client import ask_model
import json

def analyze(startup):

    prompt = f"""
You are a Venture Capital Market Research Analyst.

Startup:

{startup}

Identify:

1. Top 5 competitors
2. Why they are strong
3. Biggest threat to this startup

Return ONLY JSON:

{{
  "competitors": [
    "Competitor 1",
    "Competitor 2",
    "Competitor 3",
    "Competitor 4",
    "Competitor 5"
  ],
  "threat": "one sentence"
}}
"""

    response = ask_model(
        "perplexity/sonar-pro",
        prompt
    )

    try:
        cleaned = (
            response
            .replace("```json", "")
            .replace("```", "")
            .strip()
        )

        return json.loads(cleaned)

    except Exception as e:

        print("COMPETITOR ERROR:", e)
        print(response)

        return {
            "competitors": [],
            "threat": "Could not generate competitor analysis."
        }