from agents.market import analyze as market
from agents.finance import analyze as finance
from agents.technical import analyze as technical
from agents.risk import analyze as risk
from agents.ceo import decide
from scorecard import calculate_score

name = input("Startup Name: ")
problem = input("Problem: ")
solution = input("Solution: ")
users = input("Target Users: ")
business_model = input("Business Model: ")
advantage = input("Competitive Advantage: ")

startup = f"""
Startup Name: {name}

Problem:
{problem}

Solution:
{solution}

Target Users:
{users}

Business Model:
{business_model}

Competitive Advantage:
{advantage}
"""

reports = []
meeting_log = []

market_report, market_log = market(startup)
reports.append(market_report)
meeting_log.append(market_log)

finance_report, finance_log = finance(startup, market_report)
reports.append(finance_report)
meeting_log.append(finance_log)

technical_report, technical_log = technical(startup, market_report, finance_report)
reports.append(technical_report)
meeting_log.append(technical_log)

risk_report, risk_log = risk(startup, market_report, finance_report, technical_report)
reports.append(risk_report)
meeting_log.append(risk_log)

decision, ceo_log = decide(reports)
meeting_log.append(ceo_log)
overall_score = calculate_score(reports)

print("\n===== BOARD MEETING =====\n")

for message in meeting_log:
    print(message)
    print()

print("===== FINAL DECISION =====\n")

print(f"\nOverall Startup Score: {overall_score}/10")

print(f"Decision: {decision['decision']}")
print(f"Confidence: {decision['confidence']}%")

print("\nKey Strengths:")
for strength in decision["key_strengths"]:
    print(f"- {strength}")

print("\nKey Risks:")
for risk in decision["key_risks"]:
    print(f"- {risk}")

print(f"\nReason: {decision['reason']}")