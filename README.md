# Flight Delay Prediction System

IT3051 – Fundamentals of Data Mining Mini Project 2026

## Project Objective

Predict whether a flight will experience a departure delay of
15 minutes or more using information available before departure.

## Final Model

Class-Weighted Gradient Boosting Classifier

Final test performance:

- Accuracy: 55.42%
- Precision: 14.67%
- Recall: 60.05%
- F1-score: 23.59%
- ROC-AUC: 59.64%
- PR-AUC: 15.31%

## Backend

The backend is developed using Flask.

### Prediction Endpoint

POST `/predict`

### Example Request

```json
{
  "carrier": "DL",
  "origin": "ATL",
  "destination": "JFK",
  "flight_date": "2025-01-15",
  "departure_time": "18:30",
  "arrival_time": "20:30",
  "elapsed_time": 150,
  "distance": 760
}