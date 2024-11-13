"use client";
import React from 'react'
import AddRecipe from "@/app/components/AddRecipeButton";
import Navbar from './NavBar';

interface HeaderProps {
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onFavoriteToggle: () => void;
}


const Header: React.FC<HeaderProps> = ({ onSearchChange, onCategoryChange, onFavoriteToggle }) => {
  return (
    <div className="flex justify-between">
      <Navbar
        onSearchChange={onSearchChange}
        onCategoryChange={onCategoryChange}
        onFavoriteToggle={onFavoriteToggle}
      />
      <AddRecipe />
    </div>
  );
};

export default Header;