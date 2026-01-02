export interface PredictionRequest {
  genre: string
  runtime: number
  rating_latter: string
  year: number
  total_numberof_rating: number
}

export interface PredictionResponse {
  predicted_rating: number
  verdict: string
}


