import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
 
  const token = req.cookies.get("token"); // בגרסה זו יש גישה ישירה לעוגיות דרך req.cookies

  // אם יש token, מחזירים תשובה עם מידע מאובטח
  if (token) {
    return NextResponse.json({ message: "Protected data", token });
  } else {
    // אם אין token, מחזירים תשובה עם שגיאה
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (email === "user@example.com") {
    // יצירת token דינמי עם jwt
    const token = jwt.sign(
      { email }, // payload - אתה יכול לשים כל מידע שצריך כאן
      process.env.JWT_SECRET!, // סוד ליצירת ה-token
      { expiresIn: '1m' } // הגדרת תוקף
    );

    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      `token=${token}; path=/; secure; HttpOnly; SameSite=Strict`
    );

    // החזרת תשובה עם ה-token בעוגיה
    return NextResponse.json(
      { message: "Login successful", token },
      { headers }
    );
  } else {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }
}
