import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function GET(req: NextRequest) {
    const tokenCookie = req.cookies.get("token");

    // בודקים אם העוגיה קיימת וממירים אותה למחרוזת
    const token = tokenCookie?.value;

    if (token) {
        try {
            // מחלצים את המפתח הסודי
            const secret = process.env.JWT_SECRET;
            if (!secret) {
                // אם אין מפתח סודי, מחזירים שגיאה
                return NextResponse.json({ message: "Server configuration error: Missing secret" }, { status: 500 });
            }
            // מוודאים את תקינות ה-token
            const decoded = jwt.verify(token, secret);

            // אם ה-token תקין, מחזירים מידע מוגן
            return NextResponse.json({ message: "Protected data", user: decoded });
        } catch (error: unknown) {
            // מוודאים שהשגיאה היא אובייקט מסוג Error
            if (error instanceof Error) {
                return NextResponse.json({ message: "Invalid token", error: error.message }, { status: 401 });
            } else {
                // אם השגיאה לא הייתה מסוג Error, מחזירים שגיאה כללית
                return NextResponse.json({ message: "Unknown error", error: "An unknown error occurred" }, { status: 500 });
            }
        }

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
