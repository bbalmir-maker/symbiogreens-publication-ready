# Investor Platform Notes

## Current Status

The public Investors & Partnerships page is available. Private investor routes are prepared as placeholders:

- `#investor-access`
- `#investor-login`
- `#investor-dashboard`
- `#investor-model`
- `#investor-documents`

These routes do not expose confidential data in static mode.

## Investor Model Reference

`assets/js/investor-model-data.js` contains:

- raise target: 2,200,000
- maximum investor equity reference: 30 percent
- founder development allocation: 220,000
- founder development allocation reference: 10 percent
- contribution examples
- capex allocation draft totaling 2,200,000

## Production Requirement

Do not publish confidential investor dashboards, financial model details, or documents without authenticated access, logging, and backend controls.
