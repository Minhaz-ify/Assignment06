<div align="center">

<img src="public/logo.png" alt="FitLog logo" width="56" />

# FitLog — Workout Library

**Train with intent. Log every set.**

A dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.

</div>

---

## Live Demo

- **Live link:** _add your deployed URL here_
- **Repository:** _add your GitHub URL here_

## Technologies Used

| Technology | Purpose |
| --- | --- |
| Next.js 14 (App Router) | UI framework and page routing |
| React 18 | Components and state |
| Tailwind CSS 3 | Styling and responsive layout |
| react-hot-toast | Toast notifications |
| lucide-react | Icons |
| FitLog REST API | Workout data (`/api/fitlog`, `/api/fitlog/:id`) |

## Key Features

1. **Workout library** — all twelve lifts in a responsive grid (1 / 2 / 3 columns) with tags, equipment, duration, calories and rating on every card.
2. **Sort by Duration, Calories or Rating** — a dropdown that re-sorts the library instantly.
3. **Workout detail pages** — large image, key specs panel and four-step instructions, with *Add to today's plan* and *Save for later* actions.
4. **My Plan log** — Today's Plan and Saved tabs, live Exercises / Minutes / Calories totals, a five-lift daily cap, *Mark as Done* and remove buttons.
5. **Live navbar counters** — Plan and Saved badges update as you add or remove workouts, and link to the plan page.
6. **Persistent data** — your plan, saved list and completed lifts survive a reload via `localStorage`.
7. **Loading, empty and error states** — spinner while fetching, a friendly empty state, and a custom 404 page.

## Getting Started

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

```bash
npm run build   # production build
npm start       # serve the production build
```

## Project Structure

```
app/
  layout.js            Fonts, navbar, footer, toaster, plan provider
  page.js              Home: hero + library
  my-plan/page.js      Plan and saved lists with metrics
  workout/[id]/page.js Workout detail page
  not-found.js         404 page
components/            Navbar, Hero, Library, WorkoutCard, PlanItem, ...
lib/                   API helpers and data hook
```

## Deployment

Deploy to Vercel (or Netlify / Cloudflare Pages) with the default Next.js settings. All routes are handled by the App Router, so refreshing any page works after deployment.
