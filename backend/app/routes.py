from fastapi import APIRouter
from app.services.openai_service import process_thought
from app.schemas import ThoughtRequest, ThoughtResponse

router = APIRouter()

@router.post("/process", response_model=ThoughtResponse)
def process(request: ThoughtRequest):
    return process_thought(request.thought)
