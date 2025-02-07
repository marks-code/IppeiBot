from fastapi import FastAPI
import pandas as pd
import os

app = FastAPI()
DATA_DIR = "data"

@app.get("/predictions")
def get_predictions():
    predictions_path = os.path.join(DATA_DIR, "games_data.csv")
    odds_path = os.path.join(DATA_DIR, "sportsbook_odds.csv")
    
    if not os.path.exists(predictions_path) or not os.path.exists(odds_path):
        return {"error": "Predictions or odds data not found."}
    
    predictions = pd.read_csv(predictions_path)
    odds = pd.read_csv(odds_path)
    
    # Merge predictions with sportsbook odds
    merged = predictions.merge(odds, left_on=["team"], right_on=["team_1"], how="left")
    
    # Blended probability: 60% from model, 40% from sportsbook
    merged["blended_prob"] = 0.6 * merged["won"] + 0.4 * merged["team_1_prob"]
    
    return merged.to_dict(orient="records")