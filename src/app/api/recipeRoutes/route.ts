import { NextResponse } from "next/server";
import connect from "@/app/lib/db/mongoDB";
import Recipe from "@/app/lib/models/recipe";

// export const arrCategory=['other','breakfast']- צריך להיות מערך כאן ולמחוק מהtypes

export async function GET() {
  try {
    await connect();
    const recipes = await Recipe.find({}); 
    return NextResponse.json({ message: "success", data: recipes });
  } catch (error: unknown) { 
    console.error("Error fetching recipes:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Error fetching recipes", error: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { message: "Error fetching recipes", error: "Unknown error occurred" },
        { status: 500 }
      );
    }
  }
}

//dd