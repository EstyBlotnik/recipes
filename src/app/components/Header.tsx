"use client";
import React from 'react'
import AddRecipe from "@/app/components/AddRecipeButton";
import Navbar from './NavBar';
import { NavbarProps } from "@/app/types/props"


const Header: React.FC<NavbarProps> = ({ onSearchChange, onCategoryChange, onFavoriteToggle }) => {
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