from agents.market import analyze as market
from agents.finance import analyze as finance
from agents.technical import analyze as technical
from agents.risk import analyze as risk
from agents.ceo import decide
from scorecard import calculate_score

def evaluate_startup(data):

    startup = f"""
Startup Name: {data['startup_name']}

Problem:
{data['problem']}

Solution:
{data['solution']}

Target Users:
{data['target_users']}

Business Model:
{data['business_model']}

Competitive Advantage:
{data['competitive_advantage']}
"""

    reports = []

    market_report, _ = market(startup)
    reports.append(market_report)

    finance_report, _ = finance(startup, market_report)
    reports.append(finance_report)

    technical_report, _ = technical(
        startup,
        market_report,
        finance_report
    )
    reports.append(technical_report)

    risk_report, _ = risk(
        startup,
        market_report,
        finance_report,
        technical_report
    )
    reports.append(risk_report)

    decision, _ = decide(reports)

    overall_score = calculate_score(reports)

    return {
        "overall_score": overall_score,
        "market": market_report,
        "finance": finance_report,
        "technical": technical_report,
        "risk": risk_report,
        "ceo": decision
    }