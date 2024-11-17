"use client"

import { createContext, useContext } from 'react';
import { RecipeContext } from "@/app/components/RecipesGrid";
import { RecipeTypeWithId } from '../types/irecipe';

// ההוק usePageNumber מספק גישה לערכים של מספר העמוד הנוכחי
//  ופונקציה לעדכונו מתוך PageNumberContext.
export const PageNumberContext = createContext<{
  pageNumber: number;
  setPageNumber: React.Dispatch<React.SetStateAction<number>>;
} | null>(null);

export const usePageNumber = () => {
  const context = useContext(PageNumberContext);
  if (!context) {
    throw new Error("usePageNumber must be used within a PageNumberProvider");
  }
  return context;
};


// ההוק useRecipeContecst מספק גישה למידע של מתכון בודד מתוך RecipeContext.
export const useRecipeContecst = (): RecipeTypeWithId => {
  const context = useContext(RecipeContext);

  if (!context) {
    throw new Error(" Must be used within a RecipeProvider");
  }

  return context;
};
