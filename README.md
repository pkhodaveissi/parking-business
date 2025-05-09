# 🚗 ParkingBusiness – Admin Dashboard

A lightweight, operator-facing frontend for managing parking space sessions, built with **React**, **TypeScript**, and **Vite**. Designed to be fast, clear, and maintainable.

---

## ✨ Features

- 🔐 **Login page** – secure, scoped form styling (no frameworks)
- 📊 **Dashboard** – live occupancy stats with visual bars and revenue overview
- 📋 **Sessions page** – filterable view of all sessions, with support for ending active ones
- ⚠️ **Suspicious detection** – highlights unusually long or costly sessions
- 🔍 **Flexible client-side filters** – by type, license plate, status, and end date
- 🛠️ **Backend bug handling** – logs and flags broken data (e.g. negative occupancy)
- 💅 **Pure CSS** – consistent visual style using `theme.css` and no external frameworks
- 🧪 **Unit tests** – core business logic is tested using Vitest (e.g. revenue, suspicion, stats)

---

## 🚀 Deployment

Deployed on **Vercel**

👉 https://parking-business-m4gqe58ln-pooriakhodaveissis-projects.vercel.app/

👉 https://parking-business-three.vercel.app

---

## 🧑‍💻 Tech Stack

- **React + Vite** (with TypeScript)
- **@tanstack/react-query v5** for data fetching
- **React Router v6** for page routing
- **Vitest** for unit testing

---

## 📂 Project Structure

```
src/
├── api/                 # Axios config
├── auth/                # Auth hooks & guards
├── components/          # Layout shell (AppLayout)
├── features/
│   ├── auth/            # Login form
│   ├── dashboard/       # Dashboard UI & logic
│   └── sessions/        # Session table, filters, utils
├── hooks/               # Custom hooks (e.g. useFilteredSessions)
├── styles/              # Global theme (theme.css)
├── utils/               # Business logic (revenue, suspicion)
```

---

## 📦 Getting Started

```bash
# Clone and install
git clone https://github.com/pkhodaveissi/parking-business
cd parking-business
npm install

# Run locally
npm run dev

# Run unit tests
npm test
```

---

## 🧠 Notable Decisions

- ⚠️ **Occupancy logic moved out of hooks** into a reusable `getStats()` utility
- 💬 **Suspense + useSuspenseQuery** used for clean async loading
- 📌 **Client-side filtering** used temporarily in `useFilteredSessions`
  ```ts
  // API filtering caused issues with date parameters.
  // We fallback to client-side logic to unblock progress.
  // Recommend returning to server-side filtering soon.
  ```
- 🧪 All core logic (rates, revenue, suspicion, occupancy calc) covered by unit tests
- 📗 Data types are defined locally. While effective, we recommend exploring a
shared, centralized type system (e.g. codegen from OpenAPI or shared types via a monorepo),
similar to Airbnb's practice of syncing backend and frontend models. This helps eliminate
drift and boosts confidence in edge cases.

---

## 🧪 Tests

```bash
npm test
```

- `src/utils/revenue.test.ts` ✅
- `src/utils/isSuspicious.test.ts` ✅
- `features/dashboard/utils/getStats.test.ts` ✅

---

## 🤔 Known Limitations

- Locally defined data types.
- Auth token is stored in localStorage, allowing persistence across reloads. An interceptor handles 401 errors by logging out. However, there is no token refresh or session rehydration logic. Intended for demo purposes only.
- Error boundaries are not fully implemented (API failures will crash the route).
- Filtering is client-side for now; recommend re-enabling API-based filtering when backend supports reliable date queries.
- No e2e or integration test coverage; only business logic is unit-tested.
- No accessibility attributes

---

## 🧼 Polish

- Skeleton loading UI during dashboard suspense
- Sticky table headers for large session lists
- Clipboard buttons for copying session IDs
- Color-coded visual cues for errors and status

---

## 📬 Contact

Feel free to reach out for questions or feedback.
Whatsapp: +31687990641 Pouria

---

