"use client"

import { RecipeTypeWithId } from "@/app/types/irecipe";
import { RecipesProps } from "@/app/types/props";
import RecipeCard from "@/app/components/RecipeCard"
import { createContext } from 'react';
import { usePageNumber } from "../hooks/useRecipeContects";

export const RecipeContext = createContext<RecipeTypeWithId | null>(null);

const ITEMS_IN_PAGE = 10;


export default function RecipeGrid({ arrayRecipes }: RecipesProps) {

  const { pageNumber, setPageNumber } = usePageNumber();
  const totalPages = Math.ceil(arrayRecipes.length / ITEMS_IN_PAGE);

  const pagePagination = () => {
    const indexBegins = ITEMS_IN_PAGE * (pageNumber - 1);
    return arrayRecipes.slice(indexBegins, indexBegins + ITEMS_IN_PAGE);
  }

  return (

    <div className="flex flex-col justify-center ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {pagePagination().map((recipe, index) => (
          <div key={index} className="cardwrap flex flex-col justify-between">

            <RecipeContext.Provider value={recipe}>
              <RecipeCard />
            </RecipeContext.Provider>
          </div>
        ))}
      </div>

      {/* Pagination  */}
      <div className="flex justify-end items-center mt-4 mr-4">
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold pt-1">{`${pageNumber} of ${totalPages}`}</span>
          <div className="flex gap-2 ">
            <button
              className={`text-2xl ${pageNumber === 1 ? 'text-gray-400 text-xl' : ''}`}
              onClick={() => setPageNumber(pageNumber - 1)}
              disabled={pageNumber === 1}
            >
              {"<"}
            </button>
            <button
              className={`text-2xl ${pageNumber === totalPages ? 'text-gray-400 text-xl' : ''}`}
              onClick={() => setPageNumber(pageNumber + 1)}
              disabled={pageNumber === totalPages}
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}