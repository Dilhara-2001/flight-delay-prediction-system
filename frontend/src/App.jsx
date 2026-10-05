import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    carrier: "",
    origin: "",
    destination: "",
    flight_date: "",
    departure_time: "",
    arrival_time: "",
    elapsed_time: "",
    distance: "",
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setResult(null);
    setLoading(true);

    try {
      const response = await fetch("/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          carrier: formData.carrier.trim().toUpperCase(),
          origin: formData.origin.trim().toUpperCase(),
          destination: formData.destination.trim().toUpperCase(),
          elapsed_time: Number(formData.elapsed_time),
          distance: Number(formData.distance),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to generate prediction.");
      }

      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFormData({
      carrier: "",
      origin: "",
      destination: "",
      flight_date: "",
      departure_time: "",
      arrival_time: "",
      elapsed_time: "",
      distance: "",
    });

    setResult(null);
    setError("");
  };

  const significantDelay = result?.prediction === "Significant Delay";

  return (
    <div className="app">
      {/* Animated airplanes in background */}
      <div className="air-traffic" aria-hidden="true">
        {/* Contrail streaks */}
        <div className="contrail contrail-1"></div>
        <div className="contrail contrail-2"></div>
        <div className="contrail contrail-3"></div>

        {/* Large planes flying across */}
        <div className="sky-plane plane-1">
          <span className="plane-body">✈</span>
          <span className="plane-light"></span>
        </div>
        <div className="sky-plane plane-2">
          <span className="plane-body">✈</span>
          <span className="plane-light"></span>
        </div>
        <div className="sky-plane plane-3">
          <span className="plane-body">✈</span>
          <span className="plane-light"></span>
        </div>
        <div className="sky-plane plane-4">
          <span className="plane-body">✈</span>
          <span className="plane-light"></span>
        </div>
        <div className="sky-plane plane-5">
          <span className="plane-body">✈</span>
          <span className="plane-light"></span>
        </div>

        {/* Dashed flight trails */}
        <div className="flight-trail trail-1"></div>
        <div className="flight-trail trail-2"></div>
      </div>

      {/* Decorative background glows */}
      <div className="background-decoration decoration-one"></div>
      <div className="background-decoration decoration-two"></div>

      <main className="main-wrapper">
        {/* Top branding */}
        <div className="brand-bar">
          <div className="brand">
            <div className="brand-icon">✈</div>
            <div>
              <span className="brand-title">LibertyWing AI</span>
              <span className="brand-subtitle">
                Departure Delay Prediction
              </span>
            </div>
          </div>

          <div className="model-badge">
            <span className="status-dot"></span>
            Model Live
          </div>
        </div>

        <section className="prediction-card">
          {/* Hero */}
          <div className="hero-section">
            <div className="hero-content">
              <div className="eyebrow">
                <span>★</span>
                LIBERTYWING • U.S. AVIATION INTELLIGENCE
              </div>

              <h1>
                Will your flight
                <span> leave on time?</span>
              </h1>

              <p>
                Enter your scheduled flight information and our machine
                learning model will estimate whether the departure may be
                delayed by 15 minutes or more.
              </p>
            </div>

            <div className="hero-plane" aria-hidden="true">
              ✈
            </div>
          </div>

          {/* Animated gradient divider */}
          <div className="flag-divider">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <form onSubmit={handleSubmit} className="prediction-form">
            <div className="form-heading">
              <div>
                <h2>Flight Information</h2>
                <p>Complete all fields to generate a prediction.</p>
              </div>

              <span className="required-note">* All fields required</span>
            </div>

            <div className="form-grid">
              {/* Carrier */}
              <div className="form-group">
                <label htmlFor="carrier">
                  <span className="field-icon">✦</span>
                  Operating Carrier
                </label>

                <input
                  id="carrier"
                  type="text"
                  name="carrier"
                  value={formData.carrier}
                  onChange={handleChange}
                  placeholder="e.g. DL"
                  minLength="2"
                  maxLength="3"
                  pattern="[A-Za-z0-9]+"
                  title="Enter a valid 2 or 3 character airline carrier code"
                  required
                />

                <small>2–3 character airline code</small>
              </div>

              {/* Date */}
              <div className="form-group">
                <label htmlFor="flight_date">
                  <span className="field-icon">◆</span>
                  Flight Date
                </label>

                <input
                  id="flight_date"
                  type="date"
                  name="flight_date"
                  value={formData.flight_date}
                  onChange={handleChange}
                  required
                />

                <small>Select the scheduled flight date</small>
              </div>

              {/* Origin */}
              <div className="form-group">
                <label htmlFor="origin">
                  <span className="field-icon origin-dot">●</span>
                  Origin Airport
                </label>

                <input
                  id="origin"
                  type="text"
                  name="origin"
                  value={formData.origin}
                  onChange={handleChange}
                  placeholder="e.g. ATL"
                  minLength="3"
                  maxLength="3"
                  pattern="[A-Za-z]{3}"
                  title="Enter a valid 3-letter airport code"
                  required
                />

                <small>3-letter departure airport code</small>
              </div>

              {/* Destination */}
              <div className="form-group">
                <label htmlFor="destination">
                  <span className="field-icon destination-dot">●</span>
                  Destination Airport
                </label>

                <input
                  id="destination"
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  placeholder="e.g. JFK"
                  minLength="3"
                  maxLength="3"
                  pattern="[A-Za-z]{3}"
                  title="Enter a valid 3-letter airport code"
                  required
                />

                <small>3-letter arrival airport code</small>
              </div>

              {/* Departure */}
              <div className="form-group">
                <label htmlFor="departure_time">
                  <span className="field-icon">↑</span>
                  Scheduled Departure
                </label>

                <input
                  id="departure_time"
                  type="time"
                  name="departure_time"
                  value={formData.departure_time}
                  onChange={handleChange}
                  required
                />

                <small>Scheduled departure time</small>
              </div>

              {/* Arrival */}
              <div className="form-group">
                <label htmlFor="arrival_time">
                  <span className="field-icon">↓</span>
                  Scheduled Arrival
                </label>

                <input
                  id="arrival_time"
                  type="time"
                  name="arrival_time"
                  value={formData.arrival_time}
                  onChange={handleChange}
                  required
                />

                <small>Scheduled arrival time</small>
              </div>

              {/* Duration */}
              <div className="form-group">
                <label htmlFor="elapsed_time">
                  <span className="field-icon">◷</span>
                  Flight Duration
                </label>

                <div className="input-with-unit">
                  <input
                    id="elapsed_time"
                    type="number"
                    name="elapsed_time"
                    value={formData.elapsed_time}
                    onChange={handleChange}
                    placeholder="e.g. 150"
                    min="1"
                    required
                  />

                  <span>min</span>
                </div>

                <small>Scheduled elapsed flight time</small>
              </div>

              {/* Distance */}
              <div className="form-group">
                <label htmlFor="distance">
                  <span className="field-icon">↔</span>
                  Flight Distance
                </label>

                <div className="input-with-unit">
                  <input
                    id="distance"
                    type="number"
                    name="distance"
                    value={formData.distance}
                    onChange={handleChange}
                    placeholder="e.g. 760"
                    min="1"
                    required
                  />

                  <span>mi</span>
                </div>

                <small>Scheduled route distance</small>
              </div>
            </div>

            <div className="button-row">
              <button
                type="button"
                className="clear-button"
                onClick={handleClear}
              >
                Clear Form
              </button>

              <button
                type="submit"
                className="predict-button"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="loader"></span>
                    Analysing Flight...
                  </>
                ) : (
                  <>
                    <span className="button-plane">✈</span>
                    Predict Flight Delay
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Error */}
          {error && (
            <div className="error-message">
              <div className="message-icon">!</div>
              <div>
                <h3>Unable to Make Prediction</h3>
                <p>{error}</p>
              </div>
            </div>
          )}

          {/* Prediction */}
          {result && (
            <div
              className={`result-card ${
                significantDelay ? "delay-result" : "ontime-result"
              }`}
            >
              <div className="result-top">
                <div
                  className={`result-icon ${
                    significantDelay ? "warning-icon" : "success-icon"
                  }`}
                >
                  {significantDelay ? "!" : "✓"}
                </div>

                <div className="result-heading">
                  <span className="result-label">
                    MACHINE LEARNING PREDICTION
                  </span>

                  <h2>
                    {significantDelay
                      ? "Significant Delay Predicted"
                      : "No Significant Delay Predicted"}
                  </h2>

                  <p>
                    {significantDelay
                      ? "This flight has been identified as having an increased risk of a significant departure delay."
                      : "This flight is currently predicted to avoid a significant departure delay."}
                  </p>
                </div>
              </div>

              {result.delay_probability !== undefined && (
                <div className="probability-section">
                  <div className="probability-header">
                    <span>Estimated delay probability</span>

                    <strong>
                      {Number(result.delay_probability).toFixed(2)}%
                    </strong>
                  </div>

                  <div className="probability-track">
                    <div
                      className="probability-fill"
                      style={{
                        width: `${Math.min(
                          Number(result.delay_probability),
                          100
                        )}%`,
                      }}
                    ></div>
                  </div>

                  <div className="probability-scale">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
              )}

              <div className="result-note">
                <span>i</span>
                A significant delay is defined as a departure delay of
                15 minutes or more.
              </div>
            </div>
          )}
        </section>

        <footer>
          <div className="footer-flag">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <p>
            LibertyWing AI • U.S. Flight Delay Intelligence
          </p>
          <small>
            Predictions are estimates based on patterns learned from historical
            flight data and should not be treated as guaranteed outcomes.
          </small>
        </footer>
      </main>
    </div>
  );
}

export default App;