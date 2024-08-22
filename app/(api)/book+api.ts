import { Book } from "@/types";
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

export async function POST(req: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const book: Book = await req.json();

    console.log(book);

    if (
      !book.id ||
      !book.title ||
      !book.userId ||
      !book.author ||
      !book.numberOfPages ||
      !book.currentPage ||
      !book.startDate ||
      !book.currentlyReading
    ) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const response = await sql`
      INSERT INTO BOOKS (
      userId,
      title,
      author,
      numberOfPages,
      currentPage,
      startDate,
      finishDate,
      currentlyReading
      )
      VALUES (
      ${book.userId},
      ${book.title},
      ${book.author},
      ${book.numberOfPages},
      ${book.currentPage},
      ${book.startDate},
      ${book.finishDate},
      ${book.currentlyReading}
      )
      `;

    return new Response(JSON.stringify({ data: response }), { status: 201 });
  } catch (err) {
    console.log(err);
    return Response.json({ erorr: err }, { status: 500 });
  }
}
