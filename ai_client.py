from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

client = OpenAI(
    base_url="https://api.aimlapi.com/v1",
    api_key=os.getenv("AIML_API_KEY")
)

def ask_model(model_name, prompt):

    print(f"CALLING MODEL: {model_name}")

    response = client.chat.completions.create(
        model=model_name,
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content