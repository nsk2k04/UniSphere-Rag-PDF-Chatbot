from sentence_transformers import SentenceTransformer

model = SentenceTransformer(
    "sentence-transformers/all-MiniLM-L6-v2"
)

def create_embedding(text):

    embedding = model.encode(
        text,
        show_progress_bar=False
    )

    return embedding


def create_embeddings(chunks):

    embeddings = model.encode(
        chunks,
        batch_size=4,
        show_progress_bar=False,
        convert_to_numpy=True
    )

    return embeddings