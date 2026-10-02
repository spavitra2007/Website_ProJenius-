# ProJenius Blog And Newsletter Backend Handoff

## Purpose
This package contains the shared backend needed by both:
- Official ProJenius website blog page
- Separate admin blog web app

## What It Supports
- MongoDB blog storage
- Newsletter subscriber storage
- Admin protected create/edit/delete blog APIs
- Public blog APIs
- Newsletter subscription API
- Resend email sending
- New blog email notifications
- Scheduled blog publishing
- Default blog seeding

## Required Environment Variables
Set these in the backend deployment:

```env
MONGODB_URI=your-mongodb-atlas-uri
ADMIN_API_TOKEN=your-secret-admin-token
API_PORT=5000
CLIENT_ORIGIN=https://admin-app.vercel.app,https://projenius.in
PUBLIC_SITE_URL=https://projenius.in
RESEND_API_KEY=your-resend-api-key
RESEND_FROM_EMAIL=ProJenius <newsletter@projenius.in>
NEWSLETTER_BATCH_SIZE=25
NEWSLETTER_BATCH_DELAY_MS=1200
BLOG_SCHEDULE_CHECK_MS=60000
API_JSON_LIMIT=12mb
```

## Commands
Install dependencies:

```bash
npm install
```

Run backend locally:

```bash
npm run api
```

Seed old/default blogs:

```bash
npm run seed:blogs
```

## Notes
- Do not share or deploy local `.env` files.
- Use `.env.example` as the template.
- The admin app and backend must use the same `ADMIN_API_TOKEN`.
- Resend domain must be verified before emails can send from `newsletter@projenius.in`.
