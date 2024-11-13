'use client'
import RecipesGrid from "./components/RecipesGrid";
import Header from "./components/Header";
import React, { useState } from "react";
import { useFilteredRecipes, useCategories } from "@/app/services/recipeCrud";

export default function Home() {
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [favorite, setFavorite] = useState<boolean>(false);

  const { data, isLoading, isError, error } = useFilteredRecipes(search, category, favorite);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <div>
      <h1>Recipe List</h1>
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
