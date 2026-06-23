# SymbioGreens Partner Portal

Standalone GitHub Pages application for qualified regional partners reviewing a SymbioGreens/Balponics project-development opportunity.

This app is separate from the public SymbioGreens website and the standalone investor portal. The public website should remain intake-only. This portal defaults to an access-required screen and reveals the demo tools only when founder demo mode is enabled locally.

No Supabase is active. No real partner records, private documents, service-role keys, or secrets are included.

## Purpose

The Partner Portal helps serious regional partners assess land, climate, water, energy, buyers, financing, ownership, and implementation readiness for a controlled-environment agriculture hub.

Positioning:

Bring the land. Bring the territory. Build with our platform.

SymbioGreens/Balponics helps qualified regional partners design, finance, install, train, and operate controlled-environment agriculture hubs adapted to their land, climate, water, buyers, and financing reality.

## Demo Mode

Open `index.html`. The locked access screen appears by default.

Enable founder demo mode in the browser console:

```js
localStorage.setItem("symbioPartnerPortalDemo", "true");
location.reload();
```

Disable it:

```js
localStorage.removeItem("symbioPartnerPortalDemo");
location.reload();
```

Demo mode is not real security. Production access requires Supabase Auth, approved partner role checks, secure invitation handling, and RLS.
