import datetime
from fastapi import APIRouter, HTTPException
from typing import List, Optional
from models import DocumentItem, UpdateDocumentRequest
from database import db

router = APIRouter(prefix="/documents", tags=["documents"])

@router.get("", response_model=List[DocumentItem])
async def list_documents():
    return db.list_all()

@router.get("/{doc_id}", response_model=DocumentItem)
async def get_document(doc_id: str):
    doc = db.get_by_id(doc_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    return doc

@router.put("/{doc_id}", response_model=DocumentItem)
async def update_document(doc_id: str, req: UpdateDocumentRequest):
    doc = db.get_by_id(doc_id)
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found")
    
    update_data = req.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
    
    updated_doc = db.update(doc_id, update_data)
    return updated_doc

@router.delete("/{doc_id}")
async def delete_document(doc_id: str):
    success = db.delete(doc_id)
    if not success:
        raise HTTPException(status_code=404, detail="Document not found")
    return {"success": True, "message": "Document deleted successfully"}
