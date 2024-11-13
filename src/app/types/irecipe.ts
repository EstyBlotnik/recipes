import { Document } from "mongoose";
import { z } from 'zod';

export const arrCategory = ['other', 'breakfast']//למחוק את המערך של הקטגוריות מכאן, ורק לייבא מהשרת recipeRoutes

export const recipeSchemaZod = z.object({
    name: z.string().min(2, "Name must have at least 2 characters").max(25, 'Name too long, it must contain 50 chars the most'),
    category: z.string().min(2, "Category must have at least 2 characters").refine(val => arrCategory.includes(val), {
        message: `Category must be one of the following: ${arrCategory.join(", ")}`
    }),
    img: z.string().url("Invalid image URL"),
    ingredients: z.array(z.string()).nonempty("Ingredients must have at least one item"),
    instructions: z.string().min(2, "Instructions must have at least 2 characters").max(5000, 'Instructions too long, it must contain 5000 chars the most'),
    favorite: z.boolean(),
});

export default interface irecipe extends Document {
    name: string;
    category: string;
    img: string;
    ingredients: string[];
    instructions: string;
    favorite: boolean;
}
// export interface ITicket extends Document, TicketType {}

// מתכון TYPE 
export type RecipeType = z.infer<typeof recipeSchemaZod> 

export type RecipeTypeWithId = z.infer<typeof recipeSchemaZod> & {
    _id: string;
};

// שליחת מתכון בפרופס לקומפוננטה
export interface RecipesProps {
    recipesarray: RecipeType[];
}