from fastapi import FastAPI, UploadFile, File
import shutil, os

from backend.core.session_manager import create_session, get_session_status
from backend.services.index_builder import build_session_index
from backend.services.embeddings import create_embedding
from backend.services.search import search_chunks
from backend.services.generator import generate_answer
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "https://uni-sphere-rag-pdf-chatbot.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {
        "message": "UniSphere Backend Running"
    }


@app.post("/upload-pdf")
def upload_pdf(file: UploadFile = File(...)):

    session_id = create_session()

    os.makedirs("uploads", exist_ok=True)

    pdf_path = os.path.join(
        "uploads",
        f"{session_id}.pdf"
    )

    with open(pdf_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    build_session_index(
        pdf_path,
        session_id
    )

    return {
        "session_id": session_id,
        "filename": file.filename,
        "status": "ready"
    }


@app.get("/session-status/{session_id}")
def session_status(session_id: str):

    return {
        "session_id": session_id,
        **get_session_status(
            session_id
        )
    }


@app.get("/chat")
def chat(
    session_id: str,
    question: str
):

    print("\n====================")
    print("QUESTION:", question)

    query_embedding = create_embedding(
        question
    )

    retrieved_chunks = search_chunks(
        query_embedding,
        session_id
    )

    print("\nRETRIEVED CHUNKS:\n")

    for i, chunk in enumerate(retrieved_chunks):
        print(f"\n----- Chunk {i+1} -----")
        print(chunk[:500])

    context = "\n\n".join(
        retrieved_chunks
    )

    answer = generate_answer(
        context,
        question
    )

    print("\nANSWER:")
    print(answer)
    print("====================\n")

    return {
        "session_id": session_id,
        "question": question,
        "answer": answer,
        "retrieved_chunks": retrieved_chunks
    }