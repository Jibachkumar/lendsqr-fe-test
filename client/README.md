Jibachh Kumar — Lendsqr Frontend Engineer Assessment

#project setup

# styles folder

- have two file base (Colors, fonts, mixins, breakpoints) and global (CSS reset + base styles)

Pages Built

1. Login Page
   Route: `/login`

Fully responsive — left illustration panel hides on tablet/mobile

Design match: Two-panel layout. Left panel is the brand colour with an imageboard illustration. Right panel contains the form. Matches Figma spacing, font sizes, button colour (#39CDCC), and input border radius.

2. Dashboard Page
   Route: `/dashboard`

- Four status cards showing:
- The main data table listing all users fetched from the mock API, extended to 500 records.
- saves data to localStorage
- Pagination — bottom bar shows "Showing X out of 500", per-page selector (9 / 20 / 50 / 100), numbered page buttons with ellipsis for large page counts

3.  Users Page
    Route: `/dashboard/users`

- at the top (same metrics as Dashboard)
- with 6 columns: Organization, Username, Email, Phone Number, Date Joined, Status
- Clicking any table row navigates to the User Details page

### 4. User Details Page

Route: `/dashboard/users/:id`

Detailed profile page for a single user. Data is first read from localStorage (set when clicking the row), then fetched from the API if not cached.

- ack button — returns to the Users page

- Design match: Profile card with bottom tab bar (active tab highlighted in teal with underline border). Info grid uses 4 columns on desktop, 3 on tablet, 2 on small tablet, 1 on mobile. Each field has a small uppercase grey label and a larger primary-coloured value below it.

## Tech Stack

| Category    | Technology                               |
| ----------- | ---------------------------------------- |
| Framework   | React 18                                 |
| Language    | TypeScript (strict mode)                 |
| Styling     | SCSS with BEM naming                     |
| Routing     | React Router DOM v6                      |
| HTTP        | Native `fetch` (no extra library needed) |
| Persistence | `localStorage`                           |
| Build tool  | Vite                                     |
| Testing     | Vitest + React Testing Library           |
| Deployment  | Netlify                                  |
