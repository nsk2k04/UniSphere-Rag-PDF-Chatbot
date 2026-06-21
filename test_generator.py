from backend.services.generator import (
    generate_answer
)

response = generate_answer(
    context="""
PEO 1:
To ensure graduates will be capable of
applying the basic knowledge of physical
sciences, mathematics and Information
Technology.
""",
    question="What is PEO 1?"
)

print(response)