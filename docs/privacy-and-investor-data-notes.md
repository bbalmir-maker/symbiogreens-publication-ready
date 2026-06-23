# Privacy And Investor Data Notes

Suggested investor privacy language now appears near the investor tools:

"When you use investor tools or submit investor information, SymbioGreens may record your submitted inputs and interaction history to evaluate investor interest, respond to inquiries, improve investor communications, and support appropriate follow-up. These tools are illustrative and non-binding."

## Principles

- Do not collect unnecessary private information.
- Do not secretly collect highly sensitive personal data.
- Do not expose internal engagement scores publicly.
- Do not expose admin analytics on the public Investor page.
- Keep investor portal disabled unless authenticated access and RLS are tested.

## Security

- No real Supabase keys in frontend files.
- No service-role key in frontend files.
- RLS required before backend activation.
- Public users may insert their own investor interactions.
- Admins may read engagement analytics.
- Investors must not read other investors' analytics.
