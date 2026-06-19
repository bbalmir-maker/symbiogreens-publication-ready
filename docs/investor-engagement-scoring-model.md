# Investor Engagement Scoring Model

Source: `assets/js/investor-model-data.js`.

## Weights

- Investor page opened: +1
- Calculator used / scenario calculated: +5
- Contribution amount entered: +5
- Contribution above USD 50,000: +5
- Contribution above USD 100,000: +10
- Contribution above USD 250,000: +15
- Platform expansion viewed / simulator used: +10
- Use of funds viewed: +8
- Risk section viewed: +5
- Prequalification started: +15
- Prequalification submitted: +30
- Investor review requested: +40
- Non-binding interest submitted: +50

## Levels

- 0-14: cold
- 15-39: warm
- 40-79: qualified
- 80+: high_intent

## Follow-Up Logic

- cold: no immediate action or nurture follow-up
- warm: send investor overview
- qualified: request call / send investor deck
- high_intent: direct founder follow-up / formal review

Scores are internal only and must not be shown to public investors.
