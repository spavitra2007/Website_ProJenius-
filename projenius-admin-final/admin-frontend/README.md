# ProJenius Admin Panel

## Local setup

1. Open this folder in VS Code.
2. Create `.env` from `.env.example`.
3. Set `BACKEND_API_URL=http://localhost:5000` and the same `ADMIN_API_TOKEN` in both frontend and backend environments.
4. Make sure MongoDB is reachable using `MONGODB_URI` in the backend `.env`.
5. Backend: `npm install` then `npm run dev`.
6. Frontend: `npm install` then `npm run dev`.
7. Open the Vite URL shown in the terminal (normally `http://localhost:5173`).

## What changed

- Courses: custom category, removable/replacable image, no course video card, original/offer pricing, course status, public/hidden visibility.
- Courses keep `price` as the offer price for compatibility with the existing public website.
- News & Insights replaces the old Blog wording in the admin UI.
- Content types: Article, Technology Video, Event, Company Update, Announcement.
- News categories with custom Other category.
- Featured image + additional images with remove/replace controls.
- YouTube URL and direct video upload.
- Rich HTML content editor with links, tables, lists, code and YouTube embeds.
- Event-specific fields.
- Draft / Scheduled / Published workflow, featured flag, public/hidden visibility.
- SEO title, meta description, URL slug and focus keyword.
- Public `/api/blogs` supports category, content type and featured filters.

## Video storage note

Direct uploads are stored in `backend/uploads/news-videos` for local/self-hosted deployments. For production, use persistent disk or object storage; serverless filesystems such as Vercel's are not durable storage for large media.

## Enrollment / rating counts

The admin stores `enrolled`, `rating`, and `reviews`, but they are not automatically real-time counts yet. A real enrollment/review system must write to these fields (or calculate aggregates) when students enroll or submit reviews. Until then, the displayed values remain manual.
