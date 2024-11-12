"use client";
import React from "react";
import "@/app/globals.css";
import { RecipeType } from "../types/irecipe";
import Image from "next/image";

interface PopUpProps {
  recipe: RecipeType;
  onClose: () => void; // Callback to close the popup
}

const RecipePopUp: React.FC<PopUpProps> = ({ recipe, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-start z-50">
      {/* Popup Content */}
      <div className="relative flex flex-row w-[350px] h-full bg-white overflow-y-auto shadow-xl p-6">
        {/* Close Button */}
        <div>
        <button
          onClick={onClose}
          className="absolute top-2 left-4 text-gray-500 hover:text-gray-800 text-4xl"
        >
          &times;
        </button>
        </div>

        {/* Recipe Content */}
        <div className="flex flex-col pt-12 w-[100%] ">
          <div className="flex flex-row mb-6">
            <div className="w-[45%]  mb-6 lg:mb-0">
              <Image src={recipe.img} alt={'recipe picture'} width={300} height={200} />
        
            </div>
          <div className="flex-1 pl-3 ">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {recipe.name}
            </h3>

            {/* Category and Favorite Icon */}
            <div className="flex items-center">
              <span className="text-sm text-gray-700">
                {recipe.category}
              </span>
              
            </div>

            {/* Ingredients */}
            <div className="">
              <span className="text-sm font-semibold text-gray-800 mb-2">
                Ingredients
              </span>
              <ul className="list-disc pl-6 text-gray-700 text-xs">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
          </div>
          </div>

          <div>

            {/* Instructions */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Instructions
              </h3>
              <p className="text-gray-700 text-xs">{recipe.instructions}</p>
            </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default RecipePopUp;
