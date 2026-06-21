from backend.services.embeddings import (
    create_embedding
)

embedding = create_embedding(
    "What is Artificial Intelligence?"
)

print(type(embedding))
print(len(embedding))