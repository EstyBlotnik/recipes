import { NextRequest, NextResponse } from "next/server";
import { arrCategory } from "@/app/types/irecipe";
import connect from "@/app/lib/db/mongoDB";
import Recipe from "@/app/lib/models/recipe";

// export const arrCategory=['other','breakfast']- צריך להיות מערך כאן ולמחוק מהtypes

// interface Filter{
//   name?: { $regex: string; $options: string };
//   category?: typeof arrCategory[number];  
//   favorite?: boolean;
// }

// export async function GET(req: NextRequest) {
//   try {
//     await connect();

//     const search = req.nextUrl.searchParams.get("search");
//     const category = req.nextUrl.searchParams.get("category");
//     const favorite = req.nextUrl.searchParams.get("favorite");

//     const filter:Filter = {};

//     if (search) {
//       filter.name = { $regex: search, $options: "i" }; 
//     }

//     if (category && arrCategory.includes(category)) {
//       filter.category = category;
//     }

//     if (favorite) {
//       filter.favorite = favorite === "true";
//     }

//     const recipes = await Recipe.find(filter);

//     return NextResponse.json({ message: "success", data: recipes });
//   } catch (error: unknown) { 
//     console.error("Error fetching recipes:", error);

//     if (error instanceof Error) {
//       return NextResponse.json(
//         { message: "Error fetching recipes", error: error.message },
//         { status: 500 }
//       );
//     } else {
//       return NextResponse.json(
//         { message: "Error fetching recipes", error: "Unknown error occurred" },
//         { status: 500 }
//       );
//     }
//   }
// }



export async function GET(req: NextRequest) {
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

