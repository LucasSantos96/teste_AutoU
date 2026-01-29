from fastapi import (  # pyright: ignore[reportMissingImports]
    APIRouter,
    UploadFile,
    File,
    Form,
)  # pyright: ignore[reportMissingImports]

from app.services.classifier import classify_email
from app.services.response import generate_response
from app.services.nlp_preprocess import preprocess_text
from app.services.ai_classifier import classify_with_ai
from app.services.file_reader import read_file


router = APIRouter()


@router.post("/api")
async def process_email(
    text: str | None = Form(None),
    file: UploadFile | None = File(None),
):

    content = ""

    if text:
        content = text

    elif file:
        try:
            content = await read_file(file)
        except ValueError as exc:
            return {"error": str(exc)}
    else:
        return {"error": "Nenhum conteúdo enviado"}

    #NLP
    processed_text = preprocess_text(content)

    #CLASSIFIER
    category, confidence = classify_email(processed_text)

    #RESPOSTA AUTOMATICA
    if confidence < 0.6:
        category, response_text = classify_with_ai(processed_text)
    else:
        response_text = generate_response(category)

    return {
        "processed_text": processed_text,
        "category": category,
        "confidence": confidence,
        "response_text": response_text[:300]
    }
