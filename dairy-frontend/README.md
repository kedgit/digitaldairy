# Ksheera — Digital Dairy Management (Frontend)

React + Vite frontend for a three-role dairy management system (Farmer, Operator,
Admin), built to sit in front of your existing Spring Boot backend.

## Getting started

```bash
npm install
cp .env.example .env   # then edit VITE_API_BASE_URL if needed
npm run dev
```

The app runs at http://localhost:5173.

## Roles & pages

| Role     | Pages |
|----------|-------|
| Farmer   | My Profile (view/update), Milk Entries, Advance Taken, Payment History |
| Operator | Farmers (list + activate), Add Farmer, Edit Farmer, Add Milk Entry |
| Admin    | Make Payment — fetch a farmer's total milk entries between two dates, then settle payment |

After login, users are routed to their role's home page automatically and the
sidebar only shows links relevant to their role. `ProtectedRoute` blocks
cross-role access even via direct URL.

## Backend integration — please review these assumptions

I don't have your actual API contract, so I built this against a conventional
REST/JWT shape. **You'll very likely need to adjust endpoint paths and field
names** in `src/services/*.js` to match your real controllers. Everything is
centralized there — no request logic is duplicated in components.

**Auth** (`src/services/authService.js`, `src/context/AuthContext.jsx`)
- `POST /api/auth/login` with `{ username, password }`
- Expected response: `{ token, role, id, name }` where `role` is one of
  `FARMER`, `OPERATOR`, `ADMIN`
- Token is stored in `localStorage` and sent as `Authorization: Bearer <token>`
  on every request (see `src/api/axiosConfig.js`)
- If your backend uses session cookies instead of JWT, remove the request
  interceptor and set `withCredentials: true` on the axios instance

**Farmer** (`src/services/farmerService.js`)
- `GET/PUT /api/farmer/profile`
- `GET /api/farmer/milk-entries?startDate=&endDate=`
- `GET /api/farmer/advance`
- `GET /api/farmer/payments`

**Operator** (`src/services/operatorService.js`)
- `GET /api/operator/farmers`, `GET/PUT /api/operator/farmers/{id}`
- `POST /api/operator/farmers`
- `PUT /api/operator/farmers/{id}/activate`
- `POST /api/operator/milk-entries`

**Admin** (`src/services/adminService.js`)
- `GET /api/admin/farmers/{id}/milk-entries?startDate=&endDate=` — expected to
  return either an array of entries or `{ entries, totalQuantity, totalAmount }`
- `POST /api/admin/payments` with `{ farmerId, startDate, endDate, grossAmount, advanceDeducted, amount }`

If your real paths or JSON field names differ (very likely, e.g. `entryDate`
vs `date`, or a paginated `Page<T>` response), update the relevant service
file and the field references in that page's component — each page reads
response fields defensively (`entry.date || entry.entryDate`) where the
naming was ambiguous from your description, but double-check against your
actual DTOs.

## Notes

- CORS: make sure your Spring Boot app allows `http://localhost:5173` (or add
  a dev proxy in `vite.config.js`) — `@CrossOrigin` or a global CORS config
  on your backend.
- Role names: this app assumes uppercase role strings (`FARMER`, `OPERATOR`,
  `ADMIN`) coming back from login, matching typical Spring Security
  `hasRole()`/authority conventions. Adjust `ROLE_HOME` in `App.jsx` and
  `Login.jsx` if yours differ.
- Build for production with `npm run build` — output goes to `dist/`.
