"use client";
import React from 'react'
import AddRecipe from "@/app/components/AddRecipeButton";
import Navbar from './NavBar';

const Header = () => {
  return (
    <div className='flex justify-between'>
      <Navbar />
      <AddRecipe />
    </div>
  )
}

export default Header