def calculate_score(reports):

    total = 0

    for report in reports:
        total += report["score"]

    return round(total / len(reports), 2)