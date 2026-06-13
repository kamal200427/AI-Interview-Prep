from functools import lru_cache
from pathlib import Path

from langchain_community.document_loaders import DirectoryLoader, PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_huggingface.embeddings import HuggingFaceEmbeddings


embedding_model = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
# 
# C:\study platform\AI-Interview-Prep\backend\subject pdf
def _load_subject_documents():
    document = DirectoryLoader(
        path=r"D:\AI Interview Preparation\backend\subject pdf",
        glob="*.pdf",
        loader_cls=PyPDFLoader,
    )

    documents = document.load()

    for doc in documents:
        source = doc.metadata["source"]
        subject = Path(source).name.split(".")[0].upper()
        doc.metadata["subject"] = subject

    return documents
# C:\study platform\AI-Interview-Prep\backend\general pdf
# 
def _load_general_documents():
    document = DirectoryLoader(
        path=r"D:\AI Interview Preparation\backend\general pdf",
        glob="*.pdf",
        loader_cls=PyPDFLoader,
    )

    return document.load()

# C:\study platform\AI-Interview-Prep\backend\vectordb
@lru_cache(maxsize=1)
def _get_subject_store():
    vector_store = Chroma(
        persist_directory=r"D:\AI Interview Preparation\backend\vectordb",
        embedding_function=embedding_model,
    )

    if vector_store._collection.count() == 0:
        documents = _load_subject_documents()
        spliter = RecursiveCharacterTextSplitter(
            chunk_size=700,
            chunk_overlap=100,
        )
        chunks = spliter.split_documents(documents)
        vector_store.add_documents(chunks)

    return vector_store

# C:\study platform\AI-Interview-Prep\backend\genrel_db

@lru_cache(maxsize=1)
def _get_general_store():
    genrel_store = Chroma(
        persist_directory=r"D:\AI Interview Preparation\backend\genrel_db",
        embedding_function=embedding_model,
    )

    if genrel_store._collection.count() == 0:
        documents = _load_general_documents()
        genrel_spliter = RecursiveCharacterTextSplitter(
            chunk_size=600,
            chunk_overlap=150,
        )
        chunks = genrel_spliter.split_documents(documents=documents)
        genrel_store.add_documents(chunks)

    return genrel_store


def db_retriver(subject: str):
    retriver = _get_subject_store().as_retriever(
        search_kwargs={
            "k": 4,
            "filter": {
                "subject": subject,
            },
        }
    )
    return retriver


def genrel_retriver():
    retriver = _get_general_store().as_retriever(
        search_kwargs={
            "k": 4,
        }
    )
    return retriver