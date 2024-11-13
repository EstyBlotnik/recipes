"use client"
import React, { useState, useContext } from 'react';
import {RecipeContext} from "@/app/components/RecipesGrid"
import { RecipeType } from '../types/irecipe';

const Star = () => {

  const recipe:RecipeType|null = useContext(RecipeContext);
  if(recipe === null) return <></>

  const [isFavorite, setIsFavorite] = useState(recipe.favorite);

  const toggleFavorite = () => {
    setIsFavorite((prev) => !prev);
    // API, if sucsses toggele
    console.log(recipe._id)
  };

  return (
    <button onClick={toggleFavorite} className="focus:outline-none">
      <svg
        className={`w-6 h-6 ms-1 ${isFavorite ? 'text-yellow-300' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 22 20"
      >
        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
      </svg>
    </button>
  );
};

export default Star;