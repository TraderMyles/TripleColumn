from pydantic import BaseModel

class ThoughtRequest(BaseModel):
    thought: str

class ThoughtResponse(BaseModel):
    distortion: str
    response: str
    conclusion: str
