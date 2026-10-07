import json
import os

DB_FILE = os.path.join(os.path.dirname(__file__), "documents_db.json")

class DocumentDB:
    def __init__(self):
        self._documents = {}
        self._load()
        if not self._documents:
            self._seed_sample_data()

    def _load(self):
        if os.path.exists(DB_FILE):
            try:
                with open(DB_FILE, "r", encoding="utf-8") as f:
                    self._documents = json.load(f)
            except Exception as e:
                print(f"Error loading DB: {e}")
                self._documents = {}

    def _save(self):
        try:
            with open(DB_FILE, "w", encoding="utf-8") as f:
                json.dump(self._documents, f, indent=2, ensure_ascii=False)
        except Exception as e:
            print(f"Error saving DB: {e}")

    def _seed_sample_data(self):
        sample_doc_1 = {
            "id": "doc-nda-001",
            "title": "Mutual Non-Disclosure Agreement",
            "document_type": "NDA / Non-Disclosure Agreement",
            "status": "Completed",
            "created_at": "2026-10-01 10:30",
            "updated_at": "2026-10-01 10:30",
            "effective_date": "2026-10-01",
            "jurisdiction": "State of New York, USA",
            "parties": {
                "party1_name": "Apex Innovations Inc.",
                "party1_role": "Disclosing Party",
                "party2_name": "Vanguard Solutions LLC",
                "party2_role": "Receiving Party"
            },
            "terms": "Confidential info must be kept secret for 3 years; Standard exclusions apply; Injunctive relief permitted.",
            "branding": {
                "company_name": "Apex Innovations",
                "company_address": "100 Tech Plaza, New York, NY",
                "footer_text": "Confidential & Proprietary - Apex Innovations"
            },
            "content": """MUTUAL NON-DISCLOSURE AGREEMENT

This Mutual Non-Disclosure Agreement ("Agreement") is entered into as of October 01, 2026 ("Effective Date"), by and between:

Party 1: Apex Innovations Inc. ("Disclosing Party")
Party 2: Vanguard Solutions LLC ("Receiving Party")

1. PURPOSE OF DISCLOSURE
The Parties wish to explore a potential business relationship ("Purpose") and in connection with this Purpose, each party may disclose to the other certain confidential technical and business information.

2. DEFINITION OF CONFIDENTIAL INFORMATION
"Confidential Information" means all information disclosed by a Party ("Disclosing Party") to the other Party ("Receiving Party"), whether orally or in writing, that is designated as confidential or that reasonably should be understood to be confidential given the nature of the information and the circumstances of disclosure.

3. OBLIGATIONS OF RECEIVING PARTY
The Receiving Party agrees:
a) To hold Confidential Information in strict confidence and use at least the same degree of care it uses to protect its own confidential information.
b) Not to disclose Confidential Information to any third party without prior written consent.
c) To use Confidential Information solely for the Purpose described herein.

4. TERM AND TERMINATION
This Agreement shall remain in effect for a period of three (3) years from the Effective Date.

5. GOVERNING LAW
This Agreement shall be governed by and construed in accordance with the laws of the State of New York, USA, without regard to its conflict of law principles.

IN WITNESS WHEREOF, the parties hereto have executed this Mutual Non-Disclosure Agreement as of the Effective Date.

____________________________________          ____________________________________
Apex Innovations Inc.                         Vanguard Solutions LLC
Authorized Signature                          Authorized Signature"""
        }

        sample_doc_2 = {
            "id": "doc-emp-002",
            "title": "Senior Software Engineer Employment Contract",
            "document_type": "Employment Contract",
            "status": "Completed",
            "created_at": "2026-10-04 14:15",
            "updated_at": "2026-10-05 09:20",
            "effective_date": "2026-10-15",
            "jurisdiction": "State of California, USA",
            "parties": {
                "party1_name": "LegalEase Tech Inc.",
                "party1_role": "Employer",
                "party2_name": "Alex Mercer",
                "party2_role": "Employee"
            },
            "terms": "Annual salary $160,000; Health benefits & 401(k); At-will employment; 15 days paid time off.",
            "branding": {
                "company_name": "LegalEase Tech Inc.",
                "company_address": "500 Market St, San Francisco, CA",
                "footer_text": "LegalEase Tech Inc. - Employment Document"
            },
            "content": """EMPLOYMENT CONTRACT

This Employment Contract ("Agreement") is made effective as of October 15, 2026, by and between:

Employer: LegalEase Tech Inc. ("Company")
Employee: Alex Mercer ("Employee")

1. POSITION AND DUTIES
The Employer agrees to employ the Employee in the position of Senior Software Engineer. The Employee agrees to perform duties consistent with this role with professionalism and care.

2. COMPENSATION AND BENEFITS
a) Base Salary: The Employer shall pay Employee a gross annual base salary of $160,000, payable in accordance with regular payroll practices.
b) Benefits: The Employee shall be eligible to participate in health insurance and retirement plans provided by the Employer.
c) Paid Time Off: The Employee is entitled to 15 days of accrued paid time off per calendar year.

3. CONFIDENTIALITY AND PROPRIETARY RIGHTS
Employee agrees that all IP created during employment belongs exclusively to Employer and agrees not to disclose proprietary trade secrets.

4. AT-WILL EMPLOYMENT
Employment with the Company is on an "at-will" basis, meaning either party may terminate employment at any time with 14 days written notice.

5. GOVERNING LAW
This Agreement shall be governed by the laws of the State of California, USA.

IN WITNESS WHEREOF, the parties have executed this Agreement as of the Effective Date.

____________________________________          ____________________________________
LegalEase Tech Inc.                           Alex Mercer
Authorized Representative                      Employee Signature"""
        }

        self._documents[sample_doc_1["id"]] = sample_doc_1
        self._documents[sample_doc_2["id"]] = sample_doc_2
        self._save()

    def list_all(self):
        return sorted(list(self._documents.values()), key=lambda x: x.get("created_at", ""), reverse=True)

    def get_by_id(self, doc_id: str):
        return self._documents.get(doc_id)

    def create(self, doc_data: dict):
        self._documents[doc_data["id"]] = doc_data
        self._save()
        return doc_data

    def update(self, doc_id: str, update_fields: dict):
        if doc_id in self._documents:
            self._documents[doc_id].update({k: v for k, v in update_fields.items() if v is not None})
            self._save()
            return self._documents[doc_id]
        return None

    def delete(self, doc_id: str):
        if doc_id in self._documents:
            del self._documents[doc_id]
            self._save()
            return True
        return False

db = DocumentDB()
