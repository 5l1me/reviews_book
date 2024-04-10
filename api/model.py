from pydantic import BaseModel


class Review(BaseModel):
    user_name: str
    review: str
    book_id: int
