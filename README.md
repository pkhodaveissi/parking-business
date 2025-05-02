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
git clone https://github.com/your-org/parking-business
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

---

## 🧪 Tests

```bash
npm test
```

- `src/utils/revenue.test.ts` ✅
- `src/utils/isSuspicious.test.ts` ✅
- `features/dashboard/utils/getStats.test.ts` ✅

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

