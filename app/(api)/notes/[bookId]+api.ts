import { neon } from "@neondatabase/serverless";

export async function GET(req: Request, { bookId }: { bookId: number }) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    console.log('here')

    if (!bookId) {
      return Response.json({ error: "Missing bookId" }, { status: 400 });
    }

    const response = await sql`
      SELECT * FROM NOTES
      WHERE bookid = ${bookId}
      `;

    return new Response(JSON.stringify({ data: response }), { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ erorr: err }, { status: 500 });
  }
}
