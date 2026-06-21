# 🚀 UniSphere – AI-Powered PDF Chatbot

UniSphere is a Retrieval-Augmented Generation (RAG) application that allows users to upload PDF documents and ask questions in natural language. The system retrieves relevant information from the uploaded document using semantic search and generates accurate, context-aware answers using a Large Language Model (LLM).

## 🌐 Live Demo

🔗 **Live Project Link:** https://uni-sphere-rag-pdf-chatbot.vercel.app/

## 🎥 Demo Video

📺 **Watch Demo:** (https://drive.google.com/file/d/1CU3tmjT8E15GNrfz7M4UnI4hwuvpiEpv/view?usp=sharing)

---

## ✨ Features

* 📄 Upload PDF documents
* 🔍 Semantic search using vector embeddings
* 🧠 Retrieval-Augmented Generation (RAG)
* ⚡ FAISS-powered vector similarity search
* 🤖 Llama 3.1 answer generation
* 🎯 Context-grounded responses
* 📚 Session-based document isolation
* 🌐 Fully deployed web application

---

## 🏗️ System Architecture

```text
PDF Upload
    ↓
Text Extraction
    ↓
Text Chunking
    ↓
Embedding Generation
    ↓
FAISS Vector Index
    ↓
Semantic Retrieval
    ↓
Llama 3.1 Response Generation
    ↓
Answer Display
```

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Framer Motion
* Axios

### Backend

* FastAPI
* Sentence Transformers
* FAISS
* Hugging Face Inference API
* Python

### AI Components

* all-MiniLM-L6-v2 Embeddings
* Retrieval-Augmented Generation (RAG)
* Meta Llama 3.1 8B Instruct

### Deployment

* Vercel (Frontend)
* Railway (Backend)


## 💡 Example Questions

After uploading a PDF, try asking:

* What are the college working hours?
* What is the dress code for girls?
* What is the dress code for boys?
* What is the minimum attendance percentage required?
* Are visitors allowed during college hours?
* What are the hostel rules?
* What are the examination regulations?

---

## 📈 Future Improvements

* Multi-PDF Support
* Page Citation References
* Chat History Persistence
* User Authentication
* Qdrant / ChromaDB Integration
* Background Indexing
* Streaming Responses

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub!

**Built with ❤️ using React, FastAPI, FAISS, and Llama 3.1**
