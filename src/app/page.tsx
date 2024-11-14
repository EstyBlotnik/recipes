'use client'
import RecipesGrid from "./components/RecipesGrid";
import Header from "./components/Header";
import React, { useState } from "react";
import {useRecipes } from "@/app/hooks/useQuery";
import { useMemo } from "react";


const useFilteredRecipes = (
  search: string,
  category: string,
  favorite: boolean
) => {
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
      const matchesCategory = category
        ? recipe.category.toLowerCase() === category.toLowerCase()
        : true;
      // סינון לפי האם הוא מועדף
      const matchesFavorite =
        favorite !== false ? recipe.favorite === favorite : true;

      return matchesSearch && matchesCategory && matchesFavorite;
    });
  }, [recipes, search, category, favorite]);

  return { data: filteredRecipes, isLoading, isError, error };
};


export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [favorite, setFavorite] = useState<boolean>(false);

  const { data, isLoading, isError, error } = useFilteredRecipes(search, category, favorite);

  if (isLoading) return (<div className="flex flex-col items-center justify-center min-h-screen">
    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    <p className="mt-4 text-lg text-gray-700">
      Delicious recipes will be presented to you soon...🤤
    </p>
  </div> )
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div>
      <div className="text-5xl m-5">
      <Header
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onFavoriteToggle={() => setFavorite(!favorite)}
      />
        <RecipesGrid arrayRecipes={data} />
      </div>
    </div>
  );
};
