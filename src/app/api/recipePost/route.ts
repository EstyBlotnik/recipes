import connect from "@/app/lib/db/mongoDB";
import Recipe from "@/app/lib/models/recipe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connect();
        const { name, category, img, ingredients, instructions } = await request.json();
        console.log(name,category,img)
        const newRecipe = new Recipe({  name, category, img, ingredients, instructions,favorite:false })
        await newRecipe.save();
        return NextResponse.json({
            message: "recipe added sucssesfully!",
            recipe: newRecipe,
            status: 201
        });
    } catch (error) {
        console.error(error)
        return NextResponse.json({
            massege: "Error",
            status: 400
        })
    }
}