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
  const [transcript, setTranscript] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [screen, setScreen] = useState("landing");

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
      result,
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
    setScreen("loading");
  setLoading(true);
  setExpanded({});
  setTranscript([]);

  try {

    const response = await axios.post(
      `${API_URL}/evaluate`,
      form
    );

    setTimeout(() => {

  setResult(response.data);

  setTranscript([

    {
      agent: "📈 Market Analyst",
      message:
        response.data.market.score >= 6
          ? "Market demand appears promising with clear customer pain points."
          : "Demand exists, but adoption and scalability remain uncertain."
    },

    {
      agent: "💰 Finance Analyst",
      message:
        response.data.finance.score >= 6
          ? "Revenue model appears sustainable with growth potential."
          : "Unit economics and monetization require improvement."
    },

    {
      agent: "⚙️ Technical Architect",
      message:
        response.data.technical.score >= 6
          ? "The solution is technically feasible with current technology."
          : "Implementation complexity may create execution challenges."
    },

    {
      agent: "🛡️ Risk Officer",
      message:
        response.data.risk.score >= 6
          ? "Risk exposure appears manageable at the current stage."
          : "Several operational and market risks require mitigation."
    },

    {
      agent: "👔 Investment Chair",
      message:
        `After reviewing all reports, the board decision is ${response.data.ceo.decision}.`
    }

  ]);

  setLoading(false);

  setScreen("dashboard");

}, 5000);

  } catch (error) {

    console.error(error);
    alert("API Error");
    setLoading(false);

  }

};
if (screen === "landing") {
  return (
    <div className="landing-page">

      <div className="landing-content">
        <div className="ai-core">

  <div className="ring ring1"></div>

  <div className="ring ring2"></div>

  <div className="ring ring3"></div>

  <div className="core-center"></div>

</div>

        <div className="status-pill">
          AI INVESTMENT OPERATING SYSTEM
        </div>
        <div className="brand">
BOARDIQ
</div>
        <h1 className="hero-title">
AI Boardroom for Startup Investment Decisions
</h1>

<p className="hero-description">
Five specialized AI executives debate, analyze,
challenge assumptions, and deliver an investment
decision in minutes.
</p>
        <div className="agent-online-row">

  <div className="online-agent">
    <span className="pulse"></span>
    Market Analyst
  </div>

  <div className="online-agent">
    <span className="pulse"></span>
    Finance Analyst
  </div>

  <div className="online-agent">
    <span className="pulse"></span>
    Technical Architect
  </div>

  <div className="online-agent">
    <span className="pulse"></span>
    Risk Officer
  </div>

  <div className="online-agent">
    <span className="pulse"></span>
    Investment Chair
  </div>

</div>

        <button
          className="launch-btn"
          onClick={() => setScreen("briefing")}
        >
          Test Your Startup →
        </button>
        <div className="workflow">

  <div>IDEA</div>
  <span>→</span>

  <div>MARKET</div>
  <span>→</span>

  <div>FINANCE</div>
  <span>→</span>

  <div>TECHNICAL</div>
  <span>→</span>

  <div>RISK</div>
  <span>→</span>

  <div>VERDICT</div>

  

 

  

  <div className="floating-card card1">
  📈 Market Intelligence
</div>

<div className="floating-card card2">
  💰 ROI Simulation
</div>

<div className="floating-card card3">
  🛡️ Risk Engine
</div>

</div>

      </div>

    </div>
  );
}

  return (
    <div className={`app ${result
  ? result.ceo.decision === "APPROVED"
    ? "approved-bg"
    : "rejected-bg"
  : ""
}`}>

      <div className="hero">
        <div className="stats-row">

  <div className="stat-card">
    <h3>5</h3>
    <p>AI AGENTS</p>
  </div>

  <div className="stat-card">
    <h3>VC</h3>
    <p>INVESTMENT LOGIC</p>
  </div>

  <div className="stat-card">
    <h3>24/7</h3>
    <p>ANALYSIS ENGINE</p>
  </div>

  <div className="stat-card">
    <h3>PDF</h3>
    <p>AUTO REPORTS</p>
  </div>

</div>
        <div className="hero-badge">
  AI INVESTMENT OPERATING SYSTEM
</div>
        <h1>BOARD<span>IQ</span></h1>
        <p>
          Multi-Agent Venture Intelligence Platform
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

<div className="boardroom">

<h2>LIVE BOARD SESSION</h2>

<div className="agent-status">

<div className={step.includes("Market") ? "active-agent" : "agent"}>
📈 Market Analyst
</div>

<div className={step.includes("Finance") ? "active-agent" : "agent"}>
💰 Finance Analyst
</div>

<div className={step.includes("Technical") ? "active-agent" : "agent"}>
⚙️ Technical Architect
</div>

<div className={step.includes("Risk") ? "active-agent" : "agent"}>
🛡️ Risk Officer
</div>

<div className={step.includes("CEO") ? "active-agent" : "agent"}>
👔 Investment Chair
</div>

</div>

<p className="current-step">
{step}
</p>

</div>

)}
{loading && transcript.length > 0 && (

<div className="transcript-card">

<h2>LIVE BOARD DISCUSSION</h2>

{transcript.map((item, index) => (

<div
  key={index}
  className={`chat-message ${
    item.agent.includes("Chair")
      ? "chair-message"
      : ""
  }`}
>

<div className="chat-agent">
  {item.agent}
</div>

<div className="chat-bubble">
  {item.message}
</div>

</div>

))}

</div>

)}

      {result && (

        <div className="results">

          <div className="score-card">

<div className="metric">

<h3>{result.overall_score}/10</h3>

<p>BOARD SCORE</p>

</div>

<div className="metric">

<h3>{result.ceo.confidence}%</h3>

<p>CEO CONFIDENCE</p>

</div>

<div className="metric">

<h3>{result.ceo.decision}</h3>

<p>FINAL VERDICT</p>

</div>

<div className="metric">

<h3>5</h3>

<p>ACTIVE AGENTS</p>

</div>

</div>

          <div className="agent-grid">

            <div className="agent-card">

  <h3>📈 MARKET ANALYST</h3>

  <p>Score: {result.market.score}/10</p>

  <p>Vote: {result.market.vote}</p>

  <button
    className="expand-btn"
    onClick={() =>
      setExpanded({
        ...expanded,
        market: !expanded.market
      })
    }
  >
    {expanded.market
      ? "Hide Analysis"
      : "Expand Analysis"}
  </button>

  {expanded.market && (
    <p>{result.market.reason}</p>
  )}

</div>

            <div className="agent-card">

  <h3>💰 FINANCE ANALYST</h3>

  <p>Score: {result.finance.score}/10</p>

  <p>Vote: {result.finance.vote}</p>

  <button
    className="expand-btn"
    onClick={() =>
      setExpanded({
        ...expanded,
        finance: !expanded.finance
      })
    }
  >
    {expanded.finance
      ? "Hide Analysis"
      : "Expand Analysis"}
  </button>

  {expanded.finance && (
    <p>{result.finance.reason}</p>
  )}

</div>

            <div className="agent-card">

  <h3>⚙️ TECHNICAL ARCHITECT</h3>

  <p>Score: {result.technical.score}/10</p>

  <p>Vote: {result.technical.vote}</p>

  <button
    className="expand-btn"
    onClick={() =>
      setExpanded({
        ...expanded,
        technical: !expanded.technical
      })
    }
  >
    {expanded.technical
      ? "Hide Analysis"
      : "Expand Analysis"}
  </button>

  {expanded.technical && (
    <p>{result.technical.reason}</p>
  )}

</div>

            <div className="agent-card">

  <h3>🛡️ RISK OFFICER</h3>

  <p>Score: {result.risk.score}/10</p>

  <p>Vote: {result.risk.vote}</p>

  <button
    className="expand-btn"
    onClick={() =>
      setExpanded({
        ...expanded,
        risk: !expanded.risk
      })
    }
  >
    {expanded.risk
      ? "Hide Analysis"
      : "Expand Analysis"}
  </button>

  {expanded.risk && (
    <p>{result.risk.reason}</p>
  )}

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