"use client";
import React, { useEffect } from "react";
import "@/app/globals.css";
import { RecipeTypeWithId } from "../types/irecipe";
import Image from "./Image";
import Star from "./Star";

interface PopUpProps {
  recipe: RecipeTypeWithId;
  onClose: () => void; // Callback to close the popup
}

const RecipePopUp: React.FC<PopUpProps> = ({ recipe, onClose }) => {
  useEffect(() => {
    document.body.classList.add("no-scroll");

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-end items-start z-50"
      onClick={onClose}
    >
      {/* Popup Content */}
      <div
        className="relative flex flex-col w-[450px] h-full bg-white shadow-xl p-6 overflow-y-auto"
        onClick={(event) => event.stopPropagation()} // מונע סגירה על לחיצה בתוך הפופאפ
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 left-4 text-gray-500 hover:text-gray-800 text-4xl"
        >
          &times;
        </button>

        {/* Recipe Content */}
        <div className= "p-4">
          <div className="flex flex-col justify-center items-center pt-12 w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {recipe.name}
            </h3>

            <div className="flex items-center mb-2">
              <span className="text-sm text-gray-700 font-serif">
                {recipe.category}
              </span>
              <Star />
            </div>

            <div className="w-[100%] justify-center mb-4">
              <Image imageUrl={recipe.img} width={400} />
            </div>
          </div>

          <div className="mb-4">
            <span className="text-base font-semibold text-gray-800 mb-4">
              Ingredients
            </span>
            <ul className="list-disc pl-6 text-gray-700 text-sm mb-4">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-semibold text-gray-800 mb-2">
              Instructions
            </h3>
            <p className="text-gray-700 text-sm">{recipe.instructions}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePopUp;
