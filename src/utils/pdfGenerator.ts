import { jsPDF } from "jspdf";
import { CareerReport } from "../types";

export function generateReportPDF(report: CareerReport) {
  // Create jsPDF document instance (A4 size: 210mm x 297mm)
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const marginX = 18;
  const textWidth = pageWidth - marginX * 2; // 174mm
  let currentY = 18;
  let pageNum = 1;

  // Curated elegant tech-palette
  const colors = {
    dark: [17, 24, 39],          // Deep rich Slate-900 (#111827)
    grayBg: [249, 250, 251],     // Subtle Gray-50 (#f9fafb)
    purple: [124, 58, 237],      // Vivid Violet-600 (#7c3aed)
    purpleBg: [245, 243, 255],   // Soft violet backdrop (#f5f3ff)
    rose: [225, 29, 72],         // Bright Rose-600 (#e11d48)
    roseBg: [255, 241, 242],     // Soft Rose alert background (#fff1f2)
    emerald: [5, 150, 105],      // Fresh Emerald-600 (#059669)
    emeraldBg: [236, 253, 245],  // Soft Emerald backdrop (#ecfdf5)
    amber: [217, 119, 6],        // Stately Amber-600 (#d97706)
    amberBg: [254, 243, 199],    // Soft Amber backdrop (#fef3c7)
    textMuted: [107, 114, 128],  // Gray-500 (#6b7280)
    border: [229, 231, 235],     // Gray-200 (#e5e7eb)
  };

  // Format Helper for Indian Salaries (LPA)
  function formatReportSalary(val: number, currency: string) {
    if (currency === "INR" || currency === "₹" || val < 100) {
      const lpa = val > 1000 ? (val / 100000) : val;
      return `Rs. ${lpa.toFixed(1).replace(/\.0$/, "")} LPA`;
    }
    const kVal = val > 1000 ? (val / 1000) : val;
    return `${currency === "USD" ? "$" : currency + " "}${kVal.toFixed(0)}k`;
  }

  // Draw Page Frame, Watermark headers, and footers
  function drawPageBackground(isFirstPage = false) {
    // Outer aesthetic boundary lines
    doc.setDrawColor(235, 235, 240);
    doc.setLineWidth(0.35);
    doc.line(8, 8, pageWidth - 8, 8); // Top
    doc.line(8, pageHeight - 8, pageWidth - 8, pageHeight - 8); // Bottom
    doc.line(8, 8, 8, pageHeight - 8); // Left
    doc.line(pageWidth - 8, 8, pageWidth - 8, pageHeight - 8); // Right

    // Top Brand Accent
    if (!isFirstPage) {
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(colors.purple[0], colors.purple[1], colors.purple[2]);
      doc.text("SKILLISSUE.AI", marginX, 13);
      
      doc.setFont("Helvetica", "normal");
      doc.setTextColor(colors.textMuted[0], colors.textMuted[1], colors.textMuted[2]);
      doc.text("•  CAREER INTELLIGENCE AUDIT", marginX + 25, 13);

      doc.setDrawColor(colors.border[0], colors.border[1], colors.border[2]);
      doc.setLineWidth(0.25);
      doc.line(marginX, 15, pageWidth - marginX, 15);
    }

    // Centered Footer (All pages)
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(colors.textMuted[0], colors.textMuted[1], colors.textMuted[2]);
    doc.text(
      `SKILLISSUE REPORT  |  CONFIDENTIAL EVALUATION  |  Page ${pageNum}`,
      pageWidth / 2,
      pageHeight - 12,
      { align: "center" }
    );
  }

  // Pure mathematical simulator for text height
  function calculateTextHeight(text: string, fontSize: number, maxWidth: number, lineSpacing = 1.25): number {
    doc.setFont("Helvetica", "normal");
    doc.setFontSize(fontSize);
    const lines = doc.splitTextToSize(text, maxWidth);
    return lines.length * fontSize * 0.352778 * lineSpacing;
  }

  // Helper to split and print text at a specific Y coordinate
  function printTextFlowAt(
    text: string,
    fontSize: number,
    fontStyle: "normal" | "bold" | "italic" | "bolditalic",
    color: number[],
    x: number,
    maxWidth: number,
    y: number,
    lineSpacing = 1.25
  ) {
    let style = "normal";
    if (fontStyle === "italic") style = "oblique";
    else if (fontStyle === "bolditalic") style = "boldoblique";
    else if (fontStyle === "bold") style = "bold";

    doc.setFont("Helvetica", style);
    doc.setFontSize(fontSize);
    doc.setTextColor(color[0], color[1], color[2]);

    const lines = doc.splitTextToSize(text, maxWidth);
    doc.text(lines, x, y + (fontSize * 0.352778 * 0.8)); // Adjust baseline
  }

  // Helper to render label (bold) & value (normal/multiline) at a specific Y coordinate
  function printLabeledLine(
    label: string,
    value: string,
    labelColor: number[],
    valueColor: number[],
    x: number,
    fontSize: number,
    y: number
  ) {
    doc.setFont("Helvetica", "bold");
    doc.setFontSize(fontSize);
    doc.setTextColor(labelColor[0], labelColor[1], labelColor[2]);
    doc.text(label, x, y + (fontSize * 0.352778 * 0.8));
    
    const labelWidth = doc.getTextWidth(label) + 1.5;
    
    doc.setFont("Helvetica", "normal");
    doc.setTextColor(valueColor[0], valueColor[1], valueColor[2]);
    const lines = doc.splitTextToSize(value, textWidth - (x - marginX) - labelWidth);
    doc.text(lines, x + labelWidth, y + (fontSize * 0.352778 * 0.8));
  }

  // Space-check to push cleanly to subsequent pages
  function checkSpace(neededHeight: number) {
    if (currentY + neededHeight > pageHeight - 22) {
      doc.addPage();
      pageNum++;
      currentY = 25;
      drawPageBackground(false);
    }
  }

  // Draw Segment Title with customizable Side-Accent Badge
  function drawSectionTitle(title: string, colorRGB = colors.purple) {
    checkSpace(18);
    // Draw signature left indicator bar
    doc.setFillColor(colorRGB[0], colorRGB[1], colorRGB[2]);
    doc.rect(marginX, currentY, 3.5, 7, 'F');

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
    doc.text(title.toUpperCase(), marginX + 6, currentY + 5.5);

    doc.setDrawColor(colors.border[0], colors.border[1], colors.border[2]);
    doc.setLineWidth(0.35);
    doc.line(marginX, currentY + 9, pageWidth - marginX, currentY + 9);
    
    currentY += 14;
  }

  // ----------------------------------------------------
  // INITIAL PAGE & LOGO BANNER
  // ----------------------------------------------------
  drawPageBackground(true);

  // Gradient Rounded Header Container
  const headerHeight = 36;
  doc.setFillColor(15, 23, 42); // Slate-900 base for dark mode tech trust
  doc.roundedRect(marginX, currentY, textWidth, headerHeight, 3, 3, 'F');

  // Interactive Accent Bar
  doc.setFillColor(colors.purple[0], colors.purple[1], colors.purple[2]);
  doc.rect(marginX + 2, currentY + 2, 1.5, headerHeight - 4, 'F');
  doc.setFillColor(colors.rose[0], colors.rose[1], colors.rose[2]);
  doc.rect(marginX + textWidth - 3.5, currentY + 2, 1.5, headerHeight - 4, 'F');

  // Custom Logo badge ("S!" Warning Beacon)
  const badgeX = marginX + 10;
  const badgeY = currentY + (headerHeight / 2) - 10;
  doc.setFillColor(31, 41, 55); // Gray-800
  doc.roundedRect(badgeX, badgeY, 20, 20, 3, 3, 'F');
  
  doc.setDrawColor(colors.rose[0], colors.rose[1], colors.rose[2]);
  doc.setLineWidth(0.5);
  doc.roundedRect(badgeX, badgeY, 20, 20, 3, 3, 'D');

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(colors.rose[0], colors.rose[1], colors.rose[2]);
  doc.text("S!", badgeX + 10, badgeY + 14, { align: "center" });

  // Main title
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text("SkillIssue", badgeX + 25, currentY + 14);

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(14);
  doc.setTextColor(156, 163, 175);
  doc.text(".ai", badgeX + 57, currentY + 14);

  // Branded badge label
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(7);
  doc.setFillColor(colors.purple[0], colors.purple[1], colors.purple[2]);
  doc.roundedRect(badgeX + 25, currentY + 18, 54, 4.5, 0.8, 0.8, 'F');
  doc.setTextColor(255, 255, 255);
  doc.text("ELITE TALENT RECRUITING METRICS", badgeX + 27, currentY + 21.2);

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(156, 163, 175);
  doc.text("Pristine Code-Level Auditing Pipeline Report & Reality Check", badgeX + 25, currentY + 28);

  currentY += headerHeight + 8;

  // ----------------------------------------------------
  // PROFILE SUB-BANNER OVERVIEW
  // ----------------------------------------------------
  checkSpace(32);
  const infoBoxHeight = 24;
  doc.setFillColor(colors.grayBg[0], colors.grayBg[1], colors.grayBg[2]);
  doc.roundedRect(marginX, currentY, textWidth, infoBoxHeight, 3, 3, 'F');
  doc.setDrawColor(colors.border[0], colors.border[1], colors.border[2]);
  doc.setLineWidth(0.35);
  doc.roundedRect(marginX, currentY, textWidth, infoBoxHeight, 3, 3, 'D');

  // Column 1: Candidate Title
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(colors.textMuted[0], colors.textMuted[1], colors.textMuted[2]);
  doc.text("AUDITED CANDIDATE", marginX + 6, currentY + 7);

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
  const formattedName = report.candidateName.length > 22 ? report.candidateName.substring(0, 20) + "..." : report.candidateName;
  doc.text(formattedName.toUpperCase(), marginX + 6, currentY + 15);

  // Divider line 1
  doc.setDrawColor(220, 222, 230);
  doc.line(marginX + 62, currentY + 4, marginX + 62, currentY + infoBoxHeight - 4);

  // Column 2: Hireability
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(colors.textMuted[0], colors.textMuted[1], colors.textMuted[2]);
  doc.text("HIREABILITY MATRIX", marginX + 68, currentY + 7);

  const scoreColor = report.hireabilityScore >= 80 ? colors.emerald : report.hireabilityScore >= 65 ? colors.amber : colors.rose;
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);
  doc.text(`${report.hireabilityScore}%`, marginX + 68, currentY + 16);

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(scoreColor[0], scoreColor[1], scoreColor[2]);
  const badgeLabel = report.hireabilityScore >= 80 ? "HIGH MATCH" : report.hireabilityScore >= 65 ? "DEVELOPING" : "SKILL DEBT";
  doc.text(badgeLabel, marginX + 84, currentY + 15);

  // Divider line 2
  doc.line(marginX + 118, currentY + 4, marginX + 118, currentY + infoBoxHeight - 4);

  // Column 3: ATS Score
  doc.setFont("Helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(colors.textMuted[0], colors.textMuted[1], colors.textMuted[2]);
  doc.text("ATS COMPATIBILITY", marginX + 124, currentY + 7);

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(colors.purple[0], colors.purple[1], colors.purple[2]);
  doc.text(`${report.atsAnalysis.score}%`, marginX + 124, currentY + 16);

  doc.setFont("Helvetica", "bold");
  doc.setFontSize(8);
  const atsLabel = report.atsAnalysis.score >= 80 ? "COMPLIANT" : report.atsAnalysis.score >= 65 ? "AVERAGE" : "RISK DETECTED";
  doc.text(atsLabel, marginX + 140, currentY + 15);

  currentY += infoBoxHeight + 8;

  // ----------------------------------------------------
  // EXECUTIVE SUMMARY
  // ----------------------------------------------------
  checkSpace(35);
  drawSectionTitle("Executive Evaluation Summary", colors.purple);
  const summaryH = calculateTextHeight(report.resumeSummary, 9, textWidth, 1.3);
  checkSpace(summaryH);
  printTextFlowAt(report.resumeSummary, 9, "italic", colors.dark, marginX, textWidth, currentY, 1.3);
  currentY += summaryH + 8;

  // ----------------------------------------------------
  // REALITY CHECK CALLOUT
  // ----------------------------------------------------
  checkSpace(62);
  drawSectionTitle("Brutal Honesty Reality Check", colors.rose);

  // Calculate Reality Check height dynamically
  const rcHeaderH = calculateTextHeight("ALERT: HARSH MARKET REALITY REPORT", 9, textWidth - 12);
  const rcBodyH = calculateTextHeight(`"${report.realityCheck.brutalHonesty}"`, 8, textWidth - 12);
  
  // Debt layout simulation
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(8.5);
  const debtLabelW = doc.getTextWidth("Major Profile Debt: ") + 1.5;
  const debtValH = calculateTextHeight(report.realityCheck.coreWeakness, 8.5, textWidth - 12 - debtLabelW);
  
  // Rejection layout simulation
  const rejLabelW = doc.getTextWidth("Likely Exit Handler: ") + 1.5;
  const rejValH = calculateTextHeight(report.realityCheck.typicalRejectionReason, 8.5, textWidth - 12 - rejLabelW);

  const rcPadding = 12; // sum of vertical spacers
  const rcCardHeight = rcHeaderH + rcBodyH + Math.max(3.8, debtValH) + Math.max(3.8, rejValH) + rcPadding;

  checkSpace(rcCardHeight);

  // Draw background first
  doc.setFillColor(colors.roseBg[0], colors.roseBg[1], colors.roseBg[2]);
  doc.roundedRect(marginX, currentY, textWidth, rcCardHeight, 2, 2, 'F');
  doc.setDrawColor(colors.rose[0], colors.rose[1], colors.rose[2]);
  doc.setLineWidth(0.6);
  doc.roundedRect(marginX, currentY, textWidth, rcCardHeight, 2, 2, 'D');

  // Left solid stripe
  doc.setFillColor(colors.rose[0], colors.rose[1], colors.rose[2]);
  doc.rect(marginX, currentY, 3, rcCardHeight, 'F');

  let rcY = currentY + 4; // internal card cursors
  
  // Print Header
  printTextFlowAt("ALERT: HARSH MARKET REALITY REPORT", 9, "bold", colors.rose, marginX + 6, textWidth - 12, rcY);
  rcY += rcHeaderH + 2;

  // Print Body
  printTextFlowAt(`"${report.realityCheck.brutalHonesty}"`, 8, "italic", [30, 41, 59], marginX + 6, textWidth - 12, rcY);
  rcY += rcBodyH + 3;

  // Print Debt
  printLabeledLine("Major Profile Debt: ", report.realityCheck.coreWeakness, colors.dark, colors.rose, marginX + 6, 8.5, rcY);
  rcY += Math.max(3.8, debtValH) + 2;

  // Print Rejection Reason
  printLabeledLine("Likely Exit Handler: ", report.realityCheck.typicalRejectionReason, colors.dark, colors.textMuted, marginX + 6, 8.5, rcY);
  
  currentY += rcCardHeight + 8;

  // ----------------------------------------------------
  // RECRUITER RED FLAGS
  // ----------------------------------------------------
  checkSpace(40);
  drawSectionTitle("Recruiter Red Flags Detected", colors.rose);

  if (report.redFlags && report.redFlags.length > 0) {
    report.redFlags.forEach((flag) => {
      const descH = calculateTextHeight(flag.description, 8.5, textWidth - 12);
      const cardHeight = 7 + descH + 3; // exact container height for Red Flag card dynamically computed

      checkSpace(cardHeight + 4);

      // Draw subtle light pink card background for red flags
      doc.setFillColor(colors.roseBg[0], colors.roseBg[1], colors.roseBg[2]);
      doc.roundedRect(marginX, currentY, textWidth, cardHeight, 1.5, 1.5, 'F');
      doc.setDrawColor(colors.rose[0], colors.rose[1], colors.rose[2]);
      doc.setLineWidth(0.2);
      doc.roundedRect(marginX, currentY, textWidth, cardHeight, 1.5, 1.5, 'D');

      // Left red solid thin focus border
      doc.setFillColor(colors.rose[0], colors.rose[1], colors.rose[2]);
      doc.rect(marginX, currentY, 2, cardHeight, 'F');

      // Red circle beacon indicator
      doc.circle(marginX + 5, currentY + 3.8, 1, 'F');

      // Flag Title
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
      doc.text(flag.title, marginX + 8, currentY + 4.5);

      // Severity badge
      const isCritical = flag.severity.toLowerCase() === "critical";
      const sevColor = isCritical ? colors.rose : colors.amber;
      const sevBg = isCritical ? colors.roseBg : colors.amberBg;

      doc.setFillColor(255, 255, 255); // Solid white backdrop for severity pill
      doc.setDrawColor(sevColor[0], sevColor[1], sevColor[2]);
      doc.roundedRect(marginX + textWidth - 24, currentY + 1.8, 20, 3.8, 0.5, 0.5, 'F');
      doc.roundedRect(marginX + textWidth - 24, currentY + 1.8, 20, 3.8, 0.5, 0.5, 'D');

      doc.setFont("Helvetica", "bold");
      doc.setFontSize(6.5);
      doc.setTextColor(sevColor[0], sevColor[1], sevColor[2]);
      doc.text(flag.severity.toUpperCase(), marginX + textWidth - 14, currentY + 4.5, { align: "center" });

      // Description Text - starts below title precisely with padding
      printTextFlowAt(flag.description, 8.5, "normal", colors.textMuted, marginX + 6, textWidth - 12, currentY + 7.5);

      currentY += cardHeight + 4;
    });
  } else {
    // No red flags text
    const emptyH = calculateTextHeight("Zero urgent signals detected. The profile handles layout structures responsibly.", 9, textWidth);
    checkSpace(emptyH);
    printTextFlowAt("Zero urgent signals detected. The profile handles layout structures responsibly.", 9, "normal", colors.textMuted, marginX, textWidth, currentY);
    currentY += emptyH + 8;
  }

  // ----------------------------------------------------
  // CRITICAL SKILL ISSUES
  // ----------------------------------------------------
  checkSpace(45);
  drawSectionTitle("Critical Technical Gaps & Deficits", colors.amber);

  if (report.skillIssues && report.skillIssues.length > 0) {
    report.skillIssues.forEach((issue) => {
      // Calculate dynamic height of this card
      const descH = calculateTextHeight(issue.description, 8, textWidth - 10);
      const repairH = issue.alternativeSuggest ? calculateTextHeight(`REPAIR PROTOCOL: ${issue.alternativeSuggest}`, 7.5, textWidth - 10) : 0;
      
      const cardPadding = 11; // spacing around elements
      const cardHeight = 4.5 + descH + (issue.alternativeSuggest ? repairH + 2.5 : 0) + cardPadding;

      checkSpace(cardHeight + 4);

      // Draw card container background & border
      doc.setFillColor(colors.grayBg[0], colors.grayBg[1], colors.grayBg[2]);
      doc.roundedRect(marginX, currentY, textWidth, cardHeight, 1.5, 1.5, 'F');
      doc.setDrawColor(colors.border[0], colors.border[1], colors.border[2]);
      doc.setLineWidth(0.25);
      doc.roundedRect(marginX, currentY, textWidth, cardHeight, 1.5, 1.5, 'D');

      // Lateral strip accent
      const urgencyColor = issue.importance.toLowerCase() === "critical" ? colors.rose : colors.amber;
      doc.setFillColor(urgencyColor[0], urgencyColor[1], urgencyColor[2]);
      doc.rect(marginX, currentY, 2.5, cardHeight, 'F');

      let innerY = currentY + 4;

      // Print Skill Title
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
      doc.text(issue.skill, marginX + 5, innerY);

      // Print Gap Badge
      const textW = doc.getTextWidth(issue.skill);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(6.5);
      doc.setTextColor(urgencyColor[0], urgencyColor[1], urgencyColor[2]);
      doc.text(`[${issue.importance.toUpperCase()} GAP]`, marginX + 5 + textW + 3, innerY - 0.4);

      innerY += 4.5;

      // Print Description
      printTextFlowAt(issue.description, 8, "normal", [55, 65, 81], marginX + 5, textWidth - 10, innerY);
      innerY += descH + 2.5;

      // Print Repair Suggestion
      if (issue.alternativeSuggest) {
        printTextFlowAt(`REPAIR PROTOCOL: ${issue.alternativeSuggest}`, 7.5, "bold", colors.emerald, marginX + 5, textWidth - 10, innerY);
      }

      currentY += cardHeight + 4; // separator between cards
    });
  } else {
    const emptyH = calculateTextHeight("Excellent standing. The applicant holds sufficient coverage of production concepts.", 9.5, textWidth);
    checkSpace(emptyH);
    printTextFlowAt("Excellent standing. The applicant holds sufficient coverage of production concepts.", 9.5, "normal", colors.textMuted, marginX, textWidth, currentY);
    currentY += emptyH + 8;
  }

  // ----------------------------------------------------
  // REAL MARKETPLACE PROJECTIONS (INDIAN LPA HUBS)
  // ----------------------------------------------------
  checkSpace(38);
  drawSectionTitle("Real Indian Marketplace Value Estimate", colors.emerald);

  const sl = report.salaryEstimate;
  doc.setFillColor(colors.emeraldBg[0], colors.emeraldBg[1], colors.emeraldBg[2]);
  doc.roundedRect(marginX, currentY, textWidth, 24, 2, 2, 'F');
  doc.setDrawColor(colors.emerald[0], colors.emerald[1], colors.emerald[2]);
  doc.setLineWidth(0.4);
  doc.roundedRect(marginX, currentY, textWidth, 24, 2, 2, 'D');

  // Entry Bracket
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(colors.emerald[0], colors.emerald[1], colors.emerald[2]);
  doc.text("ESTIMATED ENTRY RANGE", marginX + 8, currentY + 6.5);
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
  
  const minStr = formatReportSalary(sl.beginnerMin, sl.currency);
  const maxStr = formatReportSalary(sl.beginnerMax, sl.currency).replace(/₹|Rs\. /g, "");
  doc.text(`${minStr} - ${maxStr}`, marginX + 8, currentY + 14);

  // Split Divider line
  doc.setDrawColor(colors.emerald[0], colors.emerald[1], colors.emerald[2]);
  doc.setLineWidth(0.2);
  doc.line(marginX + textWidth / 2, currentY + 4, marginX + textWidth / 2, currentY + 20);

  // Mid Growth Bracket
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(colors.purple[0], colors.purple[1], colors.purple[2]);
  doc.text("ESTIMATED GROWTH POTENTIAL (MID-LEVEL)", marginX + textWidth / 2 + 8, currentY + 6.5);
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
  
  const midMinStr = formatReportSalary(sl.growthMin, sl.currency);
  const midMaxStr = formatReportSalary(sl.growthMax, sl.currency).replace(/₹|Rs\. /g, "");
  doc.text(`${midMinStr} - ${midMaxStr}`, marginX + textWidth / 2 + 8, currentY + 14);

  currentY += 28;

  // Salary Commentary Subtext
  const formattedComm = doc.splitTextToSize(sl.commentary, textWidth);
  const commH = formattedComm.length * 3.6 + 6;
  checkSpace(commH + 5);
  
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
  doc.text("RECRUITER INSIGHT ON VALUATION:", marginX, currentY);

  doc.setFont("Helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(colors.textMuted[0], colors.textMuted[1], colors.textMuted[2]);
  doc.text(formattedComm, marginX, currentY + 4.5);
  
  currentY += commH + 6;

  // ----------------------------------------------------
  // GRID ROADMAP TIMELINE (30-60-90 DAYS)
  // ----------------------------------------------------
  checkSpace(40);
  drawSectionTitle("30-60-90 Days XP Grinding Timeline", colors.purple);

  // 30 Days block
  checkSpace(28);
  doc.setFillColor(colors.roseBg[0], colors.roseBg[1], colors.roseBg[2]);
  doc.roundedRect(marginX, currentY, 35, 6, 0.8, 0.8, 'F');
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(colors.rose[0], colors.rose[1], colors.rose[2]);
  doc.text("PHASE 1  •  30 DAYS", marginX + 4, currentY + 4.2);
  currentY += 8;

  if (report.xpPlan.days30 && report.xpPlan.days30.length > 0) {
    report.xpPlan.days30.forEach((task) => {
      const lines = doc.splitTextToSize("•  " + task, textWidth - 4);
      const taskH = lines.length * 3.8 + 1;
      checkSpace(taskH);
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
      doc.text(lines, marginX + 2, currentY);
      currentY += taskH;
    });
  }
  currentY += 3;

  // 60 Days block
  checkSpace(28);
  doc.setFillColor(colors.amberBg[0], colors.amberBg[1], colors.amberBg[2]);
  doc.roundedRect(marginX, currentY, 35, 6, 0.8, 0.8, 'F');
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(colors.amber[0], colors.amber[1], colors.amber[2]);
  doc.text("PHASE 2  •  60 DAYS", marginX + 4, currentY + 4.2);
  currentY += 8;

  if (report.xpPlan.days60 && report.xpPlan.days60.length > 0) {
    report.xpPlan.days60.forEach((task) => {
      const lines = doc.splitTextToSize("•  " + task, textWidth - 4);
      const taskH = lines.length * 3.8 + 1;
      checkSpace(taskH);
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
      doc.text(lines, marginX + 2, currentY);
      currentY += taskH;
    });
  }
  currentY += 3;

  // 90 Days block
  checkSpace(28);
  doc.setFillColor(colors.emeraldBg[0], colors.emeraldBg[1], colors.emeraldBg[2]);
  doc.roundedRect(marginX, currentY, 35, 6, 0.8, 0.8, 'F');
  doc.setFont("Helvetica", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(colors.emerald[0], colors.emerald[1], colors.emerald[2]);
  doc.text("PHASE 3  •  90 DAYS", marginX + 4, currentY + 4.2);
  currentY += 8;

  if (report.xpPlan.days90 && report.xpPlan.days90.length > 0) {
    report.xpPlan.days90.forEach((task) => {
      const lines = doc.splitTextToSize("•  " + task, textWidth - 4);
      const taskH = lines.length * 3.8 + 1;
      checkSpace(taskH);
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(colors.dark[0], colors.dark[1], colors.dark[2]);
      doc.text(lines, marginX + 2, currentY);
      currentY += taskH;
    });
  }

  // Save pdf
  doc.save(`SkillIssue_AI_Career_Report_${report.candidateName.replace(/\s+/g, "_")}.pdf`);
}
