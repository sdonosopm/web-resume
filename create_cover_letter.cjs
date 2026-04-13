const { Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle } = require('docx');
const fs = require('fs');

// Get current date in US format
const today = new Date();
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'];
const dateStr = `${monthNames[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`;

// Helper: body paragraph
const bodyPara = (text) => new Paragraph({
  spacing: { after: 200, line: 276 }, // ~1.15 line spacing
  alignment: AlignmentType.JUSTIFIED,
  children: [new TextRun({ text, size: 22, font: 'Calibri' })], // 11pt
});

// Helper: header line
const headerLine = (text, bold = false, size = 22, alignment = AlignmentType.LEFT) => new Paragraph({
  alignment,
  spacing: { after: 0 },
  children: [new TextRun({ text, bold, size, font: 'Calibri' })],
});

// Rich body paragraph with mixed runs
const richPara = (runs) => new Paragraph({
  spacing: { after: 200, line: 276 },
  alignment: AlignmentType.JUSTIFIED,
  children: runs.map(r => new TextRun({
    text: r.text,
    bold: r.bold || false,
    size: 22,
    font: 'Calibri',
  })),
});

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: 'Calibri', size: 22 }, // 11pt
      },
    },
  },
  sections: [{
    properties: {
      page: {
        size: {
          width: 12240,   // 8.5 inches - US Letter
          height: 15840,  // 11 inches
        },
        margin: {
          top: 1440,    // 1 inch
          right: 1440,
          bottom: 1440,
          left: 1440,
        },
      },
    },
    children: [
      // Header: Name
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 60 },
        children: [new TextRun({ text: 'SEBASTIÁN DONOSO', bold: true, size: 32, font: 'Calibri' })],
      }),
      // Header: Contact info
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: { after: 60 },
        children: [new TextRun({
          text: 'Santiago, Chile  |  +569 7620 3147  |  sdonosopm@gmail.com  |  linkedin.com/in/sebastian-donoso',
          size: 20,
          font: 'Calibri',
        })],
      }),
      // Horizontal rule (via bottom border on empty paragraph)
      new Paragraph({
        spacing: { after: 300 },
        border: {
          bottom: { style: BorderStyle.SINGLE, size: 6, color: '000000', space: 1 },
        },
        children: [],
      }),

      // Date
      headerLine(dateStr),
      new Paragraph({ spacing: { after: 240 }, children: [] }),

      // Employer address
      headerLine('Hiring Manager'),
      headerLine('Private Wealth Management'),
      headerLine('Goldman Sachs'),
      headerLine('Miami, FL'),
      new Paragraph({ spacing: { after: 240 }, children: [] }),

      // Subject line (optional but professional)
      new Paragraph({
        spacing: { after: 240 },
        children: [new TextRun({
          text: 'Re: Business Development Professional, Associate — Asset & Wealth Management, Miami',
          bold: true,
          size: 22,
          font: 'Calibri',
        })],
      }),

      // Salutation
      headerLine('Dear Hiring Manager,'),
      new Paragraph({ spacing: { after: 200 }, children: [] }),

      // Paragraph 1: Opening hook
      bodyPara(
        'I am writing to express my strong interest in the Business Development Professional, Associate role within Goldman Sachs\u2019 Private Wealth Management team in Miami. With over eight years of experience serving ultra-high-net-worth clients across Latin America\u2019s leading financial institutions, native Spanish fluency, and a proven record in both portfolio performance and business development, I am confident I would bring immediate value to your Private Wealth Advisors and their clients.'
      ),

      // Paragraph 2: Recent experience - quantified
      richPara([
        { text: 'As a ' },
        { text: 'Senior Portfolio Analyst at BCI \u2013 City National Bank of Florida', bold: true },
        { text: ', I co-lead portfolio construction, rebalancing, and optimization for a global multi-asset strategy that delivered a ' },
        { text: 'total return of 24.3% in 2025 \u2014 outperforming the S&P 500 by 640 basis points', bold: true },
        { text: '. I designed a quantitative fixed-income model to rank sectors and authored over 40 high-value investment proposals last year, working directly with clients and internal teams to translate complex market views into actionable advice. Previously, at ' },
        { text: 'Moneda Patria Investments (NASDAQ: PAX)', bold: true },
        { text: ', I served as the primary point of contact for J.P. Morgan and UBS global counterparts, managing over USD $50M within a broader $2BN platform and sitting on the investment committee for multi-asset product approval.' },
      ]),

      // Paragraph 3: Commercial acumen - the differentiator
      richPara([
        { text: 'What distinguishes my profile is the blend of ' },
        { text: 'commercial acumen with deep investment expertise', bold: true },
        { text: '. Earlier in my career, as a Private Banker at LarrainVial and EuroAmerica, I built and nurtured UHNW relationships that contributed ' },
        { text: 'USD $70M in AUM growth', bold: true },
        { text: ' \u2014 always grounded in trust, personalized advice, and long-term partnership. I am a natural relationship builder: clients value my ability to simplify complexity, anticipate their needs, and remain present through every market cycle. This client-first mindset also shapes how I leverage technology \u2014 I have built internal reporting and rebalancing tools that reduced execution time by 50\u201370%, and I am actively developing AI-driven wealth management platforms, reflecting my conviction that artificial intelligence will reshape the future of UHNW advisory.' },
      ]),

      // Paragraph 4: Why Goldman + qualifications
      richPara([
        { text: 'Goldman Sachs\u2019 Private Wealth franchise represents the pinnacle of the industry, and the Miami platform \u2014 serving Latin American families with a global mindset \u2014 is precisely where I can contribute most. My U.S. residency process is underway; I hold a ' },
        { text: 'Python Certificate from the University of Pennsylvania', bold: true },
        { text: ' and Bloomberg ESG certification; and I am fully committed to obtaining the SIE, Series 3, 7, and 63 licenses within the required timeframe, as well as pursuing the CFA Charter.' },
      ]),

      // Paragraph 5: Closing
      bodyPara(
        'I would welcome the opportunity to discuss how my experience, commercial instincts, and passion for serving UHNW clients can contribute to Goldman Sachs\u2019 continued success. Thank you very much for your consideration.'
      ),

      // Sign-off
      new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: 'Sincerely,', size: 22, font: 'Calibri' })] }),
      new Paragraph({ spacing: { after: 0 }, children: [] }),
      new Paragraph({ spacing: { after: 0 }, children: [new TextRun({ text: 'Sebastián Donoso', bold: true, size: 22, font: 'Calibri' })] }),
    ],
  }],
});

Packer.toBuffer(doc).then(buffer => {
  const outPath = '/Users/sdonosopm/Documents/Web Curricular/Sebastian_Donoso_Cover_Letter_Goldman_Sachs_PWM.docx';
  fs.writeFileSync(outPath, buffer);
  console.log('Cover letter created: ' + outPath);
  console.log('Size: ' + buffer.length + ' bytes');
});
