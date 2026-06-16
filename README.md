# 🚀 BOARDIQ

### AI-Powered Multi-Agent Venture Intelligence Platform

BoardIQ is a multi-agent startup evaluation platform that simulates a real venture capital investment boardroom.

Instead of relying on a single AI response, multiple specialized AI agents independently evaluate a startup from different perspectives before generating a final investment decision.

The platform analyzes startups across:

- 📈 Market Opportunity
- 💰 Financial Viability
- ⚙️ Technical Feasibility
- 🛡️ Business & Operational Risk
- 🏆 Competitive Landscape

and delivers:

- Investment Verdict
- Competitor Analysis
- Strategic Recommendations
- Investment Score
- Downloadable PDF Reports

---

## ✨ Features

### 🤖 Multi-Agent Boardroom

BoardIQ uses specialized AI agents that collaborate to evaluate startup opportunities.

| Agent | Responsibility |
|---------|---------------|
| 📈 Market Analyst | Market demand, competition, growth potential |
| 💰 Finance Analyst | Revenue model, profitability, scalability |
| ⚙️ Technical Architect | Feasibility, complexity, infrastructure |
| 🛡️ Risk Officer | Business, operational, and market risks |
| 👔 Investment Chair | Final investment decision |

---

### 🏆 Competitor Intelligence

Automatically identifies:

- Top competitors
- Market landscape
- Competitive threats

---

### 📋 Strategic Recommendations

Provides actionable guidance for:

- Product strategy
- Business model improvements
- Market positioning
- Risk mitigation

---

### 📊 Interactive Dashboard

Displays:

- Board Score
- Agent Votes
- Investment Confidence
- Competitor Analysis
- Radar Chart Visualization
- AI Board Discussion

---

### 📄 PDF Investment Reports

Generate downloadable reports containing:

- Startup Evaluation
- Investment Decision
- Agent Insights
- Competitor Analysis
- Recommendations

---

## 🏗️ Architecture

```text
                    USER
                      │
                      ▼
             React + Vite Frontend
                      │
                 REST API
                      │
                      ▼
               FastAPI Backend
                      │
                      ▼
            Multi-Agent Engine
                      │
      ┌───────────────┼───────────────┐
      ▼               ▼               ▼

 Market Agent   Finance Agent   Technical Agent
      │               │               │
      └───────────────┼───────────────┘
                      ▼

               Risk Officer
                      │
                      ▼

            Investment Chair
                      │
                      ▼

          Competitor Analysis
                      │
                      ▼

          Strategic Advisor
                      │
                      ▼

             Score Engine
                      │
                      ▼

          Final Investment Report
```

---

## 🔄 Workflow

```text
Startup Submission
        │
        ▼
Market Analysis
        │
        ▼
Financial Analysis
        │
        ▼
Technical Analysis
        │
        ▼
Risk Assessment
        │
        ▼
Competitor Intelligence
        │
        ▼
Strategic Recommendations
        │
        ▼
Investment Chair Review
        │
        ▼
Final Verdict
        │
        ▼
Dashboard + PDF Report
```

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- Axios
- Chart.js
- React ChartJS 2

### Backend

- FastAPI
- Python
- Uvicorn

### AI Layer

- AIML API
- Multi-Agent Prompt Engineering
- Structured JSON Responses

### Reporting

- ReportLab

### Deployment

- Netlify
- Render

---

## 📁 Project Structure

```bash
BOARDIQ/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── agents/
│   ├── market.py
│   ├── finance.py
│   ├── technical.py
│   ├── risk.py
│   ├── ceo.py
│   ├── competitor.py
│   └── advisor.py
│
├── board.py
├── main.py
├── ai_client.py
├── scorecard.py
├── pdf_generator.py
├── requirements.txt
└── README.md
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/boardiq.git

cd boardiq
```

---

### Backend Setup

Install dependencies:

```bash
pip install -r requirements.txt
```

Create `.env`

```env
AIML_API_KEY=your_api_key
```

Start backend:

```bash
uvicorn main:app --reload
```

Backend runs at:

```text
http://localhost:8000
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Create:

```env
VITE_API_URL=http://localhost:8000
```

Frontend runs at:

```text
http://localhost:5173
```

---

## 🌐 Deployment

### Backend (Render)

Build Command:

```bash
pip install -r requirements.txt
```

Start Command:

```bash
uvicorn main:app --host 0.0.0.0 --port $PORT
```

---

### Frontend (Netlify)

Environment Variable:

```env
VITE_API_URL=https://your-render-url.onrender.com
```

Build Command:

```bash
npm run build
```

Publish Directory:

```text
dist
```

---

## 📊 Example Response

```json
{
  "overall_score": 8.2,
  "market": {
    "score": 8,
    "vote": "APPROVE"
  },
  "finance": {
    "score": 9,
    "vote": "APPROVE"
  },
  "technical": {
    "score": 8,
    "vote": "APPROVE"
  },
  "risk": {
    "score": 7,
    "vote": "APPROVE"
  },
  "ceo": {
    "decision": "APPROVED",
    "confidence": 91
  }
}
```

---

## 🎯 Use Cases

- Startup Evaluation
- Venture Capital Screening
- Accelerator Programs
- Innovation Labs
- Business Validation
- Entrepreneurship Education

---

## 💡 About

BoardIQ was built to explore how multiple specialized AI agents can collaborate to evaluate startup opportunities in a structured, explainable, and investment-focused manner.

Instead of a single AI opinion, BoardIQ simulates an entire investment committee.

---

## 👨‍💻 Author

**Subash Chandra Bose G S**

### "Present your startup. Let the AI board decide."
