from fastapi import APIRouter, UploadFile, File, Form  # pyright: ignore[reportMissingImports]
from app.services.file_reader import read_file
from app.services.classifier import classify_email


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

    result = classify_email(content)

  

    return {
        "result": result,
        "content_preview": content[:300],
        
    }
