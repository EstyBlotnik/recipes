import React, {useState } from 'react';
import Star from '@/app/components/Star';
import Image from 'next/image'
import { RecipeTypeWithId } from "@/app/types/irecipe"
import { RecipeContext } from "@/app/components/RecipesGrid"
import RecipePopUp from './RecipePopUp';
import { useRecipeContecst } from '@/app/hooks/useRecipeContects';


const RecipeCard = () => {
    const [showPopup, setShowPopup] = useState(false);

    const recipe: RecipeTypeWithId  = useRecipeContecst();
    if (recipe === null) return <></>

    return (
        <div>
            <div >
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
                        <Star />
                    </div>

                    {/* Category */}
                    <p className="text-gray-600 text-sm mb-3">
                        {recipe.category}
                    </p>

                    {/* Instructions Preview */}
                    <div>
                        <p className="text-gray-500 text-sm line-clamp-2 overflow-hidden">
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