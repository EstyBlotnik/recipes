import mongoose, {Model,Schema} from "mongoose";
import Irecipe from '@/app/types/irecipe'

const RecipeSchema: Schema<Irecipe>=new Schema({
    name:{type: String, required:true},
    category:{type: String, required: true},
    img:{type: String, required: true},
    ingredients:{type:[String],required:true},
    instructions:{type:String,required:true},
    favorite:{type:Boolean,required:true},
})

const Recipe :Model<Irecipe> =mongoose.models.Recipe || mongoose.model<Irecipe>('Recipe',RecipeSchema)
 export default Recipe;