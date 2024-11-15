"use client"

import { RecipeTypeWithId, RecipesProps } from "@/app/types/irecipe";
import RecipeCard from "@/app/components/RecipeCard"
import { createContext, useEffect, useState } from 'react';

export const RecipeContext = createContext<RecipeTypeWithId | null>(null);

const ITEMS_IN_PAGE = 10;

export default function RecipeGrid({arrayRecipes}:RecipesProps) {

 

  
  const [pageNumber, setPageNumber] = useState(1);
  const totalPages = Math.ceil(arrayRecipes.length / ITEMS_IN_PAGE);

  

  const pagePagination = () => {
    const indexBegins = ITEMS_IN_PAGE * (pageNumber -1);
    return arrayRecipes.slice(indexBegins, indexBegins + ITEMS_IN_PAGE);
  }


  useEffect(() => {
    setPageNumber(1);
  }, [arrayRecipes]);
  

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


// const demoRecipes: RecipeTypeWithId[] = [
//   {
//     _id: "1",
//     name: "אוכלrrrrr טעים",
//     category: "breakfast",
//     img: "https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?auto=compress&cs=tinysrgb&w=600",
//     ingredients: ["חלב", "ביצים"],
//     instructions: "חילחילח ל ליחלךחלך חךלחךלחילח לחיווווו וווווווווחילחי למתכון",
//     favorite: true
//   },
//   {
//     _id: "2",
//     name: "אוכל טעים 2",
//     category: "lunch",
//     img: "https://images.pexels.com/photos/699953/pexels-photo-699953.jpeg?auto=compress&cs=tinysrgb&w=600",
//     ingredients: ["קמח", "שמן"],
//     instructions: "הוראות למתכון 2",
//     favorite: false,
//   },
//   {
//     _id: "3",
//     name: "אוכל טעים",
//     category: "breakfast",
//     img: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=600",
//     ingredients: ["חלב", "ביצים"],
//     instructions: "חילחילח ל ליחלךחלך חךלחךלחילח לחיווווו וווווווווחילחי למתכון",
//     favorite: true
//   },
//   {
//     _id: "4",
//     name: "אוכל טעים 2",
//     category: "lunch",
//     img: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=600",
//     ingredients: ["קמח", "שמן"],
//     instructions: "הוראות למתכון 2",
//     favorite: false,
//   },
//   {
//     _id: "5",
//     name: "אוכל טעים",
//     category: "breakfast",
//     img: "https://images.pexels.com/photos/566566/pexels-photo-566566.jpeg?auto=compress&cs=tinysrgb&w=600",
//     ingredients: ["חלב", "ביצים"],
//     instructions: "חילחילח ל ליחלךחלך חךלחךלחילח לחיווווו וווווווווחילחי למתכון",
//     favorite: true
//   },
//   {
//     _id: "6",
//     name: "אוכל טעים 2",
//     category: "lunch",
//     img: "https://images.pexels.com/photos/708488/pexels-photo-708488.jpeg?auto=compress&cs=tinysrgb&w=400",
//     ingredients: ["קמח", "שמן"],
//     instructions: "הוראות למתכון 2",
//     favorite: false,
//   }
// ];