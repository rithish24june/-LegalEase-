from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any

class BrandingInfo(BaseModel):
    company_name: Optional[str] = ""
    company_address: Optional[str] = ""
    logo_url: Optional[str] = ""
    footer_text: Optional[str] = ""

class PartyInfo(BaseModel):
    party1_name: str = ""
    party1_role: str = ""
    party2_name: str = ""
    party2_role: str = ""
    additional_parties: Optional[List[Dict[str, str]]] = []

class GenerateDocumentRequest(BaseModel):
    document_type: str = Field(..., example="Employment Contract")
    party1_name: Optional[str] = ""
    party1_role: Optional[str] = ""
    party2_name: Optional[str] = ""
    party2_role: Optional[str] = ""
    parties: Optional[Dict[str, Any]] = None
    terms: str = Field("", example="Payment in 30 days. Non-compete for 1 year.")
    effective_date: str = Field("", example="2026-10-07")
    jurisdiction: Optional[str] = "State of New York, USA"
    branding: Optional[BrandingInfo] = Field(default_factory=BrandingInfo)

class DocumentItem(BaseModel):
    id: str
    title: str
    document_type: str
    content: str
    status: str = "Completed" # Draft, Completed, Archived
    effective_date: Optional[str] = ""
    jurisdiction: Optional[str] = ""
    parties: Optional[Dict[str, Any]] = {}
    terms: Optional[str] = ""
    branding: Optional[Dict[str, Any]] = {}
    created_at: str
    updated_at: str

class UpdateDocumentRequest(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    status: Optional[str] = None
    terms: Optional[str] = None
    branding: Optional[Dict[str, Any]] = None

class GenerateResponse(BaseModel):
    success: bool
    document_id: str
    document: str
    document_type: str
    title: str
    created_at: str
    is_mock: bool = False
