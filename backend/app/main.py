from fastapi import FastAPI  # pyright: ignore[reportMissingImports]
from fastapi.middleware.cors import CORSMiddleware  # pyright: ignore[reportMissingImports]

from app.api.routes import router

app = FastAPI(title="Email Classifier API", description="API for classifying emails")

# CORS para permitir o frontend em desenvolvimento e produção (via Nginx proxy)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite dev server
        "http://127.0.0.1:5173",
        "http://localhost:3003",  # Docker local (frontend)
        "http://127.0.0.1:3003",
        "http://localhost",       # Docker local (porta 80)
        "http://127.0.0.1",
        "*",  # Em produção, aceita qualquer origem (ajuste conforme necessário)
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/")
def health_check():
    return {"status": "Api is running"}
