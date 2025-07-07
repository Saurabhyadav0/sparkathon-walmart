from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np
import math

origins = [
    "http://localhost:3000",
    "http://localhost:3001",
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/recommendations")
def get_recommendations():
    df = pd.read_csv("output.csv")
    df = df.replace([np.inf, -np.inf], np.nan)

    # Force Recommendation to uppercase
    if "Recommendation" in df.columns:
        df["Recommendation"] = df["Recommendation"].str.upper()

    records = df.to_dict(orient="records")
    
    for rec in records:
        for k, v in rec.items():
            if isinstance(v, float) and math.isnan(v):
                rec[k] = None

    return records
