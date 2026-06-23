# Email And Approval Flow

Admin notification email:

`bbalmir@gmail.com`

## Production Flow

1. Visitor submits a customer, partner, investor, engineering, or general application.
2. The main website `#account` route or a portal application flow calls the `submit-application` Edge Function through `shared/js/application-service.js`.
3. Edge Function validates input server-side.
4. Application is inserted with `status = pending`.
5. Authenticated users are linked to a pending `profiles` row where applicable.
6. Resend sends an admin notification to `bbalmir@gmail.com`.
7. Resend sends the applicant a Pending Review email.
8. Admin logs into `admin/index.html`.
9. Admin chooses:
   - Approve
   - Reject
   - Needs More Information
10. Edge Function verifies the caller is an approved admin.
11. Application/profile status is updated.
12. `approval_events` records the decision.
13. `email_events` records each email send or configuration failure.

Portal access updates automatically from the approved profile role/status:

- approved customer -> customer portal only
- approved partner -> partner portal only
- approved investor -> investor portal only
- approved admin -> admin dashboard

## Email Templates

Production email HTML is generated in:

`supabase/functions/_shared/email.ts`

Template types:

- `admin-new-application`
- `user-pending-review`
- `customer-approved`
- `partner-approved`
- `investor-approved`
- `engineer-approved`
- `application-rejected`
- `needs-more-information`

Admin/reference Markdown templates remain in:

`admin/email-templates/`

## Statuses

Database values:

- `pending`
- `approved`
- `rejected`
- `needs_more_information`
- `suspended`

Display labels:

- Pending
- Approved
- Rejected
- Needs More Information
- Suspended
