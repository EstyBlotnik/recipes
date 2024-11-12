// RecipeContainer.tsx
'use client';

import React, { useState } from 'react';
import { RecipeType } from '../types/irecipe';
import RecipePopUp from './RecipePopUp';


const RecipeContainer = () => {
  const [showPopup, setShowPopup] = useState(true); // Set to true to show initially

  const recipe: RecipeType = {
    name: 'Meal name',
    category: 'category',
    img: 'https://images.pexels.com/photos/17525263/pexels-photo-17525263/free-photo-of-peach-juice-in-glasses.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    ingredients: ['bread1', 'bread2', 'bread3', 'bread4', 'bread5'],
    instructions: 'Instructions go here. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent varius magna at ligula laoreet fermentum.',
    favorite: false,
  };

  return (
    <div className='bg-slate-500'>
      {showPopup && (
        <RecipePopUp recipe={recipe} onClose={() => setShowPopup(false)} />
      )}
    </div>
  );
};

export default RecipeContainer;
