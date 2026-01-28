from app.services.keywords import (
    PRODUCTIVE_KEYWORDS,
    UNPRODUCTIVE_KEYWORDS
)


def classify_email(content: str) -> str:
    #classifica emails como produtivo e improdutivo

    text = content.lower()

    productive_score = 0
    unproductive_score = 0

    for word in PRODUCTIVE_KEYWORDS:
        if word in text:
            productive_score += 1

    for word in UNPRODUCTIVE_KEYWORDS:
        if word in text:
            unproductive_score += 1

    if productive_score >= 1 and productive_score >= unproductive_score:
        return "productive"

    return "unproductive"
