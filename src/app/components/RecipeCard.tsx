import React from 'react';
import Star from '@/app/components/Star';
import Image from 'next/image'
import { RecipeCardProps } from "@/app/types/irecipe"


const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
    return (
        <div className="cardwrap m-5">
            {/* Image Container */}
            <div className="relative h-40 overflow-hidden">
                <Image
                    src={recipe.img}
                    alt={recipe.name}
                    width={200}
                    height={200}
                    className="w-full object-cover"
                />
            </div>

            {/* Content Container */}
            <div className="p-3">
                {/* Title and Favorite Row */}
                <div className="flex justify-between items-center mb-1">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {recipe.name}
                    </h2>
                    <Star {...recipe} />
                </div>

                {/* Category */}
                <p className="text-gray-600 text-sm mb-3">
                    {recipe.category}
                </p>

                {/* Instructions Preview */}
                <div>
                    <p className="text-gray-500 text-sm line-clamp-3 overflow-hidden">
                    {recipe.instructions}
                    </p>
                </div>

                {/* Read More Button */}
                <button className="button ">
                    Read more
                </button>
            </div>
        </div>
    );
};

export default RecipeCard;