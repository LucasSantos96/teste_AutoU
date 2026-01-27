def classify_email(content: str) -> str:
    if len(content) > 50: 
        return "productive"

    return "improductive"