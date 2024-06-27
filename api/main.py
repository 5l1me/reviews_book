from fastapi import FastAPI, HTTPException
from database import select_reviews_book, insert_review
from model import Review
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/reviews/{book_id}")
async def get_reviews(book_id: int):
    try:
        reviews = await select_reviews_book(book_id)
        result = []
        for row in reviews:
            result.append({"user_name": row[0], "review": row[1]})
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/")
async def post_review(review_request: Review):
    try:
        await insert_review(review_request)
        return {"message": "Review inserted successfully."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
