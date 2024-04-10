from sqlalchemy import text
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
import asyncio

from config import settings
from model import Review

engine = create_async_engine(
    url=settings.DB_URL
)


async def select_reviews_book(book_id: int):
    async with engine.connect() as conn:
        s = text(
            """
            SELECT user_name, review
            FROM Reviews 
            WHERE book_id = :x
            """
        )
        res = await conn.execute(s, {'x': book_id})
        return res


async def insert_review(review: Review):
    async with engine.connect() as conn:
        s = text(
            """
            INSERT INTO Reviews (user_name, review, book_id)
            VALUES (:x, :y, :z)
            """
        )
        await conn.execute(s, {'x': review.user_name,
                               'y': review.review,
                               'z': review.book_id})
        await conn.commit()
