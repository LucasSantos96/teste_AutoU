from app.services.keywords import (
    PRODUCTIVE_KEYWORDS,
    UNPRODUCTIVE_KEYWORDS
)
from typing import Tuple

def classify_email(content: str) -> Tuple[str,float]:
    #classifica emails como produtivo e improdutivo


    score = 0

    for word in PRODUCTIVE_KEYWORDS:
        if word in content:
            score += 1

    for word in UNPRODUCTIVE_KEYWORDS:
        if word in content:
            score -= 1

    if score > 0:
        return "productive", min(score / 5, 1.0)

    return "unproductive", min(abs(score) / 5, 1.0)