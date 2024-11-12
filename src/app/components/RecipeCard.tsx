import React from 'react';
// import { Star } from 'lucide-react';
import { RecipeCardProps } from "@/app/types/irecipe"


const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
    return (
        <div className="cardwrap m-5">
            {/* Image Container */}
            <div className="relative h-40 overflow-hidden">
                <img
                    src={recipe.img}
                    alt={recipe.name}
                    className="w-full object-cover"
                />
            </div>


            {/* Content Container */}
            <div className="p-3">
                {/* Title and Favorite Row */}
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {recipe.name}
                    </h2>
                    {/* <Star
            size={20}
            className={`${
              recipe.favorite
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          /> */}
                </div>

                {/* Category */}
                <p className="text-gray-600 text-sm mb-3">
                    {recipe.category}
                </p>

                {/* Instructions Preview */}
                <div >
                    <p className="text-gray-500 text-sm line-clamp-2">
                        {recipe.instructions}
                    </p>
                </div>

                {/* Read More Button */}
                <button className="button">
                    Read more
                </button>
            </div>
        </div>
    );
};

export default RecipeCard;