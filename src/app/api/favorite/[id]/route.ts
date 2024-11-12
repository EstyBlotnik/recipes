import connect from "@/app/lib/db/mongoDB";
import Recipe from "@/app/lib/models/recipe";
import { NextRequest, NextResponse } from "next/server";



export async function PUT(req: NextRequest, {params}: {params:{id:string}}) {
    try{
    await connect();
    const { id } = params;
    const {favorite} = await req.json();

    const updatedRecipe = await Recipe.findOneAndUpdate(
      { _id: id },
      { $set: {favorite} },
      { new: true, runValidators: true, overwrite: false }
    );

    if (!updatedRecipe)
      return NextResponse.json({ message: "Recipe not found", error: 'error in server: recipe not found', status: 404 });
    return NextResponse.json({message: "successfully updated",data: updatedRecipe, status: 200});
  } 
  catch (error: unknown) { 
    console.error("Error updating recipe:", error);

    if (error instanceof Error) {
      return NextResponse.json({ message: "Error updating recipe", error: error.message , status: 500 });
    } else {
      return NextResponse.json({ message: "Error updating recipe", error: "Unknown error occurred" , status: 500 });
    }
  }
}