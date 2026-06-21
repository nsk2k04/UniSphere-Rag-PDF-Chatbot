import os
import pickle

import faiss
import numpy as np


def search_chunks(
    query_embedding,
    session_id,
    top_k=10
):

    session_folder = os.path.join(
        "backend",
        "storage",
        "temp_storage",
        session_id
    )

    index_path = os.path.join(
        session_folder,
        "faiss.index"
    )

    chunks_path = os.path.join(
        session_folder,
        "chunks.pkl"
    )

    index = faiss.read_index(
        index_path
    )

    with open(
        chunks_path,
        "rb"
    ) as f:

        chunks = pickle.load(f)

    query_embedding = np.array(
        [query_embedding],
        dtype="float32"
    )

    # Normalize query vector
    faiss.normalize_L2(
        query_embedding
    )

    distances, indices = index.search(
        query_embedding,
        top_k
    )

    results = []

    for idx in indices[0]:

        if idx != -1:

            results.append(
                chunks[idx]
            )

    return results