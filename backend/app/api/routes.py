from fastapi import (  # pyright: ignore[reportMissingImports]
    APIRouter,
    UploadFile,
    File,
    Form,
)  # pyright: ignore[reportMissingImports]
from app.services.file_reader import read_file
from app.services.classifier import classify_email
from app.services.response import generate_response
from app.services.nlp_preprocess import preprocess_text


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
        raw = await file.read()
        content = raw.decode("utf-8", errors='ignore')
    else:
        return {"error": "Nenhum conteúdo enviado"}

    processed_text = preprocess_text(content)
    #category = classify_email(content)
    #response_text = generate_response(category)

    return {"processed_text": processed_text}
