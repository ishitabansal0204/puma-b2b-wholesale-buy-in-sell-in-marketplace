# PUMA SS27 B2B Wholesale Buy-In / Sell-In Matrix

An enterprise digital wholesale and seasonal assortment platform designed for PUMA Commercial Operations, territory sales representatives, and authorized wholesale distributors.

This platform transitions PUMA's seasonal wholesale workflow from manual Excel spreadsheets, PDFs, WhatsApp messages, and disconnected meetings into a single, high-fidelity digital commerce matrix:

**Season Planning → Assortment Discovery → Size Curve Modeling → Allocation Visibility → Buy-In Optimization → Commercial Approval → Order Tracking**

---

## 📄 Product Requirements Document (PRD)

A detailed Product Requirements Document (PRD) written from the perspective of a Senior B2B Product Manager has been generated in `.docx` format:

- **File Path**: [`/PUMA_SS27_B2B_Wholesale_Platform_PRD.docx`](./PUMA_SS27_B2B_Wholesale_Platform_PRD.docx) (also hosted at [`/public/PUMA_SS27_B2B_Wholesale_Platform_PRD.docx`](./public/PUMA_SS27_B2B_Wholesale_Platform_PRD.docx) for direct in-app download).
- **In-App Download**: Click the **PRD (.docx)** button in the top navigation ticker of the running web application.

---

## 🎯 Target Personas Supported

The prototype includes an instant **Demo Persona Switcher** in the top navigation to test all 4 core enterprise user perspectives:

1. **Distributor / Retail Buyer** *(e.g., ABC Sports Distribution, Mumbai)*
   - Explore upcoming SS27 collection and franchise highlights.
   - Access wholesale pricing, MSRP, and commercial margins.
   - Model size-level curve units with benchmark guidance.
   - Compare committed buy value against contracted seasonal targets (₹25L).
   - Review commercial credit terms and submit the seasonal order.

2. **PUMA Sales Representative** *(e.g., Key Accounts Lead - Rahul Sharma)*
   - Track assigned accounts across territorial zones.
   - Identify distributors with target gaps or inactive buy drafts.
   - Dispatch 1-click automated follow-up reminders via simulated WhatsApp & Email.
   - Deep-dive into distributor account profiles and historical performance (SS26, FW26, SS27).

3. **PUMA Sales Director / Commercial Manager**
   - High-level executive dashboard tracking total sell-in (₹31.8 Cr actual vs. ₹48.5 Cr target, 65.6% achievement).
   - Regional penetration analysis across 5 commercial zones (West, North, South, East, Central).
   - Category performance health index (Running, Lifestyle, Motorsport, Football, Apparel).
   - BCG-style **2×2 Demand vs. Availability Matrix** (Growth Drivers, Supply Bottlenecks, Inventory Risk, Niche).

4. **PUMA Admin / Merchandising & SCM**
   - Seasonal lifecycle windows (order opening, closing deadlines, dispatch dates).
   - Central stock allocation governance and minimum order quantity (MOQ) controls.
   - Real-time inventory constriction simulations and automated alternative style substitution.

---

## ⚡ Core Feature Highlights

### 1. Digital Showroom & Dual-Page Lookbook
- High-resolution editorial campaign visuals and franchise stories (`NITROFOAM™`, `FUZIONFIT360`, `K-BETTER™`, `T7 Heritage`).
- Category jump navigation: Running, Training, Football, Basketball, Lifestyle, Motorsport, Apparel, Accessories.
- Flipbook-style **Digital Lookbook** with direct 1-click "Add to Buy" buttons from editorial spreads.

### 2. High-Density Product Catalog
- 50+ authentic PUMA commercial styles with complete technical and commercial attributes.
- Dual view modes: 4-column visual card grid and compact enterprise B2B data table.
- Multi-axis filtering: Category, Gender, Availability Status, Delivery Window, and Wholesale Price sorting.

### 3. Size Curve Engine & Assortment Builder
- Size matrix modeling across standard footwear (UK 6–UK 11) and apparel (XS–XXL).
- **Apply Recommended Curve**: Instantly calculates optimized size distribution based on PUMA historical sell-through benchmarks (5%–15%–30%–30%–15%–5%).
- Visual size curve comparison bar and statistical deviation warnings.
- Automated Minimum Order Quantity (MOQ) validation.

### 4. "My Buy" Workspace & Gap Closure Engine
- Centralized B2B buying workspace grouping styles by flat list, category, or delivery window.
- Real-time aggregate KPI counters: Total Styles, Total Units, Total Value (₹), and Target Achievement %.
- **Intelligent Recommendations**: Suggests top-performing styles in under-indexed categories to close remaining target gaps.

### 5. Central Allocation Center & Live Shortage Simulation
- Real-time factory stock tracking: Total Allocation, Reserved by Bookings, and Remaining Open Units.
- **Simulate Live Stock Shortage**: Demonstrates dynamic supply constraint where central stock for a style drops mid-session.
- **Automated Alternative Substitution Engine**: Suggests 3 fully available substitutes with matching price tiers and 1-click replacement.

### 6. Commercial Review & Visual Fulfillment Tracker
- Pre-submission summary categorizing buy into Footwear, Apparel, and Accessories.
- Payment terms configuration (Net 60 Days / LC, Net 45 Days, 100% Advance) and logistics routing.
- Visual **8-Stage Fulfillment Timeline**:
  `Draft → Submitted → Under Review → Confirmed → Allocated → In Production → Ready for Delivery → Delivered`
- Includes interactive "Simulate Next Status Stage" control and PDF summary export.

### 7. Task Center & Real-time Alert Feed
- Commercial task board with state transitions across `To Do`, `In Progress`, and `Completed`.
- Real-time notification feed broadcasting central stock alerts, deadline warnings, and order submissions.

---

## 🛠️ Technology Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Tooling**: Vite + tsx
- **Styling**: Tailwind CSS v4 (`@theme`, custom scrollbars, tabular figures)
- **Icons**: Lucide React
- **Document Generation**: `docx` (Node.js script generating native `.docx` PRDs)
- **Typography**: Plus Jakarta Sans, JetBrains Mono (strictly formatted tabular numerals)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 3. Re-generate the PM PRD Document
To rebuild the Product Requirements Document in `.docx` format:
```bash
npx tsx scripts/generate_prd_docx.ts
```
The output file will be generated at both `/PUMA_SS27_B2B_Wholesale_Platform_PRD.docx` and `/public/PUMA_SS27_B2B_Wholesale_Platform_PRD.docx`.

### 4. Run Lint & Build Verification
```bash
npm run lint
npm run build
```

---

## 🎨 Enterprise Design Standards Enforced

- **Zero-Pill Discipline**: Metadata uses unboxed clean text separated by typographic delimiters (`·`, `/`).
- **Tabular Figures**: Every monetary value (₹), unit counter, and percentage enforces `tabular-nums` for vertical alignment.
- **Top Bar Contract**: Strict 3-zone header layout with single text element wordmark.
- **Single-Elevation Depth**: Flat architectural surfaces with subtle 1px border lines avoiding nested card clutter.
- **60-30-10 Color Budget**: 60% neutral dark canvas (`#090a0b`), 30% structural surfaces (`#121316`), and 10% high-intent PUMA red (`#E10600`) and Nitro cyan accents.
