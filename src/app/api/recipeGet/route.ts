import { NextRequest, NextResponse } from "next/server";
import { arrCategory } from "@/app/types/irecipe";
import connect from "@/app/lib/db/mongoDB";
import Recipe from "@/app/lib/models/recipe";

export async function GET(req: NextRequest) {
  try {
    await connect();

    const search = req.nextUrl.searchParams.get("search");
    const category = req.nextUrl.searchParams.get("category");
    const favorite = req.nextUrl.searchParams.get("favorite");

    const filter: any = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" }; 
    }

    if (category && arrCategory.includes(category)) {
      filter.category = category;
    }

    if (favorite) {
      filter.favorite = favorite === "true";
    }

    const recipes = await Recipe.find(filter);

    return NextResponse.json({ message: "success", data: recipes });
  } catch (error: any) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json(
      { message: "Error fetching recipes", error: error.message },
      { status: 500 }
    );
  }
}
