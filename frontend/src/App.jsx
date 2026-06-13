import { useState } from "react";
import axios from "axios";
import {
  Radar
} from "react-chartjs-2";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import "./App.css";
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function App() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState("");

  const [form, setForm] = useState({
    startup_name: "",
    problem: "",
    solution: "",
    target_users: "",
    business_model: "",
    competitive_advantage: "",
  });

  const [result, setResult] = useState(null);
  const chartData = result
  ? {
      labels: [
        "Market",
        "Finance",
        "Technical",
        "Risk",
      ],
      datasets: [
        {
          label: "Board Score",
          data: [
            result.market.score,
            result.finance.score,
            result.technical.score,
            result.risk.score,
          ],
          backgroundColor: "rgba(99,102,241,0.35)",
          borderColor: "#8b5cf6",
          pointBackgroundColor: "#8b5cf6",
          pointBorderColor: "#ffffff",
          pointRadius: 5,
          borderWidth: 3,
        },
      ],
    }
  : null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const downloadPDF = async () => {

  try {

    const response = await axios.post(
      `${API_URL}/generate-pdf`,
      form,
      {
        responseType: "blob",
      }
    );

    const url =
      window.URL.createObjectURL(
        new Blob([response.data])
      );

    const link =
      document.createElement("a");

    link.href = url;

    link.setAttribute(
      "download",
      "BoardIQ_Report.pdf"
    );

    document.body.appendChild(link);

    link.click();

  } catch (error) {

    console.error(error);

  }

};

  const handleSubmit = async () => {

  setLoading(true);

  setStep("📈 Market Analyst Reviewing");

  try {

    const response = await axios.post(
      `${API_URL}/evaluate`,
      form
    );

    setTimeout(() => {
      setStep("💰 Finance Analyst Reviewing");
    }, 1000);

    setTimeout(() => {
      setStep("⚙️ Technical Architect Reviewing");
    }, 2000);

    setTimeout(() => {
      setStep("🛡️ Risk Officer Reviewing");
    }, 3000);

    setTimeout(() => {
      setStep("👔 CEO Making Final Decision");
    }, 4000);

    setTimeout(() => {
      setResult(response.data);
      setLoading(false);
    }, 5000);

  } catch (error) {

    console.error(error);
    alert("API Error");
    setLoading(false);

  }

};

  return (
    <div className="app">

      <div className="hero">
        <h1>BoardIQ</h1>
        <p>
          AI Startup Investment Boardroom
        </p>
      </div>

      <div className="form-container">

        <input
          name="startup_name"
          placeholder="Startup Name"
          onChange={handleChange}
        />

        <textarea
          name="problem"
          placeholder="Problem"
          onChange={handleChange}
        />

        <textarea
          name="solution"
          placeholder="Solution"
          onChange={handleChange}
        />

        <input
          name="target_users"
          placeholder="Target Users"
          onChange={handleChange}
        />

        <input
          name="business_model"
          placeholder="Business Model"
          onChange={handleChange}
        />

        <input
          name="competitive_advantage"
          placeholder="Competitive Advantage"
          onChange={handleChange}
        />

        <button onClick={handleSubmit}>
          Start Board Meeting
        </button>
        <button
  onClick={downloadPDF}
  style={{ marginTop: "10px" }}
>
  Download PDF Report
</button>

      </div>

      {loading && (
  <div className="loading">

    <h2>Board Meeting In Progress</h2>

    <br />

    <h3>{step}</h3>

  </div>
)}

      {result && (

        <div className="results">

          <div className="score-card">
            <h2>
              Overall Score:
              {" "}
              {result.overall_score}/10
            </h2>
          </div>

          <div className="agent-grid">

            <div className="agent-card">
              <h3>Market Analyst</h3>
              <p>Score: {result.market.score}/10</p>
              <p>Vote: {result.market.vote}</p>
              <p>{result.market.reason}</p>
            </div>

            <div className="agent-card">
              <h3>Finance Analyst</h3>
              <p>Score: {result.finance.score}/10</p>
              <p>Vote: {result.finance.vote}</p>
              <p>{result.finance.reason}</p>
            </div>

            <div className="agent-card">
              <h3>Technical Architect</h3>
              <p>Score: {result.technical.score}/10</p>
              <p>Vote: {result.technical.vote}</p>
              <p>{result.technical.reason}</p>
            </div>

            <div className="agent-card">
              <h3>Risk Officer</h3>
              <p>Score: {result.risk.score}/10</p>
              <p>Vote: {result.risk.vote}</p>
              <p>{result.risk.reason}</p>
            </div>

          </div>
          <div className="competitor-card">

  <h2>🏆 Competitor Analysis</h2>

  {result?.competitors?.competitors?.map(
    (item, index) => (
      <div
        key={index}
        className="competitor-item"
      >
        {item}
      </div>
    )
  )}

  <p className="threat">
    <strong>Biggest Threat:</strong>
    {" "}
    {result?.competitors?.threat}
  </p>

</div>
          <div className="chart-card">

  <h2>Board Analysis Radar</h2>

  <Radar
  data={chartData}
  options={{
    responsive: true,

    scales: {
      r: {
        min: 0,
        max: 10,

        ticks: {
          stepSize: 2,
          color: "#ffffff",
          backdropColor: "transparent",
        },

        pointLabels: {
          color: "#ffffff",
          font: {
            size: 14,
          },
        },

        grid: {
          color: "rgba(255,255,255,0.15)",
        },

        angleLines: {
          color: "rgba(255,255,255,0.15)",
        },
      },
    },

    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
        },
      },
    },
  }}
/>

</div>
<div className="discussion-card">

  <h2>Board Discussion</h2>

  <div className="discussion-line">
    📈 Market team sees
    <strong> {result.market.score >= 6 ? "moderate demand" : "weak market potential"}</strong>
    .
  </div>

  <div className="discussion-line">
    💰 Finance highlights
    <strong> {result.finance.score >= 6 ? "acceptable economics" : "business model concerns"}</strong>
    .
  </div>

  <div className="discussion-line">
    ⚙️ Technical team believes the solution is
    <strong> {result.technical.score >= 6 ? "feasible to build" : "difficult to execute"}</strong>
    .
  </div>

  <div className="discussion-line">
    🛡️ Risk assessment indicates
    <strong> {result.risk.score >= 6 ? "manageable risk" : "significant risk exposure"}</strong>
    .
  </div>

  <div className="discussion-line ceo-summary">
    👔 CEO concludes:
    <strong> {result.ceo.decision}</strong>
  </div>

</div>


          <div className="ceo-card">

            <h2
              className={
                result.ceo.decision === "APPROVED"
                ? "approved"
                : "rejected"
              }
            >
              {result.ceo.decision}
            </h2>

            <p>
              Confidence:
              {" "}
              {result.ceo.confidence}%
            </p>

            <p>
              Investment Score:
              {" "}
              {result.ceo.investment_score}/10
            </p>

            <br />

            <p>{result.ceo.reason}</p>

          </div>
          <div className="advisor-card">

  <h2>📋 Board Recommendations</h2>

  {result.advisor?.recommendations?.map(
    (item, index) => (
      <div
        key={index}
        className="recommendation"
      >
        ✓ {item}
      </div>
    )
  )}

</div>

        </div>

      )}

    </div>
  );
}

export default App;