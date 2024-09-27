from fastapi import FastAPI
from src.router import router as router_crypto
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "https://fullstack-crypto-suite.onrender.com/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router_crypto)
