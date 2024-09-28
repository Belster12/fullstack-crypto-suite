from fastapi import FastAPI
from src.router import router as router_crypto
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "https://fullstack-crypto-suite.onrender.com/",
    "http://localhost:5173",
    "89.74.225.20:0",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router_crypto)
