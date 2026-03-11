# UT AmbassadorAI

Next.js MVP scaffold for a hybrid AI + ambassador mentorship experience for UT Austin.

## Stack

- Next.js App Router
- React + TypeScript
- Tailwind CSS
- Mock data and placeholder API routes for AI Q&A, messaging, booking requests, ambassador availability, and admin metrics

## Routes

- `/` landing page
- `/ask` AI campus Q&A
- `/ambassadors` ambassador discovery
- `/ambassadors/[id]` ambassador profile
- `/messages` messaging
- `/schedule/[ambassadorId]` meeting booking
- `/dashboard` student dashboard
- `/ambassador` ambassador dashboard
- `/admin` admin dashboard

## Run

```bash
npm install
npm run dev
```

## Notes

- The app uses mock data in `lib/data/mock.ts`.
- Scheduling now models `available`, `pending`, and `booked` states plus ambassador-side confirm and decline actions.
- API routes are placeholders designed to be swapped with Prisma, auth, and OpenAI integrations later.
- Responsive mobile navigation is included through a bottom tab bar.
