import * as fs from 'fs';
import * as path from 'path';
import { 
  Document, 
  Packer, 
  Paragraph, 
  TextRun, 
  HeadingLevel, 
  Table, 
  TableRow, 
  TableCell, 
  WidthType, 
  BorderStyle, 
  AlignmentType,
  ShadingType
} from 'docx';

async function generatePRD() {
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: 'Arial',
            size: 22, // 11pt
            color: '1A1A1A',
          },
          paragraph: {
            spacing: {
              line: 276,
              before: 120,
              after: 120,
            },
          },
        },
      },
    },
    sections: [
      {
        properties: {},
        children: [
          // Title
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({
                text: 'PUMA SE // GLOBAL COMMERCIAL OPERATIONS',
                bold: true,
                size: 20,
                color: 'E10600', // PUMA Red
                font: 'Arial',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 100, after: 200 },
            children: [
              new TextRun({
                text: 'PRODUCT REQUIREMENTS DOCUMENT (PRD)',
                bold: true,
                size: 36,
                color: '0C0D0E',
                font: 'Arial',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 400 },
            children: [
              new TextRun({
                text: 'Project: PUMA Seasonal Wholesale Buy-In / Sell-In Platform (NITRO MATRIX)\nSeason: Spring / Summer 2027 (SS27) & Forward\nAuthor: Senior B2B Product Management & Enterprise UX Lead\nStatus: Approved for Development & Stakeholder Validation\nVersion: 2.4 (Enterprise Edition)',
                size: 20,
                color: '555555',
                italics: true,
              }),
            ],
          }),

          // Divider
          new Paragraph({
            spacing: { before: 200, after: 300 },
            border: {
              bottom: {
                color: 'E10600',
                space: 1,
                style: BorderStyle.SINGLE,
                size: 12,
              },
            },
            children: [],
          }),

          // Section 1: Executive Summary & Product Vision
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
            children: [
              new TextRun({
                text: '1. Executive Summary & Strategic Product Vision',
                bold: true,
                size: 28,
                color: '0C0D0E',
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'The PUMA Seasonal Wholesale Buy-In / Sell-In Platform represents a digital transformation initiative replacing high-friction, error-prone manual seasonal sales processes across regional distributor networks. Historically, seasonal wholesale assortment planning, booking, and allocation tracking relied on static PDF catalogs, disconnected Microsoft Excel spreadsheets, unversioned order forms, ad-hoc WhatsApp correspondence, and manual SAP ERP data entry.',
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                bold: true,
                text: 'Core Value Proposition: ',
              }),
              new TextRun({
                text: '"Provide authorized wholesale distributors and internal PUMA sales teams with a single, transparent, and collaborative digital matrix to discover upcoming seasonal collections, evaluate real-time central stock availability, model data-driven size curves, and book seasonal orders against contracted targets without offline friction."',
                italics: true,
              }),
            ],
          }),

          // Section 2: Problem Statement & Legacy Flaws
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
            children: [
              new TextRun({
                text: '2. Problem Statement & Legacy Process Bottlenecks',
                bold: true,
                size: 28,
                color: '0C0D0E',
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'The legacy seasonal buy-in process suffers from five critical operational deficiencies:',
              }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: 'Inventory Latency & Overselling: ' }),
              new TextRun({ text: 'Distributors place orders based on static PDFs without awareness of central factory allocations. When high-demand styles (e.g., Velocity NITRO 4, Speedcat OG) sell out globally, orders must be retroactively canceled or modified manually.' }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: 'Sub-optimal Size Curves: ' }),
              new TextRun({ text: 'Without prescriptive benchmark curves, distributors over-order fringe sizes or misjudge market consumption, leading to downstream retail markdowns and unsold dealer stock.' }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: 'Blind Target Tracking: ' }),
              new TextRun({ text: 'Sales managers lack real-time visibility into distributor buy drafts, resulting in last-minute seasonal revenue shortfalls and delayed follow-ups.' }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: 'Spreadsheet Consolidation Burden: ' }),
              new TextRun({ text: 'Sales representatives spend up to 40% of their time transcribing handwritten or spreadsheet-based orders into commercial ERPs, increasing order entry errors.' }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: 'Order Fulfillment Opacity: ' }),
              new TextRun({ text: 'Once an order is submitted, distributors have zero tracking into factory scheduling, credit validation, or warehouse staging until physical dispatch.' }),
            ],
          }),

          // Section 3: User Personas
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
            children: [
              new TextRun({
                text: '3. Target Personas & Behavioral Profiles',
                bold: true,
                size: 28,
                color: '0C0D0E',
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'The platform accommodates four primary stakeholder personas with distinct authorization roles and functional views:',
              }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: 'Persona 1: Wholesale Distributor / Retail Buyer (e.g., ABC Sports Distribution, Mumbai): ' }),
              new TextRun({ text: 'Needs to explore upcoming SS27 collections, evaluate wholesale prices vs. suggested retail prices (MSRP), build size-level assortments, track current buy value against contracted seasonal targets (₹25L), and submit orders prior to allocation deadlines.' }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: 'Persona 2: PUMA Sales Representative (e.g., Key Accounts Lead): ' }),
              new TextRun({ text: 'Needs to track assigned distributor pipeline, identify inactive buyers, analyze category coverage gaps, dispatch automated reminders via WhatsApp/Email, and assist distributors with assortment optimization.' }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: 'Persona 3: PUMA Sales Director / Regional Commercial Manager: ' }),
              new TextRun({ text: 'Requires consolidated regional telemetry across Zones (West, North, South, East, Central), tracking overall sell-in (₹31.8 Cr actual vs. ₹48.5 Cr target), category penetration, and AOV expansion.' }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: 'Persona 4: PUMA Merchandising & Supply Chain Administrator: ' }),
              new TextRun({ text: 'Governs seasonal windows, allocation limits, minimum order quantities (MOQ), and monitors portfolio health via a 2×2 Demand vs. Availability Matrix.' }),
            ],
          }),

          // Section 4: Detailed Functional Specifications
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
            children: [
              new TextRun({
                text: '4. Comprehensive Feature Specifications',
                bold: true,
                size: 28,
                color: '0C0D0E',
              }),
            ],
          }),

          // Feature 4.1
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({ text: '4.1 Season Lifecycle & Planning Context Switcher', bold: true, size: 24, color: 'E10600' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'The top navigation header maintains global awareness of the active seasonal context (SS27, FW27, SS28). Each season defines an opening date (01 Sep 2026), closing deadline (15 Oct 2026), delivery dispatch schedule (Jan–Mar 2027), active status flag, and countdown timer. Switching seasons dynamically recalculates target commitments, assortment items, and catalog items.' }),
            ],
          }),

          // Feature 4.2
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({ text: '4.2 Digital Showroom & Interactive Lookbook', bold: true, size: 24, color: 'E10600' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Replaces bulky physical catalogs with an editorial digital showroom. Features high-resolution campaign photography, franchise stories (NITROFOAM Elite, King K-BETTER, T7 Tech), category jump controls (Running, Training, Football, Basketball, Lifestyle, Motorsport, Apparel, Accessories), and an interactive dual-page flipbook lookbook. Buyers can click "Add to Buy" directly from lookbook editorial spreads into their active assortment draft.' }),
            ],
          }),

          // Feature 4.3
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({ text: '4.3 Enterprise Product Discovery & Commercial Catalog', bold: true, size: 24, color: 'E10600' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Presents 50+ authentic PUMA commercial styles with rich metadata: Style Number (e.g., 310123_01), Colorway, Category, Gender, Wholesale Price (in INR), MSRP, Margin Percentage (typically 51%–58%), Minimum Order Quantity (MOQ), Central Allocation Status, and Delivery Window. Features both a 4-column card view and a high-density tabular view with multi-axis filtering (Category, Gender, Availability, Delivery Window, Price Sorting).' }),
            ],
          }),

          // Feature 4.4
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({ text: '4.4 Size Curve Modeling Engine & Assortment Builder', bold: true, size: 24, color: 'E10600' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'The core commercial transaction tool allows buyers to configure unit counts per individual size (UK 6–UK 11 for footwear; XS–XXL for apparel). Provides a 1-click "Apply Recommended Curve" option calibrated to PUMA historical regional sell-through ratios (e.g., 5%–15%–30%–30%–15%–5%). Features a real-time size distribution comparison chart, automated MOQ enforcement, and statistical variance warnings if custom curves deviate drastically from regional benchmarks.' }),
            ],
          }),

          // Feature 4.5
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({ text: '4.5 "My Buy" Workspace & Target Gap Recommendations', bold: true, size: 24, color: 'E10600' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'A professional B2B order planning workbench that organizes selected styles by flat list, category, or delivery window. Displays real-time aggregate statistics: Total Styles, Total Units, Total Value (₹), Contracted Target, and Achievement %. If a distributor has a gap remaining to meet their target (e.g., ₹6.6L gap), the system dynamically recommends 3 high-velocity styles in under-represented categories to close the gap.' }),
            ],
          }),

          // Feature 4.6
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({ text: '4.6 Central Availability Center & Live Shortage Simulation', bold: true, size: 24, color: 'E10600' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Provides granular visibility into global factory allocation pools: Total Factory Allocation, Units Reserved by Confirmed Bookings, and Remaining Open Units. Features an interactive "Simulate Live Stock Shortage" toggle to demonstrate dynamic supply constraints (e.g., Velocity NITRO 4 UK 9 constricted by 18 units) paired with an automated Alternative Style Substitution Engine that recommends 3 in-stock substitutes with 1-click order replacement.' }),
            ],
          }),

          // Feature 4.7
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({ text: '4.7 Commercial Order Review & Submission Modal', bold: true, size: 24, color: 'E10600' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Prior to final order commitment, the system summarizes the buy breakdown across Footwear, Apparel, and Accessories. Captures commercial credit terms (Net 60 Days / LC, Net 45 Days, 100% Advance) and logistics routing preferences (FOB Bhiwandi Hub). Validates allocation constraints, presents legal confirmation checkboxes, and generates a unique seasonal order identifier (e.g., SS27-DB-10482).' }),
            ],
          }),

          // Feature 4.8
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({ text: '4.8 Visual 8-Stage Order Fulfillment Tracker', bold: true, size: 24, color: 'E10600' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Implements an interactive timeline tracking orders across 8 distinct lifecycle milestones: Draft → Submitted → Under Review → Confirmed → Allocated → In Production → Ready for Delivery → Delivered. Users can simulate forward status progression, export PDF summary receipts, trigger browser print layouts, or initiate direct sales representative inquiries.' }),
            ],
          }),

          // Feature 4.9
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({ text: '4.9 Sales Rep Workspace, CRM Profiles & Automated Reminders', bold: true, size: 24, color: 'E10600' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Equips PUMA territory sales representatives with a master dashboard covering all assigned accounts. Highlights last activity timestamps, target achievement percentages, and buy draft states. Sales reps can trigger 1-click simulated follow-up reminders via WhatsApp and Email, or drill down into historical season comparisons (SS26, FW26, SS27).' }),
            ],
          }),

          // Feature 4.10
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({ text: '4.10 Executive Sell-In Dashboard & 2×2 Portfolio Matrix', bold: true, size: 24, color: 'E10600' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Provides senior commercial leadership with consolidated sell-in metrics: ₹31.8 Cr actual vs. ₹48.5 Cr target (65.6% achievement), 128 / 175 distributors buying, ₹24.8L Average Order Value, and territorial breakdown across 5 zones. Features a BCG-style 2×2 Portfolio Matrix categorizing styles into: High Demand + High Availability (Growth Drivers), High Demand + Low Availability (Bottlenecks), Low Demand + High Availability (Inventory Risk), and Low Demand + Low Availability (Niche/Specialty).' }),
            ],
          }),

          // Feature 4.11
          new Paragraph({
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 200, after: 100 },
            children: [
              new TextRun({ text: '4.11 Operational Task Center & Alert Notification Feed', bold: true, size: 24, color: 'E10600' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'Features an interactive task center for commercial actions (reviewing distributor assortments, validating credit guarantees, resolving stock shortages) with state management across To Do, In Progress, and Completed. Paired with a notification bell feed broadcasting real-time stock alerts, deadline warnings, and order submissions.' }),
            ],
          }),

          // Section 5: Edge Cases & Business Logic
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
            children: [
              new TextRun({
                text: '5. Non-Happy Paths, Edge Cases & Business Rules',
                bold: true,
                size: 28,
                color: '0C0D0E',
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'To ensure enterprise robustness, the platform enforces strict business rules:' }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: 'MOQ Enforcement: ' }),
              new TextRun({ text: 'Orders containing line items below the designated Minimum Order Quantity display a blocking warning and cannot be submitted until quantities are normalized.' }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: 'Out-of-Stock Size Blocking: ' }),
              new TextRun({ text: 'Sizes designated as "Unavailable" or "Sold Out" are disabled in the quantity stepper with strikethrough styling to prevent overselling.' }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: 'Supply Shortage Recovery: ' }),
              new TextRun({ text: 'When central inventory constricts, the platform provides automated 1-click alternative style replacement preserving line item value and delivery scheduling.' }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: 'Deadline Approaching Indicators: ' }),
              new TextRun({ text: 'High-visibility persistent countdown banners alert distributors when less than 15 days remain before allocation lock.' }),
            ],
          }),

          // Section 6: Target KPIs & Success Metrics
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            spacing: { before: 300, after: 150 },
            children: [
              new TextRun({
                text: '6. Success Metrics & Business KPIs',
                bold: true,
                size: 28,
                color: '0C0D0E',
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: 'The success of the PUMA B2B platform will be evaluated against five core benchmarks:' }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: '1. Seasonal Order Cycle Time: ' }),
              new TextRun({ text: 'Reduce end-to-end buy confirmation cycle from 21 days (offline/manual) to under 48 hours.' }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: '2. Distributor Target Achievement Rate: ' }),
              new TextRun({ text: 'Increase seasonal target compliance from 78% to 92%+ through intelligent gap closing recommendations.' }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: '3. Overselling & Order Cancellation Rate: ' }),
              new TextRun({ text: 'Reduce post-booking line-item cancellations due to inventory shortages from 14% to under 1.5%.' }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: '4. Digital Assortment Adoption: ' }),
              new TextRun({ text: 'Achieve 100% digital submission across Tier 1 Key Accounts within 2 seasons of deployment.' }),
            ],
          }),
          new Paragraph({
            bullet: { level: 0 },
            children: [
              new TextRun({ bold: true, text: '5. Sales Rep Administrative Overhead: ' }),
              new TextRun({ text: 'Reduce manual spreadsheet transcription time by 85%, freeing sales reps to focus on strategic account growth.' }),
            ],
          }),

          // Conclusion
          new Paragraph({
            spacing: { before: 400, after: 200 },
            border: {
              top: {
                color: 'E10600',
                space: 1,
                style: BorderStyle.SINGLE,
                size: 6,
              },
            },
            children: [
              new TextRun({
                text: 'DOCUMENT APPROVAL & SIGN-OFF\nLead Product Manager: Ishita Bansal (B2B Enterprise Commerce)\nCommercial Operations Director: Rahul Sharma (Wholesale Strategy)\nDistribution Lead: PUMA SE Global SCM',
                size: 18,
                color: '666666',
                italics: true,
              }),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  
  // Save to both public directory (for direct in-app download) and project root
  const publicPath = path.resolve('public');
  if (!fs.existsSync(publicPath)) {
    fs.mkdirSync(publicPath, { recursive: true });
  }
  
  fs.writeFileSync(path.resolve('public/PUMA_SS27_B2B_Wholesale_Platform_PRD.docx'), buffer);
  fs.writeFileSync(path.resolve('PUMA_SS27_B2B_Wholesale_Platform_PRD.docx'), buffer);
  
  console.log('PRD docx successfully generated at public/PUMA_SS27_B2B_Wholesale_Platform_PRD.docx and /PUMA_SS27_B2B_Wholesale_Platform_PRD.docx');
}

generatePRD().catch(console.error);
