from fastapi import APIRouter, HTTPException, Response
from fastapi.responses import Response
from database import db
from services.txt_service import generate_txt
from services.docx_service import generate_docx
from services.pdf_service import generate_pdf
from pydantic import BaseModel
from typing import Optional, Dict, Any

router = APIRouter(tags=["export"])

class DownloadPayload(BaseModel):
    title: str = "Legal Document"
    document_type: str = "General Agreement"
    content: str
    branding: Optional[Dict[str, Any]] = None

@router.post("/documents/{doc_id}/download/txt")
async def download_doc_txt(doc_id: str):
    doc = db.get_by_id(doc_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    txt_content = generate_txt(doc)
    filename = f"{doc.get('title', 'document').lower().replace(' ', '_')}.txt"
    return Response(
        content=txt_content,
        media_type="text/plain; charset=utf-8",
        headers={"Content-Disposition": f"attachment; filename=\"{filename}\""}
    )

@router.post("/documents/{doc_id}/download/docx")
async def download_doc_docx(doc_id: str):
    doc = db.get_by_id(doc_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    docx_bytes = generate_docx(doc)
    filename = f"{doc.get('title', 'document').lower().replace(' ', '_')}.docx"
    return Response(
        content=docx_bytes,
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        headers={"Content-Disposition": f"attachment; filename=\"{filename}\""}
    )

@router.post("/documents/{doc_id}/download/pdf")
async def download_doc_pdf(doc_id: str):
    doc = db.get_by_id(doc_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    pdf_bytes = generate_pdf(doc)
    filename = f"{doc.get('title', 'document').lower().replace(' ', '_')}.pdf"
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename=\"{filename}\""}
    )

# Direct payload export endpoints
@router.post("/download/txt")
async def download_payload_txt(payload: DownloadPayload):
    txt_content = generate_txt(payload.dict())
    filename = f"{payload.title.lower().replace(' ', '_')}.txt"
    return Response(
        content=txt_content,
        media_type="text/plain; charset=utf-8",
        headers={"Content-Disposition": f"attachment; filename=\"{filename}\""}
    )

@router.post("/download/docx")
async def download_payload_docx(payload: DownloadPayload):
    docx_bytes = generate_docx(payload.dict())
    filename = f"{payload.title.lower().replace(' ', '_')}.docx"
    return Response(
        content=docx_bytes,
        media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        headers={"Content-Disposition": f"attachment; filename=\"{filename}\""}
    )

@router.post("/download/pdf")
async def download_payload_pdf(payload: DownloadPayload):
    pdf_bytes = generate_pdf(payload.dict())
    filename = f"{payload.title.lower().replace(' ', '_')}.pdf"
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={"Content-Disposition": f"attachment; filename=\"{filename}\""}
    )
