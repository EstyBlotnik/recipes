"use client";
import React from 'react';
import { RecipeTypeWithId } from '../types/irecipe';
import { useRecipeContecst } from '@/app/hooks/useRecipeContects';
import { updateFavorite } from '@/app/services/recipeCrud';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ShowStar from './ShowStar';

const Star = () => {
  const recipe: RecipeTypeWithId = useRecipeContecst();
  const queryClient = useQueryClient();


  const mutation = useMutation({
    mutationFn: (newFavorite:boolean) => updateFavorite(recipe._id, newFavorite),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });

    },
  });

  const toggleFavorite = () => {
    mutation.mutate(!recipe.favorite);
  };

  return (
    <button onClick={toggleFavorite} className="focus:outline-none">
     <ShowStar star={!recipe.favorite}></ShowStar>
    </button>
  );
};

export default Star;
