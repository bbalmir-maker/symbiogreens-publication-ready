# Investor Preview / Review Mode

## Purpose

`#investor-preview` is blocked for public visitors. It remains in the code only as a future/private proofing route and does not render private-style screens while `INVESTOR_PREVIEW_ENABLED` and `INVESTOR_PRIVATE_TOOLS_ENABLED` are false.

## Public Behavior

Normal visitors who open `#investor-preview` see only:

> Investor preview is not publicly available. Private investor review access is by invitation only.

They can return to the public Investor Overview. The mock investor review screen is not rendered for normal public visitors.

## Future Local Founder Preview

This is not true security. It is only a local proofing convenience for future development after access-control review. The current public build keeps both flags disabled:

- `INVESTOR_PREVIEW_ENABLED = false`
- `INVESTOR_PRIVATE_TOOLS_ENABLED = false`

If a developer later enables both flags in a local-only build, preview can be opened in that developer browser with:

```js
localStorage.setItem("symbioFounderPreviewEnabled", "true");
location.hash = "investor-preview";
location.reload();
```

To disable it:

```js
localStorage.removeItem("symbioFounderPreviewEnabled");
location.hash = "investors";
location.reload();
```

Alternative local-only URL pattern:

`index.html?founderPreview=1#investor-preview`

## What The Future Local Preview May Show

- Founder Preview Mode banner.
- Demo investor welcome / review overview.
- Existing investor analysis calculator.
- Mock saved scenario preview.
- Platform expansion analysis.
- Use of funds.
- Risk and mitigation.
- Investor review process explanation.
- Non-binding interest and request review prompts that route back to the public investor page.
- Clear legal and preview disclaimers.

## Safety Rules

- No public button or navigation item links to `#investor-preview`.
- Public `#investor-preview` does not render mock private/review screens.
- Local founder preview requires both disabled code flags to be deliberately changed in a local-only build plus `symbioFounderPreviewEnabled=true` or `?founderPreview=1`.
- No real login is created.
- No Supabase configuration is required.
- No real Supabase data is loaded.
- No private documents are exposed.
- No admin analytics or engagement scoring is shown publicly.
- Preview interactions are local-only and do not send investor events or engagement snapshots to Supabase, even if Supabase is configured later.

## Relationship To Real Investor Access

The preview route is not a private portal. Real investor accounts, private materials, due diligence files, calls, and final terms should remain available only after review, approval, authentication, authorization, and legal review.

## Files

- `app.js`
- `assets/js/app.js`
- `styles.css`
- `assets/css/styles.css`
- `docs/investor-private-access-plan.md`
- `README.md`
