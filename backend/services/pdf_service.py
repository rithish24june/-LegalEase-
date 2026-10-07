import io
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            super().showPage()
        super().save()

    def draw_page_number(self, page_count):
        self.saveState()
        self.setFont("Times-Roman", 9)
        self.setFillColor(colors.HexColor("#666666"))
        
        # Header
        self.drawString(54, 750, "LegalEase AI Document Platform")
        self.setStrokeColor(colors.HexColor("#DDDDDD"))
        self.setLineWidth(0.5)
        self.line(54, 742, 558, 742)

        # Footer
        self.line(54, 45, 558, 45)
        page_text = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(558, 30, page_text)
        self.drawString(54, 30, "CONFIDENTIAL & LEGAL BINDING AGREEMENT")
        self.restoreState()

def generate_pdf(doc_item: dict) -> bytes:
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(
        buffer,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=64,
        bottomMargin=64
    )

    styles = getSampleStyleSheet()
    
    # Custom Legal Typography Styles
    title_style = ParagraphStyle(
        'LegalTitle',
        parent=styles['Heading1'],
        fontName='Times-Bold',
        fontSize=16,
        leading=20,
        alignment=1, # Center
        textColor=colors.HexColor('#111827'),
        spaceAfter=18
    )

    company_header_style = ParagraphStyle(
        'CompanyHeader',
        fontName='Times-Bold',
        fontSize=10,
        leading=12,
        alignment=2, # Right
        textColor=colors.HexColor('#4B5563'),
        spaceAfter=10
    )

    section_heading_style = ParagraphStyle(
        'LegalHeading',
        fontName='Times-Bold',
        fontSize=12,
        leading=16,
        textColor=colors.HexColor('#1E293B'),
        spaceBefore=12,
        spaceAfter=6,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'LegalBody',
        fontName='Times-Roman',
        fontSize=10.5,
        leading=15,
        textColor=colors.HexColor('#1F2937'),
        spaceBefore=4,
        spaceAfter=6,
        alignment=4 # Justified
    )

    subclause_style = ParagraphStyle(
        'LegalSubclause',
        fontName='Times-Roman',
        fontSize=10,
        leading=14,
        leftIndent=20,
        textColor=colors.HexColor('#374151'),
        spaceBefore=2,
        spaceAfter=4
    )

    disclaimer_style = ParagraphStyle(
        'LegalDisclaimer',
        fontName='Times-Italic',
        fontSize=8.5,
        leading=11,
        textColor=colors.HexColor('#6B7280'),
        alignment=1,
        spaceBefore=20
    )

    story = []

    branding = doc_item.get("branding") or {}
    company_name = branding.get("company_name", "")
    title = doc_item.get("title", "LEGAL AGREEMENT")
    content = doc_item.get("content", "")

    if company_name:
        story.append(Paragraph(company_name.upper(), company_header_style))
        story.append(Spacer(1, 6))

    story.append(Paragraph(title.upper(), title_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#2563EB'), spaceAfter=15))

    lines = content.split('\n')
    for line in lines:
        line_str = line.strip()
        if not line_str:
            continue

        if line_str.startswith("DISCLAIMER:"):
            story.append(Spacer(1, 10))
            story.append(Paragraph(line_str, disclaimer_style))
        elif line_str.startswith("1.") or line_str.startswith("2.") or line_str.startswith("3.") or \
             line_str.startswith("4.") or line_str.startswith("5.") or line_str.startswith("6.") or \
             line_str.startswith("7.") or line_str.startswith("8.") or \
             (line_str.isupper() and len(line_str) < 60 and not line_str.startswith("THIS")):
            story.append(Paragraph(line_str, section_heading_style))
        elif line_str.startswith("a)") or line_str.startswith("b)") or line_str.startswith("c)") or line_str.startswith("-"):
            story.append(Paragraph(line_str, subclause_style))
        else:
            # Escape HTML characters for ReportLab Paragraph
            safe_text = line_str.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
            story.append(Paragraph(safe_text, body_style))

    doc.build(story, canvasmaker=NumberedCanvas)
    buffer.seek(0)
    return buffer.getvalue()
