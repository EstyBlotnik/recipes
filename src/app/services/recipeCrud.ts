import axios from "axios";
import { RecipeType, RecipeTypeWithId } from "@/app/types/irecipe";

const apiUrl = "/api/";

export const fetchAllRecipes = async (): Promise<RecipeTypeWithId[]> => {
  try {
    const response = await axios.get(`${apiUrl}recipeRoutes`);
    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        `Error fetching recipes: ${
          error.response?.data?.message || error.message
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
    console.error("Error getting categories:", error);
    throw error;
  }
};

export const addarecipe = async (formData: RecipeType) => {
  try {
    const response = await axios.post(apiUrl, formData);
    return response.data;
  } catch (error) {
    console.error("Error adding recipe:", error);
    throw error;
  }
};

export const updateFavorite = async (id: string, favorite: boolean) => {
  try {
    const response = await axios.put(`${apiUrl}favorite/${id}`,{ favorite });
    console.log("Recipe updated successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error update favorite recipe:", error);
    throw error;
  }
};
