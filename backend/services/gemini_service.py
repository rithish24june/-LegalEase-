import os
import datetime
from config import settings

class GeminiLegalService:
    def __init__(self):
        self.api_key = settings.GEMINI_API_KEY
        self.client_available = False
        if self.api_key and self.api_key.strip() and self.api_key != "your_gemini_api_key_here":
            try:
                import google.generativeai as genai
                genai.configure(api_key=self.api_key)
                self.genai = genai
                self.model = genai.GenerativeModel("gemini-1.5-flash")
                self.client_available = True
            except Exception as e:
                print(f"Failed to initialize Gemini API: {e}")
                self.client_available = False

    def generate_document(self, req_data: dict) -> dict:
        doc_type = req_data.get("document_type", "General Agreement")
        party1_name = req_data.get("party1_name") or "Party A"
        party1_role = req_data.get("party1_role") or "First Party"
        party2_name = req_data.get("party2_name") or "Party B"
        party2_role = req_data.get("party2_role") or "Second Party"
        terms = req_data.get("terms", "")
        effective_date = req_data.get("effective_date") or datetime.date.today().strftime("%B %d, %Y")
        jurisdiction = req_data.get("jurisdiction") or "State of New York, USA"
        branding = req_data.get("branding") or {}
        company_name = branding.get("company_name") or party1_name

        prompt = f"""
You are an expert AI legal document generator. Create a comprehensive, formal, and professionally formatted legal document for the following details:

Document Type: {doc_type}
Party 1 Name: {party1_name} ({party1_role})
Party 2 Name: {party2_name} ({party2_role})
Effective Date: {effective_date}
Governing Jurisdiction: {jurisdiction}
Custom Terms & Conditions to incorporate:
{terms}

Requirements:
1. Provide a professional, capitalized title.
2. Include an introductory preamble establishing the effective date and full details of Party 1 and Party 2.
3. Structure clear, numbered sections/clauses (e.g. 1. PURPOSE, 2. OBLIGATIONS, 3. PAYMENT & TERMS, 4. CONFIDENTIALITY, 5. TERM AND TERMINATION, 6. GOVERNING LAW & DISPUTE RESOLUTION).
4. Seamlessly integrate all specified custom terms into the clauses as formal legal bullet points or sub-clauses.
5. End with a formal signature block for both parties including lines for signature, printed name, title, and date.
6. Do not include markdown code block backticks (` ``` ` or ` ```markdown `). Return pure, clean text layout.
7. Include the following disclaimer at the very bottom: "DISCLAIMER: This document was generated using LegalEase AI for informational and drafting purposes. Review with qualified legal counsel before execution."
"""

        is_mock = True
        generated_content = ""

        if self.client_available:
            try:
                response = self.model.generate_content(prompt)
                if response and response.text:
                    generated_content = response.text.replace("```markdown", "").replace("```", "").strip()
                    is_mock = False
            except Exception as e:
                print(f"Gemini API call failed, using intelligent mock fallback: {e}")

        if not generated_content:
            generated_content = self._generate_fallback(
                doc_type, party1_name, party1_role, party2_name, party2_role,
                terms, effective_date, jurisdiction, company_name
            )

        title = f"{doc_type} - {party1_name} & {party2_name}"

        return {
            "title": title,
            "document_type": doc_type,
            "content": generated_content,
            "is_mock": is_mock
        }

    def _generate_fallback(self, doc_type, p1_name, p1_role, p2_name, p2_role, terms, effective_date, jurisdiction, company_name):
        # Format terms into clauses
        formatted_terms = ""
        if terms and terms.strip():
            raw_clauses = [t.strip() for t in terms.replace(";", "\n").split("\n") if t.strip()]
            formatted_terms = "\n".join([f"   a) {clause}" for clause in raw_clauses])
        else:
            formatted_terms = "   a) Standard mutual covenants and statutory obligations apply as agreed by both parties."

        doc_upper = doc_type.upper()

        return f"""{doc_upper}

THIS AGREEMENT ("Agreement") is made and entered into as of {effective_date} ("Effective Date"), by and between:

FIRST PARTY: {p1_name}, acting in the capacity of {p1_role} ("{p1_role}"); and
SECOND PARTY: {p2_name}, acting in the capacity of {p2_role} ("{p2_role}").

WHEREAS, the parties desire to establish formal legal terms regarding {doc_type.lower()} under the jurisdiction of {jurisdiction}.

NOW, THEREFORE, in consideration of the mutual promises, covenants, and conditions contained herein, the parties agree as follows:

1. PURPOSE & SCOPE OF AGREEMENT
1.1 The purpose of this {doc_type} is to formalize the operational and legal relationship between {p1_name} and {p2_name}.
1.2 Both parties agree to execute their obligations with due diligence, good faith, and full compliance with governing regulations.

2. SPECIFIC TERMS & CONDITIONS
2.1 The following custom clauses and operational requirements are hereby incorporated into this Agreement:
{formatted_terms}

3. CONFIDENTIALITY & PROPRIETARY INFORMATION
3.1 Each party agrees that any proprietary, financial, technical, or trade secret information disclosed during the term of this Agreement shall remain strictly confidential.
3.2 Neither party shall disclose such information to any third party without prior written consent, except as required by law.

4. TERM AND TERMINATION
4.1 This Agreement commences on the Effective Date ({effective_date}) and shall remain in full force until terminated by either party upon thirty (30) days written notice.
4.2 Immediate termination may occur in the event of a material breach by either party that remains uncured after fourteen (14) days written notice.

5. GOVERNING LAW & JURISDICTION
5.1 This Agreement shall be governed by, construed, and enforced in accordance with the laws of {jurisdiction}.
5.2 Any dispute arising out of or relating to this Agreement shall be resolved through good-faith negotiation, followed by binding arbitration if unresolved within 30 days.

6. SEVERABILITY & MISCELLANEOUS
6.1 If any provision of this Agreement is held to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
6.2 This document constitutes the entire agreement between the parties with respect to the subject matter hereof.

IN WITNESS WHEREOF, the parties hereto have executed this {doc_type} as of the Effective Date written above.


__________________________________________          __________________________________________
Signature of {p1_role}                              Signature of {p2_role}
Name: {p1_name}                                    Name: {p2_name}
Title: Authorized Representative                    Title: Authorized Representative
Date: {effective_date}                             Date: {effective_date}


----------------------------------------------------------------------------------------------------
DISCLAIMER: This document was generated using LegalEase AI for informational and drafting purposes. Review with qualified legal counsel before execution."""

gemini_service = GeminiLegalService()
