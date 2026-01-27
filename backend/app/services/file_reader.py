import pdfplumber  # pyright: ignore[reportMissingImports]
from fastapi import UploadFile  # pyright: ignore[reportMissingImports]
import io


def read_txt(file_bytes: bytes) -> str:
    return file_bytes.decode('utf-8', errors='ignore')


def read_pdf(file_bytes: bytes) -> str:
    text = ""

    with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
        for page in pdf.pages:
           page_text = page.extract_text()
        if page_text:
            text += page_text + "\n"
            
    return text

async def read_file(file: UploadFile) -> str:
        file_bytes = await file.read()
        filename = file.filename.lower()

        if filename.endswith('.txt'):
            return read_txt(file_bytes)

        if filename.endswith('.pdf'):
            return read_pdf(file_bytes)

        raise ValueError(f"Arquivo não suportado")