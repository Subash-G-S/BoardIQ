from agents.market import analyze as market
from agents.finance import analyze as finance
from agents.technical import analyze as technical
from agents.risk import analyze as risk
from agents.ceo import decide
from scorecard import calculate_score
from agents.advisor import advise
import json
from agents.competitor import analyze as competitor

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
    competitor_report = competitor(startup)
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

    advisor_response = advise(
    startup,
    reports
)

    try:
        advisor = json.loads(advisor_response)

    except:
        advisor = {
            "recommendations": [
                "No recommendations generated"
            ]
        }

    overall_score = calculate_score(reports)

    return {
    "overall_score": overall_score,
    "market": market_report,
    "competitors": competitor_report,
    "finance": finance_report,
    "technical": technical_report,
    "risk": risk_report,
    "ceo": decision,
    "advisor": advisor
}
from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer
)

from reportlab.lib.styles import getSampleStyleSheet


def generate_pdf_report(result):


    pdf_file = "investment_report.pdf"

    doc = SimpleDocTemplate(pdf_file)

    styles = getSampleStyleSheet()

    elements = []

# Title

    elements.append(
        Paragraph(
            "BoardIQ Investment Report",
            styles["Title"]
        )
    )

    elements.append(Spacer(1, 20))

# Score & Decision

    elements.append(
        Paragraph(
            f"Overall Score: {result['overall_score']}/10",
            styles["Heading2"]
        )  
    )

    elements.append(
        Paragraph(
            f"Decision: {result['ceo']['decision']}",
            styles["Heading2"]
        )
    )

    elements.append(
        Paragraph(
            f"Confidence: {result['ceo']['confidence']}%",
            styles["BodyText"]
        )   
    )

    elements.append(Spacer(1, 20))

# Analyst Reports

    sections = [
        ("Market Analysis", result["market"]["reason"]),
        ("Finance Analysis", result["finance"]["reason"]),
        ("Technical Analysis", result["technical"]["reason"]),
        ("Risk Analysis", result["risk"]["reason"]),
        ("CEO Summary", result["ceo"]["reason"])
    ]

    for title, content in sections:

        elements.append(
            Paragraph(
                title,
                styles["Heading2"]
            )
        )

        elements.append(
            Paragraph(
                content,
                styles["BodyText"]
            )
        )

        elements.append(
            Spacer(1, 12)
        )

# Competitor Analysis

    elements.append(
        Paragraph(
            "Competitor Analysis",
            styles["Heading2"]
        )
    )

    for competitor in result["competitors"]["competitors"]:

        elements.append(
            Paragraph(
                f"• {competitor}",
                styles["BodyText"]
            )
        )

    elements.append(
        Spacer(1, 10)
    )

    elements.append(
        Paragraph(
            f"Biggest Threat: {result['competitors']['threat']}",
            styles["BodyText"]
        )
    )

    elements.append(
        Spacer(1, 20)
    )

# Recommendations

    elements.append(
        Paragraph(
            "Board Recommendations",
            styles["Heading2"]
        )
    )

    for recommendation in result["advisor"]["recommendations"]:

        elements.append(
            Paragraph(
                f"✓ {recommendation}",
                styles["BodyText"]
            )
        )

    elements.append(
        Spacer(1, 20)
    )

    doc.build(elements)

    return pdf_file

