'use client'
import RecipesGrid from "./components/RecipesGrid";
import Header from "./components/Header";
import React, { useState } from "react";
import { RecipeType } from "@/app/types/irecipe"; 
import { useFilteredRecipes, useCategories } from "@/app/services/recipeCrud";

 

export default function Home () {
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [favorite, setFavorite] = useState<boolean>(false);

  const { data, isLoading, isError, error } = useFilteredRecipes(search, category, favorite);
  const { data: categories, isLoading: isCategoriesLoading, isError: isCategoriesError, error: categoriesError } = useCategories(); 
  console.log(data,categories);
  

  if (isLoading || isCategoriesLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;
  if (isCategoriesError) return <div>Error fetching categories: {categoriesError?.message}</div>;

  // פונקציה לסינון המתכונים בצד הלקוח
  const filteredRecipes = data?.filter((recipe: RecipeType) => {
    let match = true;

    if (search && !recipe.name.toLowerCase().includes(search.toLowerCase())) {
      match = false;
    }

    if (category && recipe.category !== category) {
      match = false;
    }

    if (favorite !== undefined && recipe.favorite !== favorite) {
      match = false;
    }

    return match;
  }) || [];

  return (

    <div>
      <h1>Recipe List</h1>
      <div className=" m-5">
      <Header></Header>
      <RecipesGrid arrayRecipes={data}></RecipesGrid>
    </div >
      
      {/* טופס סינון */}
      {/* <div>
        <input
          type="text"
          placeholder="Search recipes"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select onChange={(e) => setCategory(e.target.value)} value={category}>
          <option value="">All Categories</option>
          {categories?.map((cat: string) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="checkbox"
          checked={favorite === true}
          onChange={() => setFavorite(favorite === true ? false : true)}
        />
        <label>Favorite</label>
      </div> */}
      
      {/* הצגת המתכונים */}
      {/* <ul>
        {filteredRecipes.map((recipe: RecipeType) => (
          <li key={recipe._id}>{recipe.name}</li>
        ))}
      </ul> */}
    </div>
  );
};



