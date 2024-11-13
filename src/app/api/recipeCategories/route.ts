
import { NextResponse } from "next/server";

const arrCategory=['other','breakfast']//למחוק את המערך של הקטגוריות מכאן, ורק לייבא מהשרת recipeRoutes

export async function GET() {
    try {
        return NextResponse.json({ message: "success", data: arrCategory });
    } 
    catch (error: unknown) { 
      console.error("Error fetching categories:", error);
  
      if (error instanceof Error) {
        return NextResponse.json(
          { message: "Error fetching categories", error: error.message },
          { status: 500 }
        );
      } else {
        return NextResponse.json(
          { message: "Error fetching categories", error: "Unknown error occurred" },
          { status: 500 }
        );
      }
    }
}
 