import React, { useState } from 'react';
import Star from '@/app/components/Star';
import { RecipeTypeWithId } from "@/app/types/irecipe"
import RecipePopUp from './RecipePopUp';
import { useRecipeContecst } from '@/app/hooks/useRecipeContects';
import Image from './Image';


const RecipeCard = () => {
    const [showPopup, setShowPopup] = useState(false);

    const recipe: RecipeTypeWithId = useRecipeContecst();
    if (recipe === null) return <></>

    return (
        <div className='h-full'>
            <div className='h-full'>

                {/* Image Container */}
                <div className="relative h-40 overflow-hidden w-full sm:w-56">
                    <Image imageUrl={recipe.img} width={600} />
                </div>

                {/* Content Container */}
                <div className="p-3 flex flex-col justify-between h-60">
                    {/* Title and Favorite Row */}
                    <div className="flex justify-between items-center mb-1">
                        <h2 className="text-xl font-semibold text-gray-800">
                            {recipe.name}
                        </h2>
                        <Star />
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
                    <button className="button mt-3" onClick={() => { setShowPopup(true) }}>
                        Read more
                    </button>
                </div>

            </div>
            <div className='bg-slate-500'>
                {showPopup && (
                    <RecipePopUp recipe={recipe} onClose={() => setShowPopup(false)} />
                )}
            </div>
        </div>
    );
};

export default RecipeCard;