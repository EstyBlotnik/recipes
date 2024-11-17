import { useQuery } from "@tanstack/react-query";
import { RecipeTypeWithId } from "@/app/types/irecipe";
import { fetchAllRecipes } from "../services/recipeCrud";
import {getCategories} from '@/app/services/recipeCrud'



export const useRecipes = () => {
    return useQuery<RecipeTypeWithId[], Error>({
      queryKey: ["recipes"],
      queryFn: fetchAllRecipes, 
      // staleTime: 1000 * 60 * 60 * 24,
    });
  };
  export const useCategories = () => {
    return useQuery<string[], Error>({
      queryKey: ["categories"],
      queryFn: getCategories, 
      // staleTime: 1000 * 60 * 60 * 24,
    });
  };
  