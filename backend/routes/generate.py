import uuid
import datetime
from fastapi import APIRouter, HTTPException
from models import GenerateDocumentRequest, GenerateResponse
from services.gemini_service import gemini_service
from database import db

router = APIRouter(tags=["generation"])

@router.post("/generate", response_model=GenerateResponse)
async def generate_document_endpoint(req: GenerateDocumentRequest):
    try:
        req_dict = req.dict()
        res = gemini_service.generate_document(req_dict)
        
        doc_id = f"doc-{str(uuid.uuid4())[:8]}"
        now_str = datetime.datetime.now().strftime("%Y-%m-%d %H:%M")
        
        doc_item = {
            "id": doc_id,
            "title": res["title"],
            "document_type": res["document_type"],
            "content": res["content"],
            "status": "Completed",
            "effective_date": req.effective_date,
            "jurisdiction": req.jurisdiction,
            "parties": {
                "party1_name": req.party1_name,
                "party1_role": req.party1_role,
                "party2_name": req.party2_name,
                "party2_role": req.party2_role
            },
            "terms": req.terms,
            "branding": req.branding.dict() if req.branding else {},
            "created_at": now_str,
            "updated_at": now_str
        }

        db.create(doc_item)

        return GenerateResponse(
            success=True,
            document_id=doc_id,
            document=res["content"],
            document_type=res["document_type"],
            title=res["title"],
            created_at=now_str,
            is_mock=res.get("is_mock", False)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Document generation failed: {str(e)}")
