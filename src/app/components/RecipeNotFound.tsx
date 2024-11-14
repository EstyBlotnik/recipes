// RecipeNotFound.tsx
import React from 'react';

interface RecipeNotFoundProps {
  message?: string;
}

const RecipeNotFound: React.FC<RecipeNotFoundProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-64 p-4 bg-gray-50 rounded-lg shadow-md">
      <div className="text-5xl mb-4">🍽️</div>
      <h2 className="text-lg font-semibold text-gray-800">
        {message || 'No recipes match your criteria'}
      </h2>
      <p className="text-gray-600 mt-2">
        Try searching again or adjusting your filters.
      </p>
    </div>
  );
};

export default RecipeNotFound;
