from backend.services.chunker import chunk_text

text = "Hello UniSphere " * 100

chunks = chunk_text(text)

print("Total Chunks:", len(chunks))
print()
print(chunks[0][:100])