import { RecipeTypeWithId } from './irecipe'

export interface RecipesProps {
    arrayRecipes: RecipeTypeWithId[];
}

export interface PopUpProps {
    recipe: RecipeTypeWithId;
    onClose: () => void;
}

export interface NavbarProps {
    onSearchChange: (value: string) => void;
    onCategoryChange: (value: string) => void;
    onFavoriteToggle: (isFavorite: boolean) => void;
}
  
export interface ImageResizerProps {
    imageUrl: string;
    width:number
  }