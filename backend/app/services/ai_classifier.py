import json
import os

from openai import OpenAI
from dotenv import load_dotenv


ALLOWED_CATEGORIES = {"productive", "unproductive"}

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENROUTER_API_KEY"),
    base_url="https://openrouter.ai/api/v1",
)


def classify_with_ai(text: str) -> tuple[str, str]:
    system_prompt = (
        "Você é o melhor do suporte em um  sistema que classifica emails corporativos."
        "Responda SOMENTE com JSON válido.\n"
        "Nunca escreva texto fora do JSON.\n"
        "Categorias permitidas: Productive ou Unproductive.\n"
        "Produtivo: Emails que requerem uma ação ou resposta específica (ex.: solicitações de suporte técnico, atualização sobre casos em aberto, dúvidas sobre o sistema)."
        "Improdutivo: Emails que não necessitam de uma ação imediata (ex.: mensagens de felicitações, agradecimentos)."
        "Idioma: português."
    )

    user_prompt = f"""
Classifique o email abaixo como:
- Productive
- Unproductive

Depois gere uma resposta curta e profissional adequada à categoria.

Email:
\"\"\"{text}\"\"\"

Formato obrigatório:
{{
  "category": "Productive | Unproductive",
  "response": "string"
}}
"""

    response = client.chat.completions.create(
        model="meta-llama/llama-3-8b-instruct",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        temperature=0.2,
    )

    content = response.choices[0].message.content.strip()  # pyright: ignore[reportOptionalMemberAccess]

    if content.startswith("```"):
        content = content.replace("```json", "").replace("```", "").strip()

    try:
        result = json.loads(content)

        raw_category = result.get("category", "")
        response_text = result.get("response", "").strip()

        normalized = raw_category.strip().lower()
        if normalized in {"productive", "produtivo"}:
            category = "productive"
        elif normalized in {"unproductive", "improdutivo"}:
            category = "unproductive"
        else:
            raise ValueError("Categoria inválida da IA")

        if category not in ALLOWED_CATEGORIES or not response_text:
            raise ValueError("Resposta inválida da IA")

        return category, response_text

    except Exception:
        return (
            "unproductive",
            "Sua mensagem foi recebida. Caso necessário, retornaremos em breve.",
        )