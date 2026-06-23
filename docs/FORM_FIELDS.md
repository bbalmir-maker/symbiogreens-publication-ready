# Production Form Fields

All public/portal application submissions should call:

`submit-application`

Shared frontend helper:

`shared/js/application-service.js`

## Common Application Payload

- `portalType`: `customer`, `partner`, `investor`, `engineer`, or `general`
- `submissionType`
- `fullName`
- `companyName`
- `email`
- `phone`
- `country`
- `city`
- `roleRequested`
- `interestType`
- `message`
- `submittedData`

The Edge Function stores these in:

`applications`

with:

`status = pending`

## Customer

Recommended `submittedData` fields:

- buyer type
- product interests
- preferred products
- estimated volume
- delivery location
- delivery frequency
- sample request
- product use case
- notes

Approved customer details can be expanded into:

`customer_profiles`

## Partner

Recommended `submittedData` fields:

- partner type
- territory
- project interest
- land/site context
- water/energy readiness
- existing infrastructure
- company website
- preferred partnership model
- financing status
- notes

Approved partner details can be expanded into:

`partner_profiles`

## Investor

Recommended `submittedData` fields:

- investor type
- investment range
- investment interest
- preferred contact method
- document access request
- comments/questions
- accreditation or suitability notes where legally appropriate

Approved investor details can be expanded into:

`investor_profiles`

## Status Values

Database:

- `pending`
- `approved`
- `rejected`
- `needs_more_information`
- `suspended`

Display:

- Pending
- Approved
- Rejected
- Needs More Information
- Suspended
