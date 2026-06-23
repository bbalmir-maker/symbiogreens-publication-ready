# Admin Approval Workflow

## Public Intake

The public website should accept non-binding investor prequalification submissions only. It should not grant private portal access directly.

## Admin Review States

- `pending`
- `more_info_requested`
- `approved`
- `rejected`

## Admin Actions

- View submitted investor profile.
- Add internal notes.
- Assign status.
- Mark strategic partner or approved investor role.
- Queue invitation email.
- Review engagement events after portal access.
- Review questions, objections, comments, saved scenarios, and document requests.

## Production Controls

Admin actions require authenticated admin or manager role. RLS must block public and investor accounts from updating approval status.
