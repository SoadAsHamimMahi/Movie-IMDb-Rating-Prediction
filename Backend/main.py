from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, field_validator
import joblib
import pandas as pd
import numpy as np
from datetime import datetime
import os
import json
import sklearn
import traceback

# Initialize FastAPI app
app = FastAPI(title="IMDb Rating Prediction API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for models
preprocessor = None
rf_model = None
xgb_model = None
ensemble_weights = None

# Load models at startup
@app.on_event("startup")
async def load_models():
    global preprocessor, rf_model, xgb_model, ensemble_weights
    
    log_path = r"e:\Projects\movie IMDb rating prediction\.cursor\debug.log"
    
    # #region agent log
    try:
        with open(log_path, 'a', encoding='utf-8') as f:
            f.write(json.dumps({"sessionId": "debug-session", "runId": "run1", "hypothesisId": "A", "location": "main.py:30", "message": "load_models entry", "data": {"sklearn_version": sklearn.__version__}, "timestamp": int(datetime.now().timestamp() * 1000)}) + "\n")
    except: pass
    # #endregion
    
    models_dir = os.path.join(os.path.dirname(__file__), "models")
    
    model_files = [
        ("preprocessor", "preprocessor.joblib"),
        ("rf_model", "random_forest_ensemble.joblib"),
        ("xgb_model", "xgboost_ensemble.joblib"),
        ("ensemble_weights", "ensemble_weights.joblib")
    ]
    
    try:
        # #region agent log
        try:
            with open(log_path, 'a', encoding='utf-8') as f:
                f.write(json.dumps({"sessionId": "debug-session", "runId": "run1", "hypothesisId": "A,B,C,D,E", "location": "main.py:48", "message": "before model loading", "data": {"sklearn_version": sklearn.__version__, "models_dir": models_dir, "model_count": len(model_files)}, "timestamp": int(datetime.now().timestamp() * 1000)}) + "\n")
        except: pass
        # #endregion
        
        for model_name, filename in model_files:
            model_path = os.path.join(models_dir, filename)
            
            # #region agent log
            try:
                with open(log_path, 'a', encoding='utf-8') as f:
                    f.write(json.dumps({"sessionId": "debug-session", "runId": "run1", "hypothesisId": "A,B,C,D,E", "location": "main.py:55", "message": "loading model file", "data": {"model_name": model_name, "filename": filename, "path": model_path, "exists": os.path.exists(model_path)}, "timestamp": int(datetime.now().timestamp() * 1000)}) + "\n")
            except: pass
            # #endregion
            
            try:
                loaded_model = joblib.load(model_path)
                
                # #region agent log
                try:
                    with open(log_path, 'a', encoding='utf-8') as f:
                        f.write(json.dumps({"sessionId": "debug-session", "runId": "run1", "hypothesisId": "A", "location": "main.py:63", "message": "model loaded successfully", "data": {"model_name": model_name, "model_type": str(type(loaded_model))}, "timestamp": int(datetime.now().timestamp() * 1000)}) + "\n")
                except: pass
                # #endregion
                
                if model_name == "preprocessor":
                    preprocessor = loaded_model
                elif model_name == "rf_model":
                    rf_model = loaded_model
                elif model_name == "xgb_model":
                    xgb_model = loaded_model
                elif model_name == "ensemble_weights":
                    ensemble_weights = loaded_model
                    
            except Exception as model_error:
                # #region agent log
                try:
                    with open(log_path, 'a', encoding='utf-8') as f:
                        f.write(json.dumps({"sessionId": "debug-session", "runId": "run1", "hypothesisId": "A,B,C,D,E", "location": "main.py:78", "message": "model load failed", "data": {"model_name": model_name, "filename": filename, "error_type": type(model_error).__name__, "error_message": str(model_error), "traceback": traceback.format_exc()}, "timestamp": int(datetime.now().timestamp() * 1000)}) + "\n")
                except: pass
                # #endregion
                raise
        
        # #region agent log
        try:
            with open(log_path, 'a', encoding='utf-8') as f:
                f.write(json.dumps({"sessionId": "debug-session", "runId": "run1", "hypothesisId": "A", "location": "main.py:85", "message": "all models loaded successfully", "data": {"sklearn_version": sklearn.__version__}, "timestamp": int(datetime.now().timestamp() * 1000)}) + "\n")
        except: pass
        # #endregion
        
        print("✅ All models loaded successfully!")
    except Exception as e:
        # #region agent log
        try:
            with open(log_path, 'a', encoding='utf-8') as f:
                f.write(json.dumps({"sessionId": "debug-session", "runId": "run1", "hypothesisId": "A,B,C,D,E", "location": "main.py:90", "message": "load_models exception", "data": {"error_type": type(e).__name__, "error_message": str(e), "traceback": traceback.format_exc(), "sklearn_version": sklearn.__version__}, "timestamp": int(datetime.now().timestamp() * 1000)}) + "\n")
        except: pass
        # #endregion
        print(f"❌ Error loading models: {e}")
        raise

# Request model
class PredictionRequest(BaseModel):
    genre: str = Field(..., description="Movie genre")
    runtime: float = Field(..., gt=0, description="Movie runtime in minutes")
    rating_latter: str = Field(..., description="Rating category (e.g., PG, PG-13, R)")
    year: int = Field(..., ge=1900, le=datetime.now().year + 1, description="Release year")
    total_numberof_rating: float = Field(..., ge=0, description="Total number of ratings")
    
    @field_validator('genre', 'rating_latter')
    @classmethod
    def validate_strings(cls, v):
        if not v or not v.strip():
            raise ValueError('Field cannot be empty')
        return v.strip()

# Response model
class PredictionResponse(BaseModel):
    predicted_rating: float
    verdict: str

@app.get("/")
async def root():
    return {"message": "IMDb Rating Prediction API", "status": "ready"}

@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "models_loaded": all([preprocessor is not None, rf_model is not None, 
                             xgb_model is not None, ensemble_weights is not None])
    }

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    """
    Predict IMDb rating based on movie features.
    """
    try:
        # Validate models are loaded
        if any([preprocessor is None, rf_model is None, xgb_model is None, ensemble_weights is None]):
            raise HTTPException(status_code=503, detail="Models not loaded")
        
        # Transform Total_Numberof_Rating using log1p
        transformed_rating_count = np.log1p(request.total_numberof_rating)
        
        # Create DataFrame with exact column names expected by the model
        input_data = pd.DataFrame([{
            "Genre": request.genre,
            "Runtime": request.runtime,
            "Rating_latter": request.rating_latter,
            "Year": request.year,
            "Total_Numberof_Rating": transformed_rating_count
        }])
        
        # Get predictions from both models
        rf_pred = rf_model.predict(input_data)[0]
        xgb_pred = xgb_model.predict(input_data)[0]
        
        # Extract weights (handling various formats)
        if isinstance(ensemble_weights, dict):
            rf_weight = ensemble_weights.get("rf", 0.4)
            xgb_weight = ensemble_weights.get("xgb", 0.6)
        elif isinstance(ensemble_weights, (list, tuple, np.ndarray)):
            weights_list = list(ensemble_weights) if hasattr(ensemble_weights, '__iter__') else [ensemble_weights]
            rf_weight = float(weights_list[0]) if len(weights_list) > 0 else 0.4
            xgb_weight = float(weights_list[1]) if len(weights_list) > 1 else 0.6
        elif isinstance(ensemble_weights, (int, float)):
            # Single weight value - assume it's for XGBoost, RF gets complement
            xgb_weight = float(ensemble_weights)
            rf_weight = 1.0 - xgb_weight
        else:
            # Default weights based on notebook (0.6 xgb, 0.4 rf)
            rf_weight = 0.4
            xgb_weight = 0.6
        
        # Combine predictions using weights
        final_rating = rf_weight * rf_pred + xgb_weight * xgb_pred
        
        # Clamp to IMDb range (1.0 to 10.0)
        final_rating = float(max(1.0, min(10.0, final_rating)))
        
        # Round to 2 decimal places
        predicted_rating = round(final_rating, 2)
        
        # Determine verdict
        if predicted_rating < 5.5:
            verdict = "Flop"
        elif predicted_rating < 6.4:
            verdict = "Hit"
        else:
            verdict = "Super Hit"
        
        return PredictionResponse(
            predicted_rating=predicted_rating,
            verdict=verdict
        )
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")

