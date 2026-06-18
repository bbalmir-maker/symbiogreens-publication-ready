# Team Update Guide

## Current Implementation

Executive profile content is rendered by the static website JavaScript. This keeps the publication package self-contained.

## Add Or Update A Team Member

1. Place the optimized portrait in `public/company/executives/` or another approved public image folder.
2. Use lowercase, hyphenated filenames.
3. Update the executive profile data in `app.js`.
4. Keep card copy concise.
5. Put longer biography copy inside the profile detail view.
6. Test desktop and mobile layouts.

## Future Backend

Move team records to a Supabase `team_members` table with:

- display order
- name
- title
- subtitle
- biography
- image path
- active/inactive status
- profile type

This allows authorized staff to update profiles without editing source code.
