

# TrustVC Ecosystem Dashboard - Implementation Plan

## Overview
A low-fidelity internal analytics dashboard for monitoring ecosystem activity, usage patterns, and strategic insights. Features functional filtering, interactive charts, and a world map visualization.

---

## Page 1: Login Page
- Centered login card with minimal styling
- Username and Password fields
- **Prototype behavior**: Clicking into fields auto-fills demo credentials
- "Login" button navigates to dashboard
- Light/Dark theme toggle in corner

---

## Page 2: Dashboard

### Header Section
- Large welcome heading: "Welcome back to TrustVC Ecosystem Dashboard"
- Subtext describing the dashboard purpose
- Theme toggle button (light/dark mode)

### Sticky Global Filters
- Filter chip bar that stays visible while scrolling
- Three filter options: **All** (default), **Verifiable Docs**, **ETR**
- All sections respond to filter selection with updated mock data

---

### Section 1 — Activity Overview
Two side-by-side cards:

**Left Card: Issuance vs Verification Over Time**
- Interactive line chart (Recharts)
- Time range selector: 1M, 3M, 6M, 1Y, 5Y, ALL
- Tooltips on hover showing data values
- Dual lines for Issuance and Verification trends

**Right Card: Active Integrations MoM**
- Bar/line chart showing month-over-month data
- Same time range selector and tooltip behavior

---

### Section 2 — Market Intelligence (Distribution)
- Centered column headers: **Issuance** and **Verification**
- Two rows of pie charts:

**Row 1 — Cryptosuite**
- Row label on left
- Two pie charts with legends showing distribution

**Row 2 — DID Method**
- Row label on left
- Two pie charts with legends showing distribution

---

### Section 3 — 24h Activity Heatmap / Ticker
- Full-width section with world map
- Interactive map library showing activity hotspots
- Side legend: Issuance (one color), Verification (another color)
- Time controls: 1D, 5D, 1M, 6M, 1Y
- Custom date range picker (from–to)

---

### Section 4 — Version Distribution (Reference)
- Full-width list view (not a chart)
- Table/list showing version names and active instance counts
- Date range filter for custom filtering
- Default shows all-time stats

---

## Technical Approach
- **Routing**: React Router for login → dashboard navigation
- **Charts**: Recharts library (already installed)
- **Map**: react-simple-maps for interactive world map
- **State**: React state for filters, time ranges, and theme
- **Data**: Comprehensive mock data that responds to filters
- **Theme**: next-themes for light/dark mode toggle
- **Layout**: Card-based, scrollable dashboard with clear visual hierarchy

---

## User Flow
1. User lands on Login page
2. Clicks fields to auto-fill credentials
3. Clicks "Login" → navigates to Dashboard
4. Scans dashboard top-to-bottom: Activity → Distribution → Live Map → Versions
5. Uses global filters to segment data
6. Uses time selectors within sections for granular views
7. Toggles theme as preferred

