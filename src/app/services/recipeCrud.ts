"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useMemo } from "react";
import { RecipeType } from '@/app/types/irecipe';

const apiUrl = 'http://localhost:3000/api/';


export const fetchAllRecipes = async (): Promise<RecipeType[]> => {
  try {
    const response = await axios.get(`${apiUrl}recipeRoutes`);
    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Error fetching recipes: ${error.response?.data?.message || error.message
        }`
      );
    } else {
      throw new Error("An unexpected error occurred while fetching recipes.");
    }
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${apiUrl}categories`);
    return response.data;
  } catch (error) {
    console.error('Error getting categories:', error);
    throw error;
  }
}

// שימוש ב-React Query לשמירת הנתונים במטמון
export const useRecipes = () => {
  return useQuery<RecipeType[], Error>({
    queryKey: ["recipes"],
    queryFn: fetchAllRecipes, // פונקציית השליפה
    staleTime: 1000 * 60 * 60 * 24,
  });

};

export const useCategories = () => {
  return useQuery<string[], Error>({
    queryKey: ["categories"],
    queryFn: getCategories, // פונקציית השליפה
    staleTime: 1000 * 60 * 60 * 24,
  });

};

export const useFilteredRecipes = (search: string, category: string, favorite: boolean) => {
  const { data: recipes, isLoading, isError, error } = useRecipes();

  // סינון המתכונים לפי חיפש טקסט, קטגוריה ו-favorite
  const filteredRecipes = useMemo(() => {
    if (!recipes) return [];

    return recipes.filter((recipe) => {
      // סינון לפי חיפוש בטקסט
      const matchesSearch = search
        ? recipe.name.toLowerCase().includes(search.toLowerCase())
        : true;

      // סינון לפי קטגוריה
      const matchesCategory = category ? recipe.category === category : true;

      // סינון לפי האם הוא מועדף
      const matchesFavorite = favorite !== undefined ? recipe.favorite === favorite : true;

      return matchesSearch && matchesCategory && matchesFavorite;
    });
  }, [recipes, search, category, favorite]);

  return { data: filteredRecipes, isLoading, isError, error };
};

export const addarecipe = async (formData: RecipeType) => {
  try {
    const response = await axios.post(apiUrl, formData);
    return response.data;
  } catch (error) {
    console.error('Error adding recipe:', error);
    throw error;
  }
};

export default useRecipes;



