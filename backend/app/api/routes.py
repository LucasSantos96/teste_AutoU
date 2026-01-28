from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Form,
)  # pyright: ignore[reportMissingImports]
from app.services.file_reader import read_file
from app.services.classifier import classify_email
from app.services.response import generate_response


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
        content = await read_file(file)
    else:
        return {"error": "Nenhum conteúdo enviado"}

    category = classify_email(content)
    response_text = generate_response(category)

    return {"category": category, "response": response_text, "preview": content[:300]}
