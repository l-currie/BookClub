import { Note } from "@/types";
import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

export async function POST(req: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const note: Note = await req.json();

    if (
      !note.userId ||
      !note.bookId ||
      !note.bookTitle ||
      !note.creationDate ||
      !note.noteTitle ||
      !note.noteText
    ) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const response = await sql`
        INSERT INTO NOTES (
            userId,
            bookId,
            bookTitle,
            creationDate,
            noteTitle,
            noteText
        )
        VALUES (
            ${note.userId},
            ${note.bookId},
            ${note.bookTitle},
            ${note.creationDate},
            ${note.noteTitle},
            ${note.noteText}
            )
        `;

    return new Response(JSON.stringify({ data: response }), { status: 201 });
  } catch (err) {
    console.log(err);
    return Response.json({ erorr: err }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const note: Note = await req.json();

    if (!note.id || !note.noteTitle || !note.noteText) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const response = await sql`
        UPDATE NOTES
        SET noteTitle = ${note.noteTitle}, noteText = ${note.noteText}
        WHERE id = ${note.id}
        `;

    return new Response(JSON.stringify({ data: response }), { status: 201 });
  } catch (err) {
    console.log(err);
    return Response.json({ erorr: err }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const { id } = await req.json();

    console.log(id);
    if (!id) {
      return Response.json({ error: "Missing id" }, { status: 400 });
    }

    const response = await sql`
    DELETE FROM NOTES
    WHERE id = ${id}
    `;

    return Response.json({ status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ erorr: err }, { status: 500 });
  }
}
