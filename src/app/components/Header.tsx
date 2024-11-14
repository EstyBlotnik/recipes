"use client";
import React from 'react'
import AddRecipe from "@/app/components/AddRecipeButton";
import Navbar from './NavBar';

const Header = () => {
  return (
    <div className='flex flex-col-reverse sm:flex-row justify-between'>
      <Navbar />
      <AddRecipe />
    </div>
  )
}

export default Header