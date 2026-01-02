# 🎬 IMDb Rating Prediction Web App

<div align="center">

![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)
![React](https://img.shields.io/badge/React-18.2-61DAFB.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.2-3178C6.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688.svg)
![License](https://img.shields.io/badge/License-MIT-green.svg)

A full-stack web application that predicts IMDb movie ratings using an ensemble machine learning model (Random Forest + XGBoost).

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [API Documentation](#-api-documentation) • [Model Details](#-model-details)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Model Details](#-model-details)
- [Screenshots](#-screenshots)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Overview

This project is a machine learning-powered web application that predicts IMDb movie ratings based on various movie features. The application uses an ensemble of Random Forest and XGBoost models trained on historical movie data to provide accurate rating predictions.

**Key Highlights:**
- 🤖 **Ensemble ML Model**: Combines Random Forest (40%) and XGBoost (60%) for optimal predictions
- ⚡ **Fast API**: Built with FastAPI for high-performance backend
- 🎨 **Modern UI**: Beautiful, responsive React frontend with Tailwind CSS
- 📊 **Real-time Predictions**: Get instant IMDb rating predictions with verdict classification

## ✨ Features

- **Movie Rating Prediction**: Predict IMDb ratings based on genre, runtime, rating category, year, and number of ratings
- **Metascore Support**: Optional Metascore feature (requires model retraining)
- **Verdict Classification**: Automatically categorizes predictions as:
  - 🎬 **Flop**: Rating < 5.5
  - 🎯 **Hit**: Rating 5.5 - 6.4
  - ⭐ **Super Hit**: Rating ≥ 6.4
- **Interactive UI**: User-friendly form with validation and error handling
- **API Documentation**: Built-in Swagger UI for API exploration
- **Health Monitoring**: Health check endpoint for model status

## 🛠 Tech Stack

### Frontend
- **React 18.2** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **ESLint** - Code quality

### Backend
- **FastAPI** - Web framework
- **Python 3.8+** - Programming language
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation

### Machine Learning
- **scikit-learn 1.6.1** - Random Forest Regressor
- **XGBoost 2.1+** - Gradient boosting
- **pandas** - Data manipulation
- **numpy** - Numerical computing
- **joblib** - Model serialization

## 📁 Project Structure

```
movie-imdb-rating-prediction/
├── Backend/
│   ├── main.py                    # FastAPI application
│   ├── requirements.txt           # Python dependencies
│   ├── run.bat                    # Windows startup script
│   ├── run.sh                     # Linux/Mac startup script
│   └── models/                    # Trained ML models
│       ├── preprocessor.joblib
│       ├── random_forest_ensemble.joblib
│       ├── xgboost_ensemble.joblib
│       ├── ensemble_weights.joblib
│       ├── Dataset 2021-2025.csv  # Training dataset
│       └── Ridika.ipynb           # Training notebook
│
└── frontend/
    ├── src/
    │   ├── App.tsx                # Main React component
    │   ├── main.tsx                # Entry point
    │   ├── types.ts                # TypeScript type definitions
    │   ├── index.css               # Global styles
    │   └── components/
    │       ├── Navbar.tsx          # Navigation bar
    │       ├── HeroSection.tsx     # Hero section
    │       ├── FeaturesSection.tsx # Features showcase
    │       ├── PredictionForm.tsx  # Prediction form
    │       ├── PredictionResult.tsx # Results display
    │       ├── AboutSection.tsx    # About section
    │       └── Footer.tsx          # Footer component
    ├── package.json                # Node.js dependencies
    ├── vite.config.ts              # Vite configuration
    ├── tailwind.config.js          # Tailwind CSS config
    └── tsconfig.json               # TypeScript config
```

## 🚀 Installation

### Prerequisites

- **Python 3.8+** ([Download](https://www.python.org/downloads/))
- **Node.js 16+** and **npm** ([Download](https://nodejs.org/))
- **Git** ([Download](https://git-scm.com/downloads))

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/movie-imdb-rating-prediction.git
cd movie-imdb-rating-prediction
```

### Step 2: Backend Setup

1. **Navigate to Backend directory:**
   ```bash
   cd Backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment:**
   - **Windows:**
     ```bash
     venv\Scripts\activate
     ```
   - **macOS/Linux:**
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Verify model files exist:**
   Ensure all `.joblib` files are present in `Backend/models/` directory:
   - `preprocessor.joblib`
   - `random_forest_ensemble.joblib`
   - `xgboost_ensemble.joblib`
   - `ensemble_weights.joblib`

### Step 3: Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## 💻 Usage

### Starting the Application

1. **Start the Backend Server** (Terminal 1):
   ```bash
   cd Backend
   venv\Scripts\activate  # Windows
   # or
   source venv/bin/activate  # macOS/Linux
   
   uvicorn main:app --reload
   ```
   
   Backend will be available at: `http://localhost:8000`
   - API Docs: `http://localhost:8000/docs`
   - Health Check: `http://localhost:8000/health`

2. **Start the Frontend Server** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```
   
   Frontend will be available at: `http://localhost:5173`

3. **Open your browser** and navigate to `http://localhost:5173`

### Making Predictions

1. Fill in the movie details form:
   - **Genre**: Select from dropdown (Action, Adventure, Animation, etc.)
   - **Rating Category**: MPAA rating (G, PG, PG-13, R, NC-17, Unknown)
   - **Runtime**: Movie runtime in minutes (must be > 0)
   - **Release Year**: Year between 1900 and current year + 1
   - **Total Number of Ratings**: Raw count of ratings (must be ≥ 0)
   - **Metascore** (optional): Metascore rating 0-100 (requires model retraining)

2. Click **"Predict IMDb Rating"** button

3. View the results:
   - Predicted IMDb rating (rounded to 2 decimal places)
   - Verdict classification badge

### Example Request

```json
{
  "genre": "Action",
  "runtime": 114,
  "rating_latter": "PG-13",
  "year": 2025,
  "total_numberof_rating": 87000,
  "metascore": 65
}
```

## 📚 API Documentation

### Base URL
```
http://localhost:8000
```

### Endpoints

#### `POST /predict`

Predict IMDb rating based on movie features.

**Request Body:**
```json
{
  "genre": "Action",
  "runtime": 120.0,
  "rating_latter": "PG-13",
  "year": 2021,
  "total_numberof_rating": 50000.0,
  "metascore": 65.0  // Optional
}
```

**Response:**
```json
{
  "predicted_rating": 6.75,
  "verdict": "Hit"
}
```

**Validation Rules:**
- `genre`: Required, non-empty string
- `runtime`: Required, must be > 0
- `rating_latter`: Required, non-empty string
- `year`: Required, between 1900 and current year + 1
- `total_numberof_rating`: Required, must be ≥ 0
- `metascore`: Optional, between 0 and 100

#### `GET /health`

Check if models are loaded and API is ready.

**Response:**
```json
{
  "status": "healthy",
  "models_loaded": true
}
```

#### `GET /`

Root endpoint returning API information.

**Response:**
```json
{
  "message": "IMDb Rating Prediction API",
  "status": "ready"
}
```

### Interactive API Documentation

Once the backend is running, visit:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## 🤖 Model Details

### Ensemble Architecture

The prediction uses a weighted ensemble of two models:

- **Random Forest Regressor** (Weight: 0.4)
  - 400 estimators
  - Max depth: 15
  - Min samples split: 10
  - Min samples leaf: 5

- **XGBoost Regressor** (Weight: 0.6)
  - 500 estimators
  - Max depth: 5
  - Learning rate: 0.03
  - Subsample: 0.8
  - Column sample by tree: 0.8

### Prediction Formula

```
final_rating = 0.4 × RF_prediction + 0.6 × XGB_prediction
```

### Features Used

- **Genre** (Categorical): One-hot encoded
- **Runtime** (Numeric): Standardized
- **Rating_latter** (Categorical): One-hot encoded
- **Year** (Numeric): Standardized
- **Total_Numberof_Rating** (Numeric): Log-transformed (`log1p`) then standardized
- **Metascore** (Numeric, Optional): Standardized (requires retraining)

### Preprocessing

- **Categorical Features**: One-hot encoding with `handle_unknown="ignore"`
- **Numeric Features**: Standard scaling (mean=0, std=1)
- **Total Ratings**: Log transformation using `np.log1p()` to handle skewness

### Model Performance

- **RMSE**: ~0.6-0.8 (on test set)
- **R² Score**: Varies by model
- **Training Data**: Movies from 2021-2025

## 📸 Screenshots

> **Note**: Add screenshots of your application here

- Prediction Form
- Results Display
- API Documentation

## 🔧 Troubleshooting

### Backend Issues

**Models not loading:**
- Ensure all `.joblib` files are in `Backend/models/` directory
- Check file permissions
- Verify scikit-learn version matches (1.6.1)

**Port already in use:**
```bash
uvicorn main:app --reload --port 8001
```

**Import errors:**
```bash
pip install -r requirements.txt --upgrade
```

**scikit-learn version mismatch:**
- Ensure scikit-learn version is exactly 1.6.1 (as specified in requirements.txt)
- Models were trained with scikit-learn 1.6.1

### Frontend Issues

**Cannot connect to API:**
- Ensure backend is running on `http://localhost:8000`
- Check CORS settings in `Backend/main.py`

**Build errors:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors:**
```bash
npm run lint
```

### Common Issues

**Metascore feature not working:**
- Current models don't support Metascore
- Retrain models with Metascore included in feature set
- See training notebook: `Backend/models/Ridika.ipynb`

**Prediction accuracy:**
- Model has inherent prediction error (RMSE ~0.6-0.8)
- Predictions are estimates based on learned patterns
- Including Metascore can improve accuracy

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow PEP 8 for Python code
- Use TypeScript strict mode for frontend
- Write clear commit messages
- Update documentation for new features
- Add tests when applicable

## 📝 License

This project is for educational purposes.

## 🙏 Acknowledgments

- Dataset: IMDb movie ratings data (2021-2025)
- Machine Learning: scikit-learn and XGBoost communities
- UI Inspiration: Modern web design patterns

## 📧 Contact

For questions or suggestions, please open an issue on GitHub.

---

<div align="center">

**Made with ❤️ using React, FastAPI, and Machine Learning**

⭐ Star this repo if you find it helpful!

</div>
