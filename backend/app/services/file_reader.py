from fastapi import UploadFile  # pyright: ignore[reportMissingImports]
import io

import pdfplumber  # pyright: ignore[reportMissingImports]


async def read_file(file: UploadFile) -> str:
    """
    Lê o conteúdo de um arquivo enviado via UploadFile.
    - .txt: decodifica como UTF-8
    - .pdf: extrai texto de todas as páginas
    """
    file_bytes = await file.read()
    filename = (file.filename or "").lower()

    if filename.endswith(".txt"):
        return file_bytes.decode("utf-8", errors="ignore")

    if filename.endswith(".pdf"):
        text = ""
        with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"

        return text.strip()

    raise ValueError("Arquivo não suportado. Envie um arquivo .txt ou .pdf.")

