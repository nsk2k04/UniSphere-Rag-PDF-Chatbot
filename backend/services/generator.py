from huggingface_hub import InferenceClient
from dotenv import load_dotenv
import os

load_dotenv()

client = InferenceClient(
    token=os.getenv("HF_TOKEN")
)


def generate_answer(
    context,
    question
):

    response = client.chat_completion(
        model="meta-llama/Llama-3.1-8B-Instruct",
        messages=[
            {
                "role": "system",
                "content": """
You are UniSphere AI.

Answer ONLY using the provided context.

Rules:
1. Extract the answer directly from the context.
2. If the answer exists, provide it clearly and completely.
3. Do NOT use outside knowledge.
4. Do NOT make assumptions.
5. If the answer is not present in the context, reply exactly:

The answer is not available in the uploaded document.
"""
            },
            {
                "role": "user",
                "content": f"""
Context:
{context}

Question:
{question}

Extract the answer from the context.
"""
            }
        ],
        max_tokens=300,
        temperature=0.1
    )

    return response.choices[0].message.content