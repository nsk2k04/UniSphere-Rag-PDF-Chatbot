import os
import pickle
import time

import faiss
import numpy as np

from pypdf import PdfReader

from backend.services.chunker import chunk_text
from backend.services.embeddings import create_embeddings

from backend.core.session_manager import set_session_ready


def build_session_index(
    pdf_path,
    session_id
):

    print("Reading PDF...")

    reader = PdfReader(pdf_path)

    text = ""

    for page in reader.pages:

        page_text = page.extract_text()

        if page_text:
            text += page_text

    print(f"TEXT LENGTH: {len(text)}")

    print("Chunking...")

    chunks = chunk_text(text)

    print(f"TOTAL CHUNKS: {len(chunks)}")

    print("Creating Embeddings...")

    start_time = time.time()

    embeddings = create_embeddings(chunks)
    print("EMBEDDINGS CREATED")
    print("TOTAL EMBEDDINGS:", len(embeddings))

    print(
        f"EMBEDDINGS DONE IN {time.time() - start_time:.2f} SECONDS"
    )

    embeddings = np.array(
        embeddings,
        dtype="float32"
    )

    print("Building FAISS...")

    start_time = time.time()

    # Normalize embeddings for cosine similarity
    faiss.normalize_L2(
        embeddings
    )

    dimension = embeddings.shape[1]

    index = faiss.IndexFlatIP(
        dimension
    )

    index.add(
        embeddings
    )

    print(
        f"FAISS BUILT IN {time.time() - start_time:.2f} SECONDS"
    )

    session_folder = os.path.join(
        "backend",
        "storage",
        "temp_storage",
        session_id
    )

    os.makedirs(
        session_folder,
        exist_ok=True
    )

    print("Saving FAISS...")

    faiss.write_index(
        index,
        os.path.join(
            session_folder,
            "faiss.index"
        )
    )

    print("Saving Chunks...")

    with open(
        os.path.join(
            session_folder,
            "chunks.pkl"
        ),
        "wb"
    ) as f:

        pickle.dump(
            chunks,
            f
        )

    set_session_ready(
        session_id
    )

    print(
        f"Session {session_id} Ready"
    )