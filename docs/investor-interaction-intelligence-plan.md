# Investor Interaction Intelligence Plan

## Purpose

Track investor engagement so SymbioGreens can later prioritize follow-up based on seriousness, contribution ranges, platform interest, and review requests.

## Tracked Events

- investor page opened
- calculator used
- contribution amount entered
- quick contribution clicked
- scenario calculated
- scenario viewed
- platform / multi-hub simulator used
- valuation sensitivity changed
- prequalification started
- prequalification submitted
- non-binding investor interest submitted
- investor review requested

## Storage

Fallback mode:

- `sg_investor_interaction_session`
- `sg_investor_interaction_events`
- `sg_investor_engagement_snapshots`

Backend mode:

- `investor_interaction_events`
- `investor_engagement_scores`

Admin analytics are not displayed publicly.
