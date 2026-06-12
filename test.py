from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

client = OpenAI(
    base_url="https://api.aimlapi.com/v1",
    api_key=os.getenv("AIML_API_KEY")
)

response = client.chat.completions.create(
    model="alibaba/qwen3.6-plus",
    messages=[
        {
            "role": "user",
            "content": "Say hello in one sentence."
        }
    ]
)

print(response.choices[0].message.content)