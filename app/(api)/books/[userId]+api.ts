import { mapToBookType } from "@/helpers/helpers";
import { neon } from "@neondatabase/serverless";

export async function GET(req: Request, { userId }: { userId: string }) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);

    if (!userId) {
      return Response.json({ error: "Missing userId" }, { status: 400 });
    }

    const response = await sql`
      SELECT * FROM BOOKS
      WHERE userid = ${userId}
      `;

    return new Response(JSON.stringify({ data: response }), { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ erorr: err }, { status: 500 });
  }
}
