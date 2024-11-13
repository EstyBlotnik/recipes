"use client"

import { useContext } from 'react';
import { RecipeContext } from "@/app/components/RecipesGrid";
import { RecipeTypeWithId } from '../types/irecipe';

export const useRecipeContecst = (): RecipeTypeWithId => {
  const context = useContext(RecipeContext);

  if (!context) {
    throw new Error(" Must be used within a RecipeProvider");
  }

  return context; // context לא יכול להיות null עכשיו
};
