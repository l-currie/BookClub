import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";

export async function POST(req: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const { username, email, clerkId } = await req.json();

    if (!username || !email || !clerkId) {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const response = await sql`
    INSERT INTO USERS (
        clerkId,
        email,
        username
    )
    VALUES (
    ${clerkId},
    ${email},
    ${username}
    )
  `;

    return new Response(JSON.stringify({ data: response }), { status: 201 });
  } catch (err) {
    console.log(err);
    return Response.json({ erorr: err }, { status: 500 });
  }
}